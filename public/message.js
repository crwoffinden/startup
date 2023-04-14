//const { addMessage } = require("../database");

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
    localStorage.setItem('messages', JSON.stringify(messages));
    localStorage.setItem('differentUser', false);
    window.location.href = "profile.html";
}