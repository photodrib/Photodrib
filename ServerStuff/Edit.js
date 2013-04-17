/// <reference path="../js/jquery-1.7.2.min.js" />
/// <reference path="../js/jquery.url.js" />

function initialize() {
    var uid;
    var pid = $.url.param('id');

    $.ajax('GetUserID.ashx', {
        async: false,
        dataType: 'json',
        success: function (data) {
            uid = data;
        }
    });

    $.getJSON('../Tiles/album/GetPhoto.ashx?uid=' + uid + '&pid=' + pid, function (data) {
        picture.src = data.FullPhotoURL;
        picture.title = picture.alt = data.PhotoComment;
        picture.style.visibility = 'visible';
    });
}

window.onload = initialize;
