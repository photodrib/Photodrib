/// <reference path="../js/jquery-1.7.2.min.js" />

// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and the tiles to show on the App Store.


// Definition of the tiles, their default values.
window.TileBuilders = {
    recentUpdates: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: 'RecentUpdates',
            size: 'tile-double tile-double-vertical',
            label: 'Recent Updates',
            tileImage: null
        };
    }
};

// The default tile setup offered to new users.
window.AppStoreTiles = [
    {
        name: "Albums",
        tiles: []
    },
    {
        name: "Recent Updates",
        tiles: [{
            id: 'RecentUpdates',
            name: 'RecentUpdates'
        }]
    }
];

var uid;

$.ajax('ServerStuff/GetUserID.ashx', {
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

    $.ajax('Tiles/album/GetRecentUpdatesInfo.ashx', {
        async: false,
        dataType: 'json',
        success: function (data) {
            window.TileBuilders.RecentUpdates = function () {
                var tileImage = data.PhotoAlbumThumbnail;
                return function (uniqueId) {
                    return {
                        uniqueId: uniqueId,
                        name: 'RecentUpdates',
                        size: 'tile-double tile-double-vertical',
                        label: 'Recent Updates',
                        tileImage: tileImage
                    };
                };
            }();
        }
    });
}


// Convert it to a serialized string
window.AppStoreTiles = _.map(window.AppStoreTiles, function (section) {
    return "" + section.name + "~" + (_.map(section.tiles, function (tile) {
        return "" + tile.id + "," + tile.name;
    })).join(".");
}).join("|");
