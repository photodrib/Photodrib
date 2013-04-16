

function initialize() {
    var id = $.url.param('id');
    alert(id);
    $.getJSON('./Tiles/album/GetPhoto.aspx?id=' + id, function (data) {
        alert(JSON.stringify(data.FullUrl));
        picture.src = data.FullUrl;
        picture.title = id;
        picture.style.visibility = 'visible';
    });
}

window.onload = initialize;