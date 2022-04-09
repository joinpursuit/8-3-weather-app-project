const base_url = "https://wttr.in/";
const form = document.querySelector("form");
const icon = document.createElement("img");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let location = document.querySelector("#location").value;
  document.querySelector("#location").value = "";

  let article = document.querySelector("article");
  article.innerHTML = "";

  article.append(icon);

  let search_url = `${base_url}${location}?format=j1`;
  fetch(search_url)
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((json) => {
      //console.log(json);

      generateWeatherReport(location, article, json);

      let articles = document.querySelectorAll(".forecast");
      generateWeatherForecast(articles, json);
      //article.append(weatherReport);

      let section = document.querySelector("section");
      if (section.querySelector("p") !== null) {
        section.querySelector("p").remove();
      }
      let sidebar = document.querySelector("ul");
      addSearchResult(location, sidebar, json);
      section.append(sidebar);
    })
    .catch((error) => {
      console.log(error);
    });
});

function generateWeatherReport(location, article, weatherData) {
  let h2 = document.createElement("h2");
  h2.textContent = location;
  article.append(h2);

  let area = weatherData.nearest_area[0].areaName[0].value;
  let region = weatherData.nearest_area[0].region[0].value;
  let country = weatherData.nearest_area[0].country[0].value;
  let currentFeelsLikeF = weatherData.current_condition[0].FeelsLikeF;
  // console.log(area, region, country, currentFeelsLikeF);

  // let h2 = document.createElement("h2");
  // h2.textContent = location;
  // article.append(h2);

  let p2 = document.createElement("p");
  location === area
    ? (p2.textContent = `Area: ${area}`)
    : (p2.textContent = ` Nearest Area ${area}`);
  article.append(p2);

  let p3 = document.createElement("p");
  p3.textContent = `Region: ${region}`;
  article.append(p3);

  let p4 = document.createElement("p");
  p4.textContent = `Country: ${country}`;
  article.append(p4);

  let p5 = document.createElement("p");
  p5.textContent = `Currently: ${currentFeelsLikeF}`;
  article.append(p5);

  // let currentHour = new Date(
  //   weatherData.current_condition[0].localObsDateTime
  // ).getHours();

  let currentHour = new Date().getHours();
  // console.log(typeof currentHour);
  //console.log(weatherData.weather[0].hourly);
  //console.log(currentHour);
  let chanceOfSunShine =
    weatherData.weather[0].hourly[currentHour % 3].chanceofsunshine;
  let chanceOfRain =
    weatherData.weather[0].hourly[currentHour % 3].chanceofrain;
  let chanceOfSnow =
    weatherData.weather[0].hourly[currentHour % 3].chanceofsnow;

  if (chanceOfSunShine > 50) {
    icon.src = "./assets/icons8-summer.gif";
    icon.alt = "sun";
  } else if (chanceOfRain > 50) {
    icon.src = "./assets/icons8-torrential-rain.gif";
    icon.alt = "rain";
  } else if (chanceOfSnow > 50) {
    icon.alt = "snow";
    icon.src = "./assets/icons8-light-snow.gif";
  }

  let sunshine = document.createElement("p");
  article.append(sunshine);
  sunshine.textContent = `Chance of Sunshine: ${chanceOfSunShine}`;

  let rain = document.createElement("p");
  article.append(rain);
  rain.textContent = `Chance of Rain: ${chanceOfRain}`;

  let snow = document.createElement("p");
  article.append(snow);
  snow.textContent = `Chance of Snow: ${chanceOfSnow}`;

  //let icon = document.createElement("img");
  //article.prepend(icon);

  //console.log(chanceOfSunShine, chanceOfRain, chanceOfSnow);
}

function generateWeatherForecast(articles, weatherData) {
  //   console.log(weatherData.weather[2].avgtempF);
  //   console.log(weatherData.weather[2].maxtempF);
  //   console.log(weatherData.weather[2].mintempF);
  //console.log(articles.length);
  let date = ["Today", "Tomorrow", "Day After Tomorrow"];
  for (let i = 0; i < articles.length; i++) {
    articles[i].textContent = date[i];
    let avgTempF = document.createElement("p");
    avgTempF.textContent = weatherData.weather[i].avgtempF;
    let maxTempF = document.createElement("p");
    maxTempF.textContent = weatherData.weather[i].maxtempF;
    let minTempF = document.createElement("p");
    minTempF.textContent = weatherData.weather[i].mintempF;

    articles[i].append(avgTempF, maxTempF, minTempF);
  }
}

function addSearchResult(location, sidebar, weatherData) {
  let currentFeelsLikeF = weatherData.current_condition[0].FeelsLikeF;
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.textContent = location;
  a.href = `${base_url}${location}?format=j1`;
  //console.log(a);
  li.textContent = `${currentFeelsLikeF}`;
  li.prepend(a);
  a.addEventListener("click", (event) => {
    event.preventDefault();
    let article = document.querySelector("article");
    article.innerHTML = "";
    generateWeatherReport(location, article, weatherData);

    let articles = document.querySelectorAll(".forecast");
    generateWeatherForecast(articles, weatherData);
  });
  //console.log(li);
  sidebar.append(li);
}
