function select(chosen) {
    const old = document.getElementById("current");
    if (old !== chosen) {
        chosen.id = "current";
        old.id = "";
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

class block {
    constructor(pitch, length) {
        this.pitch = pitch;
        this.length = length;
    }
}

function pressAndHold(button) {
    var time;
    let start = 0;
    $(button).mousedown(function() {start = new Date();});
    $(button).mouseup(function() {
        let end = new Date();
        time = end - start;
        if (time > 10000) time = 10000;
        time = time / 1000.0
    })
    document.getElementById('length-input').value = time;
}

function addBlock() {
    const block = createBlock();
}

function createBlock() {
    const block = new block(document.getElementById('current').className, document.getElementById('length-input').value);
    return block;
}


