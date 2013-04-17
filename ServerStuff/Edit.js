

function initialize() {
    var id = $.url.param('id');
    $.getJSON('../Tiles/album/GetPhoto.ashx?id=' + id, function (data) {
        picture.src = data.FullUrl;
        picture.title = id;
        picture.style.visibility = 'visible';
    });
}

window.onload = initialize;