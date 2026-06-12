// DOM
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// STATE
const BASE_URL = "https://api.restcountries.com/countries/v5";
let currentQuery = "";

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchText = searchInput.value.trim();
  if (!searchText) return;

  currentQuery = `${BASE_URL}?q=${searchText}`;

  console.log(currentQuery);
});
