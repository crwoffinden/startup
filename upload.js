function upload() {
    const title = document.getElementById("song-title");
    localStorage.setItem("title", JSON.stringify(title));
}