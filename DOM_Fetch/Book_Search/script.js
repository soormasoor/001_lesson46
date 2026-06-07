const form = document.getElementById("searchForm");
const inputField = document.getElementById("userInput");
const results = document.getElementById("results");

function formatTitle(bookTitle) {
  return bookTitle.toLowerCase().replaceAll(" ", "+");
}

function createBookEntry(title, authorName, firstPublishYear) {
  const res = document.createElement("div");
  res.classList.add("book");
  res.innerHTML = `
  <h2>Title: ${title}</h2>
  <h2>Author: ${authorName}</h2>
  <h2>First Publish Year: ${firstPublishYear}</h2>
  `;

  results.appendChild(res);
}

function createCountElement(num) {
  const res = document.createElement("h2");
  res.id = "res-count";
  res.textContent = `Results Found: ${num}`;

  return res;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputText = inputField.value;
  console.log("Your input:::", inputText);

  const response = await fetch(
    `http://openlibrary.org/search.json?q=${formatTitle(inputText)}`,
  );

  const data = await response.json();

  const books = data.docs;

  for (const { author_name, title, first_publish_year } of books) {
    createBookEntry(title, author_name, first_publish_year);
  }

  results.before(createCountElement(data.num_found));

  console.log("Number found:::", data.numFound);

  inputField.value = "";
});
