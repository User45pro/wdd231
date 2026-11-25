// Puebla Chamber of Commerce - Home Page Script

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

function getWeatherDescription(code) {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Light Rain";
  if (code <= 82) return "Rain Showers";
  return "Thunderstorms";
}

async function loadWeather() {
  const currentTemp = document.querySelector("#current-temp");
  const weatherDesc = document.querySelector("#weather-desc");
  const weatherHighLow = document.querySelector("#weather-high-low");
  const forecastContainer = document.querySelector("#forecast-container");

  const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=19.0414&longitude=-98.2063&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=4&timezone=America%2FMexico_City";

  try {
    const res = await fetch(weatherUrl);
    if (!res.ok) throw new Error("Weather request failed");
    const data = await res.json();

    const temp = Math.round(data.current.temperature_2m);
    const desc = getWeatherDescription(data.current.weather_code);
    const hum = data.current.relative_humidity_2m;
    const max = Math.round(data.daily.temperature_2m_max[0]);
    const min = Math.round(data.daily.temperature_2m_min[0]);

    currentTemp.textContent = `${temp}°C`;
    weatherDesc.textContent = desc;
    weatherHighLow.textContent = `High: ${max}°C | Low: ${min}°C | Humidity: ${hum}%`;

    if (forecastContainer) {
      forecastContainer.innerHTML = "";
      for (let i = 1; i <= 3; i++) {
        const dateStr = data.daily.time[i];
        const dateObj = new Date(`${dateStr}T12:00:00`);
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
        const dayMax = Math.round(data.daily.temperature_2m_max[i]);

        const dayDiv = document.createElement("div");
        dayDiv.classList.add("forecast-day");
        dayDiv.innerHTML = `<p>${dayName}</p><p>${dayMax}°C</p>`;
        forecastContainer.appendChild(dayDiv);
      }
    }
  } catch (err) {
    console.error("Weather error:", err);
  }
}

async function loadSpotlights() {
  const container = document.querySelector("#spotlights-container");
  if (!container) return;

  try {
    const res = await fetch("data/members.json");
    const members = await res.json();

    const eligible = members.filter(
      (m) => m.membershipLevel === 3 || m.membershipLevel === 2 || m.membershipLevel === "Gold" || m.membershipLevel === "Silver"
    );

    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    container.innerHTML = "";
    selected.forEach((m) => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      const img = document.createElement("img");
      img.src = m.image;
      img.alt = `${m.name} logo`;

      const title = document.createElement("h4");
      title.textContent = m.name;

      const level = document.createElement("p");
      level.style.fontWeight = "600";
      level.style.fontSize = "0.85rem";
      const isGold = m.membershipLevel === 3 || m.membershipLevel === "Gold";
      level.textContent = isGold ? "Gold Member" : "Silver Member";

      const phone = document.createElement("p");
      phone.textContent = m.phone;

      const address = document.createElement("p");
      address.textContent = m.address;

      const link = document.createElement("a");
      link.href = m.website;
      link.target = "_blank";
      link.textContent = "Visit Website";

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(level);
      card.appendChild(phone);
      card.appendChild(address);
      card.appendChild(link);

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading spotlights:", err);
  }
}

loadWeather();
loadSpotlights();
