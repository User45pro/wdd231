// Puebla Chamber of Commerce - Join Page Script

const menuBtn = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuBtn.innerHTML = navMenu.classList.contains("open") ? "&times;" : "&#9776;";
  });
}

const currentYear = document.querySelector("#currentyear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");
if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// Set hidden timestamp on page load
const timestampField = document.querySelector("#timestamp");
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// Dialog Modals Functionality
const modalButtons = document.querySelectorAll(".modal-btn");
const closeButtons = document.querySelectorAll(".modal-close-btn");
const dialogs = document.querySelectorAll("dialog");

modalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    const targetModal = document.querySelector(`#${modalId}`);
    if (targetModal) {
      targetModal.showModal();
    }
  });
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const dialog = btn.closest("dialog");
    if (dialog) {
      dialog.close();
    }
  });
});

// Close dialog when clicking outside on backdrop
dialogs.forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});
