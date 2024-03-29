const uploadEvent = 'upload';
const messageEvent = 'message';

async function upload() {
    const creator = localStorage.getItem('userName');
    const title = document.getElementById("song-title").value;
    const description = document.getElementById('song-description').value;
    const date = new Date();
    const bpm = localStorage.getItem('bpm');
    const musicText = localStorage.getItem('music');
    const music = JSON.parse(musicText);
    const newSong = {creator: creator, title: title, description: description, date: date, bpm: bpm, music: music, listens: 0};
    let finishedSongs = [];
    let finishedSongsText = localStorage.getItem('finishedSongs');
    if (finishedSongsText) finishedSongs = JSON.parse(finishedSongsText);
    finishedSongs.unshift(newSong);

    localStorage.setItem("finishedSongs", JSON.stringify(finishedSongs));
    await fetch('/api/songs', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newSong)
    });
    broadcastEvent(creator, uploadEvent);
    const editingSongText = localStorage.getItem('editingSong');
    const editingSong = JSON.parse(editingSongText);
    let unfinishedSongs = [];
    if (editingSong) {
        const unfinishedSongsText = localStorage.getItem('unfinishedSongs');
        if (unfinishedSongsText) unfinishedSongs = JSON.parse(unfinishedSongsText);
        unfinishedSongs.shift();
    }
    localStorage.setItem('unfinishedSongs', JSON.stringify(unfinishedSongs));
    window.location.href = "myProjects.html";
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
    const chatText = document.getElementById('chatMessages');
    for (const chat of chatText) {
        const chatTextMessage = chat.innerHTML;
        chat.innerHTML =
      `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatTextMessage;
    }
    localStorage.setItem('chatText', )
}

function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    socket.send(JSON.stringify(event));
}

function startScreen() {
    let title = localStorage.getItem('title');
    document.getElementById('song-title').value = title;
    configureWebSocket();
}
 
var socket;

startScreen();