function toProfile() {
    window.location.href = "profile.html";
}

function toHome() {
    window.location.href = "menu.html";
}

class Song {
    constructor(title, url) {
        this.title = title;
        this.url = url;
    }
}

function loadSongs() {
    const finishedFolder = document.getElementById("finished");
    let finishedSongs = [];
    const finishedSongsText = localStorage.getItem('finishedSongs');
    if(finishedSongsText) finishedSongs = JSON.parse(finishedSongsText);
    for (let i = 0; i < finishedSongs.length; ++i) {
        const song = document.createElement('li');
        song.innerText = finishedSongs[i].title;
        description = document.createElement('span');
        description.className = "songDescription";
        description.innerText = finishedSongs[i].description;
        song.appendChild(description);
        finishedFolder.appendChild(song);
    }
    
    let unfinishedSongs = [];
    const unfinishedSongsText = localStorage.getItem('unfinishedSongs');
    if(unfinishedSongsText) unfinishedSongs = JSON.parse(unfinishedSongsText);
    for (let i = 0; i < unfinishedSongs.length; ++i) {
        const song = document.createElement('li');
        song.innerText = unfinishedSongs[i].title;
        description = document.createElement('span');
        description.className = "songDescription";
        description.innerText = unfinishedSongs[i].description;
        song.appendChild(description);
        unfinishedFolder.appendChild(song);
    }
}

