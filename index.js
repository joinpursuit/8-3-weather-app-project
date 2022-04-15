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
  console.log(url);
  // Creates a final URL to fetch with considering whether the user has inputted a value for the location form

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      displayCurrentLocWeatherInfo(response);
    })
    .catch((error) => {
      console.log(error);
    });
  // Calling Weather API with Fetch
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

  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("style", "display: block;");
  weatherIcon.classList.add("centerElements");
  weatherIcon.setAttribute("src", "");
  weatherIcon.setAttribute("alt", "Weather Icon!");
  weatherIcon.setAttribute("width", "100");
  mainArticle.append(weatherIcon);

  const nearestArea = document.createElement("p");
  nearestArea.innerText = `Nearest Area: ${response.nearest_area[0].areaName[0].value}`;
  mainArticle.append(nearestArea);

  const region = document.createElement("p");
  region.innerText = `Region: ${response.nearest_area[0].region[0].value}`;
  mainArticle.append(region);

  const country = document.createElement("p");
  country.innerText = `Country: ${response.nearest_area[0].country[0].value}`;
  mainArticle.append(country);

  const currentWeather = document.createElement("p");
  let tempUnitKey = "FeelsLikeC";
  let tempUnit = "C";
  currentWeather.innerText = `Currently: Feels like ${response.current_condition[0][tempUnitKey]}°${tempUnit}`;
  mainArticle.append(currentWeather);

  const chanceOfSunshine = document.createElement("p");
  chanceOfSunshine.innerText = `Chance of Sunshine: ${response.weather[0].hourly[0].chanceofsunshine}`;
  mainArticle.append(chanceOfSunshine);

  // Outputs Location Info to the Page
}
