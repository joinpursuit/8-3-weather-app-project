let BASE_URL = `https://wttr.in/`;
const form = document.querySelector("form");
const results = document.querySelector(".results");
const article1 = document.getElementById("article1");
const article2 = document.getElementById("article2");
const article3 = document.getElementById("article3");
const sectionContent = document.getElementById("choose-location");
const newParagraph = document.createElement("p");
const sideBarList = document.querySelector(".search-list");
const temperatureUnitF = "°F";
const hidden = document.querySelectorAll(".hidden");
const locationSearch = document.getElementById("location");
const conversionForm = document.querySelector(".conversion");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { location } = event.target;
  getlocation(location.value);
  hidden.forEach((item) => item.remove());
});

//created a helper function for my form to make a dynamic URL
function getlocation(input) {
  fetch(`${BASE_URL}${input}?format=j1`)
    .then((Response) => Response.json())
    .then((data) => {
      currentWeather(data);
      weatherForecast(data);
      previousSearches(data);
      weatherConditions(data);
      locationSearch.value = "";
    })
    .catch((error) => {
      console.log(error);
    });
}

//creating HTML elements for the API data to be displayed on the webpage. These are the main weather results for the location input
function currentWeather(data) {
  document
    .querySelectorAll(".firstHeading")
    .forEach((item) => (item.textContent = ""));

  let areaName = document.createElement("h2");
  areaName.setAttribute("class", "firstHeading");
  areaName.innerHTML = `<strong>${locationSearch.value}</strong>`;
  results.append(areaName);

  //   let headingName = document.createElement("h2");
  //   headingName.setAttribute("class", "firstHeading");
  //   headingName.innerHTML = `<strong>${data.nearest_area[0].areaName[0].value}</strong>`;
  //   results.append(headingName);

  let regionName = document.createElement("p");
  regionName.setAttribute("class", "firstHeading");
  regionName.innerHTML = `<strong>Region:</strong> ${data.nearest_area[0].region[0].value}`;
  results.append(regionName);

  let countryName = document.createElement("p");
  countryName.setAttribute("class", "firstHeading");
  countryName.innerHTML = `<strong>Country:</strong> ${data.nearest_area[0].country[0].value}`;
  results.append(countryName);

  let currentTemperatureF = document.createElement("p");
  currentTemperatureF.setAttribute("class", "firstHeading");
  currentTemperatureF.innerHTML = `<strong>Currently Feels Like:</strong> ${data.current_condition[0].FeelsLikeF} ${temperatureUnitF}`;
  results.append(currentTemperatureF);

  let area = document.createElement("p");
  area.setAttribute("class", "firstHeading");
  area.innerHTML = `<strong>Area:</strong>${locationSearch.value}`;
  results.append(area);

  let nearestArea = document.createElement("p");
  nearestArea.setAttribute("class", "firstHeading");
  nearestArea.innerHTML = `<strong>Nearest Area:</strong>${data.nearest_area[0].areaName[0].value}`;
  results.append(nearestArea);
}

function weatherForecast(data) {
  const todaysWeather = {
    "Average Temp": `${data.weather[0].avgtempF}`,
    "Max Temp": `${data.weather[0].maxtempF}`,
    "Min Temp": `${data.weather[0].mintempF}`,
  };

  const tomorrowsWeather = {
    "Average Temp": `${data.weather[1].avgtempF}`,
    "Max Temp": `${data.weather[1].maxtempF}`,
    "Min Temp": `${data.weather[1].mintempF}`,
  };

  const dayAfterTomorrowsWeather = {
    "Average Temp": `${data.weather[2].avgtempF}`,
    "Max Temp": `${data.weather[2].maxtempF}`,
    "Min Temp": `${data.weather[2].mintempF}`,
  };

  document.querySelector("#article1").innerHTML = "<h3>Today</h3>";
  document.querySelector("#article2").innerHTML = "<h3>Tomorrow</h3>";
  document.querySelector("#article3").innerHTML = "<h3>Day After Tomorrow</h3>";

  for (const property in todaysWeather) {
    article1.append(
      `${property}: ${todaysWeather[property]} ${temperatureUnitF} `
    );
    const newBreak = document.createElement("br");
    article1.append(newBreak);
  }
  for (const property in tomorrowsWeather) {
    article2.append(
      `${property}: ${tomorrowsWeather[property]} ${temperatureUnitF}`
    );
    const newBreak = document.createElement("br");
    article2.append(newBreak);
  }
  for (const property in dayAfterTomorrowsWeather) {
    article3.append(
      `${property}: ${dayAfterTomorrowsWeather[property]} ${temperatureUnitF}`
    );
    const newBreak = document.createElement("br");
    article3.append(newBreak);
  }
}

