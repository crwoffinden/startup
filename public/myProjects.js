function toProfile() {
    window.location.href = "profile.html";
}

function toHome() {
    window.location.href = "menu.html";
}

async function loadSongs() {
    const finishedFolder = document.getElementById("finished");
    let finishedSongs = [];
    try {
        const user = {user: localStorage.getItem('userName')};
        const response = await fetch('/api/userSongs', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        });
        finishedSongs = await response.json();
    } catch {
        const finishedSongsText = localStorage.getItem('finishedSongs');
        if(finishedSongsText) finishedSongs = JSON.parse(finishedSongsText);
    }
    for (let i = 0; i < finishedSongs.length; ++i) {
        const song = document.createElement('li');
        song.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(finishedSongs[i]));
            window.location.href = "finishedProject.html";
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
    
    const unfinishedFolder = document.getElementById('unfinished');
    let unfinishedSongs = [];
    const unfinishedSongsText = localStorage.getItem('unfinishedSongs');
    if(unfinishedSongsText) unfinishedSongs = JSON.parse(unfinishedSongsText);
    for (let i = 0; i < unfinishedSongs.length; ++i) {
        const song = document.createElement('li');
        song.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(unfinishedSongs[i]));
            const selectedSong = unfinishedSongs[i];
            unfinishedSongs.unshift(selectedSong);
            unfinishedSongs.splice((i + 1), 1);
            localStorage.setItem('unfinishedSongs', JSON.stringify(unfinishedSongs));
            window.location.href = "newProject.html";
        };
        song.innerText = unfinishedSongs[i].title;
        unfinishedFolder.appendChild(song);
    }
}

loadSongs();
