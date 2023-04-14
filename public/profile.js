//const { getSongsByUser, getUserMessages } = require("../database");

function toHome() {
    window.location.href = "menu.html";
}

function fill() {
    const favorite = document.getElementById("favorite");
    if (favorite.className === "bi bi-heart") favorite.className = "bi bi-heart-fill";
    else if (favorite.className === "bi bi-heart-fill") favorite.className = "bi bi-heart";
}

//FIXME these two functions need to be adjusted based on Database possibilities
function edit(icon) {
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let nameTxt = localStorage.getItem('name');
    let bioTxt = localStorage.getItem('bio');
    name.innerHTML = `<input type=\"text\" id=\"nameInput\" value=\"${nameTxt}\"></input>`;
    bio.innerHTML = `<input type=\"text\"id=\"bioInput\" value=\"${bioTxt}\"></input>`;
    icon.outerHTML = "<i class=\"bi bi-save\" onclick=\"save(this)\"></i>";
}

function save(icon) {
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let nameTxt = document.getElementById('nameInput').value;
    let bioTxt = document.getElementById('bioInput').value;
    localStorage.setItem('name', nameTxt);
    localStorage.setItem('bio', bioTxt);
    name.innerHTML = `${nameTxt}`;
    bio.innerHTML = `${bioTxt}`;
    icon.outerHTML = "<i class=\"bi bi-pencil\" onclick=\"edit(this)\"></i>";
    //updateProfile
}

function postMessage() {
    window.location.href = "message.html";
}

function loadSongs() {
    let songs = [];
    //songs = getSongsByUser//FIXME figure out how to format
    const songsText = localStorage.getItem('finishedSongs');
    if (songsText) songs = JSON.parse(songsText);
    let text = document.getElementById('songs');
    if (songs.length > 0) {
        for (let i = 0; (i < songs.length) && (i < 5); ++i) {
            const newSong = document.createElement('li');
            newSong.onclick = function goToSong() {
                localStorage.setItem('selectedSong', JSON.stringify(songs[i]));
                window.location.href = "finishedProject.html";
            };
            newSong.innerText = songs[i].title;
            const description = document.createElement('span');
            description.className = "songDescription";
            description.innerText = songs[i].description;
            const date = document.createElement('span');
            date.id = "date";
            date.innerText = songs[i].date;
            text.appendChild(newSong);
            newSong.appendChild(description);
            newSong.appendChild(date);
        }
        if (songs.length > 5) {
            let seeAll = document.createElement("span");
            seeAll.innerText = "See All";
            seeAll.onclick = loadAllSongs;
            text.appendChild(seeAll);
        }
    } else {
        let noSongs = document.createElement('p');
        noSongs.innerText = "No Songs Yet";
        text.appendChild(noSongs);
    }
}

function loadAllSongs() {
    let songs = [];
    songs = getSongsByUser//FIXME figure out how to format
    const songsText = localStorage.getItem('finishedSongs');
    if (songsText) songs = JSON.parse(songsText);
    let text = document.getElementById('songs');
    text.innerHTML = "Songs";
    if (songs.length > 0) {
        for (let i = 0; i < songs.length; ++i) {
            const newSong = document.createElement('li');
            newSong.onclick = function goToSong() {
                localStorage.setItem('selectedSong', JSON.stringify(songs[i]));
                window.location.href = "finishedProject.html";
            };
            newSong.innerText = songs[i].title;
            const description = document.createElement('span');
            description.className = "songDescription";
            description.innerText = songs[i].description;
            const date = document.createElement('span');
            date.id = "date";
            date.innerText = songs[i].date;
            text.appendChild(newSong);
            newSong.appendChild(description);
            newSong.appendChild(date);
        }
    }
}

