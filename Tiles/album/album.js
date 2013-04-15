/// <reference path="../../js/Underscore.js" />
/// <reference path="../../js/jquery-1.7.2.min.js" />
/// <reference path="../../js/jquery.url.js" />
// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.



function album_load(tile, div) {
    var albumID = parseInt($.url.param('id'));
    var url = "Tiles/album/GetAlbum.aspx?id=" + 5401212;
    
    $.getJSON(url, function (data) {        
        var ctr = 0;
        $.each(data.Pictures.reverse(), function (i, item) {
            var sourceSquare = item.ThumbnailUrl;
            var sourceOrig = item.FullUrl;

            var htmlString = '<div class="album_item">' 
                //+ '<a target="_blank" href="' + sourceOrig + '" class="link" title="' + item.title + '">';
            htmlString += '<img title="' + item.Comment +
                '" src="' + sourceOrig + '" ';
            htmlString += 'alt="' + item.Comment +
                '" />';
            htmlString += '</a>'
                + '<div class="album_title">' + item.Comment + '</div>' +
                '</div>';

            tile.slides.push(htmlString);

            ctr = ctr + 1;
            
        });

        tile.counter(ctr);
    });
    
}
