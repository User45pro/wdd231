// Puebla Chamber of Commerce - Directory Page Script

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

const membersContainer = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function getMembershipLabel(level) {
  if (level === 3 || level === "Gold") return { text: "Gold Member", cls: "tag-gold" };
  if (level === 2 || level === "Silver") return { text: "Silver Member", cls: "tag-silver" };
  return { text: "Member", cls: "tag-member" };
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    const img = document.createElement("img");
    img.src = member.image;
    img.alt = `${member.name} logo`;

    const name = document.createElement("h3");
    name.textContent = member.name;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.textContent = "Visit Website";

    const levelInfo = getMembershipLabel(member.membershipLevel);
    const tag = document.createElement("span");
    tag.classList.add("membership-tag", levelInfo.cls);
    tag.textContent = levelInfo.text;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(tag);

    membersContainer.appendChild(card);
  });
}

if (gridBtn && listBtn) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });
}

getMembers();
