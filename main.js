const BASE_URL = 'https://wttr.in/';
const form = document.querySelector('form');
const input = document.querySelector('input');

const getSearches = (city) => {
  const ul = document.getElementById('searchHistory');
  const searchP = document.getElementById('searchPlaceholder');
  const li = document.createElement('li');
  li.setAttribute('class', 'request');
  searchP.textContent = '';
  li.textContent = city;

  ul.append(li);
  console.log('welcome to the party');
};

const getWeather = (response) => {
  console.log(response);
  const area = response.nearest_area[0].areaName[0].value;
  const region = response.nearest_area[0].region[0].value;
  const country = response.nearest_area[0].country[0].value;
  const feelsLikeF = response.current_condition[0].FeelsLikeF;

  const placeholderP = document.getElementById('placeholder');
  placeholderP.textContent = '';

  const request = document.getElementsByClassName('request');
  const headingCity = document.getElementById('city');
  headingCity.textContent = `${request[
    request.length - 1
  ].innerHTML[0].toUpperCase()}${request[request.length - 1].textContent
    .slice(1)
    .toLowerCase()}`;

  const areaHeader = document.getElementById('areaHold');
  const areaSpan = document.getElementById('area');
  areaHeader.textContent = `Area: `;
  areaSpan.textContent = area;

  const regionHeader = document.getElementById('regionHold');
  const regionSpan = document.getElementById('region');
  regionHeader.textContent = `Region: `;
  regionSpan.textContent = region;

  const countryHeader = document.getElementById('countryHold');
  const countrySpan = document.getElementById('country');
  countryHeader.textContent = `Country: `;
  countrySpan.textContent = country;

  const currentlyHeader = document.getElementById('currentlyHold');
  const currentlySpan = document.getElementById('currently');
  currentlyHeader.textContent = `Currently: `;
  currentlySpan.textContent = `Feels Like ${feelsLikeF}°F`;

  const forecast = response.weather

  const today = document.getElementById("todayForecast")
  today.textContent = "Today"

  const avgTempHold = document.getElementById("avgTempHold")
  const avgTemp = document.getElementById("avgTemp")
  avgTempHold.textContent = `Average Temperature: `
  avgTemp.textContent = `${forecast[0].avgtempF}°F`

  const maxTempHold = document.getElementById("maxTempHold")
  const maxTemp = document.getElementById("maxTemp")
  maxTempHold.textContent = `Max Temperature: `
  maxTemp.textContent = `${forecast[0].maxtempF}°F`

  const minTempHold = document.getElementById("minTempHold")
  const minTemp = document.getElementById("minTemp")
  minTempHold.textContent = `Min Temperature: `
  minTemp.textContent = `${forecast[0].mintempF}°F`

  const tomorrow = document.getElementById("tomorrowForecast")
  tomorrow.textContent = "Tomorrow"

  const avgTempHoldTomorrow = document.getElementById("avgTempHoldTomorrow")
  const avgTempTomorrow = document.getElementById("avgTempTomorrow")
  avgTempHoldTomorrow.textContent = `Average Temperature: `
  avgTempTomorrow.textContent = `${forecast[1].avgtempF}°F`

  const maxTempHoldTomorrow = document.getElementById("maxTempHoldTomorrow")
  const maxTempTomorrow = document.getElementById("maxTempTomorrow")
  maxTempHoldTomorrow.textContent = `Max Temperature: `
  maxTempTomorrow.textContent = `${forecast[1].maxtempF}°F`

  const minTempHoldTomorrow = document.getElementById("minTempHoldTomorrow")
  const minTempTomorrow = document.getElementById("minTempTomorrow")
  minTempHoldTomorrow.textContent = `Min Temperature: `
  minTempTomorrow.textContent = `${forecast[1].mintempF}°F`


  const dayAfterTomorrow = document.getElementById("dayAfterTomorrowForecast")
  dayAfterTomorrow.textContent = "Day After Tomorrow"

  const avgTempHoldAfterTomorrow = document.getElementById("avgTempHoldAfterTomorrow")
  const avgTempAfterTomorrow = document.getElementById("avgTempAfterTomorrow")
  avgTempHoldAfterTomorrow.textContent = `Average Temperature: `
  avgTempAfterTomorrow.textContent = `${forecast[2].avgtempF}°F`

  const maxTempHoldAfterTomorrow = document.getElementById("maxTempHoldAfterTomorrow")
  const maxTempAfterTomorrow = document.getElementById("maxTempAfterTomorrow")
  maxTempHoldAfterTomorrow.textContent = `Max Temperature: `
  maxTempAfterTomorrow.textContent = `${forecast[2].maxtempF}°F`

  const minTempHoldAfterTomorrow = document.getElementById("minTempHoldAfterTomorrow")
  const minTempAfterTomorrow = document.getElementById("minTempAfterTomorrow")
  minTempHoldAfterTomorrow.textContent = `Min Temperature: `
  minTempAfterTomorrow.textContent = `${forecast[2].mintempF}°F`


  // for (let forecast of response.weather) {
  //   console.log('These are avgTemps: ', forecast.avgtempF);
  //   console.log('Thes are maxTemps: ', forecast.maxtempF);
  //   console.log('These are minTemps: ', forecast.mintempF);
  // }

};

const button = document.getElementById('myButton');
button.addEventListener('click', (event) => {
  event.preventDefault();
  const city = input.value;

  fetch(`${BASE_URL}${city}?format=j1`)
    .then((response) => {
      return response.json();
    })
    .then(getSearches(city))
    .then(getWeather)
    .catch((err) => {
      console.log(err);
    });
  form.reset();
});
