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
    window.location.href = "upload.html";
}

function addInstrument() {
    const instruments = document.getElementById("instruments");
    instruments.innerHTML = "<tr class=\"instrument\">\n<select name=\"instrumentSelect\" id=\"select\">\n<option>Instrument</option>\n<option>Piano</option>\n<option>Guitar</option>\n<option>Xylophone</option>\n<option>Violin</option>\n</select>\n<div class=\"instrument-visual\">PLACEHOLDER</div> <!--Fix CSS--></tr>";
}