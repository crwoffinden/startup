function toProfile() {
    window.location.href = "profile.html";
}

function toHome() {
    window.location.href = "menu.html";
}

function loadSongs() {
    const finishedFolder = document.getElementById("finished");
    let finishedSongs = [];
    const finishedSongsText = localStorage.getItem('finishedSongs');
    if(finishedSongsText) finishedSongs = JSON.parse(finishedSongsText);
    for (let i = 0; i < finishedSongs.length; ++i) {
        const song = document.createElement('li');
        song.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(finishedSongs[i]));
            window.location.href = "newProject.html";
        };
        song.innerText = finishedSongs[i].title;
        const description = document.createElement('span');
        description.className = "songDescription";
        description.innerText = finishedSongs[i].description;
        const date = document.createElement('span');
        date.id = "date";
        date.innerText = finishedSongs[i].date;
        finishedFolder.appendChild(song);
        song.appendChild(description);
        song.appendChild(date);
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

loadSongs();
