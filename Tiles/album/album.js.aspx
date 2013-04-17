<%@ Page Language="C#" AutoEventWireup="true" CodeFile="album.js.aspx.cs" Inherits="Tiles_album_album_js" ContentType="application/javascript" %>
/// <reference path="../../js/Underscore.js" />
/// <reference path="../../js/jquery-1.7.2.min.js" />
/// <reference path="../../js/jquery.url.js" />
// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.



function album_load(tile, div) {
    var url = 'Tiles/album/GetAlbum.ashx?uid=<%= Request["uid"] %>&aid=<%= Request["aid"] %>';
    
    $.getJSON(url, function (data) {        
        var ctr = 0;
        $.each(data.reverse(), function (i, item) {
            var sourceSquare = item.ThumbnailPhotoURL;
            var sourceOrig = item.FullPhotoURL;
            var comment = item.PhotoComment;

            var htmlString = '<div class="album_item">' 
                //+ '<a target="_blank" href="' + sourceOrig + '" class="link" title="' + item.title + '">';
            htmlString += '<img title="' + comment +
                '" src="' + sourceOrig + '" ';
            htmlString += 'alt="' + comment +
                '" />';
            htmlString += '</a>'
                + '<div class="album_title">' + comment + '</div>' +
                '</div>';

            tile.slides.push(htmlString);

            ctr = ctr + 1;
            
        });

        tile.counter(ctr);
    });
}
