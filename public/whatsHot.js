function toProfile() {
    window.location.href = "profile.html";
}

function toHome()  {
    window.location.href = "menu.html";
}

async function display() {
    let newSongs = [];
    try {
        const response = await fetch('/api/newSongs');
        newSongs = await response.json();
        localStorage.setItem("newSongs", JSON.stringify(newSongs));
    } catch {
        const newSongsText = localStorage.getItem("newSongs");
        if (newSongsText) newSongs = JSON.parse(newSongsText);
    }

    let newSongList = document.getElementById('newSongs');
    for (let i = 0; (i < newSongs.length) && (i < 5); ++i) {
        if (newSongs[i] !== null) {
            const currSong = document.createElement('li');
            currSong.className = "list-item";
            currSong.onclick = function goToSong() {
                localStorage.setItem('selectedSong', JSON.stringify(songs[i]));
                window.location.href = "finishedProject.html";
            }
            currSong.innerText = newSongs[i].title;
            newSongList.appendChild(currSong);
        } else newSongs.length = i;  
    }
    if (newSongs.length > 5) {
        const seeMore = document.createElement('span');
        seeMore.innerText = "see more";
        seeMore.onclick = loadNewSongs;
        newSongList.appendChild(seeMore);
    }

    let popularSongs = [];
    try {
        const response = await fetch('/api/popularSongs');
        popularSongs = await response.json();
        localStorage.setItem("popularSongs", JSON.stringify(popularSongs));
    } catch {
        const popularSongsText = localStorage.getItem("popularSongs");
        if (popularSongsText) popularSongs = JSON.parse(popularSongsText);
    }

    let popularSongList = document.getElementById('popularSongs');
    for (let i = 0; (i < popularSongs.length) && (i < 5); ++i) {
        const currSong = document.createElement('li');
        currSong.className = "list-item";
        currSong.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(songs[i]));
            window.location.href = "finishedProject.html";
        }
        currSong.innerText = popularSongs[i].title;
        popularSongList.appendChild(currSong);
    }
    if (popularSongs.length > 5) {
        const seeMore = document.createElement('span');
        seeMore.innerText = "see more";
        seeMore.onclick = loadPopularSongs;
        popularSongList.appendChild(seeMore);
    }
}

function loadNewSongs() {
    let newSongList = document.getElementById('newSongs');
    newSongList.innerHTML = "New Songs";
    for (let i = 0; i < newSongs.length; ++i) {
        const currSong = document.createElement('li');
        currSong.className = "list-item";
        currSong.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(songs[i]));
            window.location.href = "finishedProject.html";
        }
        currSong.innerText = newSongs[i].title;
        newSongList.appendChild(currSong);
    }
}

function loadPopularSongs() {
    let popularSongList = document.getElementById('popularSongs');
    popularSongList.innerHTML = "Popular Songs"
    for (let i = 0; (i < popularSongs.length) && (i < 5); ++i) {
        const currSong = document.createElement('li');
        currSong.className = "list-item";
        currSong.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(songs[i]));
            window.location.href = "finishedProject.html";
        }
        currSong.innerText = popularSongs[i].title;
        popularSongList.appendChild(currSong);
    }
}

display();