const base_url = "https://wttr.in/";
const weatherSearchForm = document.querySelector("#weatherSearch");
const tempConverter = document.querySelector("#converter");
const weatherReport = document.querySelector("#weatherReport");
const weatherForecasts = document.querySelectorAll(".forecast");
const searchHistory = document.querySelector("#searchHistory");
const background_img = document.querySelector("html");

//after user input location and submit, webpage will display weather data of given location
weatherSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let location = event.target.location.value;
  event.target.location.value = "";
  let search_url = `${base_url}${location}?format=j1`;

  tempConverter.hidden = false;

  fetch(search_url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let weatherData = parseJsonData(json);
      generateWeatherReport(location, weatherReport, weatherData);

      generateWeatherForecast(weatherForecasts, weatherData);

      addSearchHistory(
        location,
        searchHistory,
        weatherReport,
        weatherForecasts,
        weatherData,
        search_url
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 * Parse json object into weatherData with the data needed
 * @param {Object} json - A json object that contains all the info of user input location
 * @returns {Object} weatherData - An object contains all the needed weather data
 */
function parseJsonData(json) {
  let area = json.nearest_area[0].areaName[0].value;
  let region = json.nearest_area[0].region[0].value;
  let country = json.nearest_area[0].country[0].value;
  let currentFeelsLikeF = json.current_condition[0].FeelsLikeF;
  let hourly = json.weather[0].hourly;
  let weatherOfToday = {
    date: "Today",
    avgTempF: json.weather[0].avgtempF,
    maxTempF: json.weather[0].maxtempF,
    minTempF: json.weather[0].mintempF,
  };
  let weatherOfTomorrow = {
    date: "Tomorrow",
    avgTempF: json.weather[1].avgtempF,
    maxTempF: json.weather[1].maxtempF,
    minTempF: json.weather[1].mintempF,
  };
  let weatherOfDayAfterTomorrow = {
    date: "Day After Tomorrow",
    avgTempF: json.weather[2].avgtempF,
    maxTempF: json.weather[2].maxtempF,
    minTempF: json.weather[2].mintempF,
  };

  let weatherData = {
    area,
    region,
    country,
    currentFeelsLikeF,
    hourly,
    weatherOfThreeDays: [
      weatherOfToday,
      weatherOfTomorrow,
      weatherOfDayAfterTomorrow,
    ],
  };

  return weatherData;
}

/**
 * display the input location's weather information on the webpage
 * @param {string} inputLocation -The user input location
 * @param {DOM object} weatherReport -the place in the webpage where display our weather data
 * @param {Object} weatherData - the weather data of given location
 */
function generateWeatherReport(inputLocation, weatherReport, weatherData) {
  weatherReport.innerHTML = "";

  let location = document.createElement("h2");
  location.textContent = inputLocation;
  weatherReport.append(location);

  let area = document.createElement("p");
  inputLocation.toLowerCase() === weatherData.area.toLowerCase()
    ? (area.innerHTML = `<strong>Area:</strong> ${weatherData.area}`)
    : (area.innerHTML = `<strong>Nearest Area:</strong> ${weatherData.area}`);
  weatherReport.append(area);

  let region = document.createElement("p");
  region.innerHTML = `<strong>Region:</strong> ${weatherData.region}`;
  weatherReport.append(region);

  let country = document.createElement("p");
  country.innerHTML = `<strong>Country:</strong> ${weatherData.country}`;
  weatherReport.append(country);

  let currentFeelsLikeF = document.createElement("p");
  currentFeelsLikeF.innerHTML = `<strong>Currently:</strong> Feels Like ${weatherData.currentFeelsLikeF}°F `;
  weatherReport.append(currentFeelsLikeF);

  let chanceOfSunShineAvg =
    weatherData.hourly.reduce((acc, ele) => {
      return (acc += Number(ele.chanceofsunshine));
    }, 0) / weatherData.hourly.length;
  let chanceOfRainAvg =
    weatherData.hourly.reduce((acc, ele) => {
      return (acc += Number(ele.chanceofrain));
    }, 0) / weatherData.hourly.length;
  let chanceOfSnowAvg =
    weatherData.hourly.reduce((acc, ele) => {
      return (acc += Number(ele.chanceofsnow));
    }, 0) / weatherData.hourly.length;

  let chanceOfSunShine = document.createElement("p");
  chanceOfSunShine.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceOfSunShineAvg.toFixed(
    2
  )}`;
  weatherReport.append(chanceOfSunShine);

  let chanceOfRain = document.createElement("p");
  chanceOfRain.innerHTML = `<strong>Chance of Rain:</strong> ${chanceOfRainAvg.toFixed(
    2
  )}`;
  weatherReport.append(chanceOfRain);

  let chanceOfSnow = document.createElement("p");
  chanceOfSnow.innerHTML = `<strong>Chance of Snow:</strong> ${chanceOfSnowAvg.toFixed(
    2
  )}`;
  weatherReport.append(chanceOfSnow);

  let highestChanceOfSunshine = weatherData.hourly.reduce((acc, ele) => {
    return acc > Number(ele.chanceofsunshine)
      ? acc
      : (acc = Number(ele.chanceofsunshine));
  }, 0);

  let highestChanceOfRain = weatherData.hourly.reduce((acc, ele) => {
    return acc > Number(ele.chanceofrain)
      ? acc
      : (acc = Number(ele.chanceofrain));
  }, 0);

  let highestChanceOfSnow = weatherData.hourly.reduce((acc, ele) => {
    return acc > Number(ele.chanceofsnow)
      ? acc
      : (acc = Number(ele.chanceofsnow));
  }, 0);

  let icon = document.createElement("img");
  if (highestChanceOfSunshine > 50) {
    icon.src = "./assets/icons8-summer.gif";
    icon.alt = "sun";
    background_img.style.backgroundImage = "url('./assets/sunny.jpeg')";
  }
  if (highestChanceOfRain > 50) {
    icon.src = "./assets/icons8-torrential-rain.gif";
    icon.alt = "rain";
    background_img.style.backgroundImage = "url('./assets/rainy.png')";
  }
  if (highestChanceOfSnow > 50) {
    icon.alt = "snow";
    icon.src = "./assets/icons8-light-snow.gif";
    background_img.style.backgroundImage = "url('./assets/snowy.jpg')";
  } else {
    background_img.backgroundImage = 'url("./assets/mountain.jpg")';
  }

  weatherReport.prepend(icon);
}

/**
 * Display 3 days weather forecasts on the webpage
 * @param {DOM object} weatherForecasts -the place in the webpage where display our 3 days weather forecasts
 * @param {object} weatherData - the weather data of given location
 */
function generateWeatherForecast(weatherForecasts, weatherData) {
  for (let i = 0; i < weatherForecasts.length; i++) {
    weatherForecasts[i].innerHTML = "";
    let date = document.createElement("p");
    date.textContent = weatherData.weatherOfThreeDays[i].date;
    let avgTempF = document.createElement("p");
    avgTempF.innerHTML = `<strong>Average Temperature:</strong> ${weatherData.weatherOfThreeDays[i].avgTempF}°F`;
    let maxTempF = document.createElement("p");
    maxTempF.innerHTML = `<strong>Max Temperature:</strong> ${weatherData.weatherOfThreeDays[i].maxTempF}°F`;
    let minTempF = document.createElement("p");
    minTempF.innerHTML = `<strong>Min Temperature:</strong> ${weatherData.weatherOfThreeDays[i].minTempF}°F`;
    weatherForecasts[i].append(date, avgTempF, maxTempF, minTempF);
    weatherForecasts[i].hidden = false;
  }
}

/**
 * After user search a location, add that location into the search history, if the user click on the search
 * history link, display the informations of that location on the webpage again.
 *
 * @param {string} location -the user input location
 * @param {DOM object} searchHistory - place to store the search history
 * @param {DOM object} weatherReport -the place in the webpage where display our weather data
 * @param {DOM object} weatherForecasts -the place in the webpage where display our 3 days weather forecasts
 * @param {object} weatherData -the weather data of given location
 * @param {string} search_url -the url fetch for weather informations
 */
function addSearchHistory(
  location,
  searchHistory,
  weatherReport,
  weatherForecasts,
  weatherData,
  search_url
) {
  let currentFeelsLikeF = weatherData.currentFeelsLikeF;

  let li = document.createElement("li");
  let a = document.createElement("a");
  a.textContent = location;
  a.href = `${base_url}${location}?format=j1`;

  li.textContent = ` - ${currentFeelsLikeF}°F `;
  li.prepend(a);

  let seachHistoryList = searchHistory.querySelector("ul");
  seachHistoryList.append(li);

  searchHistory.querySelector("p").hidden = true;

  a.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(search_url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let weatherData = parseJsonData(json);
        generateWeatherReport(location, weatherReport, weatherData);

        generateWeatherForecast(weatherForecasts, weatherData);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  let removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  li.append(removeBtn);

  removeBtn.addEventListener("click", (event) => {
    li.remove();
  });
}

//allows user to convert temp from F to C, or C to F
tempConverter.addEventListener("submit", (event) => {
  event.preventDefault();
  let temperature = Number(document.querySelector("#temp-to-convert").value);
  let displayConvertedTemp = document.querySelector("#display-converted-temp");
  //https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
  let conversionTypes = document.querySelectorAll(".convert-temp");
  let conversionType = "";
  for (let type of conversionTypes) {
    if (type.checked) {
      conversionType = type.value;
      break;
    }
  }

  if (conversionType === "c") {
    displayConvertedTemp.textContent = `${(
      ((temperature - 32) * 5) /
      9
    ).toFixed(2)} °C`;
  } else {
    displayConvertedTemp.textContent = `${((temperature * 9) / 5 + 32).toFixed(
      2
    )} °F`;
  }
});
