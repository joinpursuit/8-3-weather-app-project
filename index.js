let cityName = document.querySelector("#input-text");

function fetchWeather(cityName) {
  let apiURL = `https://wttr.in/${cityName}?format=j1`;
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
}
