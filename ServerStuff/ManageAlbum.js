/// <reference path="../js/jquery-1.7.2.min.js" />

var uid, albumID;

function initialize() {
    $.getJSON('GetUserID.ashx', function (data) {
        uid = data;
    });
    var tmp = "../Tiles/album/GetAlbumList.ashx"+ uid;

    $.getJSON(tmp, function (data) {
        albumID = data;
    });












}
window.onload = initialize();