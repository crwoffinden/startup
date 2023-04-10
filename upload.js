function upload() {
    const title = document.getElementById("song-title");
    const description = document.getElementById('song-description');
    const newSong = {title: title, description: description};
    let finishedSongs = [];
    let finishedSongsText = localStorage.getItem('finishedSongs');
    finishedSongs = JSON.parse(finishedSongsText);
    finishedSongs.unshift(newSong);

    localStorage.setItem("finishedSongs", JSON.stringify(finishedSongs));
    window.location.href = "myProjects.html";
}