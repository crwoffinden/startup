function upload() {
    const title = document.getElementById("song-title").value;
    const description = document.getElementById('song-description').value;
    const date = new Date();
    const bpm = localStorage.getItem('bpm');
    const musicText = localStorage.getItem('music');
    const music = JSON.parse(musicText);
    const newSong = {title: title, description: description, date: date, bpm: bpm, music: music};
    let finishedSongs = [];
    let finishedSongsText = localStorage.getItem('finishedSongs');
    if (finishedSongsText) finishedSongs = JSON.parse(finishedSongsText);
    finishedSongs.unshift(newSong);

    localStorage.setItem("finishedSongs", JSON.stringify(finishedSongs));
    window.location.href = "myProjects.html";
}

function startScreen() {
    let title = localStorage.getItem('title');
    document.getElementById('song-title').value = title;
}

startScreen();