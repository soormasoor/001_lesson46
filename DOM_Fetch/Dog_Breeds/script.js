const img = document.querySelector("img");

const select = document.querySelector("select");

select.addEventListener("change", (event) => {
  // const data = fetch(
  //   `https://dog.ceo/api/breed/${event.target.value}/images/random`,
  // );

  console.log(
    "Selected:::",
    event.target.options[event.target.selectedIndex].text,
  );
});
