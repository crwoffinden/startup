function fill() {
    const favorite = document.getElementById("favorite");
    if (favorite.className === "bi bi-heart") favorite.className = "bi bi-heart-fill";
    else if (favorite.className === "bi bi-heart-fill") favorite.className = "bi bi-heart";
}

function edit(icon) {
    details = document.getElementById('editable');
    details.innerHTML = "<input type=\"text\" class=\"name\">Firstname Lastname</input><input type=\"text\"class=\"bio\">This is where you tell us about yourself.</input>";
    icon.innerHTML = "<i class=\"bi bi-save\" onclick=\"save(this)\"></i>";
}