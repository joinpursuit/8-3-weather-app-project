const BASE_URL = "https://wttr.in";
// Base URL for weather API

const queryParam = "format";
const queryParamValue = "j1";
// Query Parameters that create JSON Output Formats for Weather API (href = "https://github.com/chubin/wttr.in#different-output-formats")

// Event Listener for Location Submission Form
const getWeatherForm = document.querySelector("form");
getWeatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let city = event.target.search.value;
  city = capitalizeAllFirstLetters(city);
  // Formats location input to inlcuded in API Calls for unique locations, otherwise uses nearest location if city is an empty string

  let url;
  if (city === "undefined") {
    url = `${BASE_URL}/?${queryParam}=${queryParamValue}`;
  } else if (city !== undefined) {
    url = `${BASE_URL}/${city}?${queryParam}=${queryParamValue}`;
  }
  // Creates a final URL to fetch with considering whether the user has inputted a value for the location form

  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((response) => {
      console.log(response);
      return displayAllInfo(response);
    })
    .catch((error) => {
      console.log(error);
    });
  // Calling Weather API with Fetch

  if (city !== "undefined") {
    event.target.search.value = "";
    event.target.search.placeholder = "";
  }
});

// Helper Functions
function capitalizeAllFirstLetters(str) {
  str = str.split(" ");
  return str
    .map((element) => {
      return element.toUpperCase()[0] + element.slice(1);
    })
    .join("&");
}

function displayCurrentLocWeatherInfo(response) {
  const locationRequestForm = document.querySelector("main form");
  locationRequestForm.classList.add("hidden");
  const mainArticle = document.querySelector("main article");
  mainArticle.classList.remove("hidden");
  const mainAside = document.querySelector("main aside");
  mainAside.classList.remove("hidden");
  // Hides Location Request form and shows Information Relevant to Input Location

  mainArticle.innerHTML = "Current Weather";
  // Resets appended information

  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("style", "display: block;");
  weatherIcon.classList.add("centerElements");
  weatherIcon.setAttribute("src", "");
  weatherIcon.setAttribute("alt", "Weather Icon!");
  weatherIcon.setAttribute("width", "100");
  mainArticle.append(weatherIcon);
  // Appends Weather Icon

  const nearestArea = document.createElement("p");
  nearestArea.innerText = `Nearest Area: ${response.nearest_area[0].areaName[0].value}`;
  mainArticle.append(nearestArea);
  // Appends Nearest Area

  const region = document.createElement("p");
  region.innerText = `Region: ${response.nearest_area[0].region[0].value}`;
  mainArticle.append(region);
  // Appends Region

  const country = document.createElement("p");
  country.innerText = `Country: ${response.nearest_area[0].country[0].value}`;
  mainArticle.append(country);
  // Appends Country

  const currentWeather = document.createElement("p");
  let tempUnit = "C";
  let tempUnitKey = `FeelsLike${tempUnit}`;
  currentWeather.innerText = `Currently: Feels like ${response.current_condition[0][tempUnitKey]}°${tempUnit}`;
  mainArticle.append(currentWeather);
  // Appends Current Weather

  const chanceOfSunshine = document.createElement("p");
  chanceOfSunshine.innerText = `Chance of Sunshine: ${response.weather[0].hourly[0].chanceofsunshine}`;
  mainArticle.append(chanceOfSunshine);
  // Appends Chance of Sunshine

  const chanceOfRain = document.createElement("p");
  chanceOfRain.innerText = `Chance of Rain: ${response.weather[0].hourly[0].chanceofrain}`;
  mainArticle.append(chanceOfRain);
  // Append Chance of Rain

  const chanceOfSnow = document.createElement("p");
  chanceOfSnow.innerText = `Chance of Snow: ${response.weather[0].hourly[0].chanceofsnow}`;
  mainArticle.append(chanceOfSnow);
  // Appends Chance of Snow
}

function displayThreeDayForecast(response) {
  const forecastCards = document.querySelectorAll("main section aside article");

  let tempUnit = "C";
  let avgTempKey = `avgtemp${tempUnit}`;
  let maxTempKey = `maxtemp${tempUnit}`;
  let minTempKey = `mintemp${tempUnit}`;

  forecastCards[0].innerHTML = "<strong>Today</strong>";
  forecastCards[1].innerHTML = "<strong>Tomorrow</strong>";
  forecastCards[2].innerHTML = "<strong>Day After Tomorrow</strong>";

  for (let i = 0; i < 3; i++) {
    forecastCards[i].setAttribute("class", "centerText");

    const avgWeatherInfo = document.createElement("p");
    avgWeatherInfo.innerText = `Average Temperature: ${response.weather[i][avgTempKey]}°${tempUnit}`;
    avgWeatherInfo.setAttribute("class", "centerText");
    forecastCards[i].append(avgWeatherInfo);
    forecastCards[i].setAttribute("class", "centerText");

    const maxWeatherInfo = document.createElement("p");
    maxWeatherInfo.innerText = `Max Temperature: ${response.weather[i][maxTempKey]}°${tempUnit}`;
    maxWeatherInfo.setAttribute("class", "centerText");
    forecastCards[i].append(maxWeatherInfo);

    const minWeatherInfo = document.createElement("p");
    minWeatherInfo.innerText = `Min Temperature: ${response.weather[i][minTempKey]}°${tempUnit}`;
    minWeatherInfo.setAttribute("class", "centerText");
    forecastCards[i].append(minWeatherInfo);
  }
}

function createWeatherIcons(response) {
  const chanceOfSunshine = response.weather[0].hourly[0].chanceofsunshine;
  const chanceOfRain = response.weather[0].hourly[0].chanceofrain;
  const chanceOfSnow = response.weather[0].hourly[0].chanceofsnow;
  const img = document.querySelector("img");

  if (chanceOfSunshine > 50) {
    img.setAttribute("src", "./assets/icons8-summer.gif");
  } else if (chanceOfRain > 50) {
    img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
  } else if (chanceOfSnow > 50) {
    img.setAttribute("src", "./assets/icons8-light-snow.gif");
  }
  console.log(img);
}

function displayAllInfo(response) {
  displayCurrentLocWeatherInfo(response);
  displayThreeDayForecast(response);
  createWeatherIcons(response);
}