function previousSearches(data) {
  let listItem = document.createElement("li");
  let anchorTag = document.createElement("a");
  //   let inputLocation = data.nearest_area[0].areaName[0].value;
  let currentTemperatureF = data.current_condition[0].FeelsLikeF;

  anchorTag.href = "";
  anchorTag.textContent = `${locationSearch.value}`;
  listItem.append(anchorTag);
  `${sideBarList.append(listItem)} ${sideBarList.append(
    currentTemperatureF
  )} ${sideBarList.append(temperatureUnitF)}`;

  anchorTag.addEventListener("click", (event) => {
    event.preventDefault();
    currentWeather(data);
    weatherForecast(data);
    weatherConditions(data);
  });
}

function weatherConditions(data) {
  document
    .querySelectorAll(".secondHeading")
    .forEach((item) => (item.textContent = ""));

  let iconElement = document.getElementById("weatherIcon");

  let chanceOfSunshine = data.weather[0].hourly[0].chanceofsunshine;
  let chanceOfSunshineParagraph = document.createElement("p");

  chanceOfSunshineParagraph.setAttribute("class", "secondHeading");
  chanceOfSunshineParagraph.innerHTML = `<strong>Chance of Sunshine:</strong>${chanceOfSunshine}`;
  results.append(chanceOfSunshineParagraph);

  let chanceOfRain = data.weather[0].hourly[0].chanceofrain;
  let chanceOfRainParagraph = document.createElement("p");

  chanceOfRainParagraph.setAttribute("class", "secondHeading");
  chanceOfRainParagraph.innerHTML = `<strong>Chance of Rain:</strong>${chanceOfRain}`;
  results.append(chanceOfRainParagraph);

  let chanceOfSnow = data.weather[0].hourly[0].chanceofsnow;
  let chanceOfSnowParagraph = document.createElement("p");

  chanceOfSnowParagraph.setAttribute("class", "secondHeading");
  chanceOfSnowParagraph.innerHTML = `<strong>Chance of Snow:</strong>${chanceOfSnow}`;
  results.append(chanceOfSnowParagraph);

  let icon = document.createElement("img");
  icon.id = "weatherIcon";
  if (chanceOfSunshine > 50) {
    icon.setAttribute("alt", "sun");
    icon.src = "./assets/icons8-summer.gif";
  } else if (chanceOfRain > 50) {
    icon.setAttribute("alt", "rain");
    icon.src = "./assets/icons8-torrential-rain.gif";
  } else if (chanceOfSnow > 50) {
    icon.setAttribute("alt", "snow");
    icon.src = "./assets/icons8-light-snow.gif";
  }
  results.prepend(icon);
}

conversionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let result = document.querySelector("#result");
  let convertC = document.getElementById("to-c");
  let convertF = document.getElementById("to-f");
  let inputNumber = document.querySelector("#temp-to-convert");

  if (convertC.checked) {
    let number = ((5 / 9) * (inputNumber.value - 32)).toFixed(2);
    result.textContent = number;
  } else if (convertF.checked) {
    let number = ((9 / 5) * inputNumber.value + 32).toFixed(2);
    result.textContent = number;
  }
});
