function toProfile() {
    localStorage.setItem('differentUser', false);
    window.location.href = "profile.html";
}

function newProject() {
    localStorage.setItem("selectedSong", undefined)
    window.location.href = "newProject.html";
}

function myProjects() {
    window.location.href = "myProjects.html";
}

function whatsHot() {
    window.location.href = "whatsHot.html";
}