function formatTitle(bookTitle) {
  return bookTitle.toLowerCase().replaceAll(" ", "+");
}

const form = document.getElementById("searchForm");
const inputField = document.getElementById("userInput");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputText = inputField.value;
  console.log("Your input:::", inputText);

  const response = await fetch(
    `http://openlibrary.org/search.json?q=${formatTitle(inputText)}`,
  );

  const data = await response.json();

  console.log("Number found:::", data.numFound);

  inputField.value = "";
});
