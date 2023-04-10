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
    name.innerHTML = `<input type=\"text\" id=\"nameInput\" value=\"${nameTxt}\"></input>`;
    bio.innerHTML = `<input type=\"text\"id=\"bioInput\" value=\"${bioTxt}\"></input>`;
    icon.innerHTML = "<i class=\"bi bi-save\" onclick=\"save(this)\"></i>";
}

function save(icon) {
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let nameTxt = document.getElementById('nameInput').value;
    let bioTxt = document.getElementById('bioInput').value;
    name.innerHTML = `${nameTxt}`;
    bio.innerHTML = `${bioTxt}`;
    document.getElementById('options').removeChild(icon);
}