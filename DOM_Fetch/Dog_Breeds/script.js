const img = document.querySelector("img");

const select = document.querySelector("select");

select.addEventListener("change", async (event) => {
  const response = await fetch(
    `https://dog.ceo/api/breed/${event.target.value}/images/random`,
  );

  const data = await response.json();

  img.src = data.message;

  console.log(data);

  console.log(
    "Selected:::",
    event.target.options[event.target.selectedIndex].text,
  );
});
