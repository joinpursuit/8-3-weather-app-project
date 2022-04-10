const form = document.querySelector("form");
const general = document.getElementById("general");

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
      const { temp_F } = result.current_condition[0];
      const { areaName, country, region } = result.nearest_area[0];
      const { chanceofrain, chanceofsunshine, chanceofsnow } =
        result.weather[0].hourly[0];
      console.log(chanceofrain);
      const searchedTown = document.createElement("h2");
      searchedTown.innerText = location;
      const searchedArea = document.createElement("div");
      searchedArea.innerHTML = "Nearest Area" + areaName[0].value;
      const searchedRegion = document.createElement("div");
      searchedRegion.innerHTML = "Region: " + region[0].value;
      const searchedCountry = document.createElement("div");
      searchedCountry.innerHTML = "Country: " + country[0].value;
      const currentTemp = document.createElement("div");
      currentTemp.innerHTML = "Currently: " + temp_F;
      const sunshine = document.createElement("div");
      sunshine.innerHTML = "Chance of Sunshine: " + chanceofsunshine;
      const rain = document.createElement("div");
      rain.innerHTML = "Chance of Rain: " + chanceofrain;
      const snow = document.createElement("div");
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
    })
    .catch((error) => {
      console.log(error);
    });
};
