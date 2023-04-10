function fill() {
    const favorite = document.getElementById("favorite");
    if (favorite.className === "bi bi-heart") favorite.className = "bi bi-heart-fill";
    else if (favorite.className === "bi bi-heart-fill") favorite.className = "bi bi-heart";
}

function edit(icon) {
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let nameTxt = name.innerText;
    let bioTxt = bio.innerText;
    name.innerHTML = `<input type=\"text\" id=\"nameInput\" value=\"${nameTxt}\"></input>`;
    bio.innerHTML = `<input type=\"text\"id=\"bioInput\" value=\"${bioTxt}\"></input>`;
    icon.outerHTML = "<i class=\"bi bi-save\" onclick=\"save(this)\"></i>";
}

function save(icon) {
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let nameTxt = document.getElementById('nameInput').value;
    let bioTxt = document.getElementById('bioInput').value;
    name.innerHTML = `${nameTxt}`;
    bio.innerHTML = `${bioTxt}`;
    icon.outerHTML = "<i class=\"bi bi-pencil\" onclick=\"edit(this)\"></i>";
}

function postMessage() {
    window.location.href = "message.html"
}

function loadMessages() {
    let messages = [];
    const messagesText = localStorage.getItem('messages');
    if (messagesText) messages = JSON.parse(messagesText);
    let text = document.getElementById('messages');
    if (messages.length > 0) {
        for (let i = 0; (i < messages.length) || (i < 3); ++i) {
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
            seeAll.onclick = "loadAllMessages()";
            text.appendChild(seeAll);
        }
        
    }
    else {
        let noMessages = document.createElement('p');
        noMessages.innerText = "No Messages Yet";
        Text.appendChild(noMessages);
    }
    let post = document.createElement('button');
    post.onclick = ("postMessage()");
    post.innerText = "Post Message";
    text.appendChild(post);
}

function loadAllMessages() {
    let messages = [];
    const messagesText = localStorage.getItem('messages');
    if (messagesText) messages = JSON.parse(messagesText);
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
    post.onclick = ("postMessage()");
    post.innerText = "Post Message";
    text.appendChild(post);
}

loadMessages();