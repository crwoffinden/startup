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
    select.appendChild(op4)
    select.appendChild(op5);
    rowEl.appendChild(select);
    instruments.appendChild(rowEl);
    
}