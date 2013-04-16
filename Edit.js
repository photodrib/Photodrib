

function initialize() {
    var id = $.url.param('id');
    alert(id);
    $.getJSON('GetPhoto.aspx?id=' + id, function (data) {
        alert(data.FullUrl);
        picture.src = data.FullUrl;
        picture.title = data.Comment;
        picture.style.visibility = 'visible';
    });
}

window.onload = initialize;