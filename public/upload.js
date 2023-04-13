async function upload() {
    const title = document.getElementById("song-title").value;
    const description = document.getElementById('song-description').value;
    const date = new Date();
    const bpm = localStorage.getItem('bpm');
    const musicText = localStorage.getItem('music');
    const music = JSON.parse(musicText);
    const newSong = {title: title, description: description, date: date, bpm: bpm, music: music, listens: 0};
    let finishedSongs = [];
    let finishedSongsText = localStorage.getItem('finishedSongs');
    if (finishedSongsText) finishedSongs = JSON.parse(finishedSongsText);
    finishedSongs.unshift(newSong);

    localStorage.setItem("finishedSongs", JSON.stringify(finishedSongs));
    await fetch('/api/songs', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newSong)
    }); //FIXME validate this could be very wrong
    window.location.href = "myProjects.html";
}

function startScreen() {
    let title = localStorage.getItem('title');
    document.getElementById('song-title').value = title;
}
 
startScreen();