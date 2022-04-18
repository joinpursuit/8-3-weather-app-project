const form = document.getElementById("weatherform");
const todayArt = document.getElementById("today");
const tomorrowArt = document.getElementById("tomorrow");
const dayAfterTomArt = document.getElementById("after-tomorrow");
const convertForm = document.getElementById("converter");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = event.target.location.value;
  event.target.reset();
  return weatherSearch(userInput);
});

/**
 * weatherSearch()
 * Populates an html file making use of a resolved fetch API call's data and various helper functions.
 * -----------------------------
 * @param {string} location - A string param, specifically the name of a city (i.e. london, rego park), that is part of a URL in a fetch call.
 * @return a populated html file with data from a resolved response object. */

const weatherSearch = (location) => {
  if (!location) {
    return;
  }
  fetch("https://wttr.in/" + location + "?format=j1")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createMainArticle(data, location);
      fillMiniArticle(data.weather[0], todayArt, "Today");
      fillMiniArticle(data.weather[1], tomorrowArt, "Tomorrow");
      fillMiniArticle(data.weather[2], dayAfterTomArt, "Next Day");
      searchHistoryMaker(data, location);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * iconMaker()
 * side effects: creates a DOM img element with unique img file and description and appends it to the DOM.
 * -----------------------------
 * @param {string} url -  A string that is a path to a local .gif file.
 * @param {string} altString -  A string that describes the gif file.
 */

const iconMaker = (url, altString) => {
  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.setAttribute("alt", altString);
  general.append(img);
};

/**
 * createMainArticle()
 * side effects: creates various dom elements and populates a main article with data extracted from a resolved fetch call.
 * -----------------------------
 * @param {obj} data -  a weather object returned from a resolved fetch call with weather data unique to a particular town or city.
 * @param {string} location - A string, specifically the name of a city (i.e. london, rego park),
 */

const createMainArticle = (data, location) => {
  const general = document.getElementById("general");
  general.innerHTML = "";
  const { FeelsLikeF } = data.current_condition[0];
  const { areaName, country, region } = data.nearest_area[0];
  const { chanceofrain, chanceofsunshine, chanceofsnow } =
    data.weather[0].hourly[0];
  if (chanceofsunshine > 50) {
    iconMaker("./assets/icons8-summer.gif", "sun");
  } else if (chanceofrain > 50) {
    iconMaker("./assets/icons8-torrential-rain.gif", "rain");
  } else if (chanceofsnow > 50) {
    iconMaker("./assets/icons8-light-snow.gif", "snow");
  }
  const searchedTown = document.createElement("h2");
  searchedTown.innerText = location;
  const searchedArea = document.createElement("p");
  areaName[0].value.toLowerCase() === location.toLowerCase()
    ? (searchedArea.innerText = "Area: " + areaName[0].value)
    : (searchedArea.innerText = "Nearest Area: " + areaName[0].value);
  const searchedRegion = document.createElement("p");
  searchedRegion.innerText = "Region: " + region[0].value;
  const searchedCountry = document.createElement("p");
  searchedCountry.innerText = "Country: " + country[0].value;
  const currentTemp = document.createElement("p");
  currentTemp.innerText = "Currently: Feels Like " + FeelsLikeF + " °F";
  const sunshine = document.createElement("p");
  sunshine.innerText = "Chance of Sunshine: " + chanceofsunshine;
  const rain = document.createElement("p");
  rain.innerText = "Chance of Rain: " + chanceofrain;
  const snow = document.createElement("p");
  snow.innerText = "Chance of Snow: " + chanceofsnow;
  general.append(
    searchedTown,
    searchedArea,
    searchedRegion,
    searchedCountry,
    currentTemp,
    sunshine,
    rain,
    snow
  );
};

/**
 * fillMiniArticle()
 * side effects: populates an existing article node in the DOM with data from a weather object.
 * -----------------------------
 * @param {obj} data -  a weather object returned from a resolved fetch call with weather data unique to a particular town or city. 
 * @param {obj} data.weather[i] -  a node in a weather object unique to a specific day of weather.
 * @param {arr} article - An HTML <article> node.
 * @param {string} header - A string descriptive of and appended to this article.

 */

const fillMiniArticle = (data, article, header) => {
  ({ avgtempF, maxtempF, mintempF } = data);
  article.innerHTML = "";
  const heading = document.createElement("h3");
  heading.innerText = header;
  const averageP = document.createElement("p");
  averageP.innerHTML = `<strong>Avg Temp:</strong> ${avgtempF}°F`;
  const maxP = document.createElement("p");
  maxP.innerHTML = `<strong>Max Temp:</strong> ${maxtempF}°F`;
  const minP = document.createElement("p");
  minP.innerHTML = `<strong>Min Temp:</strong> ${mintempF}°F`;
  return article.append(heading, averageP, maxP, minP);
};
//incorporate createTextNode as per Myra. refactor tot his at the end!

/**
 * searchHistoryMaker()
 * Side effects: Populates an existing <ul> node in the DOM with a location that successfully fetched weather data from an API .  
 * Does not append if the location already exists!
 * 
 * -----------------------------
 * @param {obj} data -  a weather object returned from a resolved fetch call with weather data unique to a particular town or city. 
 * @param {string} location - A string, specifically the name of a city (i.e. london, rego park).

 */

const searchHistoryMaker = (data, location) => {
  const history = document.getElementById("search-list");
  const noSearches = document.getElementById("no-searches");
  const { FeelsLikeF } = data.current_condition[0];
  if (!history.innerText.includes(location)) {
    noSearches.innerText = "";
    const newLine = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", "#");
    anchor.textContent = `${location} ${FeelsLikeF}°F`;
    newLine.append(anchor);
    history.append(newLine);
    newLine.addEventListener("click", (e) => {
      e.preventDefault();
      weatherSearch(location);
    });
  }
};

/**
 * convertHelper()
 * side effects: converts a number retrieved from an input form into Celsius if true (Farenheight input value type is assumed), or Farenheight if false (Celsius input value type assumed)
 * -----------------------------
 * @param {number} number -  a number retrieved from an input form.
 * @param {type} boolean - A boolean returned from an event with two radio button options, true first is checked (F->C), false if second is checked (C->F).

 */

const convertHelper = (num, type) => {
  const conversionResult = document.getElementById("result");
  conversionResult.innerText = "";
  if (type === true) {
    const farToCel = `${((num - 32) * (5 / 9)).toFixed(2)}°C`;
    conversionResult.innerText = farToCel;
  } else if (type === false) {
    const celToFar = `${(num * 1.8 + 32).toFixed(2)}°F`;
    conversionResult.innerText = celToFar;
  }
};

convertForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target[0].value;
  const convertToCel = event.target[1].checked;
  convertToCel === true
    ? convertHelper(input, true)
    : convertHelper(input, false);
  event.target.reset();
});
