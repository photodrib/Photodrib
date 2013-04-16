

function initialize() {
    var id = $.url.param('id');

    $.getJSON('GetPhoto.aspx?id=' + id, function (data) {
        picture.src = data.FullUrl;
        picture.title = picture.alt = data.Comment;
        picture.style.visibility = 'visible';
    });
}

