const form = document.querySelector("form");
const enteredLocation = document.querySelector("#input-text");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let locationName = enteredLocation.value;
  const apiURL = `https://wttr.in/${locationName}?format=j1`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      // api to local here
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

      //default location name if blank
      if (!locationName) {
        locationName = areaName;
      }

      // alternate icons
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
                <p><b>Average temp:</b> ${avgTempF}&deg;F</p>
                <p><b>Max temp: </b>${maxTempF}&deg;F</p>
                <p><b>Min temp:</b> ${minTempF}&deg;F</p>`;
        }
      });

      const forecastArr = ["Today", "Tomorrow", "Day After Tomorrow"];
      for (let i = 0; i < forecastArr.length; i++) {
        const avgTempF = data.weather[i].avgtempF;
        const maxTempF = data.weather[i].maxtempF;
        const minTempF = data.weather[i].mintempF;
        const div = document.querySelectorAll(".forecast div");

        div[i].innerHTML = `<h3>${forecastArr[i]}</h3>
                <p><b>Average temp:</b> ${avgTempF}&deg;F</p>
                <p><b>Max temp: </b>${maxTempF}&deg;F</p>
                <p><b>Min temp:</b> ${minTempF}&deg;F</p>`;
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

//Left SideBar
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
    displayResult.innerHTML = "Insert a temp to convert.";
    return;
  }
  if (choice === "celsius") {
    result = `${convertToFahrenheit(enteredTemp.value).toFixed(2)}&deg;C`;
    displayResult.innerHTML = `${enteredTemp.value}&deg;F --> ${result}.`;
    return;
  }
  if (choice === "fahrenheit") {
    result = `${convertToCelsius(enteredTemp.value).toFixed(2)}&deg;F`;
    displayResult.innerHTML = `${enteredTemp.value}&deg;C --> ${result}.`;
    return;
  }
  displayResult.innerHTML = "Select Celsius or Fahrenheit.";
});

/**
 * fahrenheit from celsius.
 * @param {number} celsius - The temp in celsius.
 * @returns {number} The temp in fahrenheit.
 */

const convertToFahrenheit = (celsius) => ((celsius - 32) * 5) / 9;

/**
 * celsius from fahrenheit.
 * @param {number} fahrenheit - The temp in fahrenheit.
 * @returns {number} The temp in celsius.
 */

const convertToCelsius = (fahrenheit) => (fahrenheit * 9) / 5 + 32;
//All Done
