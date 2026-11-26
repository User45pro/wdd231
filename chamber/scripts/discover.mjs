import { places } from "../data/places.mjs";

const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuButton.innerHTML = navMenu.classList.contains("open") ? "&times;" : "&#9776;";
  });
}

const yearSpan = document.getElementById("currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
  lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
}

function updateVisitMessage() {
  const messageEl = document.getElementById("visit-message");
  if (!messageEl) {
    return;
  }

  const storageKey = "chamberLastVisit";
  const now = Date.now();
  const previousVisit = localStorage.getItem(storageKey);

  if (!previousVisit) {
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const elapsedMs = now - Number(previousVisit);
    const msPerDay = 86400000;

    if (elapsedMs < msPerDay) {
      messageEl.textContent = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(elapsedMs / msPerDay);
      const dayWord = days === 1 ? "day" : "days";
      messageEl.textContent = `You last visited ${days} ${dayWord} ago.`;
    }
  }

  localStorage.setItem(storageKey, String(now));
}

function renderDiscoverCards() {
  const grid = document.getElementById("discover-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  places.forEach((place, index) => {
    const card = document.createElement("article");
    card.className = `discover-card card-area-${index + 1}`;

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.alt;
    img.width = 300;
    img.height = 200;
    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const desc = document.createElement("p");
    desc.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "learn-more-btn";
    button.textContent = "Learn More";
    button.addEventListener("click", () => {
      button.textContent = button.textContent === "Learn More"
        ? "Included in Chamber Guide"
        : "Learn More";
    });

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(desc);
    card.appendChild(button);

    grid.appendChild(card);
  });
}

updateVisitMessage();
renderDiscoverCards();
