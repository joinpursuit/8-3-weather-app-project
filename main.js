//const { file } = require("tmp");

//console.log('hello world');
const form = document.querySelector("#choose-a-location");
//let userCity = ""

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let userCity = event.target["search-bar"].value;
  weatherDisplay(userCity);
});

function weatherDisplay(userInput) {
  // console.log(city)
  // let url = `https://wttr.in/Melbourne?format=j1`
  fetch(`https://wttr.in/${userInput}?format=j1`)
    .then((res) => res.json())
    .then((file) => {
    //   const converter = document.querySelector("form.converter");

      const currentWeather = document.querySelector("article.current-weather");
      let city = document.createElement("h2");
      city.textContent = userInput;
      city.textContent = userInput;
      currentWeather.append(city);

      let area = document.createElement("p");
      area.innerHTML =
        file.nearest_area[0].areaName[0].value.toLowerCase() ===
        userInput.toLowerCase()
          ? `<strong>area:</strong>${file.nearest_area[0].areaName[0].value}`
          : `<strong>Nearest Area:</strong>${file.nearest_area[0].areaName[0].value}`;

      currentWeather.append(area);

      let region = document.createElement("p");
      region.innerHTML = `<strong>Region:</strong> ${file.nearest_area[0].region[0].value}`;
      currentWeather.append(region);

      let country = document.createElement("p");
      country.innerHTML = `<strong>Country</strong> ${file.nearest_area[0].country[0].value}`;
      currentWeather.append(country);

      let currently = document.createElement("p");
      currently.innerHTML = `<strong>Currently</strong> Feels Like ${file.current_condition[0].FeelsLikeF}°F`;
      currentWeather.append(currently);

      let today = document.querySelector("article.today-weather");
      let todayText = document.createElement("h4");
      todayText.textContent = "Today";
      today.append(todayText);

      let avgToday = document.createElement("p");
      avgToday.innerHTML = `<strong>Average Temperature:</strong> ${file.weather[0].avgtempF}°F`;
      today.append(avgToday);

      let maxToday = document.createElement("p");
      maxToday.innerHTML = `<strong>Max Temperature:</strong> ${file.weather[0].maxtempF}°F`;
      today.append(maxToday);

      let minToday = document.createElement("p");
      minToday.innerHTML = `<strong>Min Temperature:</strong> ${file.weather[0].mintempF}°F`;
      today.append(minToday);

      let tomorrow = document.querySelector("article.tomorrow-weather");
      let tomorrowText = document.createElement("h4");
      tomorrowText.textContent = "Tomorrow";
      tomorrow.append(tomorrowText);

      let avgTomorrow = document.createElement("p");
      avgTomorrow.innerHTML = `<strong>Average Temperature</strong> ${file.weather[1].avgtempF}°F`;
      tomorrow.append(avgTomorrow);

      let maxTomorrow = document.createElement("p");
      maxTomorrow.innerHTML = `<strong>Max Temperature</strong> ${file.weather[1].maxtempF}°F`;
      tomorrow.append(maxTomorrow);

      let minTomorrow = document.createElement("p");
      minTomorrow.innerHTML = `<strong>Min Temperature</strong> ${file.weather[1].mintempF}°F`;
      tomorrow.append(minTomorrow);

      //let dayAfterTomorrow = document.querySelector("article.//day-after-tomorrow-weather");
      //l//et dayAfterTomorrowText = document.createElement("h4")
      //dayAfterTomorrowText.textContent="Day After Tomorrow";
      //dayAfterTomorrow.append(dayAfterTomorrow);
      let chanceofsunshine = document.createElement("p");
      chanceofsunshine.innerHTML = `<strong>Chance of Sunshine</strong> ${file.weather[0].hourly[0].chanceofsunshine}`;
      currentWeather.append(chanceofsunshine);

      let chanceOfRain = document.createElement("p");
      chanceOfRain.innerHTML = `<strong>Chance of Rain</strong> ${file.weather[0].hourly[0].chanceofrain}`;
      currentWeather.append(chanceOfRain);

      let chanceOfSnow = document.createElement("p");
      chanceOfSnow.innerHTML = `<strong>Chance of Snow</strong> ${file.weather[0].hourly[0].chanceofsnow}`;
      currentWeather.append(chanceOfSnow);

      let img = document.createElement("img");
      if (file.weather[0].hourly[0].chanceofsunshine > 50) {
        img.setAttribute("alt", "sun");
        img.setAttribute("src", "./assets/icons8-summer.gif");
      } else if (file.weather[0].hourly.chanceofrain > 50) {
        img.setAttribute("alt", "rain");
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
      } else if (file.weather[0].hourly[0].chanceofsnow > 50) {
        img.setAttribute("alt", "snow");
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
      }

      currentWeather.prepend(img);
    })
    .catch((err) => console.log(err));
}

const clear_defaults = () => {
  document
    .querySelectorAll(".defaults")
    .forEach((item) => item.classList.add("hidden"));
  document.querySelectorAll("weather").forEach((item) => (item.innerHTML = ""));
};


    // let result = document.querySelector("h4.converted-temp");
    // let convertC = document.getElementById("to-c");
    // let convertF = document.getElementById("tof");
    // let originalNumber = document.querySelector("#temp-to-convert");
    
    // if (convertC) {
    //     result.textContent = `${((originalNumber.value - 32) / 1.8).toFixed(2)}`;

    // }else if (convertF){
    //     result.textContent = `${((originalNumber.value * 1.8 + 32) .toFixed(2))}`;
    // }
