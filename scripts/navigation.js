const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.innerHTML = isOpen ? "&#10006;" : "&#9776;";
});