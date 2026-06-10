// DOM
const form = document.getElementById("searchForm");
const inputField = document.getElementById("userInput");
const results = document.getElementById("results");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNumbers = document.getElementById("page-numbers");

// State
const BOOKS_PER_PAGE = 100;
let currentPage = 1;
let totalPages = 1;
let currentQuery = "";
let books = [];

function renderBooks() {
  if (books.length === 0) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.innerHTML = books
    .map(
      ({ author_name, title, first_publish_year }) => `
    <div class="book">
      <h2 class="book-title">${title ?? "Unknown title"}</h2>
      <div class="book-info">
        <p>Author: ${author_name ? author_name.join(", ") : "Unknown"}</p>
        <p>First Publish Year: ${first_publish_year ?? "N/A"}</p>
      </div>
    </div>
  `,
    )
    .join("");
}

function renderPagination() {
  pageNumbers.innerHTML = "";

  // Show maximum 7 buttons
  const pages = getPageNumbers(currentPage, totalPages);

  pages.forEach((p) => {
    if (p === "...") {
      const span = document.createElement("span");
      span.textContent = "…";
      span.className = "ellipsis";
      pageNumbers.appendChild(span);
    } else {
      const btn = document.createElement("button");
      btn.textContent = p;
      btn.className = "page-btn" + (p === currentPage ? " active" : "");
      btn.addEventListener("click", () => goToPage(p));
      pageNumbers.appendChild(btn);
    }
  });

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

async function goToPage(page) {
  currentPage = page;

  const url = `https://openlibrary.org/search.json?q=${currentQuery}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();

  books = data.docs;
  renderBooks();
  renderPagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setResultCount(num) {
  let countEl = document.getElementById("res-count");
  if (!countEl) {
    countEl = document.createElement("h2");
    countEl.id = "res-count";
    results.before(countEl);
  }
  countEl.textContent = `Results Found: ${num.toLocaleString()}`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputText = inputField.value.trim();
  if (!inputText) return;

  currentQuery = inputText.toLowerCase().replaceAll(" ", "+");
  currentPage = 1;

  const url = `https://openlibrary.org/search.json?q=${currentQuery}`;
  const response = await fetch(url);
  const data = await response.json();

  const numFound = data.numFound;
  totalPages = Math.ceil(numFound / BOOKS_PER_PAGE);
  books = data.docs;

  setResultCount(numFound);
  renderBooks();
  renderPagination();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) goToPage(currentPage - 1);
});
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) goToPage(currentPage + 1);
});
