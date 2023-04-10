function postMessage() {
    const message = document.getElementById('message').value;
    const date = new Date().toLocaleDateString();
    let messagesText = localStorage.getItem('messages');
    let messages = JSON.parse(messagesText);
    const newMessage = { message: message, date: date };
    messages.splice[0, 0, newMessage];
    localStorage.setItem('messages', JSON.stringify(messages));
    window.location.href = "profile.html";
}