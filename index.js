const form = document.querySelector("form");
const enteredLocation = document.querySelector("#input-text");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName = enteredLocation.value;
  let apiURL = `https://wttr.in/${cityName}?format=j1`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
