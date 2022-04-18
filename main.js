document.querySelector('form');
form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredlocation = event.target.location.value;
  event.target.location.value = '';
  fetch(`https://wttr.in/${enteredlocation}?format=j1`)
    .then((response) => response.json())
    .then((forecast) => {
      generateWeather(forecast, enteredlocation);
      let ul = document.querySelector('ul');
      let li = document.createElement('li');
      ul.append(li);
      let a = document.createElement('a');
      a.textContent = `${enteredlocation}`+ " " ;
      //TODO: Hyperlink for previously searched
      a.href = '#';
      
      const currentCondition = forecast.current_condition[0].FeelsLikeF;
      li.textContent = currentCondition;
      li.prepend(a);
      a.addEventListener('click', (event) => {
        event.preventDefault();
        generateWeather(forecast, enteredlocation);
      });
    });
});

// TODO: helper function to generate weather

function generateWeather(forecast, enteredlocation) {
  const display = document.querySelector('#display');
  display.innerHTML = '';
  // let assignClass = document.querySelector('#display')
  // assignClass.classList.add('hidden') 
  const area = forecast.nearest_area[0].areaName[0].value;
  const region = forecast.nearest_area[0].region[0].value;
  const country = forecast.nearest_area[0].country[0].value;
  const current = forecast.current_condition[0].FeelsLikeF;
  let h2 = document.createElement('h2');
  h2.textContent = enteredlocation;
  display.append(h2);
  let areaDisplay = document.createElement('p');
  if (enteredlocation === area) {
    areaDisplay.textContent = `Area: ${area} `;
  } else {
    areaDisplay.textContent = `Nearest Area: ${area} `;
  }
  display.append(areaDisplay);
  let regionDisplay = document.createElement('p');
  regionDisplay.textContent = `Region: ${region}`;
  display.append(regionDisplay);
  let countryDisplay = document.createElement('p');
  countryDisplay.textContent = `Country: ${country}`;
  display.append(countryDisplay);
  let currentDisplay = document.createElement('p');
  currentDisplay.textContent = `Current Condition: ${current}`;
  display.append(currentDisplay);
  let forcastDate = document.querySelectorAll('aside article');

  //TODO: Icon will appear with the chance one of three: Rain, Snow, and Sunshine
  let chanceOfSunshineSum = 0;
  let chanceOfRainSum = 0;
  let chanceOfSnowSum = 0;
  for (let i = 0; i < forecast.weather[0].hourly; i++) {
    chanceOfSunshineSum += Number(
      forecast.weather[0].hourly[i].chanceofsunshine,
    );
    chanceOfRainSum += Number(forecast.weather[0].hourly[i].chanceofrain);
    chanceOfSnowSum += Number(forecast.weather[0].hourly[i].chanceofsnow);
  }
  //TODO: chances created
  const chanceOfSunshineAvg = document.createElement('p');
  const chanceOfRainAvg = document.createElement('p');
  const chanceOfSnowAvg = document.createElement('p');
  chanceOfSunshineAvg.textContent = `Chance of Sunshine: ${
    chanceOfSunshineSum / forecast.weather[0].hourly.length
  }`;
  chanceOfRainAvg.textContent = `Chance of Rain: ${
    chanceOfRainSum / forecast.weather[0].hourly.length
  }`;
  chanceOfSnowAvg.textContent = `Chance of Snow: ${
    chanceOfSnowSum / forecast.weather[0].hourly.length
  }`;
  display.append(chanceOfSunshineAvg, chanceOfRainAvg, chanceOfSnowAvg);
  let sunshineBool = false;
  let rainBool = false;
  let snowBool = false;
  for (let i = 0; i < forecast.weather[0].hourly.length; i++) {
    if (parseInt(forecast.weather[0].hourly[i].chanceofsunshine) > 50) {
      sunshineBool = true;
    }
    if (parseInt(forecast.weather[0].hourly[i].chanceofrain) > 50) {
      rainBool = true;
    }
    if (parseInt(forecast.weather[0].hourly[i].chanceofsnow) > 50) {
      snowBool = true;
    }
    const date = ['Today', 'Tomorrow', 'Two Days From Now'];
    for (let i = 0; i < forcastDate.length; i++) {
      forcastDate[i].innerHTML = '';
      let dateDisplay = document.createElement('p');
      dateDisplay.textContent = date[i];
     
      // TODO: getting the display for avg, min, max for thw weather that's from the API
      const todayAvgTemp = forecast.weather[i].avgtempF;
      const todayMaxTemp = forecast.weather[i].maxtempF;
      const todayMinTemp = forecast.weather[i].mintempF;
      let avgTempF = document.createElement('p');
      let maxTempF = document.createElement('p');
      let minTempF = document.createElement('p');
      avgTempF.textContent = `Average Temperature: ${todayAvgTemp}`;
      maxTempF.textContent = `Max Temperature: ${todayMaxTemp}`;
      minTempF.textContent = `Min Temperature: ${todayMinTemp}`;
      forcastDate[i].append(dateDisplay, avgTempF, maxTempF, minTempF);
    }
  }
  //TODO for weather icon
  if (sunshineBool) {
    let icon = document.createElement('img');
    icon.src = './assets/icons8-summer.gif';
    icon.alt = 'sun';
    display.prepend(icon);
  } else if (rainBool) {
    let icon = document.createElement('img');
    icon.src = './assets/icons8-torrential-rain.gif';
    icon.alt = 'rain';
    display.prepend(icon);
  } else if (snowBool) {
    let icon = document.createElement('img');
    icon.src = './assets/icons8-light-snow.gif';
    icon.alt = 'snow';
    display.prepend(icon);
  }
}
// TODO: section is for the conversion from f to c and c to f
const convertingTemperature = document.querySelector('aside form');
convertingTemperature.addEventListener('submit', (event) => {
  event.preventDefault();
  const userResults = parseInt(event.target.querySelector('input').value);
  let convertTemps = event.target.querySelectorAll('.converting-temp');
  //TODO: This link is the conversion formula, https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
  let type = '';
  for (let convertTemp of convertTemps) {
    if (convertTemp.checked) {
      type = convertTemp.value;
      break;
    }
  }
  if (type === 'celsius') {
    event.target.querySelector('h4').textContent = (
      ((userResults - 32) * 5) /
      9
    ).toFixed(2);
  } else if (type === 'fahrenheit') {
    event.target.querySelector('h4').textContent = (
      (userResults * 9) / 5 +
      32
    ).toFixed();
  }
});
