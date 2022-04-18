// const icon = document.createElement('img');

let searches = [];

const base_url = 'https://wttr.in/';

function fetchSearch(userInput) {
  //
  // returns promise object

  return fetch(`${base_url}${userInput}?format=j1`)
    .then(response => {
      // throw 'some error';
      return response.json();
    })
    .then(json => {
      //
      // extract al necessary data from the fetched json response

      return {
        userInput,
        area: json.nearest_area[0].areaName[0].value,
        country: json.nearest_area[0].country[0].value,
        region: json.nearest_area[0].region[0].value,
        feelsTemp: json.current_condition[0].FeelsLikeF,
        weather: json.weather.map(day => ({
          avgtempF: day.avgtempF,
          maxtempF: day.maxtempF,
          mintempF: day.mintempF,
        })),
        chanceOfSunshine: parseInt(json.weather[0].hourly[0].chanceofsunshine),
        chanceOfRain: parseInt(json.weather[0].hourly[0].chanceofrain),
        chanceOfSnow: parseInt(json.weather[0].hourly[0].chanceofsnow),
      };
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

function updUi(search) {
  //
  // 1. ui clean up

  const currentWeather = document.querySelector('#current-weather');
  const chooseLocationHint = document.querySelector('#choose-location-hint');

  currentWeather.innerHTML = '';
  chooseLocationHint.hidden = true;

  // if error (fetch was unsuccessful)

  if (!search) {
    chooseLocationHint.hidden = false;
    return;
  }

  // 2. update main weather info

  // exact area or nearest area ?

  const areaMatch = search.userInput.toLowerCase() === search.area.toLowerCase();

  // make image tag string from a template

  let img = '';
  const makeImg = (filename, alt) => `<img class="icon" src="./assets/${filename}" alt="${alt}"/>`;

  if (search.chanceOfSunshine > 50) img = makeImg('icons8-summer.gif', 'sun');
  if (search.chanceOfRain > 50) img = makeImg('icons8-torrential-rain.gif', 'rain');
  if (search.chanceOfSnow > 50) img = makeImg('icons8-light-snow.gif', 'snow');

  // set all html tags at once

  currentWeather.innerHTML = `
    ${img}
    <h2>${search.userInput}</h2>
    <p>
      <em>${areaMatch ? 'Area' : 'Nearest Area'}</em> ${search.area}<br>
      <em>Region:</em> ${search.region}<br>
      <em>Country:</em> ${search.country}<br>
      <em>Currently:</em> Feels like ${search.feelsTemp}°F<br>
      <em>Chance of Sunshine:</em> ${search.chanceOfSunshine}<br>
      <em>Chance of Rain:</em> ${search.chanceOfRain}<br>
      <em>Chance of Snow:</em> ${search.chanceOfSnow}<br>
    </p>`;

  // 3. update 3 day weather info

  const articles = document.querySelectorAll('aside article');
  const days = ['Today', 'Tomorrow', 'Day After Tomorrow'];

  for (let i = 0; i < 3; i++) {
    articles[i].innerHTML = `
    <h3>${days[i]}</h3>
    <p>
      <em>Average:</em> ${search.weather[i].avgtempF}°F<br>
      <em>Max:</em> ${search.weather[i].maxtempF}°F<br>
      <em>Min:</em> ${search.weather[i].mintempF}°F<br>
    </p>`;
  }

  // 4. update search history list

  const noSearchesHint = document.querySelector('#no-searches-hint');
  noSearchesHint.hidden = true;

  // clear history list

  const ul = document.querySelector('#history-list');
  ul.innerHTML = '';

  // for every search in the search history

  for (const search of searches) {
    //
    // append new list item with a link

    const li = document.createElement('li');
    const a = document.createElement('a');

    a.textContent = search.userInput;
    a.href = `javascript:void(0)`;

    // make new search on link click

    a.onclick = () => {
      makeSearch(search.userInput);
    };

    li.textContent = ` - ${search.feelsTemp}°F`;
    li.prepend(a);
    ul.append(li);
  }
}

function makeSearch(userInput) {
  fetchSearch(userInput).then(search => {
    //
    // if no error and no such search in the search history

    if (search && !searches.some(s => s.userInput === search.userInput)) {
      //
      // append new search to the history

      searches.push(search);
    }
    updUi(search);
  });
}

// handle search submit

const searchForm = document.querySelector('#search-form');
const article = document.querySelector('article');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const userInput = event.target.location.value;
  event.target.location.value = '';

  makeSearch(userInput);
});

// handle t conversion submit

const conversionForm = document.querySelector('#conversion-form');

conversionForm.addEventListener('submit', event => {
  event.preventDefault();

  const t = event.target.temperature.value;
  const scaleType = event.target.convertTemp.value;

  const h4 = document.querySelector('#conversion-result');

  h4.textContent = 'enter valid temperature';
  if (t === '') return;
  if (scaleType === 'c') h4.textContent = ((t - 32) * (5 / 9)).toFixed(2);
  if (scaleType === 'f') h4.textContent = (t * (9 / 5) + 32).toFixed(2);
});