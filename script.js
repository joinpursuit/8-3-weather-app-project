const base_url = "https://wttr.in/";
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let location = document.querySelector("#location").value;

  let search_url = `${base_url}${location}?format=j1`;
  fetch(search_url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      console.log(json);
      let article = document.querySelector("article");
      generateWeatherReport(article, json);

      let articles = document.querySelectorAll(".forecast");
      generateWeatherForecast(articles, json);
      //article.append(weatherReport);
    })
    .catch((error) => {
      console.log(error);
    });
});

function generateWeatherReport(article, weatherData) {
  let area = weatherData.nearest_area[0].areaName[0].value;
  let region = weatherData.nearest_area[0].region[0].value;
  let country = weatherData.nearest_area[0].country[0].value;
  let currentFeelsLikeF = weatherData.current_condition[0].FeelsLikeF;
  console.log(area, region, country, currentFeelsLikeF);

  let p1 = document.createElement("p");
  p1.textContent = area;

  let p2 = document.createElement("p");
  p2.textContent = `Area: ${area}`;

  let p3 = document.createElement("p");
  p3.textContent = `Region: ${region}`;

  let p4 = document.createElement("p");
  p4.textContent = `Country: ${country}`;

  let p5 = document.createElement("p");
  p5.textContent = `Currently: ${currentFeelsLikeF}`;

  article.append(p1, p2, p3, p4, p5);
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
    avgTempF = weatherData.weather[i].avgtempF;
    let maxTempF = document.createElement("p");
    maxTempF = weatherData.weather[i].maxtempF;
    let minTempF = document.createElement("p");
    minTempF = weatherData.weather[i].mintempF;

    articles[i].append(avgTempF, maxTempF, minTempF);
  }
}
