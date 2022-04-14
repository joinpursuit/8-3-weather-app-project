const base_url = 'https://wttr.in/';
let weatherSearch = document.querySelector('.get-weather');
let place = document.querySelector('#input-text');
let widget = document.querySelector('#temp-conversion');
let forecasts = document.querySelector('.forecasts');
let h2 = document.querySelector('h2');
let cityName;

//main event listener**
weatherSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  let cityName = place.value;
  let full_url = `${base_url}${cityName}?format=j1`;
  widget.hidden = false; // make the widget appear
  forecasts.hidden = false;

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
      let sunshineChance = document.querySelector('#ChanceOfSunshine');
      let rainChance = document.querySelector('#ChanceOfRain');
      let snowChance = document.querySelector('#ChanceOfSnow');

      let feeltemp = result.current_condition[0].FeelsLikeF;
      let chanceOfSunshine = Number(
        result.weather[0].hourly[0].chanceofsunshine
      );
      let chanceOfRain = Number(result.weather[0].hourly[0].chanceofrain);
      let chanceOfSnow = Number(result.weather[0].hourly[0].chanceofsnow);
      let areaName = result.nearest_area[0].areaName[0].value;
      // console.log(result);
      // console.log(cityName.toLowerCase());
      // console.log(areaName.toLowerCase());

      // if nothing is inputted, use nearest area.
      if (!cityName) {
        cityName = areaName;
      }
      // if user input doesnt match, gives nearest area
      if (cityName.toLowerCase() !== areaName.toLowerCase()) {
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

      let today = document.querySelectorAll('#today p');
      let tomorrow = document.querySelectorAll('#tomorrow p');
      let dayAFterTom = document.querySelectorAll('#day-after-tomorrow p');

      today[0].textContent = `Average temperature: ${result.weather[0].avgtempF}\u00B0F`;
      today[1].textContent = `Max temperature: ${result.weather[0].maxtempF}\u00B0F`;
      today[2].textContent = `Min temperature: ${result.weather[0].mintempF}\u00B0F`;

      tomorrow[0].textContent = `Average temperature: ${result.weather[1].avgtempF}\u00B0F`;
      tomorrow[1].textContent = `Max temperature: ${result.weather[1].maxtempF}\u00B0F`;
      tomorrow[2].textContent = `Min temperature: ${result.weather[1].mintempF}\u00B0F`;

      dayAFterTom[0].textContent = `Average temperature: ${result.weather[2].avgtempF}\u00B0F`;
      dayAFterTom[1].textContent = `Max temperature: ${result.weather[2].maxtempF}\u00B0F`;
      dayAFterTom[2].textContent = `Min temperature: ${result.weather[2].mintempF}\u00B0F`;

      let history = document.querySelector('ul');
      let previous = document.createElement('li');
      history.append(previous);
      previous.innerHTML = `<a href="#">${cityName}</a> - ${feeltemp}\u00B0F`;

      // let a = document.querySelector('a');
      // a.addEventListener('click', (e) => {
      //   e.preventDefault();

      //   // fetch url with cityname and populate article .current-weather
      // });

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

// const forcast = ({ result }) => {
//   today[0].textContent = `Average temperature: ${result.weather[0].avgtempF}\u00B0F`;
//   today[1].textContent = `Max temperature: ${result.weather[0].maxtempF}\u00B0F`;
//   today[2].textContent = `Min temperature: ${result.weather[0].mintempF}\u00B0F`;

//   tomorrow[0].textContent = `Average temperature: ${result.weather[1].avgtempF}\u00B0F`;
//   tomorrow[1].textContent = `Max temperature: ${result.weather[1].maxtempF}\u00B0F`;
//   tomorrow[2].textContent = `Min temperature: ${result.weather[1].mintempF}\u00B0F`;

//   dayAFterTom[0].textContent = `Average temperature: ${result.weather[2].avgtempF}\u00B0F`;
//   dayAFterTom[1].textContent = `Max temperature: ${result.weather[2].maxtempF}\u00B0F`;
//   dayAFterTom[2].textContent = `Min temperature: ${result.weather[2].mintempF}\u00B0F`;
// };

// function createErrorMessage(message) {
//   const section = document.createElement('section');
//   section.classList.add('error');
//   section.innerHTML = `<p>There was an error!</p><p class="message">${message}</p>`;

//   return section;
// }
