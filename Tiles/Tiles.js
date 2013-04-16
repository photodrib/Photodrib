// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and which tiles appear by default 
// to new visitors. 


// The default tile setup offered to new users.
window.DefaultTiles = [
    {
        name :"Section1",
        tiles: [
           { id: "album1", name: "album2x2" },
           { id: "album2", name: "album2x1" },
           { id: "album3", name: "album1x1" },
           { id: "album4", name: "album2x1" },
           { id: "album5", name: "album1x1" },
           { id: "album6", name: "album2x1" },
           { id: "album7", name: "album2x1" },
           { id: "album8", name: "album1x1" }
        ]
    },
    {
        name: "Section2",
        tiles: [
           { id: "album9", name: "album2x1" },
           { id: "album10", name: "album2x1" },
           { id: "album11", name: "album1x1" },
           { id: "album12", name: "album2x1" },
           { id: "album13", name: "album2x1" },
           { id: "album14", name: "album1x1" },
           { id: "album15", name: "album2x1" },
           { id: "album16", name: "album2x1" },
           { id: "album17", name: "album1x1" }
        ]
    },
    {
        name: "Section3", tiles: [
           { id: "album18", name: "album2x2" },
        ]
    }
];


// Convert it to a serialized string
window.DefaultTiles = _.map(window.DefaultTiles, function (section) {
    return "" + section.name + "~" + (_.map(section.tiles, function (tile) {
        return "" + tile.id + "," + tile.name;
    })).join(".");
}).join("|");
        

// Definition of the tiles, their default values.
window.TileBuilders = {

    album1x1: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "album",
            //iconSrc: "img/Flickr alt 1.png",
            label: "Album",
            color: "bg-color-darken",
            appUrl: "Tiles/album/App/AlbumApp.html?uid=3295454&aid=5401212",
            cssSrc: ["tiles/album/album.css"],
            scriptSrc: ["tiles/album/album.js?uid=3295454&aid=5401212"],
            //scriptSrc: ["tiles/album/album_interesting.js"],
            //cssSrc: ["tiles/album/album_interesting.css"],            
            initFunc: "album_load"
        };
    },

    album2x1: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "album",
            //iconSrc: "img/Flickr alt 1.png",
            label: "Album",
            size: "tile-double",
            color: "bg-color-darken",
            appUrl: "Tiles/album/App/AlbumApp.html?uid=3295454&aid=5401212",
            cssSrc: ["tiles/album/album.css"],
            scriptSrc: ["tiles/album/album.js?id=5401212"],
            //scriptSrc: ["tiles/album/album_interesting.js"],
            //cssSrc: ["tiles/album/album_interesting.css"],            
            initFunc: "album_load"
        };
    },

    album2x2: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "album",
            //iconSrc: "img/Flickr alt 1.png",
            label: "Album",
            size: "tile-double tile-double-vertical",
            color: "bg-color-darken",
            appUrl: "Tiles/album/App/AlbumApp.html?uid=3295454&aid=5401212",
            cssSrc: ["tiles/album/album.css"],
            scriptSrc: ["tiles/album/album.js?id=5401212"],
            //scriptSrc: ["tiles/album/album_interesting.js"],
            //cssSrc: ["tiles/album/album_interesting.css"],            
            initFunc: "album_load"
        };
    },

};
