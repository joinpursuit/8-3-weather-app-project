const BASE_URL = "https://wttr.in";
// Base URL for weather API

const queryParam = "format";
const queryParamValue = "j1";
// Query Parameters that create JSON Output Formats for Weather API
// (href = "https://github.com/chubin/wttr.in#different-output-formats")

// Event Listener for Location Submission Form
const getWeatherForm = document.querySelector("form");
getWeatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let city = event.target.search.value;
  city = format(city);
  // Formats location input to inlcuded in API Calls for unique locations, otherwise uses nearest location if city is an empty string

  let url;
  if (city === "undefined") {
    url = `${BASE_URL}/?${queryParam}=${queryParamValue}`;
  } else {
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
      return displayAllInfo(response, city);
    })
    .catch((error) => {
      console.log(error);
    });
  // Calling Weather API with Fetch

  if (city !== "undefined") {
    event.target.search.value = "";
  }
  // Blanks out search input when location form is submitted
});

// Helper Functions

function format(str) {
  str = str.split(" ");
  return str
    .map((element) => {
      return element.toUpperCase()[0] + element.slice(1);
    })
    .join("&");
}
// Formats input location to be used by API call

function handleSearchLocation(response, city) {
  const mainArticle = document.querySelector("main article");
  const currentWeatherHeading = document.createElement("h2");
  if (city === "undefined") {
    city = response.nearest_area[0].region[0].value;
  }
  currentWeatherHeading.innerText = `Current Weather in ${city.replaceAll(
    "&",
    " "
  )}`;
  mainArticle.prepend(currentWeatherHeading);
}
// Creates main heading for Current Weather section

function displayCurrentLocWeatherInfo(response) {
  const mainArticle = document.querySelector("main article");
  mainArticle.classList.remove("hidden");
  const mainAside = document.querySelector("main aside");
  mainAside.classList.remove("hidden");
  const chooseLocRequest = document.querySelector("main p");
  chooseLocRequest.classList.add("hidden");
  // Hides Location Request form and shows Information Relevant to Input Location

  mainArticle.innerHTML = "";
  // Resets appended information for new location selection

  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("style", "display: block;");
  weatherIcon.classList.add("centerElements");
  weatherIcon.setAttribute("src", "");
  weatherIcon.setAttribute("alt", "Weather Icon!");
  weatherIcon.setAttribute("width", "100");
  mainArticle.append(weatherIcon);
  // Appends Weather Icon

  const nearestArea = document.createElement("p");
  nearestArea.innerText = `Nearest Area:\n${response.nearest_area[0].areaName[0].value}`;
  mainArticle.append(nearestArea);
  // Appends Nearest Area

  const region = document.createElement("p");
  region.innerText = `Region:\n${response.nearest_area[0].region[0].value}`;
  mainArticle.append(region);
  // Appends Region

  const country = document.createElement("p");
  country.innerText = `Country:\n${response.nearest_area[0].country[0].value}`;
  mainArticle.append(country);
  // Appends Country

  const currentWeather = document.createElement("p");
  let tempUnit = "F";
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

  let tempUnit = "F";
  let avgTempKey = `avgtemp${tempUnit}`;
  let maxTempKey = `maxtemp${tempUnit}`;
  let minTempKey = `mintemp${tempUnit}`;

  forecastCards[0].innerHTML = "<h4>Today</h4>";
  forecastCards[1].innerHTML = "<h4>Tomorrow</h4>";
  forecastCards[2].innerHTML = "<h4>Day After Tomorrow</h4>";

  for (let i = 0; i < 3; i++) {
    forecastCards[i].setAttribute("class", "centerText");

    const avgWeatherInfo = document.createElement("p");
    avgWeatherInfo.innerText = `Average: ${response.weather[i][avgTempKey]}°${tempUnit}`;
    avgWeatherInfo.setAttribute("class", "centerText");
    forecastCards[i].append(avgWeatherInfo);
    forecastCards[i].setAttribute("class", "centerText");

    const maxWeatherInfo = document.createElement("p");
    maxWeatherInfo.innerText = `Max: ${response.weather[i][maxTempKey]}°${tempUnit}`;
    maxWeatherInfo.setAttribute("class", "centerText");
    forecastCards[i].append(maxWeatherInfo);

    const minWeatherInfo = document.createElement("p");
    minWeatherInfo.innerText = `Min: ${response.weather[i][minTempKey]}°${tempUnit}`;
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
    img.setAttribute("alt", "sun");
  } else if (chanceOfRain > 50) {
    img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
    img.setAttribute("alt", "rain");
  } else if (chanceOfSnow > 50) {
    img.setAttribute("src", "./assets/icons8-light-snow.gif");
    img.setAttribute("alt", "snow");
  }
}

function createsPreviousSearches(response, city) {
  let tempUnit = "F";
  let tempUnitKey = `FeelsLike${tempUnit}`;

  const tempPreviousSearchesFiller = document.querySelector("aside section p");
  if (tempPreviousSearchesFiller) {
    tempPreviousSearchesFiller.remove();
  }

  const previousSearchesList = document.querySelector("aside ul");
  const searchedLocation = document.createElement("li");

  if (city === "undefined") {
    city = response.nearest_area[0].areaName[0].value;
  } else {
    city = city.replaceAll("&", " ");
  }

  searchedLocation.innerHTML = `<a href="">${city} - ${response.current_condition[0][tempUnitKey]}°${tempUnit}</a>`;

  searchedLocation.addEventListener("click", (event) => {
    event.preventDefault();
    handleSearchLocation(response, city);
    displayThreeDayForecast(response);
    displayCurrentLocWeatherInfo(response);
    createWeatherIcons(response);
  });
  previousSearchesList.append(searchedLocation);
  // Event listener for previously searched locations
}

function displayAllInfo(response, city) {
  createsPreviousSearches(response, city);
  displayCurrentLocWeatherInfo(response);
  displayThreeDayForecast(response);
  createWeatherIcons(response);
  handleSearchLocation(response, city);
}
