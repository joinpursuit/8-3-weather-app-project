const base_url = "https://wttr.in/";
const weatherSearchForm = document.querySelector("#weatherSearch");
const tempConverter = document.querySelector("#converter");
const weatherReport = document.querySelector("#weatherReport");
const weatherForecasts = document.querySelectorAll(".forecast");
const searchHistory = document.querySelector("#searchHistory");

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
        weatherData
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

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

function generateWeatherReport(inputLocation, weatherReport, weatherData) {
  weatherReport.innerHTML = "";

  let location = document.createElement("h2");
  location.textContent = inputLocation;
  weatherReport.append(location);

  let area = document.createElement("p");
  location === weatherData.area
    ? (area.textContent = `Area: ${weatherData.area}`)
    : (area.textContent = ` Nearest Area: ${weatherData.area}`);
  weatherReport.append(area);

  let region = document.createElement("p");
  region.textContent = `Region: ${weatherData.region}`;
  weatherReport.append(region);

  let country = document.createElement("p");
  country.textContent = `Country: ${weatherData.country}`;
  weatherReport.append(country);

  let currentFeelsLikeF = document.createElement("p");
  currentFeelsLikeF.textContent = `Currently: Feels Like ${weatherData.currentFeelsLikeF}°F `;
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
  chanceOfSunShine.textContent = `Chance of Sunshine: ${chanceOfSunShineAvg.toFixed(
    2
  )}`;
  weatherReport.append(chanceOfSunShine);

  let chanceOfRain = document.createElement("p");
  chanceOfRain.textContent = `Chance of Rain: ${chanceOfRainAvg.toFixed(2)}`;
  weatherReport.append(chanceOfRain);

  let chanceOfSnow = document.createElement("p");
  chanceOfSnow.textContent = `Chance of Snow: ${chanceOfSnowAvg.toFixed(2)}`;
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
  } else if (highestChanceOfRain > 50) {
    icon.src = "./assets/icons8-torrential-rain.gif";
    icon.alt = "rain";
  } else if (highestChanceOfSnow > 50) {
    icon.alt = "snow";
    icon.src = "./assets/icons8-light-snow.gif";
  }

  weatherReport.prepend(icon);
}

function generateWeatherForecast(weatherForecasts, weatherData) {
  for (let i = 0; i < weatherForecasts.length; i++) {
    weatherForecasts[i].innerHTML = "";
    let date = document.createElement("p");
    date.textContent = weatherData.weatherOfThreeDays[i].date;
    let avgTempF = document.createElement("p");
    avgTempF.textContent = `Average Temperature: ${weatherData.weatherOfThreeDays[i].avgTempF}°F `;
    let maxTempF = document.createElement("p");
    maxTempF.textContent = `Max Temperature: ${weatherData.weatherOfThreeDays[i].maxTempF}°F `;
    let minTempF = document.createElement("p");
    minTempF.textContent = `Min Temperature: ${weatherData.weatherOfThreeDays[i].minTempF}°F `;
    weatherForecasts[i].append(date, avgTempF, maxTempF, minTempF);
    weatherForecasts[i].hidden = false;
  }
}

function addSearchHistory(
  location,
  searchHistory,
  weatherReport,
  weatherForecasts,
  weatherData
) {
  let currentFeelsLikeF = weatherData.currentFeelsLikeF;

  let li = document.createElement("li");
  let a = document.createElement("a");
  a.textContent = location;
  a.href = `${base_url}${location}?format=j1`;

  li.textContent = ` ${currentFeelsLikeF}`;
  li.prepend(a);

  let seachHistoryList = searchHistory.querySelector("ul");
  seachHistoryList.append(li);

  searchHistory.querySelector("p").hidden = true;

  a.addEventListener("click", (event) => {
    event.preventDefault();
    generateWeatherReport(location, weatherReport, weatherData);

    generateWeatherForecast(weatherForecasts, weatherData);
  });
}

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
    displayConvertedTemp.textContent = (((temperature - 32) * 5) / 9).toFixed(
      2
    );
  } else {
    displayConvertedTemp.textContent = ((temperature * 9) / 5 + 32).toFixed(2);
  }
});
