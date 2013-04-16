/// <reference path="../../js/jquery-1.7.2.min.js" />
/// <reference path="../../js/jquery.url.js" />

function init() {
}

function initialize() {
    var id = $.url.param('id');

    $.getJSON('GetPhoto.aspx?id=' + id, function (data) {
        bigImage.src = data.FullUrl;
        bigImage.title = bigImage.alt = data.Comment;
        bigImage.style.visibility = 'visible';

        var myCenter = new google.maps.LatLng(data.Latitude, data.Longitude);
        var marker;

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

        comment.style.visibility = 'visible';
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
