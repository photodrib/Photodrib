/// <reference path="../../js/jquery-1.7.2.min.js" />
/// <reference path="../../js/jquery.url.js" />

function init() {
}

function initialize() {
    var uid = $.url.param('uid');
    var pid = $.url.param('pid');

    $.getJSON('GetPhoto.ashx?uid=' + uid + '&pid=' + pid, function (data) {
        bigImage.src = data.FullPhotoURL;
        bigImage.title = bigImage.alt = data.PhotoComment;
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

$(document).ready(function () {
    $('h1.start').hover(function () { //mouse in
        $(this).animate({ paddingLeft: '20px' }, 400);
    }, function () { //mouse out
        $(this).animate({ paddingLeft: 0 }, 400);
    });
});
