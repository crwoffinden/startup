function toHome() {
    window.location.href = "menu.html";
}

function select(chosen) {
    const old = document.getElementById("icon-current");
    if (old !== chosen) {
        chosen.id = "icon-current";
        old.id = "icon";
    }
}

function toProfile() {
    window.location.href = "profile.html";
}

function toUpload() {
    localStorage.setItem("url", window.location.href);
    localStorage.setItem('title', JSON.stringify(getElementById('songTitle').value));
    window.location.href = "upload.html";
}

function save() {

}

function addInstrument() {
    instruments.push(new MusicNotes('Piano'));
    display();
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

function lift() {
    end = new Date;
    setTime();
}

function press() {
    start = new Date();
}

function setTime() {
    let time = end - start;
    if (time > 2000) time = 2000;
    const bpm = document.getElementById('bpm').value;
    let beats = time * bpm / 60000;
    let length = document.getElementById('length-input');
    beats = Math.round(beats * 4) / 4;
    length.value = (beats);
}

function addNote(row, position) {
    const instrument = instruments[row];
    const newNote = new Note(document.getElementById('icon-current').className, document.getElementById('length-input').value);
    instrument.addNote(position, newNote);
}

function split(position, oldNotes, newNote, fullLength) {
    const firstNote = new Note(oldNotes[0].getPitch(), position);
    const lastNote = new Note(oldNotes[oldNotes.length - 1].getPitch(), (fullLength - ((position * 1) + (newNote.getLength() * 1))));
    const newNotes = [];
    if (firstNote.getLength() !== 0) newNotes.push(firstNote);
    newNotes.push(newNote);
    if (lastNote.getLength() !== 0) newNotes.push(lastNote);
    return newNotes;
}

class MusicNotes {
    notes = [new Note(null, 5)];
    constructor(instrument) {
        this.instrument = instrument;        
    }

    changeInstrument(row) {
        const newInstrument = document.getElementById('select' + row);
        this.instrument = newInstrument.options[newInstrument.selectedIndex].text;
    }

    getInstrument() {
        return this.instrument;
    }

    getNotes() {
        return this.notes;
    }

    adjust(length) {
        this.notes.push(new Note(null, length));
    }

    addNote(position, newNote) {
        var alteredNote;
        let length = 0;
        let buffer = 0;
        let i = 0;
        alteredNote = this.notes[i];
        while (length < position) {
            alteredNote = this.notes[i];
            buffer = length;
            length += (alteredNote.getLength() * 1);
            ++i;
        }
        if (i > 0) --i;
        let notePosition = position - buffer;
        let alteredLength = alteredNote.getLength() - notePosition;
        let j = i;
        while (alteredLength < newNote.getLength() && j < (this.notes.length - 1)) {
            ++j;
            alteredNote = this.notes[j];
            alteredLength += (alteredNote.getLength() * 1);
        }
        if (alteredLength < newNote.getLength()) {
            adjustAll(newNote.getLength() - alteredLength + 1);
            alteredLength = newNote.getLength() * 1 + 1;
            ++j;
        }
        alteredLength += notePosition;
        let replacedNotes = this.notes.slice(i, (j + 1));
        const newNotes = split(notePosition, replacedNotes, newNote, alteredLength);
        this.notes.splice(i, replacedNotes.length, ...newNotes);
        
        if (this.notes[this.notes.length - 1].getPitch() !== null) this.notes.push(new Note(null, 1));
        display();
    }

    display(row) {
        let html = "<option value=\"Piano\" ";
        if (this.instrument === "Piano") html += "selected";
        html += ">Piano</option><option value=\"Xylophone\" "
        if (this.instrument === "Xylophone") html += "selected"; 
        html += ">Xylophone</option><option value=\"Violin\" ";
        if (this.instrument === "Violin") html += "selected"
        html += ">Violin</option></select></td><td><div class=\"instrument-visual\">";
        let k = 0;
        for (let i = 0; i < this.notes.length; ++i) {    
            for (let j = 0; j < this.notes[i].getLength(); j += 0.25) {
                html += "<div class=\"block";
                if (this.notes[i].getPitch() != null) html += " " + this.notes[i].getPitch();
                html += "\" onclick=\"addNote(" + row  + ", " + k + ")\"></div>";
                k += 0.25;
            }
        }
        html += "</div></td></tr>";
        return html; 
    }
}

const instruments = [new MusicNotes('Piano')];

function changeInstrument(row) {
    instruments[row].changeInstrument(row);
}

function adjustAll(length) {
    for (let i = 0; i < instruments.length; ++i) {
        instruments[i].adjust(length);
    }
}

function display() {
    let html = "";
    for (let i = 0; i < instruments.length; ++i) {
        html += "<tr class=\"instrument\"><td><select name=\"instrumentSelect\" id=\"select" + i + "\" onchange=\"changeInstrument(" + i + ")\">";
        html += instruments[i].display(i);
    }
    html += "<tr class=\"instrument\"><td>Add Instrument<i class=\"bi bi-plus-lg\" onclick=\"addInstrument()\"></i></td></tr>";
    let instrumentTable = document.getElementById("instruments");
    instrumentTable.innerHTML = html;
}

async function playInstrument(instrument, beatsToTime) {
    for (let j = 0; j < instruments[instrument].getNotes().length; ++j) {
        await playNote(instruments[instrument].getInstrument(), instruments[instrument].getNotes()[j].getPitch(), (instruments[instrument].getNotes()[j].getLength() * beatsToTime));
    }
}

function play() {
    const beatsToTime = (60000 / document.getElementById('bpm').value);
    const playPromises = new Array();
    for (let i = 0; i < instruments.length; ++i) {
        playPromises.push(new Promise((resolve) => {
            playInstrument(i, beatsToTime);
            resolve(true);
        }))
    }
    Promise.all(playPromises);
}

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

var start;

var end;

