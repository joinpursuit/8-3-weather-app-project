let BASE_URL = `https://wttr.in/`;
let API_FORMAT = `?format=j1`;
document.querySelector('form');
const form = document.querySelector('form');

/** Code used to manipulate the Html form and append the previous searches aside bar,
 * complete with a entries that can redirect the user to a previously searched entity
 * upon click. Contains API fetch protocols and catch error handling.
 *
 */

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const weatherPlaceInput = event.target.location.value;
  event.target.location.value = '';
  console.log(`${BASE_URL}${weatherPlaceInput}${API_FORMAT}`);
  fetch(`${BASE_URL}${weatherPlaceInput}${API_FORMAT}`)
    .then((response) => response.json())
    .then((element) => {
      createAForcast(element, weatherPlaceInput);

      let unorderedList1 = document.querySelector('ul');
      let searcheslist1 = document.createElement('li');
      unorderedList1.append(searcheslist1);
      let anchorTag = document.createElement('a');

      anchorTag.textContent = weatherPlaceInput;
      anchorTag.href = '# ';
      let current = element.current_condition[0].FeelsLikeF;
      searcheslist1.textContent = `${current}` + `\u00B0F`;
      searcheslist1.prepend(anchorTag);

      anchorTag.addEventListener(`click`, (event) => {
        event.preventDefault();

        createAForcast(element, weatherPlaceInput);
      });
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
});

/**
 * Standalone code used for the Celsius and Fahrenheit buttons. Taking in user defined number input
 * to return a h4 element containing a converted cesius or fahrenheit measurement
 * based on the entered number.
 */
let tempConverter = document.querySelector('.conversion');
tempConverter.addEventListener('submit', (event) => {
  event.preventDefault();

  let userInput = document.getElementById('temp-to-convert').value;

  const celConvert = document.getElementById('to-c');
  const fahConvert = document.getElementById('to-f');
  const result = document.getElementById('result');

  if (celConvert.checked) {
    result.textContent = ((userInput - 32) / 1.8).toFixed(2) + `\u00B0C`;
  } else if (fahConvert.checked) {
    result.textContent = (userInput * 1.8 + 32).toFixed(2) + `\u00B0F`;
  }
});

/**
 *  * Following function: createAforecast() uses user input and API information to retrieve and populate
 * the form with appropriately formatted information from the API.
 * @param  {iterator} element - Used to iterate API information.
 * @param  {User Input} weatherPlaceInput - User defined string that dictates what information the
 *  the createAForecast function retrieves and uses to populate the app's form.
 * @return  {HTML} A completed weather app form with additional elements compared to the base HTML template.
 */

function createAForcast(element, weatherPlaceInput) {
  const display = document.querySelector(`.display`);
  display.innerHTML = '';
  const apiCurrent = element.current_condition[0].FeelsLikeF;
  const apiRegion = element.nearest_area[0].region[0].value;
  const apiArea = element.nearest_area[0].areaName[0].value;
  const apiCountry = element.nearest_area[0].country[0].value;
  let header2 = document.createElement('h2');

  header2.textContent = weatherPlaceInput;
  display.append(header2);
  let displayedArea = document.createElement('p');
  displayedArea.textContent = apiArea;
  if (weatherPlaceInput !== apiArea) {
    displayedArea.textContent = `Nearest Area is: ${apiArea}`;
  } else {
    displayedArea.textContent = `Area is: ${apiArea}`;
  }
  display.append(displayedArea);

  let displayedCountry = document.createElement('p');
  displayedCountry.textContent = `Country of: ${apiCountry}`;
  display.append(displayedCountry);

  let displayedRegion = document.createElement('p');
  displayedRegion.textContent = `Region of: ${apiRegion}`;
  display.append(displayedRegion);

  let displayedCurrentFeels = document.createElement('p');
  displayedCurrentFeels.textContent = `Currently Feels Like: ${apiCurrent}`;
  display.append(displayedCurrentFeels);
  let chanceOfSnow = 0;
  let chanceOfSunshine = 0;
  let chanceOfRain = 0;

  for (let i = 0; i < element.weather[0].hourly; i++) {
    chanceOfRain =
      chanceOfRain + Number(element.weather[0].hourly[i].chanceOfRain);
    chanceOfSnow =
      chanceOfSnow + Number(element.weather[0].hourly[i].chanceOfSnow);
    chanceOfSunshine =
      chanceOfSunshine + Number(element.weather[0].hourly[i].chanceOfSunshine);
  }
  let snowChanceAvg = document.createElement('p');
  snowChanceAvg.textContent = `Chance of Snow: ${
    chanceOfSnow / element.weather[0].hourly.length
  }`;

  let sunshineChanceAvg = document.createElement('p');
  sunshineChanceAvg.textContent = `Chance of Sunshine: ${
    chanceOfSunshine / element.weather[0].hourly.length
  }`;

  let rainChanceAvg = document.createElement('p');
  rainChanceAvg.textContent = `Chance of Rain: ${
    chanceOfRain / element.weather[0].hourly.length
  }`;

  display.append(sunshineChanceAvg, rainChanceAvg, snowChanceAvg);

  let sunshineState = false;
  let rainState = false;
  let snowState = false;

  for (let state of element.weather[0].hourly) {
    if (Number(state.chanceofrain) > 50) {
      rainState = true;
    } else if (Number(state.chanceofsunshine) > 50) {
      sunshineState = true;
    } else if (Number(state.chanceofsnow) > 50) {
      snowState = true;
    }
  }
  if (sunshineState !== false) {
    let icon = document.createElement('img');
    icon.src = './assets/icons8-summer.gif';
    icon.alt = 'sun';

    display.prepend(icon);
  } else if (rainState !== false) {
    let icon = document.createElement('img');
    icon.src = './assets/icons8-torrential-rain.gif';
    icon.alt = 'rain';

    display.prepend(icon);
  } else if (snowState !== false) {
    let icon = document.createElement('img');
    icon.src = './assets/icons8-light-snow.gif';
    icon.alt = 'snow';

    display.prepend(icon);
  }

  let displayedWeather = document.querySelectorAll('aside article');

  for (let i = 0; i < displayedWeather.length; i++) {
    displayedWeather[i].innerHTML = '';
    let entry = document.createElement('p');
    let threeDaysForcast = ['Today', 'Tomorrow', 'Day After Tomorrow'];
    entry.textContent = threeDaysForcast[i];

    const todayTempAverage = element.weather[i].avgtempF;
    let avgTempF = document.createElement('p');
    avgTempF.textContent = todayTempAverage;

    const todayTempMax = element.weather[i].maxtempF;
    let maxTempF = document.createElement('p');
    maxTempF.textContent = todayTempMax;

    const todayTempMin = element.weather[i].mintempF;
    let minTempF = document.createElement('p');
    minTempF.textContent = todayTempMin;

    displayedWeather[i].append(entry, avgTempF, maxTempF, minTempF);
  }
}
