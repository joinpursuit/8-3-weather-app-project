const base_url = 'https://wttr.in/';
let weatherSearch = document.querySelector('.get-weather');
let searchBar = document.querySelector('#input-text');
let forecasts = document.querySelector('.forecasts');
let h2 = document.querySelector('h2');
// let widget = document.querySelector('#temp-conversion');

// ^^ I am choosing to keep the temp converter widget visibile with startup page instead of making it hidden

// main function to get weather
function getWeather(result, userInput) {

  // clear away placeholders
  let chooseP = document.getElementById('choose');
  chooseP.textContent = '';
  let historyP = document.getElementById('previous');
  historyP.textContent = '';
  forecasts.hidden = false;
  // widget.hidden = false;

  let area = document.querySelector('#Area');
  let region = document.querySelector('#Region');
  let country = document.querySelector('#Country');
  let currently = document.querySelector('#Currently');
  let sunChance = document.querySelector('#ChanceOfSunshine');
  let rainChance = document.querySelector('#ChanceOfRain');
  let snowChance = document.querySelector('#ChanceOfSnow');

  // access API data points
  let feeltemp = result.current_condition[0].FeelsLikeF;
  let chanceOfSunshine = Number(result.weather[0].hourly[0].chanceofsunshine);
  let chanceOfRain = Number(result.weather[0].hourly[0].chanceofrain);
  let chanceOfSnow = Number(result.weather[0].hourly[0].chanceofsnow);
  let areaName = result.nearest_area[0].areaName[0].value;

  // if nothing is inputted, use nearest area.
  if (!userInput) {
    userInput = areaName;
  }
  // if user input doesnt match areaName, gives 'nearest area:' instead of 'Area:'
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
}

// ^^ credit to lawrence for showing me I can use index of my day variables to access a specific p tag

// create and link previous searches

const linkPrevSearches = (result, userInput) => {
  let ul = document.querySelector('ul');
  let li = document.createElement('li');

  li.innerHTML = `<a href="#">${
    userInput[0].toUpperCase() + userInput.slice(1).toLowerCase()
  }</a> - ${result.current_condition[0].FeelsLikeF}°F`;

  ul.append(li);

  li.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(`${base_url}${userInput}?format=j1`)
      .then((response) => response.json())
      .then((result) => {
        getWeather(result, userInput);
      })
      .catch((error) => console.log(error));
  });
};

//main event listener**
weatherSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  const userInput = searchBar.value;
  fetch(`${base_url}${userInput}?format=j1`)
    .then((response) => response.json())
    .then((result) => {
      getWeather(result, userInput);
      linkPrevSearches(result, userInput);
      event.target.reset();
    })
    .catch((e) => {
      console.log(e);
    });
});

// temp converter widget
const convertForm = document.querySelector('#temp-conversion form');
convertForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputtedNum = document.getElementById('temp-to-convert').value;
  const convertToC = document.getElementById('to-c');
  const convertToF = document.getElementById('to-f');
  const answer = document.querySelector('#temp-conversion h4');

  if (convertToC.checked) {
    answer.textContent = `Result: ${((inputtedNum - 32) / 1.8).toFixed(
      2
    )}\u00B0C`;
  } else if (convertToF.checked) {
    answer.textContent = `Result: ${(inputtedNum * 1.8 + 32).toFixed(
      2
    )}\u00B0F`;
  }
});
