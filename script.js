const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = event.target.location.value;
  return weatherSearch(userInput);
});

const weatherSearch = (location) => {
  fetch("https://wttr.in/" + location + "?format=j1")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
