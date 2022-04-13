const base_url = 'https://wttr.in/';
let weatherSearch = document.querySelector('.get-weather');
let place = document.querySelector('#input-text');
let h2 = document.querySelector('h2');
let cityName;

weatherSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  let cityName = place.value;
  let full_url = `${base_url}${cityName}?format=j1`;

  fetch(full_url)
    .then((response) => response.json())
    .then((result) => {
      let chooseP = document.getElementById('choose');
      chooseP.textContent = '';
      let historyP = document.getElementById('previous');
      historyP.textContent = '';
      event.target.reset();

      const area = document.querySelector('#Area');
      const region = document.querySelector('#Region');
      const country = document.querySelector('#Country');
      const currently = document.querySelector('#Currently');
      let feeltemp = result.current_condition[0].FeelsLikeF;
      let sunshineChance = document.querySelector('#ChanceOfSunshine');
      let rainChance = document.querySelector('#ChanceOfRain');
      let snowChance = document.querySelector('#ChanceOfSnow');
      let chanceOfSunshine = Number(
        result.weather[0].hourly[0].chanceofsunshine
      );
      let chanceOfRain = Number(result.weather[0].hourly[0].chanceofrain);
      let chanceOfSnow = Number(result.weather[0].hourly[0].chanceofsnow);
      let areaName = result.nearest_area[0].areaName[0].value;

      // if nothing is inputted, use nearest area.
      if (!cityName) {
        cityName = areaName;
      }
      // if user input doesnt match, gives nearest area
      if (cityName !== areaName) {
        area.innerHTML = `<strong> Nearest Area: </strong> ${areaName}`;
        h2.textContent = cityName;
      } else {
        area.innerHTML = `<strong> Area: </strong> ${areaName}`;
        h2.textContent = cityName;
      }

      region.innerHTML = `<strong> Region: </strong> ${result.nearest_area[0].region[0].value}`;
      country.innerHTML = `<strong> Country: </strong> ${result.nearest_area[0].country[0].value}`;
      currently.innerHTML = `<strong> Currently: </strong> Feels like ${feeltemp}\u00B0F`;
      sunshineChance.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceOfSunshine}`;
      rainChance.innerHTML = `<strong>Chance of Rain:</strong> ${chanceOfRain}`;
      snowChance.innerHTML = `<strong>Chance of Snow:</strong> ${chanceOfSnow}`;

      let history = document.querySelector('ul');
      let previous = document.createElement('li');
      history.append(previous);
      previous.innerHTML = `<a href="#">${cityName}</a> - ${feeltemp}\u00B0F`;

      let a= document.querySelector('a')
      a.addEventListener(('click') =>{
        // fetch url with cityname and populate article .current-weather
      })

      let image = document.querySelector('img');
      if (chanceOfSunshine > 50) {
        image.src = './assets/icons8-summer.gif';
        image.alt = 'sun';
      } else if (chanceOfRain > 50) {
        image.src = './assets/icons8-torrential-rain.gif';
        image.alt = 'rain';
      } else if (chanceOfSnow > 50) {
        image.src = './assets/icons8-light-snow.gif';
        image.alt = 'snow';
      } else {
        image = '';
      }
      h2.before(image);
    })
    .catch((error) => console.log(error));
});

// function createErrorMessage(message) {
//   const section = document.createElement('section');
//   section.classList.add('error');
//   section.innerHTML = `<p>There was an error!</p><p class="message">${message}</p>`;

//   return section;
// }

// function grabCurrentWeather(json) {
//   let todaysWeather = {
//     date: "Today",
//     avgTempF: json.weather[0].avgtempF,
//     maxTempF: json.weather[0].maxtempF,
//     minTempF: json.weather[0].mintempF,
//   };
//   let tomorrowWeather = {
//     date: "Tomorrow",
//     avgTempF: json.weather[1].avgtempF,
//     maxTempF: json.weather[1].maxtempF,
//     minTempF: json.weather[1].mintempF,
//   };
//   let dayAfterTomorrowWeather = {
//     date: "Day After Tomorrow",
//     avgTempF: json.weather[2].avgtempF,
//     maxTempF: json.weather[2].maxtempF,
//     minTempF: json.weather[2].mintempF,
//   };

//   let weatherData = {
//     area,
//     region,
//     country,
//     feeltemp,
//     hourly,
//     weatherOfThreeDays: [
//       todaysWeather,
//       tomorrowWeather,
//       dayAfterTomorrowWeather,
//     ],
//   };

//   return weatherData;
// }
