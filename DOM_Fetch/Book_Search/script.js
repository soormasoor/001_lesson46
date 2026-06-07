function formatTitle(bookTitle) {
  return bookTitle.toLowerCase().replaceAll(" ", "+");
}

const form = document.getElementById("searchForm");
const inputField = document.getElementById("userInput");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputText = inputField.value;
  console.log("Your input:::", inputText);

  inputField.value = "";
});
