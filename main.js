//const { file } = require("tmp");

//console.log('hello world');
const form = document.querySelector("#choose-a-location");
//let userCity = ""

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let userCity = event.target["search-bar"].value;
  weatherDisplay(userCity);
});

function addToPreviousSearch(userInput, currentTemp){
  let ul = document.querySelector("ul");
}





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

      let tomorrow = document.querySelector(".tomorrow-weather");
      let tomorrowText = document.createElement("h4");
      tomorrowText.textContent = "Tomorrow";
      tomorrow.append(tomorrowText);

      let avgTomorrow = document.createElement("p");
      avgTomorrow.innerHTML = `<strong>Average Temperature:</strong> ${file.weather[1].avgtempF}°F`;
      tomorrow.append(avgTomorrow);

      let maxTomorrow = document.createElement("p");
      maxTomorrow.innerHTML = `<strong>Max Temperature:</strong> ${file.weather[1].maxtempF}°F`;
      tomorrow.append(maxTomorrow);

      let minTomorrow = document.createElement("p");
      minTomorrow.innerHTML = `<strong>Min Temperature:</strong> ${file.weather[1].mintempF}°F`;
      tomorrow.append(minTomorrow);

    let dayAfterTomorrow = document.querySelector(".day-after-tomorrow-weather");
      let dayAfterTomorrowText = document.createElement("h4")
      dayAfterTomorrowText.textContent="Day After Tomorrow";
      dayAfterTomorrow.append(dayAfterTomorrowText);

      let avgDayAfterTomorrow = document.createElement("p");
      avgDayAfterTomorrow.innerHTML = `<strong> Average Temperature:</strong> ${file.weather[2].avgtempF}°F`;
      dayAfterTomorrow.append(avgDayAfterTomorrow);

      let maxDayAfterTomorrow = document.createElement("p");
      maxDayAfterTomorrow.innerHTML = `<strong>Max Temperature:</strong> ${file.weather[2].maxtempF}°F`;
      dayAfterTomorrow.append(maxDayAfterTomorrow);

      let minDayAfterTomorrow = document.createElement("p");
      minDayAfterTomorrow.innerHTML = `<strong>Min Temperature:</strong> ${ file.weather[2].mintempF}°F`;
      dayAfterTomorrow.append(minDayAfterTomorrow);


      let chanceofsunshine = document.createElement("p");
      chanceofsunshine.innerHTML = `<strong>Chance of Sunshine</strong> ${file.weather[0].hourly[0].chanceofsunshine}`;
      currentWeather.append(chanceofsunshine);

      let chanceofrain = document.createElement("p");
      chanceofrain.innerHTML = `<strong>Chance of Rain</strong> ${file.weather[0].hourly[0].chanceofrain}`;
      currentWeather.append(chanceofrain);

      let chanceofsnow = document.createElement("p");
      chanceofsnow.innerHTML = `<strong>Chance of Snow</strong> ${file.weather[0].hourly[0].chanceofsnow}`;
      currentWeather.append(chanceofsnow);

      let img = document.createElement("img");
      if (file.weather[0].hourly[0].chanceofsunshine > 50) {
        img.setAttribute("alt", "sun");
        img.setAttribute("src", "./assets/icons8-summer.gif");
      } else if (file.weather[0].hourly[0].chanceofrain > 50) {
        img.setAttribute("alt", "rain");
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
      } else if (file.weather[0].hourly[0].chanceofsnow > 50) {
        img.setAttribute("alt", "snow");
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
      }

      currentWeather.prepend(img);

      if (shouldIAdd){
        addToPreviousSearch(userInput, file.current_condition[0].FeelsLikeF)
      }


    })
    .catch((err) => console.log(err));
}
// const addPrevSearch =(userInput) =>{
//   let previousSearchList =document.querySelector("aside.weather-history ul");
//   let listItem =document.createElement("li");

//   listItem.innerHTML= `<a href="#">${userInput}</a> -${file.current_condition[0].FeelsLikeF}°F}`;
//   previousSearchList.append(listItem);
  
//   listItem.addEventListener("submit", (event)=>{
//     event.preventDefault();
//     fetch(`https://wttr.in/${userInput}?format=j1`)
//     .then((res)=> res.json())
//     .then((json)=> {
//       cleardefaults();
//       addWeather(json, userInput);
// })
// .catch((err)=> console.log(err));
//  })
// };


const clear_defaults = () => {
  document
    .querySelectorAll(".defaults")
    .forEach((item) => item.classList.add("hidden"));
  document.querySelectorAll("weather").forEach((item) => (item.innerHTML = ""));
};
// converter.addEventListener("submit", (event) => {
//   event.preventDefault();



