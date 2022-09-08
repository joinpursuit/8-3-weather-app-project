const BASE_URL = 'https://wttr.in/';
const form = document.querySelector('form');
const currentWeather = document.querySelector('article');
const weatherIcon = document.createElement('img');

form.addEventListener('submit', (event) => {
  event.preventDefault();

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
        console.log(json)
      
      let previous = document.querySelector('section.previous p');
      previous.hidden = true;

      a.addEventListener('click', (event) => {
        event.preventDefault();
        getWeatherReport(currentWeather, json, city);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

const getWeatherReport = (currentWeather, json, city) => {
  currentWeather.innerHTML = '';
  let location = document.createElement('h2');
  location.textContent = city;
  currentWeather.append(location);

  let area = json.nearest_area[0].areaName[0].value; 
  let areaData = document.createElement('p');
  currentWeather.append(areaData);

  if (area.toLowerCase() === city.toLowerCase()) {
    areaData.textContent = `Area: ${area}`;
  } else {
    areaData.textContent = `Nearest Area: ${area}`;
  }

  let region = json.nearest_area[0].region[0].value;
  regionData = document.createElement('p');
  regionData.textContent = region;
  currentWeather.append(regionData);

  let country = json.nearest_area[0].country[0].value;
  countryData = document.createElement('p');
  countryData.textContent = country;
  currentWeather.append(countryData);

  let feelsLikeTemp = `Currently feels like ${json.current_condition[0].FeelsLikeF} °F`;
  tempData = document.createElement('p');
  tempData.textContent = feelsLikeTemp; 
  currentWeather.append(tempData);

  const chanceOfSunshine = json.weather[0].hourly[0].chanceofsunshine;
  const chanceOfRain = json.weather[0].hourly[0].chanceofrain;
  const chanceOfSnow = json.weather[0].hourly[0].chanceofsnow;

  const sunny = document.createElement('p');
  sunny.textContent = `Chance of Sunshine ${chanceOfSunshine}%`;
  currentWeather.append(sunny);

  const rainy = document.createElement('p');
  rainy.textContent = `Chance of Rain ${chanceOfRain}%`;
  currentWeather.append(rainy);

  const snow = document.createElement('p');
  snow.textContent = `Chance of Snow ${chanceOfSnow}%`;
  currentWeather.append(snow);

  for (let i = 0; i < json.weather[0].hourly.length; i++) {
    if (Number(json.weather[0].hourly[i].chanceofsunshine) > 50) {
      weatherIcon.src = './assets/icons8-summer.gif';
      weatherIcon.alt = 'sun';
    }
    if (Number(json.weather[0].hourly[i].chanceofrain) > 50) {
      weatherIcon.src = './assets/icons8-torrential-rain.gif';
      ('https://img.freepik.com/free-photo/rainy-day-icon-3d-render-illustration-style_516190-319.jpg?w=996');
      weatherIcon.alt = 'rain';
    }
    if (Number(json.weather[0].hourly[i].chanceofsnow) > 50) {
      weatherIcon.src = './assets/icons8-light-snow.gif';
      weatherIcon.alt = 'snow';
    }
  }
  currentWeather.prepend(weatherIcon);

  const articles = document.querySelectorAll('aside article');
  const forecastDays = ['Today', 'Tomorrow', 'Day After Tomorrow'];

  for (let i = 0; i < articles.length; i++) {
    articles[i].innerHTML = ''

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

const tempConversion = document.querySelector(
  'aside.temperature-conversion form'
);
tempConversion.addEventListener('submit', (event) => {
  event.preventDefault();

  const temperature = event.target.querySelector('#temp-to-convert').value;

  const types = event.target.querySelectorAll('.temperature');
  console.log('This is type:', types);
  if (types[0].checked) {
      const celcius = (temperature - 32) * 5 / 9
    event.target.querySelector('h4').textContent = `${celcius.toFixed(2)} °C`;
  } else if (types[1].checked) {
      const fahreinheit =  (temperature * 9) / 5 + 32
    event.target.querySelector('h4').textContent = `${fahreinheit.toFixed(2)} °F`;
  }
});