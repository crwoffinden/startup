const uploadEvent = 'upload';
const messageEvent = 'message';

async function postMessage() {
    const user = localStorage.getItem('userName');
    const message = document.getElementById('message').value;
    const date = new Date().toLocaleDateString();
    let messages = [];
    let messagesText = localStorage.getItem('messages');
    if (messagesText) messages = JSON.parse(messagesText);
    const newMessage = { user: user, message: message, date: date };
    messages.unshift(newMessage);
    await fetch('/api/message', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newMessage)
    });
    broadcastEvent(user, messageEvent);
    localStorage.setItem('messages', JSON.stringify(messages));
    localStorage.setItem('differentUser', false);
    window.location.href = "profile.html";
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

function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    socket.send(JSON.stringify(event));
}

configureWebSocket();
