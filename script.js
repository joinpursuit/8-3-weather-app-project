const form = document.querySelector("form");
const general = document.getElementById("general");
const todayArt = document.getElementById("today");
const tomorrowArt = document.getElementById("tomorrow");
const dayAfterTomArt = document.getElementById("after-tomorrow");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = event.target.location.value;
  return weatherSearch(userInput);
});

const weatherSearch = (location) => {
  fetch("https://wttr.in/" + location + "?format=j1")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const searchedTown = document.createElement("h2");
      searchedTown.innerText = location;
      general.append(searchedTown);
      createMainArticle(result);
      fillMiniArticle(result.weather[0], todayArt, "Today");
      fillMiniArticle(result.weather[1], tomorrowArt, "Tomorrow");
      fillMiniArticle(result.weather[2], dayAfterTomArt, "Day After Tomorrow");
    })
    .catch((error) => {
      console.log(error);
    });
};

const createMainArticle = (result) => {
  const { FeelsLikeF } = result.current_condition[0];
  const { areaName, country, region } = result.nearest_area[0];
  const { chanceofrain, chanceofsunshine, chanceofsnow } =
    result.weather[0].hourly[0];
  const searchedArea = document.createElement("p");
  searchedArea.innerHTML = "Nearest Area: " + areaName[0].value;
  const searchedRegion = document.createElement("p");
  searchedRegion.innerHTML = "Region: " + region[0].value;
  const searchedCountry = document.createElement("p");
  searchedCountry.innerHTML = "Country: " + country[0].value;
  const currentTemp = document.createElement("p");
  currentTemp.innerHTML = "Currently: Feels Like " + FeelsLikeF + " °F";
  const sunshine = document.createElement("p");
  sunshine.innerHTML = "Chance of Sunshine: " + chanceofsunshine;
  const rain = document.createElement("p");
  rain.innerHTML = "Chance of Rain: " + chanceofrain;
  const snow = document.createElement("p");
  snow.innerHTML = "Chance of Snow: " + chanceofsnow;
  general.append(
    searchedArea,
    searchedRegion,
    searchedCountry,
    currentTemp,
    sunshine,
    rain,
    snow
  );
};

const fillMiniArticle = (result, article, header) => {
  ({ avgtempF, maxtempF, mintempF } = result);
  const heading = document.createElement("h3");
  heading.innerText = header;
  const averageP = document.createElement("p");
  averageP.innerHTML = `<strong>Average Temperature:</strong> ${avgtempF} °F`;
  const maxP = document.createElement("p");
  maxP.innerHTML = `<strong>Max Temperature:</strong> ${maxtempF} °F`;
  const minP = document.createElement("p");
  minP.innerHTML = `<strong>Min Temperature:</strong> ${mintempF} °F`;
  return article.append(heading, averageP, maxP, minP);
};