function loadFollowing() {
    const following = [];
    //getFavorites FIXME figure this out
    let text = document.getElementById('following');
    text.innerHTML = "Following";
    if (following.length > 0) {
        for (let i = 0; (i < following.length) && (i < 5); ++i) {
            const newPerson = document.createElement('li');
            newPerson.onclick = function goToProfile() {
                localStorage.setItem('chosenUser', following[i].user);
                localStorage.setItem('differentUser', true);
                load();
            };
            newPerson.innerText = following[i].name;
            text.appendChild(newPerson);
        } if (following.length > 5) {
            let seeAll = document.createElement("span");
            seeAll.innerText = "See All";
            seeAll.onclick = loadAllFollowing;
            text.appendChild(seeAll);
        }
    } else {
        let notFollowing = document.createElement('p');
        notFollowing.innerText = "Not Following Anyone Yet";
        text.appendChild(notFollowing);
    }
}

function loadAllFollowing() {
    const following = [];
    //getFavorites FIXME figure this out
    let text = document.getElementById('following');
    text.innerHTML = "Following";
    if (following.length > 0) {
        for (let i = 0; (i < following.length) && (i < 5); ++i) {
            const newPerson = document.createElement('li');
            newPerson.onclick = function goToProfile() {
                localStorage.setItem('chosenUser', following[i].user);
                localStorage.setItem('differentUser', true);
                load();
            };
            newPerson.innerText = following[i].name;
            text.appendChild(newPerson);
        }
    }
}

async function loadMessages() {
    let messages = [];
    try {
        console.log("trying");
        const myUser = {user: user};
        const response = await fetch('/api/getMessages', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(myUser)
        });
        messages = await response.json();
    } catch {
        if (user === localStorage.getItem("userName")) {
            const messagesText = localStorage.getItem('messages');
            if (messagesText) messages = JSON.parse(messagesText);
        }
    }

    let text = document.getElementById('messages');    
    if (messages.length > 0) {
        for (let i = 0; (i < messages.length) && (i < 3); ++i) {
            let currMessage = document.createElement('p');
            currMessage.id = "message";
            currMessage.innerText = messages[i].message;
            let currDate = document.createElement('p');
            currDate.id = "date";
            currDate.innerText = "Posted on " + messages[i].date;
            text.appendChild(currMessage);
            text.appendChild(currDate);
        }
        if (messages.length > 3) {
            let seeAll = document.createElement("span");
            seeAll.innerText = "See All";
            seeAll.onclick = loadAllMessages;
            text.appendChild(seeAll);
        }
        
    }
    else {
        let noMessages = document.createElement('p');
        noMessages.innerText = "No Messages Yet";
        text.appendChild(noMessages);
    }
    let post = document.createElement('button');
    post.onclick = postMessage;
    post.innerText = "Post Message";
    text.appendChild(post);
}

async function loadAllMessages() {
    let messages = [];
    try {
        console.log("trying");
        const myUser = {user: user};
        const response = await fetch('/api/getMessages', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(myUser)
        });
        messages = await response.json();
    } catch{
        if (user === localStorage.getItem("userName")) {
            const messagesText = localStorage.getItem('messages');
            if (messagesText) messages = JSON.parse(messagesText);
        }
    }
    
    let text = document.getElementById('messages');
    text.innerHTML = "Messages";
    for (let i = 0; i < messages.length; ++i) {
        let currMessage = document.createElement('p');
        currMessage.id = "message";
        currMessage.innerText = messages[i].message;
        let currDate = document.createElement('p');
        currDate.id = "date";
        currDate.innerText = "Posted on " + messages[i].date;
        text.appendChild(currMessage);
        text.appendChild(currDate);
    }
    let post = document.createElement('button');
    post.onclick = postMessage;
    post.innerText = "Post Message";
    text.appendChild(post);
}

function load() {
    const differentUser = localStorage.getItem('differentUser')
    if (differentUser) {
        user = localStorage.getItem('chosenUser');
        
    }
    else user = localStorage.getItem('userName');
    loadSongs();
    loadFollowing();
    loadMessages();
}

var user;

load();