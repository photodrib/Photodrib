/// <reference path="../../../js/jquery-1.7.2.min.js" />
/// <reference path="../../../js/jquery.url.js" />

$(document).ready(function () {
  
        $('a.backbutton').hover(function () { //mouse in
            $(this).animate({ paddingLeft: '20px' }, 400);
        }, function () { //mouse out
            $(this).animate({ paddingLeft: 0 }, 400);
        });
    
    var albumID = parseInt($.url.param('id'));
    var url = "../GetAlbum.aspx?id=" + albumID;

    $.getJSON(url, function (data) {
        var ctr = 0;

        var htmlString = "<table><tr>";

        $.each(data.Pictures.reverse(), function (i, item) {
            //if (item.tags.length < 150) {
            var sourceSquare = item.ThumbnailUrl;
            var sourceOrig = item.FullUrl;
            var link = '../ShowPhoto.html?id=' + item.PhotoID;

            htmlString += '<td class="album_item">'
                + '<a target="_blank" href="' + link + '" class="link" title="' + item.Comment + '">';
            htmlString += '<img title="' + item.Comment +
                '" src="' + sourceOrig + '" ';
            htmlString += ' alt="' + item.Comment +
                '" />';
            htmlString += '</a><div class="album_title">' + item.Comment + '</div>' +
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
