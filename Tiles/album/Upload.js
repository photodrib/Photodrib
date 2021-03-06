﻿/// <reference path="../../js/jquery-1.7.2.min.js" />
/// <reference path="../../js/jquery.url.js" />

var albumID;
var lat = 0;
var lng = 0;
var geocoder;
var map;

function init() {
    // get the albumid
    albumID = $.url.param('id');
    // add event listener to the dropbox
    dropbox.addEventListener("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
    }, false);
    dropbox.addEventListener("drop", function (e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        var filename = file.name;
        if (!checkFileType(filename)) {
            showMessage('Invalid file type', '#700');
            return;
        }
        var reader = new FileReader();
        reader.onloadend = handleReaderLoadEnd;
        reader.filename = filename;
        reader.albumID = albumID;
        reader.readAsDataURL(file);
    }, false);
    progressBar.style.visibility = 'hidden';
    progressBar.count = 0;

    $('#address').keypress(function (e) {
        if (e.keyCode == 13) {
            e.stopPropagation();
            e.preventDefault();
            codeAddress();
        }
    });
    // connect the to google map api
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("googleMap"), myOptions);
}
// code the address of the photo
function codeAddress() {
    // the address is ib the google map elements and can be goten by methods
    var address = document.getElementById("address").value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            map.setCenter(results[0].geometry.location);
            this.marker = new google.maps.Marker({
                title: address,
                map: map,
                position: results[0].geometry.location
            });
            var infowindow = new google.maps.InfoWindow({
                content: '<strong>' + address + '</strong><br/>' + 'longtitude: ' + lat + '<br/>logitude: ' + lng
            });
            infowindow.open(map, marker);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
// check the type of the uploaded file
function checkFileType(filename) {
    if (filename.length <= 4) return false;
    var i = filename.lastIndexOf('.');
    if (i == -1) return false;
    var ext = filename.substr(i + 1).toLowerCase();
    if (ext == 'jpg' || ext == 'png' || ext == 'gif') return true;
    return false;
}
// show the uploading status message
function showMessage(msg, color) {
    var p = document.createElement("p");
    p.innerText = msg;
    p.style['background-color'] = color ? color : '#000';
    setTimeout(function () {
        message.removeChild(message.childNodes[0]);
    }, 5000);
    message.appendChild(p);
}
// handle the draged in and teh process bar
function handleReaderLoadEnd(e) {
    var data = e.target.result.split(',')[1];
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'UploadPhoto.ashx?id=' + e.target.albumID + '&lat=' + lat + '&lng=' + lng, true);
    xhr.setRequestHeader('FILE_NAME', e.target.filename);
    xhr.upload.addEventListener('progress', function (e) {
        progressBar.value = e.loaded;
        progressBar.max = e.total;
    }, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            progressBar.value = progressBar.max;
            if (xhr.status != 200) {
                showMessage("Error code = " + xhr.status, '#700');
            } else {
                var resp = JSON.parse(xhr.responseText);
                if (!resp) showMessage('Unknown error', '#700');
                else showMessage('Success', '#070')
            }
            setTimeout(function () {
                if (--progressBar.count == 0) {
                    progressBar.style.visibility = 'hidden';
                    progressBar.value = 0;
                }
            }, 5000);
        }
    };
    progressBar.count++;
    progressBar.style.visibility = 'visible';
    xhr.send(data);
}

window.onload = init;
