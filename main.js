const form = document.querySelector("form");
const main = document.querySelector("main");
const history = document.querySelector("previous-searchs");
const displayBox = document.getElementById("displayBox");
const threeDay = document.querySelector(".threeDays");
const unordered = document.querySelector(".uOrderList");
const userInput = document.querySelector("#userInput");
const convert = document.querySelector(".convert");

// Refresh
function refresh() {
  document.querySelectorAll("main article p").forEach((item) => {
    item.remove();
  });
  document.querySelectorAll("#threeAside section p").forEach((item) => {
    item.remove();
  });
  document.querySelectorAll("#threeAside section h4").forEach((item) => {
    item.remove();
  });
  document.querySelectorAll("h2").forEach((item) => {
    item.remove();
  });
  document.querySelectorAll("img").forEach((item) => {
    item.remove();
  });
}

// User Input
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let location = document.getElementById("userInput").value;
  fetch(`https://wttr.in/${location}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      refresh();
      dataHelper(json);
      threeDayHelper(json);
      searchHistory(json, location);
    })
    .catch((error) => console.log(error));
});

// Helper parses through that data for the users input.
function dataHelper(file) {
  //
  let searchResult = document.createElement("h2");
  searchResult.textContent = userInput.value;
  displayBox.append(searchResult);

  // Assign
  let area = document.createElement("p");
  area.innerHTML =
    file.nearest_area[0].areaName[0].value.toLowerCase() ===
    userInput.value.toLowerCase()
      ? `<strong>Area:</strong> ${file.nearest_area[0].areaName[0].value}`
      : `<strong>Nearest Area:</strong> ${file.nearest_area[0].areaName[0].value}`;
  displayBox.append(area);

  let region = document.createElement("p");
  region.innerHTML = `<strong>Region :</strong> ${file.nearest_area[0].region[0].value}`;
  displayBox.append(region);

  let country = document.createElement("p");
  country.innerHTML = `<strong>Country :</strong> ${file.nearest_area[0].country[0].value}`;
  displayBox.append(country);

  let currently = document.createElement("p");
  currently.innerHTML = `<strong>Currently :</strong> Feels like ${file.current_condition[0].FeelsLikeF}`;
  displayBox.append(currently);

  let chanceOfRain = document.createElement("p");
  chanceOfRain.innerHTML = `<strong> Chance of Rain :</strong> ${file.weather[0].hourly[0].chanceofrain}`;
  displayBox.append(chanceOfRain);

  let chanceOfSnow = document.createElement("p");
  chanceOfSnow.innerHTML = `<strong> Chance of Snow :</strong> ${file.weather[0].hourly[0].chanceofsnow}`;
  displayBox.append(chanceOfSnow);

  let changeOfSunshine = document.createElement("p");
  changeOfSunshine.innerHTML = `<strong> Chance of Sunshine :</strong> ${file.weather[0].hourly[0].chanceofsunshine}`;
  displayBox.append(changeOfSunshine);

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
  displayBox.prepend(img);
  // Clear search.
  userInput.value = "";
}

// Reloading
if (location === "") {
  window.reload();
}

// Forcast Helper Function
function threeDayHelper(file) {
  // Today
  let todayAverage = document.createElement("p");
  let todayMaxTemp = document.createElement("p");
  let todayMinTemp = document.createElement("p");

  let todayText = document.createElement("h4");
  todayText.textContent = "Today";

  const parent = document.createElement("div");
  threeDay.append(parent);

  todayAverage.innerHTML = `<strong>Average Temperature :</strong> ${file.weather[0].avgtempF}°F`;
  todayMaxTemp.innerHTML = `<strong>Max Temperature :</strong> ${file.weather[0].maxtempF}°F`;
  todayMinTemp.innerHTML = `<strong>Min Temperature :</strong> ${file.weather[0].mintempF}°F`;

  parent.append(todayText);
  parent.append(todayAverage);
  parent.append(todayMaxTemp);
  parent.append(todayMinTemp);

  // Tomorrow
  let tomorrowAverage = document.createElement("p");
  let tomorrowMaxTemp = document.createElement("p");
  let tomorrowMinTemp = document.createElement("p");

  let tomorrowText = document.createElement("h4");
  tomorrowText.textContent = "Tomorrow";

  tomorrowAverage.innerHTML = `<strong>Average Temperature :</strong> ${file.weather[1].avgtempF}°F`;
  tomorrowMaxTemp.innerHTML = `<strong>Max Temperature :</strong> ${file.weather[1].maxtempF}°F`;
  tomorrowMinTemp.innerHTML = `<strong>Min Temperature :</strong> ${file.weather[1].mintempF}°F`;

  const parent2 = document.createElement("div");
  threeDay.append(parent2);

  parent2.append(tomorrowText);
  parent2.append(tomorrowAverage);
  parent2.append(tomorrowMaxTemp);
  parent2.append(tomorrowMinTemp);
  // Day After Tomorrow
  // dat = Day After Tomorrow
  let datAverage = document.createElement("p");
  let datMaxTemp = document.createElement("p");
  let datMinTemp = document.createElement("p");

  let datText = document.createElement("h4");
  datText.textContent = "Day After Tomorrow";

  datAverage.innerHTML = `<strong>Average Temperature :</strong> ${file.weather[2].avgtempF}°F`;
  datMaxTemp.innerHTML = `<strong>Max Temperature :</strong> ${file.weather[2].maxtempF}°F`;
  datMinTemp.innerHTML = `<strong>Min Temperature :</strong> ${file.weather[2].mintempF}°F`;

  const parent3 = document.createElement("div");
  threeDay.append(parent3);

  parent3.append(datText);
  parent3.append(datAverage);
  parent3.append(datMaxTemp);
  parent3.append(datMinTemp);
}

function searchHistory(file, location) {
  let previous = document.createElement("li");
  previous.innerHTML = `<a href="#">${location} </a> - ${file.current_condition[0].FeelsLikeF} °F`;
  unordered.append(previous);
  previous.addEventListener("click", (event) => {
    event.preventDefault();

    fetch(`https://wttr.in/${location}?format=j1`)
      .then((response) => response.json())
      .then((json) => {
        refresh();
        dataHelper(json);
        threeDayHelper(json);
      })
      .catch((error) => console.log(error));
  });
}

convert.addEventListener("submit", (event) => {
  event.preventDefault();

  let result = document.querySelector("h4.converted-temperature");
  let convertC = document.getElementById("to-c");
  let convertF = document.getElementById("to-f");
  let ogNum = document.querySelector("#temp-to-convert");

  if (convertC.checked) {
    result.textContent = `${((ogNum.value - 32) / 1.8).toFixed(2)}`;
  } else if (convertF.checked) {
    result.textContent = `${(ogNum.value * 1.8 + 32).toFixed(2)}`;
  }
});
