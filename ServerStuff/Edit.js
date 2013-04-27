/// <reference path="../js/jquery-1.7.2.min.js" />
/// <reference path="../js/jquery.url.js" />

function initialize() {
    var uid;
    var pid = $.url.param('id');

    // get the info of the user

    $.ajax('GetUserID.ashx', {
        async: false,
        dataType: 'json',
        success: function (data) {
            uid = data;
        }
    });
    var picture = document.getElementById('picture');
    //get the basic info of the photo
    $.getJSON('../Tiles/album/GetPhoto.ashx?uid=' + uid + '&pid=' + pid, function (data) {
        picture.src = data.FullPhotoURL;
        picture.title = picture.alt = data.PhotoComment;
        picture.style.visibility = 'visible';
    });
}

window.onload = initialize;
