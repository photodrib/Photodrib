/// <reference path="../../js/jquery-1.7.2.min.js" />
/// <reference path="../../js/jquery.url.js" />

function init() {
    var id = $.url.param('id');
    var xhr = XMLHttpRequest();
    xhr.open('GET', 'GetPhoto.aspx.cs?id=' + id, true);
    xhr.onreadystatechange = function () {
        if (xhr1.readyState == 4) {
            var result = JSON.parse(xhr.responseText);
            var latitude = result['Latitude'];
            var longitude = result['Longitude'];
            var comment = result['Comment'];
            var imgSrc = result['FullUrl'];
            var img = document.getElementById('BigImage');
            img.src = imgSrc;
        }
    }
}

var myCenter = new google.maps.LatLng(latitude, longitude);
var marker;

function initialize() {

    var mapProp = {
        center: myCenter,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    marker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.BOUNCE
    });

    marker.setMap(map);
    init();
}

google.maps.event.addDomListener(window, 'load', initialize);
