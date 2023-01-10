const weatherFormSubmit = document.querySelector("form");

const weatherFormSubmitEvent = (event) => {
  event.preventDefault();
  const input = weatherFormSubmit.location.value;
  const BASE_URL = `https://wttr.in/${input}?format=j1`;

  getWeatherInfo(BASE_URL, input);
  event.target.location.value = "";
};

const getWeatherInfo = (url, input) => {
  fetch(url)
    .then((response) => response.json())
    .then((weather) => {
      handleResponse(weather, input);
    })
    .catch((error) => console.log(error));
};

const handleResponse = (response, input) => {
  removeElement();
  const mainContainer = document.querySelector(".main");
  mainContainer.innerHTML = ""
  const mainData = populateMain(response, input);
  // mainContainer.append(mainData);
  
  const forecastContainer = document.querySelector(".forecast");
  const forecastArticles = populateForecast(response);
  // forecastContainer.append(forecastArticles);
  
  const previousContainer = document.querySelector(".previous");
  const previousSearches = createPreviousSearch(response, input);
  previousContainer.append(...previousSearches);
};

const populateMain = (weather, input) => {
  const mainArticle = document.querySelector(".main");
  
  const h1 = document.createElement("h1");
  h1.innerHTML = input;
  const area = document.createElement("p");
  area.innerHTML = `<strong>Area:</strong> ${weather.nearest_area[0].areaName[0].value}`;
  const region = document.createElement("p");
  region.innerHTML = `<strong>Region:</strong> ${weather.nearest_area[0].region[0].value}`;
  const country = document.createElement("p");
  country.innerHTML = `<strong>Country:</strong> ${weather.nearest_area[0].country[0].value}`;
  const currently = document.createElement("p");
  currently.innerHTML = `<strong>Currently:</strong> Feels Like ${weather.current_condition[0].FeelsLikeF}°F`;
  
  mainArticle.append(h1, area, region, country,currently);
  
  console.log(weather)
  
};

const removeElement = () => {
  const removeThis = document.querySelectorAll(".remove");
  if (removeThis) {
    removeThis.forEach((el) => el.remove());
  }
};

const populateForecast = (weather) => {
  const daysArticles = document.querySelectorAll(".day");
  

  for (let i = 0; i < daysArticles.length; i++) {
    daysArticles[i].innerHTML = ""
    let daysForecast = ["Today", "Tomorrow", "Day After Tomorrow"];
    const h3 = document.createElement("h3");
    h3.innerHTML = daysForecast[i];

    daysArticles[i].style.background = "blue"

    const averageTemperature = document.createElement("section");
    averageTemperature.innerHTML = `<strong>Average Temperature:</strong> ${weather.weather[i].avgtempF}°F`;

    const maxTemperature = document.createElement("section");
    maxTemperature.innerHTML = `<strong>Max Temperature:</strong> ${weather.weather[i].maxtempF}°F`;

    const minTemperature = document.createElement("section");
    minTemperature.innerHTML = `<strong>Min Temperature:</strong> ${weather.weather[i].mintempF}°F`;

    daysArticles[i].append(
      h3,
      averageTemperature,
      maxTemperature,
      minTemperature
    ); //append child didnt work. research more
  }
  console.log(daysArticles)
  return daysArticles
};

const createPreviousSearch = (weather, input) => {
  let ul = document.querySelector(".previous");
  const searchAnchor = document.createElement("a");
  // searchli.href = "#";
  searchAnchor.innerHTML = input;

  searchAnchor.addEventListener("click", liClickEvent);
  const feelsLikeTemp = document.createElement("span");
  feelsLikeTemp.innerHTML = ` - ${weather.current_condition[0].FeelsLikeF}°F` 

  const searchliElement = document.createElement("li");
  searchliElement.append(searchAnchor,feelsLikeTemp);
  ul.append(searchliElement);
};

const liClickEvent = (event) => {
event.preventDefault();

}
weatherFormSubmit.addEventListener("submit", weatherFormSubmitEvent);
