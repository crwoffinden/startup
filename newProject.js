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
    const instruments = document.getElementById("instruments");
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
    instruments.appendChild(rowEl);
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

class note {
    constructor(pitch, length) {
        this.pitch = pitch;
        this.length = length;
    }

    getLength() {
        return this.length;
    }
    
    split(position, newNote) {
        const firstNote = new note(this.pitch, position);
        const newNotes = [firstNote, newNote];
        if (newNote.getLength() + position < this.length) {
            const lastNote = new note(this.pitch, (this.length - (newNote.getLength() + position)));
            newNotes.push(lastNote);
        }
        return newNotes;
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

function addBlock() {
    const block = createBlock();
}

function createBlock() {
    const block = new block(document.getElementById('current').className, document.getElementById('length-input').value);
    return block;
}

function addNote(instrument, position) {
    const newNote = new Note(document.getElementById('icon-current').className, document.getElementById('length-input').value);
    intstrument.addNote(position, newNote) = instrument.getNotes
}

class musicNotes {
    constructor() {
        notes[1];
        notes[0] = new Note(null, 5);
    }

    addNote(position, newNote) {
        var alteredNote
        let length = 0;
        let buffer = 0;
        let i = 0;
        while (length < position) {
            alteredNote = this.notes[i];
            buffer = length;
            length += alteredNote.getLength;
            ++i;
        }
        i -= 1;
        const newNotes = alteredNote.split(buffer, newNote);
        if (newNotes.length === 3) {
            this.notes.splice(i, 1, newNotes[0], newNotes[1], newNotes[2]);
        } else {
            this.notes.splice(i, 1, newNotes[0], newNotes[1]);
        }
    }
}

var start;

var end;

