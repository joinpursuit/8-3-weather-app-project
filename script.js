const form = document.getElementById("location");
const convertForm = document.getElementById("converter");
const general = document.getElementById("general");
const todayArt = document.getElementById("today");
const tomorrowArt = document.getElementById("tomorrow");
const dayAfterTomArt = document.getElementById("after-tomorrow");
const noSearches = document.getElementById("no-searches");
const searchList = document.getElementById("search-list");
const conversionResult = document.getElementById("result");

const formatter = (words) => {
  newWord = words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return newWord;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = event.target.location.value;
  event.target.reset();
  return weatherSearch(userInput);
});

const weatherSearch = (location) => {
  if (!location) {
    return;
  }
  fetch("https://wttr.in/" + location + "?format=j1")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      createMainArticle(result, location, general);
      fillMiniArticle(result.weather[0], todayArt, "Today");
      fillMiniArticle(result.weather[1], tomorrowArt, "Tomorrow");
      fillMiniArticle(result.weather[2], dayAfterTomArt, "Day After Tomorrow");
      searchHistoryMaker(result, location, searchList);
    })
    .catch((error) => {
      console.log(error);
    });
};

// averageSunChance = (result) => {
//   let sum = 0;
//   for (let i = 0; i < 8; i++) {
//     console.log(result.weather[0].hourly[i].chanceofsunshine);
//     sum += Number(result.weather[0].hourly[i].chanceofsunshine);
//   }
//   return sum / 8;
// };

const createMainArticle = (result, location, article) => {
  article.innerHTML = "";
  const { FeelsLikeF } = result.current_condition[0];
  const { areaName, country, region } = result.nearest_area[0];
  const { chanceofrain, chanceofsunshine, chanceofsnow } =
    result.weather[0].hourly[0];
  if (chanceofsunshine > 50) {
    const sunImg = document.createElement("img");
    sunImg.setAttribute("src", "./assets/icons8-summer.gif");
    sunImg.setAttribute("alt", "sun");
    article.append(sunImg);
  } else if (chanceofrain > 50) {
    const rainImg = document.createElement("img");
    rainImg.setAttribute("src", "./assets/icons8-torrential-rain.gif");
    rainImg.setAttribute("alt", "rain");
    article.append(rainImg);
  } else if (chanceofsnow > 50) {
    const snowImg = document.createElement("img");
    snowImg.setAttribute("src", "./assets/icons8-light-snow.gif");
    snowImg.setAttribute("alt", "snow");
    article.append(snowImg);
  }
  const searchedTown = document.createElement("h2");
  searchedTown.innerText = location;
  const searchedArea = document.createElement("p");
  if (areaName[0].value === location) {
    searchedArea.innerText = "Area: " + areaName[0].value;
  } else {
    searchedArea.innerText = "Nearest Area: " + areaName[0].value;
  }
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
    searchedTown,
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
  article.innerHTML = "";
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
//incorporate createTextNode as per Myra. refactor tot his at the end!

const searchHistoryMaker = (result, location, list) => {
  const { FeelsLikeF } = result.current_condition[0];
  if (!list.innerHTML.includes(location)) {
    noSearches.innerText = "";
    const newLine = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", "#");
    anchor.textContent = `${location} ${FeelsLikeF}°F`;
    newLine.append(anchor);
    list.append(newLine);
    newLine.addEventListener("click", (e) => {
      e.preventDefault();
      weatherSearch(location);
    });
  }
};

convertHelper = (num, type) => {
  conversionResult.innerText = "";
  if (type === true) {
    const farToCel = `${((num - 32) * (5 / 9)).toFixed(2)} °C`;
    conversionResult.innerText = farToCel;
  } else if (type === false) {
    const celToFar = `${(num * 1.8 + 32).toFixed(2)} + °F`;
    conversionResult.innerText = celToFar;
  }
};

convertForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target[0].value;
  const convertToCel = event.target[1].checked;
  convertToCel === true
    ? convertHelper(input, true)
    : convertHelper(input, false);
  event.target.reset();
});
