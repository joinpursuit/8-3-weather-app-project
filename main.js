const button = document.getElementById('fetch-button');
const headingCity = document.getElementById('city');

button.addEventListener('click', (event) => {
  event.preventDefault();
  const requestedCity = document.getElementById('requested-city');
  const city = requestedCity.value;
  const fetchForm = document.getElementById('fetch-form');

  getCity(city);
  getWeather(city);
  fetchForm.reset();
});

const convertForm = document.getElementById('convert-form');

convertForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const convertToC = document.getElementById('to-c');
  const convertToF = document.getElementById('to-f');
  const numToConvert = document.getElementById('temp-to-convert').value;
  const result = document.getElementById('calculation');

  if (convertToC.checked) {
    result.textContent = `${((numToConvert - 32) / 1.8).toFixed(2)}°C`;
  } else if (convertToF.checked) {
    result.textContent = `${(numToConvert * 1.8 + 32).toFixed(2)}°F`;
  } else {
    result.textContent = 'No unit of temperature was selected.';
  }
  convertForm.reset();
});

function getWeather(city) {
  fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      getWeatherInfo(response)
      return response
    })
    .then(getSearches)
    .catch(console.log);
}

function getPreviousWeather(city) {
  fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => {
      return response.json();
    })
    .then(getCity(city))
    .then(getWeatherInfo);
}

const getCity = (city) => {
  const placeholderP = document.getElementById('placeholder');

  placeholderP.textContent = '';
  headingCity.textContent = city;
};

function getWeatherInfo(response) {
  const forecast = response.weather;
  const area = response.nearest_area[0].areaName[0].value;
  const region = response.nearest_area[0].region[0].value;
  const country = response.nearest_area[0].country[0].value;
  const feelsLikeF = response.current_condition[0].FeelsLikeF;

  const areaP = document.getElementById('area');
  if (
    headingCity.textContent[0].toUpperCase() +
      headingCity.textContent.slice(1).toLowerCase() ===
    area[0].toUpperCase() + area.slice(1).toLowerCase()
  ) {
    areaP.innerHTML = `<strong>Area: </strong>
    <span>${area}</span>`;
  } else {
    areaP.innerHTML = `<strong>Nearest Area: </strong>
    <span>${area}</span>`;
  }

  const regionP = document.getElementById('region');
  regionP.innerHTML = `<strong>Region: </strong>
  <span>${region}</span>`;

  const countryP = document.getElementById('country');
  countryP.innerHTML = `<strong>Country: </strong>
<span>${country}</span>`;

  const currentlyP = document.getElementById('currently');
  currentlyP.innerHTML = `<strong>Currently: </strong>
  <span>Feels Like ${feelsLikeF}°F`;

  const chanceOfSunshine = document.getElementById('chanceOfSunshine');
  chanceOfSunshine.innerHTML = `<strong>Chance of Sunshine: </strong>${forecast[0].hourly[0].chanceofsunshine}`;

  const chanceOfRain = document.getElementById('chanceOfRain');
  chanceOfRain.innerHTML = `<strong>Chance of Rain: </strong>${forecast[0].hourly[0].chanceofrain}`;

  const chanceOfSnow = document.getElementById('chanceOfSnow');
  chanceOfSnow.innerHTML = `<strong>Chance of Snow: </strong>${forecast[0].hourly[0].chanceofsnow}`;

  const weatherIcon = document.querySelector('img');

  if (forecast[0].hourly[0].chanceofsunshine > 50) {
    weatherIcon.setAttribute('src', './assets/icons8-summer.gif');
    weatherIcon.setAttribute('alt', 'sun');
  } else if (forecast[0].hourly[0].chanceofrain > 50) {
    weatherIcon.setAttribute('src', './assets/icons8-torrential-rain.gif');
    weatherIcon.setAttribute('alt', 'rain');
  } else if (forecast[0].hourly[0].chanceofsnow > 50) {
    weatherIcon.setAttribute('src', './assets/icons8-light-snow.gif');
    weatherIcon.setAttribute('alt', 'snow');
  } else {
    weatherIcon.setAttribute('src', '');
    weatherIcon.setAttribute('alt', '');
  }

  const today = document.getElementById('todayForecast');
  today.textContent = 'Today';

  const avgTemp = document.getElementById('avgTemp');
  avgTemp.innerHTML = `<strong>Average Temperature: </strong><span>${forecast[0].avgtempF}°F</span>`;

  const maxTemp = document.getElementById('maxTemp');
  maxTemp.innerHTML = `<strong>Max Temperature: </strong><span>${forecast[0].maxtempF}°F</span>`;

  const minTemp = document.getElementById('minTemp');
  minTemp.innerHTML = `<strong>Min Temperature: </strong><span>${forecast[0].mintempF}°F</span>`;

  const tomorrow = document.getElementById('tomorrowForecast');
  tomorrow.textContent = 'Tomorrow';

  const avgTempTomorrow = document.getElementById('avgTempTomorrow');
  avgTempTomorrow.innerHTML = `<strong>Average Temperature: </strong><span>${forecast[1].avgtempF}°F</span>`;

  const maxTempTomorrow = document.getElementById('maxTempTomorrow');
  maxTempTomorrow.innerHTML = `<strong>Max Temperature: </strong><span>${forecast[1].maxtempF}°F</span>`;

  const minTempTomorrow = document.getElementById('minTempTomorrow');
  minTempTomorrow.innerHTML = `<strong>Min Temperature: </strong><span>${forecast[1].mintempF}°F</span>`;

  const dayAfterTomorrow = document.getElementById('dayAfterTomorrowForecast');
  dayAfterTomorrow.textContent = 'Day After Tomorrow';

  const avgTempAfterTomorrow = document.getElementById('avgTempAfterTomorrow');
  avgTempAfterTomorrow.innerHTML = `<strong>Average Temperature: </strong><span>${forecast[2].avgtempF}°F</span>`;

  const maxTempAfterTomorrow = document.getElementById('maxTempAfterTomorrow');
  maxTempAfterTomorrow.innerHTML = `<strong>Max Temperature: </strong><span>${forecast[2].maxtempF}°F</span>`;

  const minTempAfterTomorrow = document.getElementById('minTempAfterTomorrow');
  minTempAfterTomorrow.innerHTML = `<strong>Min Temperature: </strong><span>${forecast[2].mintempF}°F</span>`;
}

const getSearches = (response) => {
  const searchP = document.getElementById('searchPlaceholder');
  searchP.textContent = '';

  const li = document.createElement('li');
  const feelsLikeF = response.current_condition[0].FeelsLikeF
  li.innerHTML = `<a href="#">${headingCity.textContent}</a><span> - ${feelsLikeF}°F</span>`;

  li.addEventListener('click', (event) => {
    event.preventDefault();
    getPreviousWeather(city);
  });

  const ul = document.getElementById('searchHistory');
  ul.append(li);
};
