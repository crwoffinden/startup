const uploadEvent = 'upload';
const messageEvent = 'message';

function toProfile() {
    localStorage.setItem('differentUser', false);
    window.location.href = "profile.html";
}

function newProject() {
    localStorage.setItem("selectedSong", undefined)
    window.location.href = "newProject.html";
}

function myProjects() {
    window.location.href = "myProjects.html";
}

function whatsHot() {
    window.location.href = "whatsHot.html";
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

configureWebSocket();