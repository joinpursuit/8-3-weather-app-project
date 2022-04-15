const form = document.querySelector("form");
const main = document.querySelector("main");
const history = document.querySelector("previous-searchs");
const displayBox = document.getElementById("displayBox");
const threeDay = document.querySelector(".threeDays");

// User Input
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Refresh
  document.querySelectorAll("main article p").forEach((item) => {
    item.remove();
  });
  document.querySelectorAll("#threeAside section p").forEach((item) => {
    item.remove();
  });
  document.querySelectorAll("#threeAside section h4").forEach((item) => {
    item.remove();
  });

  let location = document.getElementById("userInput").value;
  fetch(`https://wttr.in/${location}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      dataHelper(json);
      threeDayHelper(json);
    })
    .catch((error) => console.log(error));
});

// Helper parses through that data for the users input.
function dataHelper(file) {
  let area = document.createElement("p");
  area.innerHTML = `<strong>Area :</strong> ${file.nearest_area[0].areaName[0].value}`;
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
}

// Reloading
if (location === "") {
  window.reload();
}

// Location Fail
// if (location !== )

// Three days are held in "weather array" line 69 |

// Weather loop
// let today = file.weather[0]
// for (day of today) {
//     let avgTemp = day.avgTempF
// }

// Forcast Helper Function
function threeDayHelper(file) {
  // Today
  let todayAverage = document.createElement("p");
  let todayMaxTemp = document.createElement("p");
  let todayMinTemp = document.createElement("p");

  let todayText = document.createElement("h4");
  todayText.textContent = "Today";

  todayAverage.innerHTML = `<strong>Average Temperature :</strong> ${file.weather[0].avgtempF}°F`;
  todayMaxTemp.innerHTML = `<strong>Max Temperature :</strong> ${file.weather[0].maxtempF}°F`;
  todayMinTemp.innerHTML = `<strong>Min Temperature :</strong> ${file.weather[0].mintempF}°F`;

  threeDay.append(todayText);
  threeDay.append(todayAverage);
  threeDay.append(todayMaxTemp);
  threeDay.append(todayMinTemp);

  // Tomorrow
  let tomorrowAverage = document.createElement("p");
  let tomorrowMaxTemp = document.createElement("p");
  let tomorrowMinTemp = document.createElement("p");

  let tomorrowText = document.createElement("h4");
  tomorrowText.textContent = "Tomorrow";

  tomorrowAverage.innerHTML = `<strong>Average Temperature :</strong> ${file.weather[1].avgtempF}°F`;
  tomorrowMaxTemp.innerHTML = `<strong>Max Temperature :</strong> ${file.weather[1].maxtempF}°F`;
  tomorrowMinTemp.innerHTML = `<strong>Min Temperature :</strong> ${file.weather[1].mintempF}°F`;

  threeDay.append(tomorrowText);
  threeDay.append(tomorrowAverage);
  threeDay.append(tomorrowMaxTemp);
  threeDay.append(tomorrowMinTemp);
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

  threeDay.append(datText);
  threeDay.append(datAverage);
  threeDay.append(datMaxTemp);
  threeDay.append(datMinTemp);
}

//
