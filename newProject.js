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