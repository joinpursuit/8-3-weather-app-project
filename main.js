const BASE_URL = 'https://wttr.in/';
const locationForm = document.querySelector('.locationForm');
const locationWeather = document.querySelector('.location-weather h2');

locationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let citySearched = event.target.location.value;
    event.target.location.value = '';
    console.log(`You want ${citySearched} weather!`, `${BASE_URL}${citySearched}?format=j1`)

    fetchWeather(citySearched);
    displayWeather(json);
})
function fetchWeather(city) {
    fetch(`${BASE_URL}${city}?format=j1`)
    .then((response) => response.json())
    .then((json) => this.displayWeather(json))
    .catch((error) => console.log(error));
}

function displayWeather(data) {
    locationWeather.textContent = '';
    
    let { value: nearest } = data.nearest_area[0].areaName[0];
    let { value: region } = data.nearest_area[0].region[0];
    let { value: country } = data.nearest_area[0].country[0];
    let { FeelsLikeF } = data.current_condition[0];
    let { chanceofsunshine } = data.weather[0].hourly[4];
    let { chanceofrain } = data.weather[0].hourly[4];
    let { chanceofsnow } = data.weather[0].hourly[4];
    console.log(nearest, region, country, FeelsLikeF, chanceofsunshine, chanceofrain, chanceofsnow);
    document.querySelector(".nearest").innerText = `Nearest Area: ` + nearest;
    document.querySelector(".region").innerText = `Region: ` + region;
    document.querySelector(".country").innerText = `Country: ` + country;
    document.querySelector(".currentTemp").innerText = `Currently: Feels Like ` + FeelsLikeF;
    document.querySelector(".sunChance").innerText = `Chance of Sunshine: ` + chanceofsunshine + `%`;
    document.querySelector(".rainChance").innerText = `Chance of Rain: ` + chanceofrain + `%`;
    document.querySelector(".snowChance").innerText = `Chance of Snow: ` + chanceofsnow + `%`;
    
}

