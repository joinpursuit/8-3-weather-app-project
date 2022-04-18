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
const conversionForm = document.getElementById("widget");

//Provides conversionForm widget its functionality independently from the main form
convertTemperature(conversionForm);

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

  fetch(`http://wttr.in/${location}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      mainArticleParagraph.remove();
      mainArticle.append(createWeatherBlock(json, location));
      formatArticles(json);
      addPreviousSearches(json, noSearchDefaultText, location);
    })
    .catch(() => {});
  document.getElementById("location").value = ""; //reset input field text value
});

/**
 * Returns a boolean to check if inputted location and area are the same, will later be used to make Area heading dynamic.
 * @param {string} inputValue - The user-inputted location.
 * @param {string} area - The location retrieved by the API.
 */
function messageHandling(inputValue, area) {
  if (inputValue != area) {
    return false;
  }
  return true;
}

/**
 * Creates a paragraph using API information.
 * @param {object} object - The JSON Object fetched from API.
 * @param {string} heading - String heading representing some aspect of location or weather in the Main article.
 * @returns {object} newParagraph - A new HTML Paragraph Element.
 */
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
/**
 * Creates an Image using Assess Image Gifs depending on the intensity of the weather forecast.
 * @param {object} object - The JSON Object fetched from API.
 * @returns {object} image - A new HTML Image Element.
 */
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

/**
 * Creates the block of weather information being fecthed from the API displaying location and weather information.
 * @param {object} object - The JSON Object fetched from API.
 * @param {string} titleOfSection - The location inputted by the User.
 * @returns {object} newSection - A new HTML Section Element.
 */
function createWeatherBlock(object, titleOfSection) {
  const newSection = document.createElement("section"); //creates a section that will later be added to main article

  //create heading, area, region, country, and current weather in Farenheit forecast
  const heading = document.createElement("h2");
  heading.style.fontSize = "x-large";
  heading.innerHTML = titleOfSection;
  heading.style.color = "#54416d";

  const nearestArea = object.nearest_area[0];
  const areaName = nearestArea.areaName[0].value; //ex: Melbourne, retrieved from API

  //messageHandling to create Nearest Area heading if the inputted area is not retrieved from API
  areaHeading = paragraphBuilder(object, "Area");
  areaHeading.textContent = messageHandling(heading.innerHTML, areaName)
    ? `Area: ${areaName}`
    : `Nearest Area: ${areaName}`;

  const regionHeading = paragraphBuilder(object, "Region");
  const countryHeading = paragraphBuilder(object, "Country");
  const currentWeatherInF = paragraphBuilder(object, "Currently");

  const chanceOfSun = paragraphBuilder(object, "Chance of Sun");
  const chanceOfRain = paragraphBuilder(object, "Chance of Rain");
  const chanceOfSnow = paragraphBuilder(object, "Chance of Snow");

  //TODO: Make Switch Case?
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

  newSection.classList.add("fadein");

  return newSection;
}

/**
 * Creates the future forecast articles.
 * @param {object} object - The JSON Object fetched from API.
 * @param {number} num - A Number representing the day (today, tomorrow, or the day after tomorrow).
 * @returns {object} newDiv - A new HTML Div Element.
 */
function createForecastBlock(object, num) {
  const newDiv = document.createElement("div");
  const weather = object.weather; //weather array detailing weather forecast for next three days
  const maxTempInF = weather[num].maxtempF;
  const minTempInF = weather[num].mintempF;
  const avgTempInF = weather[num].avgtempF;

  if (num === 0) {
    const todayHeading = document.createElement("h2");
    todayHeading.textContent = "Today";
    newDiv.append(todayHeading);
  } else if (num === 1) {
    const tomorrowHeading = document.createElement("h2");
    tomorrowHeading.textContent = "Tomorrow";
    newDiv.append(tomorrowHeading);
  } else {
    const twoTomorrowHeading = document.createElement("h2");
    twoTomorrowHeading.textContent = "Day After Tomorrow";
    newDiv.append(twoTomorrowHeading);
  }

  const avgTempHeading = document.createElement("h3");
  avgTempHeading.textContent = "Average Temperature: ";
  const avgTempText = document.createElement("p");
  avgTempText.textContent = `${avgTempInF}°F`;
  newDiv.append(avgTempHeading);
  newDiv.append(avgTempText);

  const maxTempHeading = document.createElement("h3");
  maxTempHeading.textContent = "Max Temperature: ";
  const maxTempText = document.createElement("p");
  maxTempText.textContent = `${maxTempInF}°F`;
  newDiv.append(maxTempHeading);
  newDiv.append(maxTempText);

  const minTempHeading = document.createElement("h3");
  minTempHeading.textContent = "Min Temperature: ";
  const minTempText = document.createElement("p");
  minTempText.textContent = `${minTempInF}°F`;
  newDiv.append(minTempHeading);
  newDiv.append(minTempText);

  return newDiv;
}

/**
 * Formats articles by looping through each article, each day (starting from 0) and appending a Div respective to the day to each article.
 * @param {object} object - The JSON Object fetched from API.
 */
function formatArticles(object) {
  weatherAsideElement.style.visibility = "visible";
  let day = 0;
  weatherAsideArticles.forEach((article) => {
    article.append(createForecastBlock(object, day));
    day++;
  });
}

/**
 * Creates the functionality of the conversion widget by applying the appropriate degree formula to the user-inputted temperature.
 * @param {object} form - An HTML Form Element.
 */
function convertTemperature(form) {
  const temperature = document.getElementById("temp-to-convert");
  const cConversion = document.getElementById("to-c");
  const fConversion = document.getElementById("to-f");
  const convertedTemp = document.querySelector("#widget #result");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //checks for which radio has been checked, convertes appropriately
    if (cConversion.checked) {
      let convertedResult = (5 / 9) * (temperature.value - 32);
      convertedResult = convertedResult.toFixed(2);
      convertedTemp.innerHTML = `${convertedResult}° Celsius`;
    } else if (fConversion.checked) {
      let convertedResult = (9 / 5) * temperature.value + 32;
      convertedResult = convertedResult.toFixed(2);
      convertedTemp.innerHTML = `${convertedResult}° Fahrenheit`;
    }
    temperature.value = "";
  });
}

/**
 * Generates a list of the user's previous locations searched on the website and allows for the user to click location links to re-create past searches.
 * @param {object} object - The JSON Object fetched from API.
 * @param {object} paragraph - An HTML Paragraph Element.
 * @param {string} locationName - The Location being inputted.
 */
function addPreviousSearches(object, paragraph, locationName) {
  paragraph.remove(); //remove text that states "No previous searches"
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
      .catch(() => {});
  });
}
