var busy = 0;
var NORTH = 0x1000;
var EAST = 0x0100;
var SOUTH = 0x0010;
var WEST = 0x0001;

function init() {
    dropbox.addEventListener("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
    }, false);
    dropbox.addEventListener("drop", function (e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        var filename = file.name;
        if (!checkFileType(filename)) {
            showMessage('Invalid file type', '#700');
            return;
        }
        var reader = new FileReader();
        reader.onloadend = handleReaderLoadEnd;
        reader.filename = filename;
        reader.albumID = parseInt(window.prompt('Album ID:', ''));
        reader.readAsDataURL(file);
    }, false);
    progressBar.style.visibility = 'hidden';
    progressBar.count = 0;
    autoUpdate(true);
    getPhotos();
}

function switchAutoUpdate() {
    autoUpdate(!autoUpdateSwitch.isOn);
}

function autoUpdate(on) {
    if (on) {
        autoUpdateSwitch.isOn = true;
        autoUpdateSwitch.innerText = 'Auto update: on';
        autoGetPhotos();
    } else {
        autoUpdateSwitch.isOn = false;
        autoUpdateSwitch.innerText = 'Auto update: off';
    }
}

function autoGetPhotos() {
    if (autoUpdateSwitch.isOn) {
        //console.log(busy);
        if (!busy) getPhotos();
        setTimeout(autoGetPhotos, 1000);
    }
}

function getPhotos() {
    busy = 0;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getphotos.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status != 200) {
                showMessage("Error code = " + xhr.status, '#700');
            } else {
                var resp = JSON.parse(xhr.responseText);
                if (resp[0]) showMessage(resp[1], '#700');
                else if (JSON.stringify(resp[1]) != JSON.stringify(document.photos)) {
                    document.photos = resp[1];
                    loadPhotos();
                }
            }
        }
    };
    xhr.send();
}

function loadPhotos() {
    var photos = document.photos;
    var i = 0;
    photoTable.innerHTML = '';
    if (!photos) return;
    var row = document.createElement('tr');
    for (var k = 0; k < photos.length; k++) {
        var photo = photos[k];
        if (i >= 4) {
            photoTable.appendChild(row);
            row = document.createElement('tr');
            i = 0;
        }
        var cell = document.createElement('td');

        var editButton = document.createElement('div');
        editButton.innerText = 'E';
        editButton.className = 'edit';
        editButton.pid = photo.pid;
        editButton.style.visibility = 'hidden';

        var deleteButton = document.createElement('div');
        deleteButton.innerText = 'X';
        deleteButton.className = 'delete';
        deleteButton.pid = photo.pid;
        deleteButton.style.visibility = 'hidden';

        var img = document.createElement('img');
        img.id = photo.pid;
        img.src = photo.thumbfname;
        img.title = photo.description;
        img.fname = photo.fname;
        img.editButton = editButton;
        img.deleteButton = deleteButton;

        var showButtons;
        var hideButtons;

        var tmp = function () {
            var currImg = img;
            showButtons = function () {
                busy++;
                var width = currImg.offsetWidth;
                var rect = currImg.getBoundingClientRect();
                var top = rect.top + document.documentElement.scrollTop;
                var left = rect.left + document.documentElement.scrollLeft;

                currImg.editButton.style.top = currImg.deleteButton.style.top = (top + 5) + 'px';
                currImg.editButton.style.left = (left + width - 50) + 'px';
                currImg.deleteButton.style.left = (left + width - 25) + 'px';
                currImg.style.border = '2px solid red';
                currImg.editButton.style.visibility = 'visible';
                currImg.deleteButton.style.visibility = 'visible';
            };
            hideButtons = function () {
                if (busy) busy--;
                currImg.style.border = '2px solid rgba(255, 255, 255, 0.00)';
                currImg.editButton.style.visibility = 'hidden';
                currImg.deleteButton.style.visibility = 'hidden';
            };
        }();

        editButton.addEventListener('mouseover', showButtons, false);
        deleteButton.addEventListener('mouseover', showButtons, false);
        img.addEventListener('mouseover', showButtons, false);

        editButton.addEventListener('mouseout', hideButtons, false);
        deleteButton.addEventListener('mouseout', hideButtons, false);
        img.addEventListener('mouseout', hideButtons, false);

        editButton.addEventListener('click', editPhoto, false);
        deleteButton.addEventListener('click', deletePhoto, false);
        img.addEventListener('click', showPhoto, false);

        cell.appendChild(editButton);
        cell.appendChild(deleteButton);
        cell.appendChild(img);

        row.appendChild(cell);
        i++;
    }
    photoTable.appendChild(row);
}

