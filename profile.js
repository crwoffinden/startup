function fill() {
    const favorite = document.getElementById("favorite");
    favorite.innerHTML = "<i class=\"bi bi-heart-fill\" id=\"favorite\" onclick=\"empty()\"></i>";
}

function empty() {
    const favorite = document.getElementById("favorite");
    favorite.innerHTML = "<i class=\"bi bi-heart\" id=\"favorite\" onclick=\"fill()\"></i>";
}