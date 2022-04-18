const BASE_URL = "https://wttr.in";
// Base URL for Weather API

const queryParam = "format";
const queryParamValue = "j1";
// Query Parameters that create JSON Output Formats for Weather API
// (href = "https://github.com/chubin/wttr.in#different-output-formats")

// Event Listener for Location Submission Form
const getWeatherForm = document.querySelector("form");
getWeatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let inputtedCity = event.target.search.value;
  let formattedCity = formatForAPI(inputtedCity);
  // Formats Location Input in API Calls for unique locations, otherwise uses nearest location if city is an empty string

  let url;
  if (formattedCity === "undefined") {
    url = `${BASE_URL}/?${queryParam}=${queryParamValue}`;
  } else {
    url = `${BASE_URL}/${formattedCity}?${queryParam}=${queryParamValue}`;
  }
  // Creates a final URL to fetch Weather API

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return displayAllInfo(response, formattedCity);
    })
    .catch((error) => {
      console.log(error);
    });
  // Calling Weather API with Fetch

  if (formattedCity !== "undefined") {
    event.target.search.value = "";
  }
  // Blanks out Search Input Field when Location Form is submitted
});

// Event listener for Temp Conversion Form
const tempCoverterForm = document.getElementById("temp-convert-form");
const formInputs = tempCoverterForm.querySelectorAll("input");
const formButton = formInputs[3];
formButton.addEventListener("click", (event) => {
  event.preventDefault();

  const previousTempHeading = document.querySelector("aside h4");
  if (previousTempHeading) {
    previousTempHeading.remove();
  }
  // Removes previous temp conversion results

  const tempToConvert = formInputs[0].value;
  if (tempToConvert === "") {
    alert("Temp to Convert must not be empty");
    return;
  }
  // Alerts user when temp conversion Input Field is left blank

  let convertedTemp;
  if (formInputs[1].checked) {
    convertedTemp = tempConverterFarToCel(tempToConvert);
  } else if (formInputs[2].checked) {
    convertedTemp = tempConverterCelToFar(tempToConvert);
  }
  // Applies conversion depending on wheather Celcius or Farenheit radio button is checked

  const convertedTempHeading = document.createElement("h4");
  convertedTempHeading.innerText = convertedTemp;
  tempCoverterForm.after(convertedTempHeading);
});

// Helper Functions

/**
 * formatForAPI(str)
 * @param {string} str accepts any string indicating a location name
 * @returns {string} returns a formatted string to be used by API call with Fetch
 */
function formatForAPI(str) {
  str = str.split(" ");
  return str
    .map((element) => {
      return element.toUpperCase()[0] + element.slice(1);
    })
    .join("&");
}

/**
 * handleSearchLocation(response, formattedCity)
 * @param {Object} response
 * @param {string} formattedCity
 * @returns {} Uses side effects to append a new element to the page
 */
function handleSearchLocation(response, formattedCity) {
  const mainArticle = document.querySelector("main article");
  const currentWeatherHeading = document.createElement("h2");
  if (formattedCity === "undefined") {
    formattedCity = response.nearest_area[0].areaName[0].value;
    currentWeatherHeading.innerText = `Current Weather in ${formattedCity}`;
  } else {
    currentWeatherHeading.innerText = `Current Weather in ${formattedCity.replaceAll(
      "&",
      " "
    )}`;
  }
  mainArticle.prepend(currentWeatherHeading);
}

/**
 * displayCurrentLocWeatherInfo(response)
 * @param {Object} response
 * @returns {} Uses side effects to append elements to page regarding weather for searched location
 */
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

/**
 * displayThreeDayForecast(response)
 * @param {Object} response
 * @returns {} Uses side effects to append 3 day forecast elements to page
 */
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

/**
 * createWeatherIcons(response)
 * @param {Object} response
 * @returns {} Uses side effects to add weather icon elements to page
 */
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

/**
 *createsPreviousSearches(response, formattedCity)
 * @param {Object} response
 * @param {String} formattedCity
 * @returns {} Uses side effects to create Previous Search elements on page
 */
function createsPreviousSearches(response, formattedCity) {
  let tempUnit = "F";
  let tempUnitKey = `FeelsLike${tempUnit}`;

  const tempPreviousSearchesFiller = document.querySelector("aside section p");
  if (tempPreviousSearchesFiller) {
    tempPreviousSearchesFiller.remove();
  }

  const previousSearchesList = document.querySelector("aside ul");
  const searchedLocation = document.createElement("li");

  if (formattedCity === "undefined") {
    formattedCity = response.nearest_area[0].areaName[0].value;
  } else {
    formattedCity = formattedCity.replaceAll("&", " ");
  }
  searchedLocation.innerHTML = `<a href="">${formattedCity} - ${response.current_condition[0][tempUnitKey]}°${tempUnit}</a>`;

  // Event listener for previously searched locations
  searchedLocation.addEventListener("click", (event) => {
    event.preventDefault();
    displayCurrentLocWeatherInfo(response);
    displayThreeDayForecast(response);
    handleSearchLocation(response, formattedCity);
    createWeatherIcons(response);
  });
  previousSearchesList.append(searchedLocation);
}

/**
 * tempConverterCelToFar(celcius)
 * @param {number} celcius
 * @returns {number} Returns converted temperature
 */
function tempConverterCelToFar(celcius) {
  let farenheit = celcius * (9 / 5) + 32;
  farenheit = farenheit.toFixed(2);
  return `${celcius}°C = ${farenheit}°F`;
}

/**
 * tempConverterFarToCel(farenheit)
 * @param {number} farenheit
 * @returns {number} Returns converted temperature
 */
function tempConverterFarToCel(farenheit) {
  let celcius = (farenheit - 32) * (5 / 9);
  celcius = celcius.toFixed(2);
  return `${farenheit}°F = ${celcius}°C`;
}

/**
 * displayAllInfo(response, city)
 * @param {Object} response
 * @param {String} city
 * @returns Calls all functions to be grouped into one call when used with Fetch to call the Weather API
 */
function displayAllInfo(response, city) {
  displayCurrentLocWeatherInfo(response);
  displayThreeDayForecast(response);
  createsPreviousSearches(response, city);
  handleSearchLocation(response, city);
  createWeatherIcons(response);
}
