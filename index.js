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
  const mainContainer = document.querySelector(".main");
  const mainData = populateMain(response, input);
  mainContainer.append(mainData);

  const forecastContainer = document.querySelector(".forecast");
  const forecastArticles = populateForecast(response);
  forecastContainer.append(forecastArticles);
};

const populateMain = (weather, input) => {
  removeElement();
  const mainDiv = document.createElement("div");

  const h1 = document.createElement("h1");
  h1.innerHTML = input;
  const area = document.createElement("p");
  area.innerHTML = `Area: ${weather.nearest_area[0].areaName[0].value}`;
  const region = document.createElement("p");
  region.innerHTML = `Region: ${weather.nearest_area[0].region[0].value}`;
  const country = document.createElement("p");
  country.innerHTML = `Country: ${weather.nearest_area[0].country[0].value}`;
  const currently = document.createElement("p");
  currently.innerHTML = `Currently: ${weather.current_condition[0]["FeelsLikeF"]}`;

 

  mainDiv.append(h1, area, region, country, currently);
  return mainDiv;
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
    let daysForecast = ["Today", "Tomorrow", "Day After Tomorrow"];
    const h3 = document.createElement("h3");
    h3.innerHTML = daysForecast[i];

    const averageTemperature = document.createElement("section");
    averageTemperature.innerHTML = `Average Temperature:${weather.weather[0].avgtempF}`;

    const maxTemperature = document.createElement("section");
    maxTemperature.innerHTML = `Max Temperature:${weather.weather[0].maxtempF}`;

    const minTemperature = document.createElement("section");
    minTemperature.innerHTML = `Min Temperature:${weather.weather[0].mintempF}`;

    daysArticles[i].append(h3,averageTemperature,maxTemperature,minTemperature) //append child didnt work. research more
    // aside.append(daysArticles[i])
  }
  
  // return daysArticles
};
// const createPreviousSearch = (weather,input) => {
// const li = document.createElement("a");
// li.href = weather;
// li.innerHTML = input;

// li.addEventListener("click", liClickEvent)
// const feelsLikeF = `${weather.current_condition[0]["FeelsLikeF"]}`

// const searchliElement = document.createElement("li");
// searchliElement.append(li, "-", feelsLikeF)
// return searchliElement

// }

weatherFormSubmit.addEventListener("submit", weatherFormSubmitEvent);
