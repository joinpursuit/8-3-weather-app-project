const base_url = "https://wttr.in/";
const weatherSearchForm = document.querySelector("form#weatherSearch");
const icon = document.createElement("img");
const tempConverter = document.querySelector("#converter");
const weatherReport = document.querySelector("main article#weatherReport");
const weatherSearchInput = document.querySelector("form input#location");
const weatherForecasts = document.querySelectorAll(".forecast");

weatherSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let location = weatherSearchInput.value;
  weatherSearchInput.value = "";

  weatherReport.innerHTML = "";
  weatherReport.append(icon);

  let search_url = `${base_url}${location}?format=j1`;

  fetch(search_url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let weatherData = parseJsonData(json);
      generateWeatherReport(location, weatherReport, weatherData);

      generateWeatherForecast(weatherForecasts, weatherData);

      let section = document.querySelector("section");
      if (section.querySelector("p") !== null) {
        section.querySelector("p").remove();
      }
      let sidebar = document.querySelector("ul");
      addSearchResult(
        location,
        weatherReport,
        weatherForecasts,
        sidebar,
        weatherData
      );
      section.append(sidebar);
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
  currentFeelsLikeF.textContent = `Currently: ${weatherData.currentFeelsLikeF}`;
  weatherReport.append(currentFeelsLikeF);

  let chanceOfSunShine =
    weatherData.hourly.reduce((acc, ele) => {
      return (acc += Number(ele.chanceofsunshine));
    }, 0) / 8;
  let chanceOfRain =
    weatherData.hourly.reduce((acc, ele) => {
      return (acc += Number(ele.chanceofrain));
    }, 0) / 8;
  let chanceOfSnow =
    weatherData.hourly.reduce((acc, ele) => {
      return (acc += Number(ele.chanceofsnow));
    }, 0) / 8;

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

  console.log(highestChanceOfSunshine);

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

  let sunshine = document.createElement("p");
  sunshine.textContent = `Chance of Sunshine: ${chanceOfSunShine}`;
  weatherReport.append(sunshine);

  let rain = document.createElement("p");
  rain.textContent = `Chance of Rain: ${chanceOfRain}`;
  weatherReport.append(rain);

  let snow = document.createElement("p");
  snow.textContent = `Chance of Snow: ${chanceOfSnow}`;
  weatherReport.append(snow);
}

function generateWeatherForecast(weatherForecasts, weatherData) {
  for (let i = 0; i < weatherForecasts.length; i++) {
    weatherForecasts[i].innerHTML = "";
    let date = document.createElement("p");
    date.textContent = weatherData.weatherOfThreeDays[i].date;
    let avgTempF = document.createElement("p");
    avgTempF.textContent = weatherData.weatherOfThreeDays[i].avgTempF;
    let maxTempF = document.createElement("p");
    maxTempF.textContent = weatherData.weatherOfThreeDays[i].maxTempF;
    let minTempF = document.createElement("p");
    minTempF.textContent = weatherData.weatherOfThreeDays[i].minTempF;
    weatherForecasts[i].append(date, avgTempF, maxTempF, minTempF);
  }
}

function addSearchResult(
  location,
  weatherReport,
  weatherForecasts,
  sidebar,
  weatherData
) {
  //console.log(weatherData);
  let currentFeelsLikeF = weatherData.currentFeelsLikeF;
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.textContent = location;
  a.href = `${base_url}${location}?format=j1`;

  li.textContent = `${currentFeelsLikeF}`;
  li.prepend(a);

  a.addEventListener("click", (event) => {
    event.preventDefault();
    weatherReport.innerHTML = "";
    generateWeatherReport(location, weatherReport, weatherData);

    generateWeatherForecast(weatherForecasts, weatherData);
  });
  //console.log(li);
  sidebar.append(li);
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
