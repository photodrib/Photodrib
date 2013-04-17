﻿/// <reference path="../../../js/jquery-1.7.2.min.js" />
/// <reference path="../../../js/jquery.url.js" />
/// <reference path="../../../js/AppCommon.js" />

var uid;

$(document).ready(function () {
    $('a.backbutton').hover(function () { //mouse in
        $(this).animate({ paddingLeft: '20px' }, 400);
    }, function () { //mouse out
        $(this).animate({ paddingLeft: 0 }, 400);
    });

    $.ajax('ServerStuff/GetUserID.ashx', {
        async: false,
        dataType: 'json',
        success: function (data) {
            uid = data;
        }
    });

    $.getJSON('GetRecentUpdates.ashx', function (data) {
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