function checkFileType(filename) {
    if (filename.length <= 4) return false;
    var i = filename.lastIndexOf('.');
    if (i == -1) return false;
    var ext = filename.substr(i + 1).toLowerCase();
    if (ext == 'jpg' || ext == 'png' || ext == 'gif') return true;
    return false;
}

function showMessage(msg, color) {
    var p = document.createElement("p");
    p.innerText = msg;
    p.style['background-color'] = color ? color : '#000';
    //setTimeout(function () {
    //    message.removeChild(message.childNodes[0]);
    //}, 5000);
    message.appendChild(p);
}

function handleReaderLoadEnd(e) {
    busy++;
    var data = e.target.result.split(',')[1];
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../UploadPhoto.aspx?id=' + e.target.albumID, true);
    xhr.setRequestHeader('FILE_NAME', e.target.filename);
    xhr.upload.addEventListener('progress', function (e) {
        progressBar.value = e.loaded;
        progressBar.max = e.total;
    }, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (busy) busy--;
            progressBar.value = progressBar.max;
            //if (xhr.status != 200) {
            //    showMessage("Error code = " + xhr.status, '#700');
            //} else {
                showMessage(xhr.responseText);
                /*var resp = JSON.parse(xhr.responseText);
                var color = resp[0] == 0 ? '#070' : '#700'
                showMessage(resp[1], color);
                getPhotos();*/
            //}
            setTimeout(function () {
                if (--progressBar.count == 0) {
                    progressBar.style.visibility = 'hidden';
                    progressBar.value = 0;
                }
            }, 5000);
        }
    };
    progressBar.count++;
    progressBar.style.visibility = 'visible';
    xhr.send(data);
}

function showPhoto(e) {
    e.stopPropagation();
    busy++;
    var pid = e.target.id;

    var table = document.createElement('table');
    var tr = {};
    var td = {};

    for (var i = 0; i < 3; i++) {
        tr[i] = document.createElement('tr');
        td[i] = {};
        for (var j = 0; j < 3; j++) {
            td[i][j] = document.createElement('td');
            var resize = 0;
            if (i == 0) resize |= NORTH;
            if (i == 2) resize |= SOUTH;
            if (j == 0) resize |= WEST;
            if (j == 2) resize |= EAST;
            td[i][j].style.cursor = getDirection(resize) + '-resize';
            td[i][j].addEventListener('mousedown', function () {
                var r = resize;
                return function (event) {
                    imgDiv.resize = r;
                    dragDown(event);
                };
            }(), false);
            tr[i].appendChild(td[i][j]);
        }
        table.appendChild(tr[i]);
    }

    var img = document.createElement('img');
    img.id = 'original';
    img.src = e.target.fname;
    td[1][1].appendChild(img);

    var imgDiv = document.createElement('div');
    imgDiv.className = 'image';
    imgDiv.style.visibility = 'hidden';
    imgDiv.appendChild(table);

    img.addEventListener('load', function () {
        var maxWidth = outerWidth * 0.7;
        var maxHeight = outerHeight * 0.7;
        var width = img.width;
        var height = img.height;
        if (width > maxWidth) {
            var ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
        }
        if (height > maxHeight) {
            ratio = maxHeight / height;
            width = width * ratio;
            height = maxHeight;
        }
        var left = (innerWidth - width) / 2;
        var top = (innerHeight - height) / 2;
        img.style.width = width + 'px';
        img.style.height = height + 'px';
        imgDiv.style.left = left + 'px';
        imgDiv.style.top = top + 'px';
        loading.style.visibility = 'hidden';
        imgDiv.style.visibility = 'visible';
    }, false);
    imgDiv.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
    }, false);

    var background = document.createElement('div');
    background.className = 'background';
    background.addEventListener('mousewheel', function (event) {
        event.stopPropagation();
        event.preventDefault();
    }, false);
    background.addEventListener('click', function (event) {
        event.stopPropagation();
        if (busy) busy--;
        document.body.removeChild(event.target);
    }, false);

    var loading = document.createElement('progress');
    var loadingWidth = 300;
    var loadingHeight = 20;
    loading.className = 'loading';
    loading.style.width = loadingWidth + 'px';
    loading.style.height = loadingHeight + 'px';
    loading.style.left = ((innerWidth - loadingWidth) / 2) + 'px';
    loading.style.top = ((innerHeight - loadingHeight) / 2) + 'px';

    background.appendChild(loading);
    background.appendChild(imgDiv);

    document.body.appendChild(background);
}

