const yearSpan = document.querySelector("#currentyear");
const lastMod = document.querySelector("#lastModified");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
if (lastMod) {
    lastMod.textContent = `Last Modification: ${document.lastModified}`;
}
