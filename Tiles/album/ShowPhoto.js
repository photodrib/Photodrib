/// <reference path="fancybox/lib/jquery-1.9.0.min.js" />
/// <reference path="fancybox/lib/jquery.mousewheel-3.0.6.pack.js" />
/// <reference path="fancybox/source/jquery.fancybox.js" />
/// <reference path="fancybox/source/helpers/jquery.fancybox-buttons.js" />
/// <reference path="fancybox/source/helpers/jquery.fancybox-thumbs.js" />
/// <reference path="fancybox/source/helpers/jquery.fancybox-media.js" />
/// <reference path="http://maps.googleapis.com/maps/api/js?key=AIzaSyD4AmOld0gvXFP_LjlCibt75nf3cRZ9GEc&sensor=false" />


function initialize() {
    var uid = $.url.param('uid');
    var pid = $.url.param('pid');
    var currUid;

    $.ajax('../../ServerStuff/GetUserID.ashx', {
        async: false,
        dataType: 'json',
        success: function (data) {
            currUid = data;
        }
    });
    if (!currUid) return;
    if (uid == currUid) {
        $('a.editbutton')[0].style.visibility = 'visible';
        $('a.delbutton')[0].style.visibility = 'visible';
    }

    $.getJSON('GetPhoto.ashx?uid=' + uid + '&pid=' + pid, function (data) {
        var src = data.FullPhotoURL;
        var title = data.PhotoComment;
        $('h1.start')[0].innerText = data.PhotoComment;
        var fbox = '<a class="fancybox" href="' + src + '" title="' + title + '"><img src="'
                + src + '" alt="' + title + '" width="' + 300 + '" /></a>'

        var myCenter = new google.maps.LatLng(data.Latitude, data.Longitude);
        var marker;

        var mapProp = {
            center: myCenter,
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        var infoWindow = new google.maps.InfoWindow({
            content: fbox
        });

        marker = new google.maps.Marker({
            position: myCenter,
            map: map,
            animation: google.maps.Animation.BOUNCE,
            title: data.PhotoComment
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });

        infoWindow.open(map, marker);

        comment.style.visibility = 'visible';
    });
}


function delPhoto() {
    pID = parseInt($.url.param('pid'));
    if (!window.confirm('Are you sure to delete this photo?')) return;
    $.getJSON('./DeletePhoto.ashx?id=' + pID, function (data) {
        if (!data) {
            alert('Failed');
        } else {
            alert('Photo deleted');
            window.close();
        }
    });
}
function editPhoto() {
    pID = parseInt($.url.param('pid'));
    window.location = "../../ServerStuff/Edit.aspx?id=" + pID;
}

function chgZoom(o, b) {
    if (b) {
        o.style.zoom = 1.1;
    } else {
        o.style.zoom = 1;
    }
}


google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function () {
    $('h1.start').hover(function () { //mouse in
        $(this).animate({ paddingLeft: '20px' }, 400);
    }, function () { //mouse out
        $(this).animate({ paddingLeft: 0 }, 400);
    });
    $('.fancybox').fancybox({
        padding: 0,

        openEffect: 'elastic',
        openSpeed: 150,

        closeEffect: 'elastic',
        closeSpeed: 150,

        closeClick: true,

        helpers: {
            overlay: null
        }
    });
    document.body.onresize = function () {
        comment.setAttribute("data-width", innerWidth * 0.8);
    }
});

