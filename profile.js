function fill() {
    const favorite = document.getElementById("favorite");
    if (favorite.className === "bi bi-heart") favorite.className = "bi bi-heart-fill";
    else if (favorite.className === "bi bi-heart-fill") favorite.className = "bi bi-heart";
}

function edit(icon) {
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let nameTxt = name.innerText;
    let bioTxt = bio.innerText;
    name.innerHTML = `<input type=\"text\" class=\"name\" value=\"${name}\"></input>`;
    bio.innerHTML = `<input type=\"text\"class=\"bio\" value=\"This is where you tell us about yourself.\"></input>`;
    icon.innerHTML = "<i class=\"bi bi-save\" onclick=\"save(this)\"></i>";
}