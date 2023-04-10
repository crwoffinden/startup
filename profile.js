function fill() {
    const favorite = document.getElementById("favorite");
    if (favorite.className === "bi bi-heart") favorite.className = "bi bi-heart-fill";
    else if (favorite.className === "bi bi-heart-fill") favorite.className = "bi bi-heart";
}

function edit(icon) {
    let details = document.getElementById('editable');
    let name = details.getElementsByTagName('p')[0];
    let bio = details.getElementsByTagName('p')[1];
    details.innerHTML = "<span><input type=\"text\" class=\"name\" value=\"${name}\"></input></span><span><input type=\"text\"class=\"bio\" value=\"This is where you tell us about yourself.\"></input></span>";
    icon.innerHTML = "<i class=\"bi bi-save\" onclick=\"save(this)\"></i>";
}