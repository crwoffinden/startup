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

function addSong() {
    const finishedFolder = document.getElementById("finished");
    const newSong = document.createElement('li');
    const title = localStorage.getItem("title");
    newSong.innerHTML = title;
    const url = 
    newSong.href 
}

