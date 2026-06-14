// DOM
const searchEl = document.getElementById("search");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

// State
const API = "https://ghibliapi.vercel.app/films";
let allFilms = [];
let currentQuery = "";

// Event Listeners
searchEl.addEventListener("input", (event) => {
  currentQuery = event.target.value.toLowerCase();

  const films = currentQuery
    ? allFilms.filter(
        ({ title, director, release_date }) =>
          title.toLowerCase().includes(currentQuery) ||
          director.toLowerCase().includes(currentQuery) ||
          String(release_date).includes(currentQuery),
      )
    : allFilms;

  render(films);
});

async function fetchFilms() {
  statusEl.innerHTML = `<div class="loader">Loading films…</div>`;

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP " + res.status);
    allFilms = await res.json();
    statusEl.textContent = `${allFilms.length} Films`;
    allFilms.sort(
      (a, b) => parseInt(a.release_date) - parseInt(b.release_date),
    );
    render(allFilms);
  } catch (e) {
    statusEl.textContent = "Live API unavailable.";
  }
}

function render(arr) {
  resultsEl.innerHTML =
    '<div id="results">' +
    arr
      .map(
        ({ title, description, director, release_date, image }) => `
    <div class="film-card">
        <img class="thumbnail" src="${image}" alt="Thumbnail image for ${title}" />
        <div class="details">
            <h2 class="title">${title}</h2>
            <p class="description">${description}</p>
        </div>
        <p class="director">Director: ${director}</p>
        <p class="release-date">Release date: ${release_date}</p>
    </div>
    `,
      )
      .join("") +
    "</div>";
}

fetchFilms();
