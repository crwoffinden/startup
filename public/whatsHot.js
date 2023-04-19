const uploadEvent = 'upload';
const messageEvent = 'message';

function toProfile() {
    window.location.href = "profile.html";
}

function toHome()  {
    window.location.href = "menu.html";
}

async function display() {
    configureWebSocket();
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
                localStorage.setItem('selectedSong', JSON.stringify(newSongs[i]));
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
            localStorage.setItem('selectedSong', JSON.stringify(popularSongs[i]));
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

    let songsByLikedPeople = [];
    try {
        const user = {user: localStorage.getItem('userName')};
        const response = await fetch('/api/songsByFavorites', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        });
        songsByLikedPeople = await response.json();
        localStorage.setItem("songsByLikedPeople", JSON.stringify(songsByLikedPeople));
    } catch {
        const songsByLikedPeopleText = localStorage.getItem("songsByLikedPeople");
        if (songsByLikedPeopleText) songsByLikedPeople = JSON.parse(songsByLikedPeopleText);
    }

    let songsByLikedPeopleList = document.getElementById('likedPeople');
    for (let i = 0; (i < songsByLikedPeople.length) && (i < 5); ++i) {
        const currSong = document.createElement('li');
        currSong.className = "list-item";
        currSong.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(songsByLikedPeople[i]));
            window.location.href = "finishedProject.html";
        }
        currSong.innerText = songsByLikedPeople[i].title;
        songsByLikedPeopleList.appendChild(currSong);
    }
    if (songsByLikedPeople.length > 5) {
        const seeMore = document.createElement('span');
        seeMore.innerText = "see more";
        seeMore.onclick = loadLikedPeople;
        songsByLikedPeopleList.appendChild(seeMore);
    }
}

async function loadNewSongs() {
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
    newSongList.innerHTML = "New Songs";
    for (let i = 0; i < newSongs.length; ++i) {
        const currSong = document.createElement('li');
        currSong.className = "list-item";
        currSong.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(newSongs[i]));
            window.location.href = "finishedProject.html";
        }
        currSong.innerText = newSongs[i].title;
        newSongList.appendChild(currSong);
    }
}

async function loadPopularSongs() {
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
    popularSongList.innerHTML = "Popular Songs"
    for (let i = 0; i < popularSongs.length; ++i) {
        const currSong = document.createElement('li');
        currSong.className = "list-item";
        currSong.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(popularSongs[i]));
            window.location.href = "finishedProject.html";
        }
        currSong.innerText = popularSongs[i].title;
        popularSongList.appendChild(currSong);
    }
}

async function loadLikedPeople() {
    let songsByLikedPeople = [];
    try {
        const user = {user: localStorage.getItem('userName')};
        const response = await fetch('/api/songsByFavorites', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        });
        songsByLikedPeople = await response.json();
        localStorage.setItem("songsByLikedPeople", JSON.stringify(songsByLikedPeople));
    } catch {
        const songsByLikedPeopleText = localStorage.getItem("songsByLikedPeople");
        if (songsByLikedPeopleText) songsByLikedPeople = JSON.parse(songsByLikedPeopleText);
    }

    let songsByLikedPeopleList = document.getElementById('likedPeople');
    songsByLikedPeopleList.innerHTML = "People You Like";
    for (let i = 0; i < songsByLikedPeople.length; ++i) {
        const currSong = document.createElement('li');
        currSong.className = "list-item";
        currSong.onclick = function goToSong() {
            localStorage.setItem('selectedSong', JSON.stringify(songsByLikedPeople[i]));
            window.location.href = "finishedProject.html";
        }
        currSong.innerText = songsByLikedPeople[i].title;
        songsByLikedPeopleList.appendChild(currSong);
    }
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        if (msg.type === uploadEvent) {
            displayMsg('user', msg.from, `uploaded a new song`);
        } 
        else if (msg.type === messageEvent) {
            displayMsg('user', msg.from, `posted a new message`);
        } 
    };
}

function displayMsg(cls, from, msg) {
    const chatText = document.getElementsByClassName('chatMessages');
    for (const chat of chatText) {
        const chatTextMessage = chat.innerHTML;
        chat.innerHTML =
      `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatTextMessage;
    }
}

display();