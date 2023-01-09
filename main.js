let weatherForcast = document.querySelector("article");
let weatherImg = document.createElement('img');
let form = document.querySelector('form');
form.addEventListener("submit", (event) => {
  event.preventDefault();
   document.querySelector("main p").hidden = true;
 let searchedLocation = event.target.location.value;
 event.target.location.value = ''
  fetch(`https://wttr.in/${searchedLocation}?format=j1`)
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      let feelsLike = getWeatherReport(weatherForcast, json, searchedLocation);
      let ul = document.querySelector("ul");
      let previousSearch = document.createElement("li");
      let a = document.createElement("a");
      a.textContent = searchedLocation;
      a.href = `https://wttr.in/${searchedLocation}?format=j1`;
      previousSearch.textContent = feelsLike;
      previousSearch.prepend(a);
      ul.append(previousSearch);
      console.log(json);
      let previous = document.querySelector("aside.previous p");
       previous.hidden = true;
      a.addEventListener("click", (event) => {
        event.preventDefault();
        getWeatherReport(weatherForcast, json, searchedLocation);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
let getWeatherReport = (weatherForcast, json, searchedLocation) => {
     weatherForcast.innerHTML = "";
 let location = document.createElement("h2");
 location.textContent = searchedLocation;
weatherForcast.append(location);
let area = json.nearest_area[0].areaName[0].value;
let areaInfo = document.createElement("p");
weatherForcast.append(areaInfo);
 if (area.toLowerCase() === searchedLocation.toLowerCase()) {
    areaInfo.textContent = `Area: ${area}`;
  } else {
    areaInfo.textContent = `Nearest Area: ${area}`;
  } 
  let region = json.nearest_area[0].region[0].value;
regionInfo = document.createElement("p");
regionInfo.textContent = region;
weatherForcast.append(regionInfo);
let country = json.nearest_area[0].country[0].value;
countryInfo = document.createElement("p");
countryInfo.textContent = country;
 weatherForcast.append(countryInfo);
let feelsLike = ` Currently feels like ${json.current_condition[0].FeelsLikeF} °F`;
 tempInfo = document.createElement("p");
 tempInfo.textContent = feelsLike;
weatherForcast.append(tempInfo);
let chanceOfSunlight = json.weather[0].hourly[0].chanceofsunshine;
let chanceOfRain = json.weather[0].hourly[0].chanceofrain;
let chanceOfSnow = json.weather[0].hourly[0].chanceofsnow;
let sunlight = document.createElement("p");
sunlight.textContent = `Chance of Sunshine ${chanceOfSunlight}%`;
weatherForcast.append(sunlight);
let rainfall = document.createElement("p");
rainfall.textContent = `Chance of Rain ${chanceOfRain}%`;
weatherForcast.append(rainfall);
  let snowfall = document.createElement("p");
  snowfall.textContent = `Chance of Snow ${chanceOfSnow}%`;
  weatherForcast.append(snowfall);
  for (let i = 0; i < json.weather[0].hourly.length; i++) {
    if (Number(json.weather[0].hourly[i].chanceofsunshine) > 50) {
      weatherImg.src = "./assets/icons8-summer.gif";
      weatherImg.alt = "sun";
    }
    if (Number(json.weather[0].hourly[i].chanceofrain) > 50) {
      weatherImg.src = "./assets/icons8-torrential-rain.gif";
      ("https://img.freepik.com/free-photo/rainy-day-icon-3d-render-illustration-style_516190-319.jpg?w=996");
      weatherImg.alt = "rain";
    }
    if (Number(json.weather[0].hourly[i].chanceofsnow) > 50) {
      weatherImg.src = "./assets/icons8-light-snow.gif";
      weatherImg.alt = "snow";
    }
  }
  weatherForcast.prepend(weatherImg);
  let articles = document.querySelectorAll("aside article");
  let forecast = ["Today ", "Tomorrow ", "Day After Tomorrow "];
  for (let i = 0; i < articles.length; i++) {
    articles[i].innerHTML = " ";
    let days = document.createElement("p");
    days.textContent = forecast[i];
    let avgTemp = document.createElement("p");
    avgTemp.textContent = `Average Temperature: ${json.weather[i].avgtempF} °F`;
    let maxTemp = document.createElement("p");
    maxTemp.textContent = `Max Temperature: ${json.weather[i].maxtempF} °F`;
    let minTemp = document.createElement("p");
    minTemp.textContent = `Min Temperature: ${json.weather[i].mintempF} °F`;
    articles[i].append(days, avgTemp, maxTemp, minTemp);
  }
  return feelsLike;
};
let conAside = document.querySelector("aside.aside form");
conAside.addEventListener("submit", (event) => {
  event.preventDefault();
  let temp = event.target.querySelector("#temp-to-convert").value;
  let conType = event.target.querySelectorAll(".temperature");
  console.log("This is type:", conType);
  if (conType[0].checked) {
    let celcius = ((temp - 32) * 5) / 9;
    event.target.querySelector("h4").textContent = `${celcius.toFixed(2)} °C`;
  } else if (conType[1].checked) {
    let fahreinheit = (temp * 9) / 5 + 32;
    event.target.querySelector("h4").textContent = `${fahreinheit.toFixed(
      2
    )} °F`;
  }
});
