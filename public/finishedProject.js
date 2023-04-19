const uploadEvent = 'upload';
const messageEvent = 'message';

function toHome() {
    window.location.href = "menu.html";
}

function toProfile(differentUser = false) {
    if (differentUser) {
        localStorage.setItem('chosenUser', user);
        if (localStorage.getItem('chosenUser') === localStorage.getItem('userName')) {
            localStorage.setItem('differentUser', false);
        } else localStorage.setItem('differentUser', true);
    } else localStorage.setItem('differentUser', false);
    window.location.href = "profile.html";
}

function sound(instrument, pitch) {
    var end;
    if (instrument === "Piano") end = ".mp3";
    else end = ".wav";
    return new Audio(instrument + '/' + pitch + end);
}

async function playNote(instrument, pitch, time) {
    if (pitch !== null) {
        const audio = sound(instrument, pitch);
        if (audio.src === "https://startup.crwoffinden.click/Violin/C.wav" || audio.src === "https://startup.crwoffinden.click/Violin/F.wav") audio.currentTime = 0.5;
        else if (audio.src === "https://startup.crwoffinden.click/Violin/E.wav" || audio.src === "https://startup.crwoffinden.click/Violin/F#Gb.wav" || audio.src === 'https://startup.crwoffinden.click/Violin/G#Ab.wav') audio.currentTime = 0.25;
        else audio.currentTime = 0;
        audio.play();
        await delay(time);
        audio.pause();
    }
    else await delay(time);
}

class Note {
    constructor(pitch, length) {
        this.pitch = pitch;
        this.length = length;
    }

    getPitch() {
        return this.pitch;
    }

    getLength() {
        return this.length;
    }
}

class MusicNotes {
    constructor(instrument, notes = [new Note(null, 5)]) {
        this.instrument = instrument;
        this.notes = notes;
    }

    getInstrument() {
        return this.instrument;
    }

    getNotes() {
        return this.notes;
    }

    displayRow(row) {
        let html = "<option value=\"Piano\" ";
        if (this.instrument === "Piano") html += "selected";
        html += ">Piano</option><option value=\"Xylophone\" ";
        if (this.instrument === "Xylophone") html += "selected"; 
        html += ">Xylophone</option><option value=\"Violin\" ";
        if (this.instrument === "Violin") html += "selected"
        html += ">Violin</option></select></td><td><div class=\"instrument-visual\">";
        let k = 0;
        for (let i = 0; i < this.notes.length; ++i) {    
            for (let j = 0; j < this.notes[i].getLength(); j += 0.25) {
                html += "<div class=\"block";
                if (this.notes[i].getPitch() != null) html += " " + this.notes[i].getPitch();
                html += "\"></div>";
                k += 0.25;
            }
        }
        html += "</div></td></tr>";
        return html; 
    }
}

var mySong;
let instruments = [];
var bpm;
var listens;
var user;

function display() {
    let html = "";
    for (let i = 0; i < instruments.length; ++i) {
        html += "<tr class=\"instrument\"><td><select name=\"instrumentSelect\" id=\"select" + i + "\">";
        html += instruments[i].displayRow(i);
    }
    let instrumentTable = document.getElementById("instruments");
    instrumentTable.innerHTML = html;
}

async function playInstrument(instrument, beatsToTime) {
    for (let j = 0; j < instruments[instrument].getNotes().length; ++j) {
        await playNote(instruments[instrument].getInstrument(), instruments[instrument].getNotes()[j].getPitch(), (instruments[instrument].getNotes()[j].getLength() * beatsToTime));
    }
}

async function play() {
    const beatsToTime = (60000 / bpm);
    const playPromises = new Array();
    for (let i = 0; i < instruments.length; ++i) {
        playPromises.push(new Promise((resolve) => {
            playInstrument(i, beatsToTime);
            resolve(true);
        }))
    }
    Promise.all(playPromises);
    mySong.listens += 1;
    await fetch('/api/listens', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(mySong)
    });
}

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

function load() {
    mySongText = localStorage.getItem('selectedSong');
    if (mySongText !== "undefined") {
        mySong = JSON.parse(mySongText);
        for (let i = 0; i < mySong.music.length; ++i) {
            const music = JSON.parse(mySong.music[i]);
            const newNotes = [];
            for (let j = 0; j < music.notes.length; ++j) {
                newNotes.push(new Note(music.notes[j].pitch, Number(music.notes[j].length)))
            }
            const currInstrument = new MusicNotes(music.instrument, newNotes);
            instruments.push(currInstrument);
        }
        document.getElementById('songTitle').value = mySong.title;
        const creator = mySong.creator;
        document.getElementById('creator').innerText = "Created by " + creator;

        
        bpm = mySong.bpm;
        listens = mySong.plays;
        user = creator;
    }
    configureWebSocket();
    display();
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

load();