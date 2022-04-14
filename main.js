const form = document.querySelector('form');
const input = document.querySelector('input');
const button = document.getElementById('fetch-button');
const headingCity = document.getElementById('city');
const converter = document.getElementById("convert-temp")


button.addEventListener('click', (event) => {
  event.preventDefault();
  const city = input.value;
  getCity(city);
  getWeather(city);
  form.reset();
});

converter.addEventListener("click", (event) => {
  event.preventDefault();

  
})



function getWeather(city) {
  fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => {
      return response.json();
    })
    .then(getWeatherInfo)
    .then(getSearches)
    .catch((err) => {
      console.log(err);
    });
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
  console.log('city got called', city);
  const placeholderP = document.getElementById('placeholder');

  placeholderP.textContent = '';
  headingCity.textContent = city;
};

function getWeatherInfo(response) {
  console.log('WeatherInfo is called', response);

  const forecast = response.weather;
  const area = response.nearest_area[0].areaName[0].value;
  const region = response.nearest_area[0].region[0].value;
  const country = response.nearest_area[0].country[0].value;
  const feelsLikeF = response.current_condition[0].FeelsLikeF;

  const weatherIcon = document.querySelector('img');

  weatherIcon.setAttribute('src', './assets/icons8-summer.gif');

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
    <span>${area}</span>`
  }

  const regionP = document.getElementById('region');
  regionP.innerHTML = `<strong>Region: </strong>
  <span>${region}</span>`;

  const countryP = document.getElementById('country');
  countryP.innerHTML = `<strong>Country: </strong>
<span>${country}</span>`;

  const currentlyHeader = document.getElementById('currentlyHold');
  const currentlySpan = document.getElementById('currently');
  currentlyHeader.textContent = `Currently: `;
  currentlySpan.textContent = `Feels Like ${feelsLikeF}°F`;

  const today = document.getElementById('todayForecast');
  today.textContent = 'Today';

  const avgTempHold = document.getElementById('avgTempHold');
  const avgTemp = document.getElementById('avgTemp');
  avgTempHold.textContent = `Average Temperature: `;
  avgTemp.textContent = `${forecast[0].avgtempF}°F`;

  const maxTempHold = document.getElementById('maxTempHold');
  const maxTemp = document.getElementById('maxTemp');
  maxTempHold.textContent = `Max Temperature: `;
  maxTemp.textContent = `${forecast[0].maxtempF}°F`;

  const minTempHold = document.getElementById('minTempHold');
  const minTemp = document.getElementById('minTemp');
  minTempHold.textContent = `Min Temperature: `;
  minTemp.textContent = `${forecast[0].mintempF}°F`;

  const tomorrow = document.getElementById('tomorrowForecast');
  tomorrow.textContent = 'Tomorrow';

  const avgTempHoldTomorrow = document.getElementById('avgTempHoldTomorrow');
  const avgTempTomorrow = document.getElementById('avgTempTomorrow');
  avgTempHoldTomorrow.textContent = `Average Temperature: `;
  avgTempTomorrow.textContent = `${forecast[1].avgtempF}°F`;

  const maxTempHoldTomorrow = document.getElementById('maxTempHoldTomorrow');
  const maxTempTomorrow = document.getElementById('maxTempTomorrow');
  maxTempHoldTomorrow.textContent = `Max Temperature: `;
  maxTempTomorrow.textContent = `${forecast[1].maxtempF}°F`;

  const minTempHoldTomorrow = document.getElementById('minTempHoldTomorrow');
  const minTempTomorrow = document.getElementById('minTempTomorrow');
  minTempHoldTomorrow.textContent = `Min Temperature: `;
  minTempTomorrow.textContent = `${forecast[1].mintempF}°F`;

  const dayAfterTomorrow = document.getElementById('dayAfterTomorrowForecast');
  dayAfterTomorrow.textContent = 'Day After Tomorrow';

  const avgTempHoldAfterTomorrow = document.getElementById(
    'avgTempHoldAfterTomorrow'
  );
  const avgTempAfterTomorrow = document.getElementById('avgTempAfterTomorrow');
  avgTempHoldAfterTomorrow.textContent = `Average Temperature: `;
  avgTempAfterTomorrow.textContent = `${forecast[2].avgtempF}°F`;

  const maxTempHoldAfterTomorrow = document.getElementById(
    'maxTempHoldAfterTomorrow'
  );
  const maxTempAfterTomorrow = document.getElementById('maxTempAfterTomorrow');
  maxTempHoldAfterTomorrow.textContent = `Max Temperature: `;
  maxTempAfterTomorrow.textContent = `${forecast[2].maxtempF}°F`;

  const minTempHoldAfterTomorrow = document.getElementById(
    'minTempHoldAfterTomorrow'
  );
  const minTempAfterTomorrow = document.getElementById('minTempAfterTomorrow');
  minTempHoldAfterTomorrow.textContent = `Min Temperature: `;
  minTempAfterTomorrow.textContent = `${forecast[2].mintempF}°F`;

  // <p id="chanceOfRain"></p>
  // <p id="chanceOfSnow"></p>
  const chanceOfSunshine = document.getElementById('chanceOfSunshine');
  chanceOfSunshine.innerHTML = `<strong>Chance Of Sunshine:</strong> ${forecast[0].hourly[0].chanceofsunshine}`;

  const chanceOfRain = document.getElementById('chanceOfRain');
  chanceOfRain.innerHTML = `<strong>Chance Of Rain:</strong> ${forecast[0].hourly[0].chanceofrain}`;

  const chanceOfSnow = document.getElementById('chanceOfSnow');
  chanceOfSnow.innerHTML = `<strong>Chance Of Snow:</strong> ${forecast[0].hourly[0].chanceofsnow}`;
  // for (let forecast of response.weather) {
  //   console.log('These are avgTemps: ', forecast.avgtempF);
  //   console.log('Thes are maxTemps: ', forecast.maxtempF);
  //   console.log('These are minTemps: ', forecast.mintempF);
  // }
}

const getSearches = () => {
  const ul = document.getElementById('searchHistory');
  const searchP = document.getElementById('searchPlaceholder');
  const li = document.createElement('li');
  const currentlySpan = document.getElementById('currently');
  const currentTemp = currentlySpan.textContent.split(' ')[2];
  const city = headingCity.textContent;

  searchP.textContent = '';
  li.innerHTML = `<a href="#">${city}</a><span> - ${currentTemp}</span>`;

  li.addEventListener('click', (event) => {
    event.preventDefault();
    li.remove();
    getPreviousWeather(city);
  });
  ul.append(li);
};