function editPhoto(e) {
    e.stopPropagation();
    do {
        var description = window.prompt('Please enter the new description (50 bytes max):', '');
        if (description == null) return;
        if (description.length > 50) alert('Description too long');
    } while (description.length > 50);
    busy++;
    description = encodeURIComponent(description);
    var pid = e.target.pid;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'editphoto.php?pid=' + parseInt(pid) + '&desc=' + description, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (busy) busy--;
            if (xhr.status != 200) {
                showMessage("Error code = " + xhr.status, '#700');
            } else {
                var resp = JSON.parse(xhr.responseText);
                if (resp[0]) showMessage(resp[1], '#700');
                else showMessage(resp[1], '#070');
                getPhotos();
            }
        }
    };
    xhr.send();
}

function deletePhoto(e) {
    e.stopPropagation();
    busy++;
    var pid = e.target.pid;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'delphoto.php?pid=' + parseInt(pid), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (busy) busy--;
            if (xhr.status != 200) {
                showMessage("Error code = " + xhr.status, '#700');
            } else {
                var resp = JSON.parse(xhr.responseText);
                if (resp[0]) showMessage(resp[1], '#700');
                else showMessage(resp[1], '#070');
                getPhotos();
            }
        }
    };
    xhr.send();
}

function getDirection(resize) {
    var dir = '';
    if (resize & NORTH) dir += 'n';
    if (resize & SOUTH) dir += 's';
    if (resize & EAST) dir += 'e';
    if (resize & WEST) dir += 'w';
    return dir;
}

function dragUp(e) {
    e.preventDefault();
    e.stopPropagation();

    var div = document.getElementsByClassName('image')[0];

    div.removeEventListener('mouseup', dragUp, false);
    div.removeEventListener('mousemove', dragMove, false);

    document.body.removeEventListener('mouseup', dragUp, false);
    document.body.removeEventListener('mousemove', dragMove, false);

    window.removeEventListener('mouseup', dragUp, false);
    window.removeEventListener('mousemove', dragMove, false);
}

function dragMove(e) {
    e.preventDefault();
    e.stopPropagation();

    var div = document.getElementsByClassName('image')[0];
    var resize = div.resize;

    var left;
    var top;

    if (!resize) {
        left = e.clientX - div.diffX;
        top = e.clientY - div.diffY;

        if (left < 0) left = 0;
        if (left + div.offsetWidth > innerWidth) left = innerWidth - div.offsetWidth;

        if (top < 0) top = 0;
        if (top + div.offsetHeight > innerHeight) top = innerHeight - div.offsetHeight;
    } else {
        var newLeft = e.clientX - div.diffX
        var newTop = e.clientY - div.diffY;
        var width = original.width;
        var height = original.height;
        var initWidth = div.imgWidth;
        var initHeight = div.imgHeight;
        var diffLeft = newLeft - div.offsetLeft;
        var diffTop = newTop - div.offsetTop;
        if (resize & NORTH) {
            top = newTop;
            height = original.height - diffTop;
        }
        if (resize & EAST) {
            left = div.offsetLeft;
            width = initWidth + diffLeft;
        }
        if (resize & SOUTH) {
            top = div.offsetTop;
            height = initHeight + diffTop;
        }
        if (resize & WEST) {
            left = newLeft;
            width = original.width - diffLeft;
        }
        var divWidth = width + (div.offsetWidth - original.offsetWidth);
        var divHeight = height + (div.offsetHeight - original.offsetHeight);
        if (left < 0 || left + divWidth > innerWidth || width < 10) {
            width = original.width;
            left = div.offsetLeft;
        }
        if (top < 0 || top + divHeight > innerHeight || height < 10) {
            height = original.height;
            top = div.offsetTop;
        }
        original.style.width = width + 'px';
        original.style.height = height + 'px';
    }

    div.style.left = left + 'px';
    div.style.top = top + 'px';
}

function dragDown(e) {
    e.preventDefault();
    e.stopPropagation();

    var div = document.getElementsByClassName('image')[0];
    var img = document.getElementById('original');

    div.diffX = e.clientX - div.offsetLeft;
    div.diffY = e.clientY - div.offsetTop;

    div.imgWidth = img.offsetWidth;
    div.imgHeight = img.offsetHeight;

    div.addEventListener('mouseup', dragUp, false);
    div.addEventListener('mousemove', dragMove, false);

    document.body.addEventListener('mouseup', dragUp, false);
    document.body.addEventListener('mousemove', dragMove, false);

    window.addEventListener('mouseup', dragUp, false);
    window.addEventListener('mousemove', dragMove, false);
}

window.onload = init;
