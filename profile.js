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
    name.innerHTML = `<input type=\"text\" id=\"name\" value=\"${nameTxt}\"></input>`;
    bio.innerHTML = `<input type=\"text\"id=\"bio\" value=\"${bioTxt}\"></input>`;
    icon.innerHTML = "<i class=\"bi bi-save\" onclick=\"save(this)\"></i>";
}

function save(icon) {
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let nameTxt = name.ariaValueMax;
    let bioTxt = bio.ariaValueMax;
    name.innerHTML = `<p id="name">${nameTxt}</p>`;
    bio.innerHTML = `<p id="bio">${bioTxt}</p>`;
    document.removeChild(icon);
}