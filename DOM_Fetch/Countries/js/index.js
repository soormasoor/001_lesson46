// DOM
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mainPageContent = document.getElementById("main-page-content");

// State
const BASE_URL = "https://api.restcountries.com/countries/v5";
const API_KEY = "rc_live_fcdb8e3d69be45ae8bdca23e75f1649c";
let currentQuery =
  "https://api.restcountries.com/countries/v5?api-key=rc_live_fcdb8e3d69be45ae8bdca23e75f1649c";

// Helper Functions
function formatQuery(str) {
  if (typeof str !== "string") {
    return "";
  }

  return str.trim().toLowerCase();
}

async function getCountry() {
  const response = await fetch(currentQuery);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

async function renderCountry(data) {
  const commonName = data.data.objects[0].names.common;
  const capital = data.data.objects[0].capitals[0].name;
  const flagURL = data.data.objects[0].flag["url_svg"];

  mainPageContent.innerHTML = `
    <section id="main-page-content">
      <h2 id="country-name">
        ${commonName}
      </h2>
      <p id="capital-name">Capital: ${capital}</p>
      ${
        flagURL
          ? `
        <div id="flag-div">
          <p id="flag-p">Official flag</p>
          <img id="flag" src="${flagURL}" alt="Flag of ${commonName}" />
        </div>
        `
          : ""
      }
    </section>
  `;
}

// Event Listeners
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const searchText = formatQuery(searchInput.value);

    if (!searchText) return;

    currentQuery = `${BASE_URL}?q=${searchText}&api-key=${API_KEY}`;

    console.log(currentQuery);

    const data = await getCountry();

    renderCountry(data);
  } catch (error) {
    console.error(error);
  }

  searchInput.value = "";
});
