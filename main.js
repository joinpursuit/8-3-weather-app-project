const BASE_URL = 'https://wttr.in/';
const form = document.querySelector('form');
const currentWeather = document.querySelector('article');
const weatherIcon = document.createElement('img');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  //Make the paragraph "Choose a location to view the weather" disappear when a city weather populated in the main section
  document.querySelector('main p').hidden = true;

  let city = event.target.location.value;

  event.target.location.value = '';

  fetch(`${BASE_URL}${city}?format=j1`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let feelsLikeTemp = getWeatherReport(currentWeather, json, city);
      const ul = document.querySelector('ul');
      const searchHistory = document.createElement('li');
      let a = document.createElement('a');
      a.textContent = city;
      a.href = `${BASE_URL}${city}?format=j1`;
      searchHistory.textContent = feelsLikeTemp;
      searchHistory.prepend(a);
      ul.append(searchHistory);

      //Hide "No previous searches" if users type a city's name in the search box
      let previous = document.querySelector('section.previous p');
      previous.hidden = true;

      //Populate weather forecast in the main section when sidebar link is clicked
      a.addEventListener('click', (event) => {
        event.preventDefault();
        getWeatherReport(currentWeather, json, city);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 * Create a helper function to show the city's current and three-day forecast in the main section
 * getWeatherReport() - Function with three parameters
 * @param {DOM Object} currentWeather - The Object with current weather data from the location search
 * @param {Object} json - The JSON Object with details of weather data retrieve from API
 * @param {String} city - a string typed by users which will be attached to the API's URL to retrieve weather data of that specific location.
 */
const getWeatherReport = (currentWeather, json, city) => {
  currentWeather.innerHTML = '';
  let location = document.createElement('h2');
  location.textContent = city;
  currentWeather.append(location);

  let area = `${json.nearest_area[0].areaName[0].value}`;
  let areaData = document.createElement('p');
  currentWeather.append(areaData);

  //This part will switch from 'Area' to 'Nearest Area' if there is a mismatch
  nearestArea = json.nearest_area[0].areaName[0].value;
  if (nearestArea.toLowerCase() === city.toLowerCase()) {
    areaData.textContent = `Area: ${area}`;
  } else {
    areaData.textContent = `Nearest Area: ${area}`;
  }

  //Line 72 to line 121 will retrieve & attach current weather data from API & display it on the main section of the web app
  let region = `${json.nearest_area[0].region[0].value}`;
  regionData = document.createElement('p');
  regionData.textContent = region;
  currentWeather.append(regionData);

  let country = `${json.nearest_area[0].country[0].value}`;
  countryData = document.createElement('p');
  countryData.textContent = country;
  currentWeather.append(countryData);

  let feelsLikeTemp = ` Currently feels like ${json.current_condition[0].FeelsLikeF} °F`;
  tempData = document.createElement('p');
  tempData.textContent = feelsLikeTemp;
  currentWeather.append(tempData);

  const chanceOfSunshine = json.weather[0].hourly[0].chanceofsunshine;
  const chanceOfRain = json.weather[0].hourly[0].chanceofrain;
  const chanceOfSnow = json.weather[0].hourly[0].chanceofsnow;

  const sunny = document.createElement('p');
  sunny.textContent = `Chance of Sunshine ${chanceOfSunshine} %`;
  currentWeather.append(sunny);

  const rainy = document.createElement('p');
  rainy.textContent = `Chance of Rain ${chanceOfRain} %`;
  currentWeather.append(rainy);

  const snow = document.createElement('p');
  snow.textContent = `Chance of Snow ${chanceOfSnow} %`;
  currentWeather.append(snow);

  //Make the appropriate weather icon appear on the main section based on weather search result:
  for (let i = 0; i < json.weather[0].hourly.length; i++) {
    //The sunshine icon will appear if there is 50% chance of sunshine
    if (Number(json.weather[0].hourly[i].chanceofsunshine) > 50) {
      weatherIcon.src = './assets/icons8-summer.gif';
      weatherIcon.alt = 'sun';
    }
    //The rain icon will appear if there is 50% chance of rain
    if (Number(json.weather[0].hourly[i].chanceofrain) > 50) {
      weatherIcon.src = './assets/icons8-torrential-rain.gif';
      weatherIcon.alt = 'rain';
    }
    //The snow icon will appear if there is 50% chance of snow
    if (Number(json.weather[0].hourly[i].chanceofsnow) > 50) {
      weatherIcon.src = './assets/icons8-light-snow.gif';
      weatherIcon.alt = 'snow';
    }
  }
  currentWeather.prepend(weatherIcon);

  //Display three-day forecast and poplulate its data right under the current weather section
  const articles = document.querySelectorAll('aside article');
  const forecastDays = ['Today', 'Tomorrow', 'Day After Tomorrow'];

  for (let i = 0; i < articles.length; i++) {
    articles[i].innerHTML = '';

    let days = document.createElement('p');
    days.textContent = forecastDays[i];

    const avgTemp = document.createElement('p');
    avgTemp.textContent = `Average Temperature: ${json.weather[i].avgtempF} °F`;

    const maxTemp = document.createElement('p');
    maxTemp.textContent = `Max Temperature: ${json.weather[i].maxtempF} °F`;

    const minTemp = document.createElement('p');
    minTemp.textContent = `Min Temperature: ${json.weather[i].mintempF} °F`;

    articles[i].append(days, avgTemp, maxTemp, minTemp);
  }
  return feelsLikeTemp;
};

//Widget's temperature convertion from Celcius to Fahrenheit and vice versa:
const tempConversion = document.querySelector(
  'aside.temperature-conversion form'
);
tempConversion.addEventListener('submit', (event) => {
  event.preventDefault();

  const temperature = event.target.querySelector('#temp-to-convert').value;

  const tempTypes = event.target.querySelectorAll('.temperature');

  if (tempTypes[0].checked) {
    event.target.querySelector('h4').textContent = `°F is equivalent to ${(
      ((temperature - 32) * 5) /
      9
    ).toFixed(2)} °C`;
  } else if (tempTypes[1].checked) {
    event.target.querySelector('h4').textContent = `°C is equivalent to ${(
      (temperature * 9) / 5 +
      32
    ).toFixed(2)} °F`;
  }
});
