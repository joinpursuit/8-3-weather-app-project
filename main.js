//let WEATHER_API = `https://wttr.in/Melbourne?format=j1`;
//let apiLocation = weatherSearchInput.value;
let BASE_URL = `https://wttr.in/`;
let API_FORMAT = `?format=j1`;
document.querySelector('form');
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const weatherPlaceInput = event.target.location.value;
  event.target.location.value = '';
  console.log(`${BASE_URL}${weatherPlaceInput}${API_FORMAT}`);
  fetch(`${BASE_URL}${weatherPlaceInput}${API_FORMAT}`)
    .then((response) => response.json()) /*{
    return response.json();
    }) */
    .then((element) => {
      createAForcast(element, weatherPlaceInput);
      //makeThreeDayForcast(element, weatherPlaceInput);

      let unorderedList1 = document.querySelector('ul');
      let list1 = document.createElement('li');
      unorderedList1.append(list1);
      let anchorTag = document.createElement('a');
      anchorTag.textContent = weatherPlaceInput;
      anchorTag.href = '#';

      let areaContainer = element.nearest_area[0].areaName[0].value;
      let regionContainer = element.nearest_area[0].areaName[0].value;
      let countryContainer = element.nearest_area[0].country[0].value;
      let current = element.current_condition[0].FeelsLikeF;
      list1.textContent = current;
      list1.prepend(anchorTag);

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
    displayedArea.textContent = `Area is ${apiArea}`;
  }
  display.append(displayedArea);

  let displayedCountry = document.createElement('p');
  displayedCountry.textContent = `Country of: ${apiCountry}`;
  display.append(displayedCountry);

  let displayedRegion = document.createElement('p');
  displayedRegion.textContent = `Region of ${apiRegion}`;
  display.append(displayedRegion);

  let displayedCurrentFeels = document.createElement('p');
  displayedCurrentFeels.textContent = `Currently Feels Like: ${apiCurrent}`;
  display.append(displayedCurrentFeels);
  let chanceOfSnow = 0;
  let chanceOfSunshine = 0;
  let chanceOfRain = 0;

  //function addingPictures(element, weatherPlaceInput) {
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

  //}
  //function makeThreeDayForcast(element, weatherPlaceInput) {
  ///Doesn't Completely pass the test, needs more work.
  let threeDaysForcast = ['Today', 'Tomorrow', 'Day After Tomorrow'];
  let displayedWeather = document.querySelectorAll('aside article');
  for (let i = 0; i < displayedWeather.length; i++) {
    displayedWeather[i].innerHTML = '';
    let displayedWeather = document.createElement('p');
    displayedWeather.textContent = threeDaysForcast[i];

    const todayTempAverage = element.weather[i].avgtempF;
    const todayTempMax = element.weather[i].maxtempF;
    const todayTempMin = element.weather[i].mintempF;

    let minTempF = document.createElement('p');
    let avgTempF = document.createElement('p');
    let maxTempF = document.createElement('p');

    maxTempF.textContent = todayTempMax;
    avgTempF.textContent = todayTempAverage;
    minTempF.textContent = todayTempMin;
    displayedWeather[i].append(displayedWeather, avgTempF, maxTempF, minTempF);
  }
}
