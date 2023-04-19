//const { getSongsByUser, getUserMessages } = require("../database");

function toHome() {
    window.location.href = "menu.html";
}

async function fill() {
    const favorite = document.getElementById("favorite");
    if (favorite.className === "bi bi-heart") {
        favorite.className = "bi bi-heart-fill";
        const newFavorite = {user: localStorage.getItem('userName'), favorite: user};
        await fetch('/api/addFavorite', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newFavorite)
        });
    }
    else if (favorite.className === "bi bi-heart-fill") {
        favorite.className = "bi bi-heart";
        const newUnfavorite = {user: localStorage.getItem('userName'), unfavorite: user};
        await fetch('/api/removeFavorite', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newUnfavorite)
        });
    }
}

//FIXME these two functions need to be adjusted based on Database possibilities
function edit() {
    let icon = document.getElementById('edit');
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let nameTxt = localStorage.getItem('name');
    let bioTxt = localStorage.getItem('bio');
    name.innerHTML = `<input type=\"text\" id=\"nameInput\" value=\"${nameTxt}\"></input>`;
    bio.innerHTML = `<input type=\"text\"id=\"bioInput\" value=\"${bioTxt}\"></input>`;
    icon.outerHTML = "<i class=\"bi bi-save\" onclick=\"save(this)\"></i>";
}

async function save(icon) {
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let nameInput = document.getElementById('nameInput');
    let bioInput = document.getElementById('bioInput');
    let nameTxt = nameInput.value;
    let bioTxt = bioInput.value;
    const myUser = {user: user, name: nameTxt, bio: bioTxt};
    localStorage.setItem('name', nameTxt);
    localStorage.setItem('bio', bioTxt);
    name.innerHTML = `${nameTxt}`;
    bio.innerHTML = `${bioTxt}`;
    icon.outerHTML = "<i class=\"bi bi-pencil\" id=\"edit\" onclick=\"edit()\"></i>";
    await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(myUser)
    });
}

function postMessage() {
    window.location.href = "message.html";
}

async function loadSongs() {
    let songs = [];
    const myUser = {user: user};
    const options = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(myUser)
    };
    try {
        const response = await fetch('/api/userSongs', options );
        songs = await response.json();
    } catch{
        if (user === localStorage.getItem('userName')) {
            const songsText = localStorage.getItem('finishedSongs');
            if (songsText) songs = JSON.parse(songsText);
        }
    }
    
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

async function loadAllSongs() {
    let songs = [];
    const myUser = {user: user};
    const options = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(myUser)
    };
    try {
        const response = await fetch('/api/userSongs', options );
        songs = await response.json();
    } catch{
        if (user === localStorage.getItem('userName')) {
            const songsText = localStorage.getItem('finishedSongs');
            if (songsText) songs = JSON.parse(songsText);
        }
    }

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

async function loadFollowing() {
    let following = [];
    const currUser = {user: user}
    let text = document.getElementById('following');
    text.innerHTML = "Following";
    try {
        const response = await fetch('/api/getFavorites', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(currUser)
        });
        following = await response.json();
        localStorage.setItem('favoritesList', JSON.stringify(following));
    } catch {
        const followingText = localStorage.getItem('favoritesList');
        following = JSON.parse(followingText);
    }
    if (following.length > 0) {
        for (let i = 0; (i < following.length) && (i < 5); ++i) {
            const newPerson = document.createElement('li');
            newPerson.onclick = function goToProfile() {
                if(!JSON.parse(localStorage.getItem('differentUser'))) localStorage.setItem('newUser', true);
                else localStorage.setItem('newUser', false);
                localStorage.setItem('chosenUser', following[i]);
                localStorage.setItem('differentUser', true);
                load();
            };
            newPerson.innerText = following[i];
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

async function loadAllFollowing() {
    let following = [];
    const currUser = {user: user}
    let text = document.getElementById('following');
    text.innerHTML = "Following";
    try {
        const response = await fetch('/api/getFavorites', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(currUser)
        });
        following = await response.json();
        localStorage.setItem('favoritesList', JSON.stringify(following));
    } catch {
        const followingText = localStorage.getItem('favoritesList');
        following = JSON.parse(followingText);
    }
    if (following.length > 0) {
        for (let i = 0; (i < following.length) && (i < 5); ++i) {
            const newPerson = document.createElement('li');
            newPerson.onclick = function goToProfile() {
                if(!JSON.parse(localStorage.getItem('differentUser'))) localStorage.setItem('newUser', true);
                else localStorage.setItem('newUser', false);
                localStorage.setItem('chosenUser', following[i]);
                localStorage.setItem('differentUser', true);
                load();
            };
            newPerson.innerText = following[i];
            text.appendChild(newPerson);
        }
    }
}

async function loadMessages() {
    let messages = [];
    try {
        const myUser = {user: user};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(myUser)
        }
        const response = await fetch('/api/getMessages', options);
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

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        if (msg.type === messageEvent) {
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

async function load() {
    const differentUserString = localStorage.getItem('differentUser');
    const differentUser = JSON.parse(differentUserString);
    const newUser = JSON.parse(localStorage.getItem('newUser'));
    if (differentUser) {
        user = localStorage.getItem('chosenUser');
        if (newUser) {
            const editIcon = document.getElementById('edit');
            editIcon.remove();
        }
    }
    else {
        user = localStorage.getItem('userName');
        const mainBar = document.getElementById('options');
        const editIcon = document.createElement('i');
        editIcon.className = "bi bi-pencil";
        editIcon.id = "edit"
        editIcon.onclick = edit;
        mainBar.appendChild(editIcon);  
    } 
    const currUser = {user: user};
    const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(currUser)
    });
    userProfile = await response.json();
    document.getElementById('name').innerText = userProfile.name;
    document.getElementById('bio').innerText = userProfile.bio;
    const favorite = document.getElementById("favorite");
    const myUserName = {user: localStorage.getItem('userName')};
    const favoritesResponse = await fetch('/api/getFavorites', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(myUserName)
    });
    const favoritesList = await favoritesResponse.json();
    if (favoritesList.includes(user)) favorite.className = "bi bi-heart-fill"; 
    configureWebSocket();
    loadSongs();
    loadFollowing();
    loadMessages();
}

var user;

var userProfile;

load();