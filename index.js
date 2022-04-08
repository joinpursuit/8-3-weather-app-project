const BASE_URL = "https://wttr.in/";
const JSON_URL = "?format=j1";

const typeLocation = document.querySelector("#typeLocation");
const getWeather = document.querySelector("#getWeather");

getWeather.addEventListener("click", (e) => {
  e.preventDefault();

  let searchWeather = `${BASE_URL}${typeLocation.value}${JSON_URL}`;

  fetch(searchWeather)
    .then((res) => res.json())
    .then((json) => {
      const { current_condition, nearest_area, weather } = json;
      loopThroughArrs(current_condition, nearest_area, weather);
    })
    .catch((e) => {
      errors(e);
    });
});

const errors = (e) => {
  const defaultLocation = document.querySelector("#defaultLocation");
  defaultLocation.textContent = e;
};

const loopThroughArrs = (current, area, weather) => {
  const defaultLocation = document.querySelector("#defaultLocation");
  defaultLocation.textContent = "";

  // for (const cur of current) {
  //   console.log(cur);
  // }

  for (const are of area) {
    console.log(are);
    for (const areaName of are.areaName) {
      console.log(areaName);
    }
    for (const country of are.country) {
      console.log(country);
    }
    for (const region of are.region) {
      console.log(region);
    }
  }

  // for (const weat of weather) {
  //   console.log(weat)
  // }
};

// const gotLocation = (current, area, weather) => {
//   console.log(current, area, weather);

// const defaultLocation = document.querySelector("#defaultLocation");
// defaultLocation.textContent = "";
// const h1 = document.createElement("h1");
//   h1.textContent = area;
//   const currentLocation = document.querySelector("#currentLocation");
// };
