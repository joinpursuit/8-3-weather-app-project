const form = document.querySelector("form");
const unorderedList = document.querySelector("ul");
const noSearchDefaultText = document.querySelector(".sidebar p");
const main = document.querySelector("main");
const mainArticle = document.querySelector("article");
const mainArticleParagraph = document.getElementById("firstP");
const weatherAsideElement = document.getElementById("weatherForecast");
const weatherAsideArticles = document.querySelectorAll(
  "#weatherForecast article"
);
const img = document.querySelector("img");
const listOfSearches = document.getElementById("locationWeather");

form.addEventListener("submit", (event) => {
  //prevent page reload
  event.preventDefault();
  //remove previous searches so that a new search may load
  document.querySelectorAll("main article section").forEach((obj) => {
    obj.remove();
  });
  document.querySelectorAll("main aside article div").forEach((obj) => {
    obj.remove();
  });

  const location = document.getElementById("location").value;

  //TODO: Create catch error message
  fetch(`http://wttr.in/${location}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      mainArticleParagraph.remove();
      mainArticle.append(createWeatherBlock(json, location));
      formatArticles(json);
      addPreviousSearches(json, noSearchDefaultText, location);
    })
    .catch((error) => {});
  document.getElementById("location").value = ""; //reset input field text value
});

//takes in input value and area
function errorHandling(inputValue, area) {
  if (inputValue != area) {
    return false;
  }
  return true;
}

function paragraphBuilder(object, heading) {
  const newParagraph = document.createElement("p");
  const nearestArea = object.nearest_area[0];
  const currentWeather = object.current_condition[0];
  const weatherDetails = object.weather[0].hourly[0];
  if (heading === "Area") {
    const city = nearestArea.areaName[0].value;
    newParagraph.textContent = `${heading}: ${city}`;
  } else if (heading === "Region") {
    const city = nearestArea.region[0].value;
    newParagraph.textContent = `${heading}: ${city}`;
  } else if (heading === "Country") {
    const city = nearestArea.country[0].value;
    newParagraph.textContent = `${heading}: ${city}`;
  } else if (heading === "Currently") {
    newParagraph.textContent = `Currently: Feels like ${currentWeather.FeelsLikeF}°F`;
  } else if (heading === "Chance of Sun") {
    newParagraph.textContent = `Chance of Sunshine: ${weatherDetails.chanceofsunshine}%`;
  } else if (heading === "Chance of Rain") {
    newParagraph.textContent = `Chance of Rain: ${weatherDetails.chanceofrain}%`;
  } else {
    newParagraph.textContent = `Chance of Snow: ${weatherDetails.chanceofsnow}%`;
  }
  newParagraph.style.fontWeight = "bold";
  newParagraph.style.fontSize = "large";
  return newParagraph;
}

function createWeatherImage(object) {
  const weatherDetails = object.weather[0].hourly[0];
  const sunshine = weatherDetails.chanceofsunshine;
  const rain = weatherDetails.chanceofrain;
  const snow = weatherDetails.chanceofsnow;
  if (sunshine > 50) {
    const image = document.createElement("img");
    image.setAttribute("src", "./assets/icons8-summer.gif");
    image.setAttribute("alt", "sun");
    return image;
  } else if (rain > 50) {
    const image = document.createElement("img");
    image.setAttribute("src", "./assets/icons8-torrential-rain.gif");
    image.setAttribute("alt", "rain");
    return image;
  } else if (snow > 50) {
    const image = document.createElement("img");
    image.setAttribute("src", "./assets/icons8-light-snow.gif");
    image.setAttribute("alt", "snow");
    return image;
  }
}

//Takes in object and string to create weather location block in Main
function createWeatherBlock(object, titleOfSection) {
  const newSection = document.createElement("section"); //creates a section that will later be added to main article

  //create heading
  const heading = document.createElement("h2");
  heading.style.fontSize = "x-large";
  heading.innerHTML = titleOfSection;
  heading.style.color = "#54416d";

  const nearestArea = object.nearest_area[0];
  const areaName = nearestArea.areaName[0].value; //ex: Melbourne, retrieved from API

  //use errorHandling to create Nearest Area heading if the inputted area is not retrieved from API
  areaHeading = paragraphBuilder(object, "Area");
  areaHeading.textContent = errorHandling(heading.innerHTML, areaName)
    ? `Area: ${areaName}`
    : `Nearest Area: ${areaName}`;

  const regionHeading = paragraphBuilder(object, "Region");
  const countryHeading = paragraphBuilder(object, "Country");
  const currentWeatherInF = paragraphBuilder(object, "Currently");
  const chanceOfSun = paragraphBuilder(object, "Chance of Sun");
  const chanceOfRain = paragraphBuilder(object, "Chance of Rain");
  const chanceOfSnow = paragraphBuilder(object, "Chance of Snow");

  const imageGif = createWeatherImage(object);
  if (imageGif) {
    newSection.append(imageGif);
  }
  newSection.append(
    heading,
    areaHeading,
    regionHeading,
    countryHeading,
    currentWeatherInF,
    chanceOfSun,
    chanceOfRain,
    chanceOfSnow
  );
  //TODO: Move to CSS
  newSection.classList.add("fadein");

  return newSection;
}

//Takes in json object to create 3 weather blocks for forecast for the next three days
function createForecastBlock(object, num) {
  const newDiv = document.createElement("div");
  const weather = object.weather; //weather array detailing weather forecast for next three days
  const maxTempInF = weather[num].maxtempF;
  const minTempInF = weather[num].mintempF;
  const avgTempInF = weather[num].avgtempF;

  if (num === 0) {
    const todayHeading = document.createElement("h2");
    todayHeading.innerHTML = "Today";
    newDiv.append(todayHeading);
  } else if (num === 1) {
    const tomorrowHeading = document.createElement("h2");
    tomorrowHeading.innerHTML = "Tomorrow";
    newDiv.append(tomorrowHeading);
  } else {
    const twoTomorrowHeading = document.createElement("h2");
    twoTomorrowHeading.innerHTML = "Day After Tomorrow";
    newDiv.append(twoTomorrowHeading);
  }
  //TODO: Make function to build h3 and paragraph elements
  const avgTempHeading = document.createElement("h3");
  avgTempHeading.innerHTML = "Average Temperature: ";
  const avgTempText = document.createElement("p");
  avgTempText.innerHTML = `${avgTempInF}°F`;
  newDiv.append(avgTempHeading);
  newDiv.append(avgTempText);

  const maxTempHeading = document.createElement("h3");
  maxTempHeading.innerHTML = "Max Temperature: ";
  const maxTempText = document.createElement("p");
  maxTempText.innerHTML = `${maxTempInF}°F`;
  newDiv.append(maxTempHeading);
  newDiv.append(maxTempText);

  const minTempHeading = document.createElement("h3");
  minTempHeading.innerHTML = "Min Temperature: ";
  const minTempText = document.createElement("p");
  minTempText.innerHTML = `${minTempInF}°F`;
  newDiv.append(minTempHeading);
  newDiv.append(minTempText);

  return newDiv;
}

function formatArticles(object) {
  weatherAsideElement.style.visibility = "visible";
  let day = 0;
  weatherAsideArticles.forEach((article) => {
    article.append(createForecastBlock(object, day));
    day++;
  });
}

function addPreviousSearches(object, paragraph, locationName) {
  paragraph.remove(); //remove text that states "No preivous searches"
  const newListItem = document.createElement("li");
  const previousSearch = document.createElement("a");
  const nearestArea = object.nearest_area[0];
  const areaName = nearestArea.areaName[0].value;
  const currentWeather = ` - ${object.current_condition[0].FeelsLikeF}°F`;
  const searchTitle = document.createTextNode(areaName);
  previousSearch.append(searchTitle);
  previousSearch.setAttribute("href", "#");
  newListItem.append(previousSearch, currentWeather);
  unorderedList.append(newListItem);

  newListItem.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelectorAll("main article section").forEach((obj) => {
      obj.remove();
    });
    document.querySelectorAll("main #weatherForecast div").forEach((obj) => {
      obj.remove();
    });

    fetch(`http://wttr.in/${locationName}?format=j1`)
      .then((response) => response.json())
      .then((json) => {
        mainArticleParagraph.remove();
        mainArticle.append(createWeatherBlock(json, locationName));
        formatArticles(json);
      })
      .catch((error) => {});
  });
}
