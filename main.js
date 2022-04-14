const base_url = 'https://wttr.in/';
let weatherSearch = document.querySelector('.get-weather');
let searchBar = document.querySelector('#input-text');
let widget = document.querySelector('#temp-conversion');
let forecasts = document.querySelector('.forecasts');
let h2 = document.querySelector('h2');

//main event listener**
weatherSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  const userInput = searchBar.value;
  
  getWeather(userInput);

  widget.hidden = false;
  forecasts.hidden = false;
  event.target.reset();
});

// main fetch function
function getWeather(userInput) {
  fetch(`${base_url}${userInput}?format=j1`)
    .then((response) => response.json())
    .then((result) => {
      let chooseP = document.getElementById('choose');
      chooseP.textContent = '';

      let historyP = document.getElementById('previous');
      historyP.textContent = '';

      // capitalize 1st letter of userinput
      // userInput = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();

      let area = document.querySelector('#Area');
      let region = document.querySelector('#Region');
      let country = document.querySelector('#Country');
      let currently = document.querySelector('#Currently');
      let sunChance = document.querySelector('#ChanceOfSunshine');
      let rainChance = document.querySelector('#ChanceOfRain');
      let snowChance = document.querySelector('#ChanceOfSnow');

      // access API data points
      let feeltemp = result.current_condition[0].FeelsLikeF;
      let chanceOfSunshine = Number(
        result.weather[0].hourly[0].chanceofsunshine
      );
      let chanceOfRain = Number(result.weather[0].hourly[0].chanceofrain);
      let chanceOfSnow = Number(result.weather[0].hourly[0].chanceofsnow);
      let areaName = result.nearest_area[0].areaName[0].value;

      // if nothing is inputted, use nearest area.
      if (!userInput) {
        userInput = areaName;
      }
      // if user input doesnt match, gives 'nearest area:' instead of 'Area:'
      if (userInput !== areaName) {
        area.innerHTML = `<strong> Nearest Area: </strong> ${areaName}`;
        h2.textContent = userInput;
      } else {
        area.innerHTML = `<strong> Area: </strong> ${areaName}`;
        h2.textContent = userInput;
      }

      region.innerHTML = `<strong> Region: </strong> ${result.nearest_area[0].region[0].value}`;
      country.innerHTML = `<strong> Country: </strong> ${result.nearest_area[0].country[0].value}`;
      currently.innerHTML = `<strong> Currently: </strong> Feels like ${feeltemp}\u00B0F`;
      sunChance.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceOfSunshine}`;
      rainChance.innerHTML = `<strong>Chance of Rain:</strong> ${chanceOfRain}`;
      snowChance.innerHTML = `<strong>Chance of Snow:</strong> ${chanceOfSnow}`;

      //add image above current weather info
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

      // Create 3 day forecast

      let today = document.querySelectorAll('#today p');
      let tomorrow = document.querySelectorAll('#tomorrow p');
      let dayAFterTom = document.querySelectorAll('#day-after-tomorrow p');
      let temps = result.weather;

      today[0].textContent = `Average temperature: ${temps[0].avgtempF}\u00B0F`;
      today[1].textContent = `Max temperature: ${temps[0].maxtempF}\u00B0F`;
      today[2].textContent = `Min temperature: ${temps[0].mintempF}\u00B0F`;

      tomorrow[0].textContent = `Average temperature: ${temps[1].avgtempF}\u00B0F`;
      tomorrow[1].textContent = `Max temperature: ${temps[1].maxtempF}\u00B0F`;
      tomorrow[2].textContent = `Min temperature: ${temps[1].mintempF}\u00B0F`;

      dayAFterTom[0].textContent = `Average temperature: ${temps[2].avgtempF}\u00B0F`;
      dayAFterTom[1].textContent = `Max temperature: ${temps[2].maxtempF}\u00B0F`;
      dayAFterTom[2].textContent = `Min temperature: ${temps[2].mintempF}\u00B0F`;

      // previous searches
      let history = document.querySelector('ul');
      let previous = document.createElement('li');
      history.append(previous);
      previous.innerHTML = `<a href="#">${userInput}</a> - ${feeltemp}\u00B0F`;
    })
    .catch((error) => console.log(error));
}

// temp converter widget
const convertForm = document.querySelector('#temp-conversion form');
convertForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputtedNum = document.getElementById('temp-to-convert').value;
  const convertToC = document.getElementById('to-c');
  const convertToF = document.getElementById('to-f');
  const answer = document.querySelector('#temp-conversion h4');

  console.log(inputtedNum);
  console.log(answer);

  if (convertToC.checked) {
    answer.textContent = `Result: ${((inputtedNum - 32) / 1.8).toFixed(
      2
    )}\u00B0F`;
  } else if (convertToF.checked) {
    answer.textContent = `Result: ${(inputtedNum * 1.8 + 32).toFixed(
      2
    )}\u00B0C`;
  }
});

// function addPreviousLinks(userInput) {
//   let history = document.querySelector('ul');
//   let previous = document.createElement('li');
//   history.append(previous);
//   previous.innerHTML = `<a href="#">${userInput}</a> - ${feeltemp}\u00B0F`;
// }

// let a = document.querySelector('.previous a');
// a.addEventListener('click', (e) => {
//   e.preventDefault();

//   // fetch url with cityname and populate article .current-weather
// });

//       // let a = document.querySelector('a');
//       // a.addEventListener('click', (e) => {
//       //   e.preventDefault();

//       //   // fetch url with cityname and populate article .current-weather
//       // });

//       let image = document.querySelector('img');
//       if (chanceOfSunshine > 50) {
//         image.src = './assets/icons8-summer.gif';
//         image.alt = 'sun';
//       } else if (chanceOfRain > 50) {
//         image.src = './assets/icons8-torrential-rain.gif';
//         image.alt = 'rain';
//       } else if (chanceOfSnow > 50) {
//         image.src = './assets/icons8-light-snow.gif';
//         image.alt = 'snow';
//       } else {
//         image = '';
//       }
//       h2.before(image);
//     })
//     .catch((error) => console.log(error));
// });

// function createErrorMessage(message) {
//   const section = document.createElement('section');
//   section.classList.add('error');
//   section.innerHTML = `<p>There was an error!</p><p class="message">${message}</p>`;

//   return section;
// }
