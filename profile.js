function fill() {
    const favorite = document.getElementById("favorite");
    favorite.className = "bi bi-heart-fill"; 
    favorite.onclick = "empty()";
}

function empty() {
    const favorite = document.getElementById("favorite");
    favorite.className = "bi bi-heart";
    favorite.onclick = "fill()";
}