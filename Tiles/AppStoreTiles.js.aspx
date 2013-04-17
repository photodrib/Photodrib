<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AppStoreTiles.js.aspx.cs" Inherits="Tiles_AppStoreTiles_js" %>
/// <reference path="../js/jquery-1.7.2.min.js" />

// Definition of the tiles, their default values.
window.TileBuilders = {};

// The default tile setup offered to new users.
window.AppStoreTiles = [
    {
        name: "Albums",
        tiles: []
    },
    {
        name: "Recent Updates",
        tiles: []
    }
];

var uid;

$.ajax('ServerStuff/GetUserID.ashx?name=<%= Request["name"] %>', {
    async: false,
    dataType: 'json',
    success: function (data) {
        uid = data;
    }
});

if (uid != null) {
    $.ajax('Tiles/album/GetAlbumList.ashx?id=' + uid, {
        async: false,
        dataType: 'json',
        success: function (data) {
            $.each(data, function (i, item) {
                var tile = 'a' + item.AlbumID;
                window.TileBuilders[tile] = function () {
                    var name = 'a' + item.AlbumID;
                    var label = item.PhotoAlbumName;
                    var tileImage = item.PhotoAlbumThumbnail;
                    return function (uniqueId) {
                        return {
                            uniqueId: uniqueId,
                            name: name,
                            size: 'tile-double',
                            label: label,
                            tileImage: tileImage
                        };
                    };
                }();
                window.AppStoreTiles[0].tiles.push({
                    id: tile,
                    name: tile
                });
            });
        }
    });
}


// Convert it to a serialized string
window.AppStoreTiles = _.map(window.AppStoreTiles, function (section) {
    return "" + section.name + "~" + (_.map(section.tiles, function (tile) {
        return "" + tile.id + "," + tile.name;
    })).join(".");
}).join("|");
