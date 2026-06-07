function separateSubbreed(breedName) {
  const idx = breedName.indexOf("-");
  return `${breedName.slice(0, idx)}/${breedName.slice(idx + 1)}`;
}

const img = document.querySelector("img");

const select = document.querySelector("select");

select.addEventListener("change", async (event) => {
  let breed = event.target.value;

  if (breed.includes("-")) {
    breed = separateSubbreed(breed);
  }

  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`,
  );

  const data = await response.json();

  img.src = data.message;

  console.log(data);

  console.log(
    "Selected:::",
    event.target.options[event.target.selectedIndex].text,
  );
});
