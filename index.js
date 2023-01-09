const weatherFormSubmit = document.querySelector("form");

const weatherFormSubmitEvent = (event) => {
  event.preventDefault();
  const input = weatherFormSubmit.location.value;
  const BASE_URL = `https://wttr.in/${input}?format=j1`;

  getWeatherInfo(BASE_URL,input);
  event.target.location.value = "";
};

const getWeatherInfo = (url,input) => {
  fetch(url)
    .then((response) => response.json())
    .then((weather) => {
      handleResponse(weather,input);
      console.log(weather);
    })
    .catch((error) => console.log(error));
};

const handleResponse = (response, input) => {
  const mainContainer = document.querySelector(".main");
  const mainData = populateMain(response, input)
  mainContainer.append(mainData)
}


const populateMain = (weather,input) => {
 const mainDiv = document.createElement("div");
 
const h1 = document.createElement("h1");
h1.innerHTML = input;
const area = document.createElement("p");
area.innerHTML = `Area: ${weather.nearest_area[0].areaName[0].value}`
const region = document.createElement("p");
region.innerHTML = `Region: ${weather.nearest_area[0].region[0].value}` 
const country = document.createElement("p");
country.innerHTML = `Country: ${weather.nearest_area[0].country[0].value}`
const currently = document.createElement("p")
currently.innerHTML = `Currently: ${weather.current_condition[0]["FeelsLikeF"]}`

console.log(weather.nearest_area[0].areaName[0].value)

mainDiv.append(h1,area,region,country,currently);
return mainDiv
}

weatherFormSubmit.addEventListener("submit", weatherFormSubmitEvent);


