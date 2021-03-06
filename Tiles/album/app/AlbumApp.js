﻿/// <reference path="../../../js/jquery-1.7.2.min.js" />
/// <reference path="../../../js/jquery.url.js" />
/// <reference path="../../../js/AppCommon.js" />

var albumID;
var uid;

$(document).ready(function () {
    $('a.backbutton').hover(function () { //mouse in
        $(this).animate({ paddingLeft: '20px' }, 400);
    }, function () { //mouse out
        $(this).animate({ paddingLeft: 0 }, 400);
    });
    // get hte user id and the album id
    albumID = parseInt($.url.param('aid'));
    uid = parseInt($.url.param('uid'));
    var url = '../GetAlbum.ashx?uid=' + uid + '&aid=' + albumID;
    
    $.getJSON('../../../ServerStuff/GetUserID.ashx', function (currUid) {
        if (uid == currUid) {
            $('a.delbutton')[0].style.visibility = 'visible';
            $('a.uploadbutton')[0].style.visibility = 'visible';
        }
    });
    // get the album list with user id
    $.getJSON('../GetAlbumList.ashx?id=' + uid, function (data) {
        $.each(data, function (i, item) {
            if (item.AlbumID == albumID) {
                $('h1.start')[0].innerText = item.PhotoAlbumName;
            }
        });
    });
    // create the albumlist table for user to chooose the albums he wants to delete
    $.getJSON(url, function (data) {
        var ctr = 0;

        var htmlString = "<table><tr>";

        $.each(data.reverse(), function (i, item) {
            //if (item.tags.length < 150) {
            var sourceSquare = item.ThumbnailPhotoURL;
            var sourceOrig = item.FullPhotoURL;
            var link = '../ShowPhoto.html?uid=' + uid + '&pid=' + item.PhotoID;
            var comment = item.PhotoComment;

            htmlString += '<td class="album_item">'
                + '<a target="_blank" href="' + link + '" class="link" title="' + comment + '">';
            htmlString += '<img title="' + comment +
                '" src="' + sourceOrig + '" ';
            htmlString += ' alt="' + comment +
                '" />';
            htmlString += '</a><div class="album_title">' + comment + '</div>' +
                '</td>';

            //$('#images').append($(htmlString));

            ctr = ctr + 1;
            //}
        });
        htmlString += "</tr></table>";
        $('#images').append($(htmlString));
        
        $('#images').find("img").each(function (item) {
            $(item).load(function () {
                $(this).fadeIn();
            });
        });
    });
});
// delete the album using JASON with the album id 
function delAlbum() {
    if (!window.confirm('Are you sure to delete this album?')) return;
    $.getJSON('../DeleteAlbum.ashx?id=' + albumID, function (data) {
        if (!data) {
            alert('Failed');
        } else {
            alert('Album deleted');
            closeApp();
        }
    });
}

function chgZoom(o, b) {
    if (b) {
        o.style.zoom = 1.1;
    } else {
        o.style.zoom = 1;
    }
}

function upload() {
    window.open('../upload.html?id=' + albumID, "_blank");
}
