// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and the tiles to show on the App Store.


// The default tile setup offered to new users.
window.AppStoreTiles = [
    {
        name: "Albums",
        tiles: [
           { id: "album1", name: "album2x2" },
           { id: "album2", name: "album2x1" },
           { id: "album3", name: "album1x1" }
        ]
    },
    {
        name: "Recent Updates",
        tiles: [
           { id: "album4", name: "album2x2" }
        ]
    },
];


// Convert it to a serialized string
window.AppStoreTiles = _.map(window.AppStoreTiles, function (section) {
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
            label: 'Album',
            //tileImage: 'img/AppStore/Flickr.png'
        };
    },

    album2x1: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "album",
            size: 'tile-double',
            label: 'Album',
            //tileImage: 'img/AppStore/Flickr.png'
        };
    },

    album2x2: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "album",
            size: 'tile-double tile-double-vertical',
            label: 'Album',
            //tileImage: 'img/AppStore/Flickr.png'
        };
    },

    weather: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "weather",
            size: "tile-double tile-double-vertical",
            tileImage: 'img/AppStore/Weather.png',
            onClick: 'addTile("weather")'
        };
    },

    amazon: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "amazon",
            size: 'tile-double',
            color: 'bg-color-yellow',
            iconSrc: 'img/amazon.png',
            label: 'Amazon, buy anything, from anywhere',
            onClick: 'addTile("amazon")'
        };
    },

    maps: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "maps"
        };
    },

    ie: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "ie",
            iconSrc: 'img/Internet Explorer.png',
            label: 'Internet Explorer 10'            
        };
    },

    facebook: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "facebook"
        };
    },

    calendar: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "calendar"
        };
    },

    library: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "library",
            iconSrc: 'img/Libraries.png',
            label: 'Library'
            
        };
    },

    skydrive: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "skydrive"
        };
    },

    flickr: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "flickr",
            size: 'tile-triple tile-triple-vertical',
            tileImage: 'img/AppStore/Flickr.png'
        };
    },

    email: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "email",
        };
    },

    youtube: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "youtube",
            tileImage: 'img/AppStore/YouTube.png'
        };
    },

    angrybirds: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "angrybirds",
            tileImage: "img/AppStore/Angrybirds.png",
            size: 'tile-double tile-double-vertical'
        };
    },

    wikipedia: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "wikipedia",
            iconSrc: "img/Wikipedia alt 1.png"            
        };
    },


    news: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "news",
            size: "tile-double tile-double-vertical",
            tileImage: 'img/AppStore/News.png'
        };
    },

    feature: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "feature"   
        };
    },

    dynamicTile: function (uniqueId) {
        return {
            niqueId: uniqueId,
            name: "dynamicTile"            
        }
    },

    cutTheRope: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "cutTheRope",
            size: 'tile-double',
            tileImage: "img/AppStore/CutTheRope.png",
            subContent: "Feed the cute thing and win stars"
        };
    },

    buy: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "buy"           
        };

    }

};
