const form = document.querySelector("form");
const enteredLocation = document.querySelector("#input-text");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let locationName = enteredLocation.value;
  const apiURL = `https://wttr.in/${locationName}?format=j1`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      // write data from api to local variables for current conditions
      const current = document.querySelector(".current");
      const areaName = data.nearest_area[0].areaName[0].value;
      const locationRegion = data.nearest_area[0].region[0].value;
      const locationCountry = data.nearest_area[0].country[0].value;
      const locationFeelsLike = data.current_condition[0].FeelsLikeF;
      const chanceOfSunshine = Number(
        data.weather[0].hourly[0].chanceofsunshine
      );
      const chanceOfRain = Number(data.weather[0].hourly[0].chanceofrain);
      const chanceOfSnow = Number(data.weather[0].hourly[0].chanceofsnow);

      // assign area name to location name if blank
      if (!locationName) {
        locationName = areaName;
      }

      // update icon
      let image;
      if (chanceOfSunshine > 50) {
        image = `<img class="icon" alt="sun" src="./assets/icons8-summer.gif">\n`;
      } else if (chanceOfRain > 50) {
        image = `<img class="icon" alt="rain" src="./assets/icons8-torrential-rain.gif">\n`;
      } else if (chanceOfSnow > 50) {
        image = `<img class="icon" alt="snow" src="./assets/icons8-light-snow.gif">\n`;
      } else {
        image = `<img class="icon" alt="night" src="./assets/icons8-night.gif">\n`;
      }

      if (locationName !== areaName) {
        areaLabel = "Nearest Area";
      } else {
        areaLabel = "Area";
      }

      const weatherOutput = `${image}
      <h2>${locationName}</h2>
        <p><b>${areaLabel}:</b> ${areaName}</p> <p><b>Region:</b> ${locationRegion}</p> 
        <p><b>Country:</b> ${locationCountry}</p> 
        <p><b>Currently:</b> Feels Like ${locationFeelsLike}&deg;F</p>
        <p><b>Chance of Sunshine:</b> ${chanceOfSunshine}%</p>
        <p><b>Chance of Rain:</b> ${chanceOfRain}%</p>
        <p><b>Chance of Snow:</b> ${chanceOfSnow}%</p>`;

      current.innerHTML = weatherOutput;

      const li = document.createElement("li");
      const noResults = document.getElementById("no-results");
      noResults.innerHTML = "";
      li.innerHTML = `<a href="#">${locationName}</a> - ${locationFeelsLike}°F`;
      document.querySelector("ul").append(li);

      li.addEventListener("click", (event) => {
        current.innerHTML = weatherOutput;

        const forecastArr = ["Today", "Tomorrow", "Day After Tomorrow"];

        for (let i = 0; i < forecastArr.length; i++) {
          const avgTempF = data.weather[i].avgtempF;
          const maxTempF = data.weather[i].maxtempF;
          const minTempF = data.weather[i].mintempF;
          const div = document.querySelectorAll(".forecast div");
          div[i].innerHTML = `<h3>${forecastArr[i]}</h3>
                <p><b>Average Temperature:</b> ${avgTempF}&deg;F</p>
                <p><b>Max Temperature: </b>${maxTempF}&deg;F</p>
                <p><b>Min Temperature:</b> ${minTempF}&deg;F</p>`;
        }
      });

      const forecastArr = ["Today", "Tomorrow", "Day After Tomorrow"];
      for (let i = 0; i < forecastArr.length; i++) {
        const avgTempF = data.weather[i].avgtempF;
        const maxTempF = data.weather[i].maxtempF;
        const minTempF = data.weather[i].mintempF;
        const div = document.querySelectorAll(".forecast div");

        div[i].innerHTML = `<h3>${forecastArr[i]}</h3>
                <p><b>Average Temperature:</b> ${avgTempF}&deg;F</p>
                <p><b>Max Temperature: </b>${maxTempF}&deg;F</p>
                <p><b>Min Temperature:</b> ${minTempF}&deg;F</p>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  event.target.reset();
});

const enteredTemp = document.querySelector("#temp-to-convert");
const toC = document.querySelector("#to-c");
const toF = document.querySelector("#to-f");
const displayResult = document.querySelector("#displayResult");
let choice = null;

toC.addEventListener("click", (event) => {
  choice = "celsius";
});

toF.addEventListener("click", (event) => {
  choice = "fahrenheit";
});

convertTemp.addEventListener("submit", (event) => {
  event.preventDefault();

  let result = 0;

  if (!enteredTemp.value) {
    displayResult.innerHTML =
      "No temperature found. Enter a temperature to convert.";
    return;
  }
  if (choice === "celsius") {
    result = `${convertToFahrenheit(enteredTemp.value).toFixed(2)}&deg;C`;
    displayResult.innerHTML = `${enteredTemp.value}&deg;F is ${result}.`;
    return;
  }
  if (choice === "fahrenheit") {
    result = `${convertToCelsius(enteredTemp.value).toFixed(2)}&deg;F`;
    displayResult.innerHTML = `${enteredTemp.value}&deg;C is ${result}.`;
    return;
  }
  displayResult.innerHTML = "No choice made. Choose Celsius or Fahrenheit.";
});

/**
 * Converts a temperature to fahrenheit from celsius.
 * @param {number} celsius - The temperature in celsius.
 * @returns {number} The temperature in fahrenheit.
 */

const convertToFahrenheit = (celsius) => ((celsius - 32) * 5) / 9;

/**
 * Converts a temperature to celsius from fahrenheit.
 * @param {number} fahrenheit - The temperature in fahrenheit.
 * @returns {number} The temperature in celsius.
 */

const convertToCelsius = (fahrenheit) => (fahrenheit * 9) / 5 + 32;

const taglines = [
  "Why go outside when you can use the internet?",
  "Because going outside is overrated.",
  "Because you don't want to forget your umbrella.",
  "Because you haven't left the house in two years.",
  "Because you don't want to get sunburnt again.",
  "You weren't going out anyway.",
  "All the weather without the man.",
  "Rainy days and Mondays always get me down.",
  "You can't have a rainbow without the rain.",
  "I'd rather be dry, but at least I'm alive. Rain on me."
];

const tagline = document.getElementById("tagline");
const randomTagline = Math.floor(Math.random() * taglines.length);
tagline.textContent = taglines[randomTagline];
