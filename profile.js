function fill() {
    const favorite = document.getElementById("favorite");
    if (favorite.className === "bi bi-heart") favorite.className = "bi bi-heart-fill";
    else if (favorite.className === "bi bi-heart-fill") favorite.className = "bi bi-heart";
}
