const menuBtn = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});
