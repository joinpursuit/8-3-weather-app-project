const weatherForm = document.getElementById("weather-form");
const input = document.querySelector("#user-input");

// Main Weather Display
const mainImage = document.querySelector("img");
const main = document.querySelector(".main");
const startMessage = document.querySelector("#start-message");
const current = document.querySelector("#current");
const locationHeader = document.querySelector("#location-header");
const mainDisplay = document.querySelector("#main-display");
const area = document.querySelector("#area");
const region = document.querySelector("#region");
const country = document.querySelector("#country");
const currently = document.querySelector("#currently");
const sunshine = document.querySelector("#sunshine");
const rain = document.querySelector("#rain");
const snow = document.querySelector("#snow");

//Previous List Variables
const previous = document.querySelector(".previous");
const list = document.querySelector("#list");
const previousMessage = document.querySelector("#previous-start");

// Today Weather Section
const today = document.querySelector("#today");
const todayAvgTemp = document.querySelector("#today-avg");
const todayMaxTemp = document.querySelector("#today-max");
const todayMinTemp = document.querySelector("#today-min");

// Tomorrow Weather Section
const tomorrow = document.querySelector("#tomorrow");
const tomorrowAvgTemp = document.querySelector("#tomorrow-avg");
const tomorrowMaxTemp = document.querySelector("#tomorrow-max");
const tomorrowMinTemp = document.querySelector("#tomorrow-min");

// Day After Weather Section
const dayAfter = document.querySelector("#day-after");
const dayAfterAvgTemp = document.querySelector("#after-avg");
const dayAfterMaxTemp = document.querySelector("#after-max");
const dayAfterMinTemp = document.querySelector("#after-min");

//conversion tool
const ConvertSide = document.querySelector("#aside");
const convert = document.querySelector("#convert");
const tempToConvert = document.querySelector("#temp-to-convert");
const toC = document.querySelector("#to-c");
const toF = document.querySelector("#to-f");
const converted = document.querySelector("#converted");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let inputSearch = input.value;
  let city = inputSearch;
  //getting weather data from API
  fetch(`https://v3.wttr.in/${inputSearch}?format=j1`)
    .then((res) => res.json())
    .then((res) => {
      let weather = res;
      console.log(weather, res);

      startMessage.style.display = "none";
      previousMessage.style.display = "none";
      // startMessage.classList.add("hidden");
      mainDisplay.removeAttribute("hidden");
      convert.removeAttribute("hidden");

      locationHeader.innerHTML = city;

      if (city != `${weather.nearest_area[0].areaName[0].value}`) {
        area.innerHTML = `<strong>Nearest Area: </strong>${weather.nearest_area[0].areaName[0].value}`;
      } else {
        area.innerHTML = `<strong>Area: </strong>${weather.nearest_area[0].areaName[0].value}`;
      }

      locationHeader.innerHTML = `<b>${weather.nearest_area[0].areaName[0].value}</b>`;
      region.innerHTML = `<b>Region: </b>${weather.nearest_area[0].region[0].value}`;
      country.innerHTML = `<b>Country: </b>${weather.nearest_area[0].country[0].value}`;
      currently.innerHTML = `<b> Currently: </b> Feels Like ${weather.weather[2].mintempF}° F`;
      sunshine.innerHTML = `<b> Chance of Sunshine: </b>${weather.weather[0].hourly[0].chanceofsunshine}`;
      rain.innerHTML = `<b> Chance of Rain: </b>${weather.weather[0].hourly[0].chanceofrain}`;
      snow.innerHTML = `<b> Chance of Snow: </b>${weather.weather[0].hourly[0].chanceofsnow}`;
      console.log(rain, snow, sunshine);

      // today.classList.remove("hidden");
      // tomorrow.classList.remove("hidden");
      // dayAfter.classList.remove("hidden");

      today.removeAttribute("hidden");
      tomorrow.removeAttribute("hidden");
      dayAfter.removeAttribute("hidden");

      todayAvgTemp.innerHTML = `<b> Average Temperature: </b> ${weather.weather[0].avgtempF}°F`;
      todayMaxTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[0].maxtempF}°F`;
      todayMinTemp.innerHTML = `<b> Min Temperature: </b> ${weather.weather[0].mintempF}°F`;

      tomorrowAvgTemp.innerHTML = `<b> Average Temperature: </b> ${weather.weather[1].avgtempF}°F`;
      tomorrowMaxTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[1].maxtempF}°F`;
      tomorrowMinTemp.innerHTML = `<b> Min Temperature: </b> ${weather.weather[1].mintempF}°F`;

      dayAfterAvgTemp.innerHTML = `<b> Average Temperature: </b> ${weather.weather[2].avgtempF}°F`;
      dayAfterMaxTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[2].maxtempF}°F`;
      dayAfterMinTemp.innerHTML = `<b> Min Temperature: </b> ${weather.weather[2].mintempF}°F`;

      // previousMessage.classList.add("hidden");
      previousMessage.removeAttribute("hidden");
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="#${inputSearch}">${city}</a> - ${weather.current_condition[0].FeelsLikeF}°F`;
      list.append(listItem);

      if (weather.weather[0].hourly[0].chanceofsunshine > 50) {
        mainImage.classList.remove("hidden");
        mainImage.src = "./assets/icons8-summer.gif";
        mainImage.alt = "sun";
        mainDisplay.prepend(mainImage);
      } else if (weather.weather[0].hourly[0].chanceofrain > 50) {
        mainImage.classList.remove("hidden");
        mainImage.src = "./assets/icons8-torrential-rain.gif";
        mainImage.alt = "rain";
        mainDisplay.prepend(mainImage);
      } else if (weather.weather[0].hourly[0].chanceofsnow > 50) {
        mainImage.classList.remove("hidden");
        mainImage.src = "./assets/icons8-light-snow.gif";
        imagemainImage.alt = "snow";
        mainDisplay.prepend(mainImage);
      } else {
        mainImage.classList.add("hidden");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  weatherForm.reset();
});
convert.addEventListener("submit", (e) => {
  e.preventDefault();

  let found = 0;
  if (toC.checked) {
    found = (tempToConvert.value - 32) * (5 / 9);
  }
  if (toF.checked) {
    found = (tempToConvert.value * 9) / 5 + 32;
  }

  converted.innerHTML = found.toFixed(2);
});
