// Puebla Chamber of Commerce - Thank You Page Script

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

// Extract GET query parameters using URLSearchParams
const params = new URLSearchParams(window.location.search);
const detailsContainer = document.querySelector("#thankyou-details");

if (detailsContainer) {
  const fname = params.get("fname") || "N/A";
  const lname = params.get("lname") || "N/A";
  const title = params.get("title") || "N/A";
  const email = params.get("email") || "N/A";
  const phone = params.get("phone") || "N/A";
  const organization = params.get("organization") || "N/A";
  const membershipRaw = params.get("membership") || "N/A";
  const levelNames = { np: "Non-Profit (NP)", bronze: "Bronze", silver: "Silver", gold: "Gold" };
  const membership = levelNames[membershipRaw] || membershipRaw;
  const description = params.get("description") || "No description provided";
  const timestampRaw = params.get("timestamp");

  let formattedDate = "N/A";
  if (timestampRaw) {
    try {
      const dateObj = new Date(timestampRaw);
      formattedDate = dateObj.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short"
      });
    } catch (e) {
      formattedDate = timestampRaw;
    }
  }

  detailsContainer.innerHTML = `
    <p><strong>Applicant Name:</strong> ${fname} ${lname}</p>
    <p><strong>Organizational Title:</strong> ${title}</p>
    <p><strong>Business / Organization:</strong> ${organization}</p>
    <p><strong>Email Address:</strong> ${email}</p>
    <p><strong>Phone Number:</strong> ${phone}</p>
    <p><strong>Selected Membership:</strong> ${membership} Level</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Application Submitted At:</strong> ${formattedDate}</p>
  `;
}
