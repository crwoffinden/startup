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
    window.location.href = "upload.html";
}

function addInstrument() {
    instruments.push(new MusicNotes('Instrument'));
    display();
    /*const instruments = document.getElementById("instruments");
    const rowEl = document.createElement('tr');
    rowEl.className = "instrument";
    const menu = document.createElement('td');
    const select = document.createElement('select');
    select.name = "instrumentSelect";
    select.id = "Select";
    const op1 = document.createElement('option');
    const op2 = document.createElement('option');
    const op3 = document.createElement('option');
    const op4 = document.createElement('option');
    const op5 = document.createElement('option');
    op1.innerHTML = "Instrument";
    op2.innerHTML = "Piano";
    op3.innerHTML = "Guitar";
    op4.innerHTML = "Xylophone";
    op5.innerHTML = "Violin";
    select.appendChild(op1);
    select.appendChild(op2);
    select.appendChild(op3);
    select.appendChild(op4);
    select.appendChild(op5);
    menu.appendChild(select);
    rowEl.appendChild(menu);
    const bar = document.createElement('td');
    const visual = document.createElement('div');
    visual.className = "instrument-visual";
    const box = document.createElement('div');
    box.className = "block";
    visual.appendChild(box);
    visual.appendChild(box);
    visual.appendChild(box);
    visual.appendChild(box);
    visual.appendChild(box);
    bar.appendChild(visual);
    rowEl.appendChild.bar;
    instruments.appendChild(rowEl);*/
}

function addBox() {
    const instruments = document.getElementById('instruments');
    const rows = instruments.getElementsByTagName('tr');
    const numRows = rows.length - 1;
    for (i = 0; i < numRows; ++i) {
        const currBar  = rows[i].getElementById('instrument-visual');
        const box = document.createElement('div');
        box.className = 'block';
        currBar.appendChild(box);
    }
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
    if (time > 10000) time = 10000;
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

    addNote(position, newNote) {
        var alteredNote;
        let length = 0;
        let buffer = 0;
        let i = 0;
        alteredNote = this.notes[i];
        while (length < position) {
            alteredNote = this.notes[i];
            buffer = length;
            length += alteredNote.getLength();
            ++i;
        }
        if (i > 0) --i;
        let notePosition = position - buffer;
        let alteredLength = alteredNote.getLength() - notePosition;
        let j = i;
        while (alteredLength < newNote.getLength() && j < (this.notes.length - 1)) {
            ++j;
            alteredNote = this.notes[j];
            alteredLength += alteredNote.getLength();
        }
        if (alteredLength < newNote.getLength()) {
            this.notes.push(new Note(null, (newNote.getLength() - alteredLength + 1)));
            alteredLength = newNote.getLength() * 1 + 1;
            ++j;
        }
        alteredLength += notePosition;
        let replacedNotes = this.notes.slice(i, (j + 1));
        const newNotes = split(notePosition, replacedNotes, newNote, alteredLength);
        this.notes.splice(i, replacedNotes.length, ...newNotes);
        /*const newNotes = splitFront(notePosition, alteredNote, newNote);
        if (newNotes.length < 3) {
            
            let count = 1;
            let j = i + 1;
            while (alteredLength < newNote.getLength()) {
                ++j;
                alteredNote = this.notes[j];
                buffer = alteredLength;
                alteredLength += alteredNote.getLength();
                count += 1;
            }
            if (alteredLength !== newNote.getLength()) {
                notePosition = newNote.getLength() - buffer;
                newNotes.push(splitEnd(notePosition, alteredNote))
            }
        }
        if (newNotes.length === 3) {
            this.notes.splice(i, 1, newNotes[0], newNotes[1], newNotes[2]);
        } else {
            this.notes.splice(i, count, newNotes[0], newNotes[1]);
        }*/

        if (this.notes[this.notes.length - 1].getPitch() !== null) this.notes.push(new Note(null, 1));
        display();
    }

    display(row) {
        let html = "<td><div class=\"instrument-visual\">";
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

const instruments = [new MusicNotes('Instrument')];

function display() {
    let html = "";
    for (let i = 0; i < instruments.length; ++i) {
        html += "<tr class=\"instrument\"><td><select name=\"instrumentSelect\" id=\"select\"><option>Instrument</option><option>Piano</option><option>Guitar</option><option>Xylophone</option><option>Violin</option></select></td>";
        html += instruments[i].display(i);
    }
    html += "<tr class=\"instrument\"><td>Add Instrument<i class=\"bi bi-plus-lg\" onclick=\"addInstrument()\"></i></td></tr>";
    let instrumentTable = document.getElementById("instruments");
    instrumentTable.innerHTML = html;
}

var start;

var end;

