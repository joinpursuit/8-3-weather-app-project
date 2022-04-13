let BASE_URL = `https://wttr.in/`;
const form = document.querySelector("form");
const results = document.querySelector(".results");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { location } = event.target;
  getlocation(location.value);
});

//created a helper function for my form to make a dynamic URL
function getlocation(input) {
  fetch(`${BASE_URL}${input}?format=j1`)
    .then((Response) => Response.json())
    .then((data) => currentForecast(data))
    .catch((error) => {
      console.log(error);
    });
}

//creating HTML elements for the API data to be displayed on the webpage
function currentForecast(data) {
  let areaName = document.createElement("p");
  areaName.textContent = `${data.nearest_area[0].areaName[0].value}`;
  results.append(areaName);

  let regionName = document.createElement("p");
  regionName.textContent = `${data.nearest_area[0].region[0].value}`;
  results.append(regionName);

  let countryName = document.createElement("p");
  countryName.textContent = `${data.nearest_area[0].country[0].value}`;
  results.append(countryName);

  let currentTemperatureF = document.createElement("p");
  currentTemperatureF.textContent = `${data.current_condition[0].FeelsLikeF}`;
  results.append(currentTemperatureF);
}
