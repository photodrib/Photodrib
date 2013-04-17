/// <reference path="../js/jquery-1.7.2.min.js" />

// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and which tiles appear by default 
// to new visitors. 


// The default tile setup offered to new users.
window.DefaultTiles = [
    {
        name :"Section1",
        tiles: []
    }
];
  

// Definition of the tiles, their default values.
window.TileBuilders = {};

var currUid;
var uids;

$.ajax('ServerStuff/GetUserID.ashx', {
    async: false,
    dataType: 'json',
    success: function (data) {
        currUid = data;
    }
});

$.ajax('ServerStuff/GetUserIDList.ashx', {
    async: false,
    dataType: 'json',
    success: function (data) {
        uids = data;
    }
});

$.each(uids, function (i, uid) {
    $.ajax('Tiles/album/GetAlbumList.ashx?id=' + uid, {
        async: false,
        dataType: 'json',
        success: function (data) {
            $.each(data, function (j, item) {
                var tile = 'a' + item.AlbumID;
                window.TileBuilders[tile] = function () {
                    var name = 'a' + item.AlbumID;
                    var label = item.PhotoAlbumName;
                    var appUrl = 'Tiles/album/App/AlbumApp.html?uid=' + uid + '&aid=' + item.AlbumID;
                    var scriptSrc = ['tiles/album/album.js.aspx?uid=' + uid + '&aid=' + item.AlbumID];
                    return function (uniqueId) {
                        return {
                            uniqueId: uniqueId,
                            name: name,
                            label: label,
                            size: "tile-double",
                            color: "bg-color-darken",
                            appUrl: appUrl,
                            cssSrc: ["tiles/album/album.css"],
                            scriptSrc: scriptSrc,
                            initFunc: "album_load"
                        };
                    };
                }();

                if (uid == currUid) {
                    window.DefaultTiles[0].tiles.push({
                        id: tile,
                        name: tile
                    });
                }
            });
        }
    });
});


// Convert it to a serialized string
window.DefaultTiles = _.map(window.DefaultTiles, function (section) {
    return "" + section.name + "~" + (_.map(section.tiles, function (tile) {
        return "" + tile.id + "," + tile.name;
    })).join(".");
}).join("|");
