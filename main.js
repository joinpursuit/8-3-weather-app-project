const BASE_URL = 'https://wttr.in/';
const form = document.querySelector('form');
const currentWeather = document.querySelector('article');
const weatherIcon = document.createElement('img');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  //This line of code will make the paragraph "Choose a location to view the weather" disappear
  document.querySelector('main p').hidden = true;

  let city = event.target.location.value;
  event.target.location.value = ''; //clearing the query per search

  fetch(`${BASE_URL}${city}?format=j1`)//fetching the api
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let feelsLikeTemp = getWeatherReport(currentWeather, json, city); //A helper function with which will take three parameters (the established const currentWeather, the promised json, and the established city variable) and return to us a forecast
      const ul = document.querySelector('ul'); //creating a variable to store the ul in our html
      const searchHistory = document.createElement('li');//creating a list element in the html 
      let a = document.createElement('a'); 
      a.textContent = city;
      a.href = `${BASE_URL}${city}?format=j1`;
      searchHistory.textContent = feelsLikeTemp;
      searchHistory.prepend(a);
      ul.append(searchHistory);
        console.log(json)
      //This part will hide "No previous searches" if users type city's name in the search box
      let previous = document.querySelector('section.previous p');
      previous.hidden = true;

      //This part will populate weather forecast in the main section when sidebar link is clicked
      a.addEventListener('click', (event) => {
        event.preventDefault();
        getWeatherReport(currentWeather, json, city);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//Create a helper function to show the city weather forecast in the main section//A helper function is made, which takes three parameters: What is stored in our article data, the json data of the API, and the now cleared/defaulted query. Inside the function, innerHTML is used to clear the query at default so that search results do not stack. A variable is created to house a new heading element which will have a text content of the input holding our event listener which is then appended to the article.
const getWeatherReport = (currentWeather, json, city) => {
  currentWeather.innerHTML = '';
  let location = document.createElement('h2');
  location.textContent = city;
  currentWeather.append(location);

  let area = json.nearest_area[0].areaName[0].value; 
  let areaData = document.createElement('p');
  currentWeather.append(areaData);

  //Ensuring the entered strings always match, we use an if/else to handle displaying the correct text content related to the aforementioned area value.
  if (area.toLowerCase() === city.toLowerCase()) {
    areaData.textContent = `Area: ${area}`;
  } else {
    areaData.textContent = `Nearest Area: ${area}`;
  }

  let region = json.nearest_area[0].region[0].value;//a region variable is created
  regionData = document.createElement('p');//storing a created paragraph html element into an accessible variable
  regionData.textContent = region;//changing its text content to display the value of region
  currentWeather.append(regionData); //and appending the new text content to the variable storing the article

  let country = json.nearest_area[0].country[0].value;//the process above, but using a different set of data (country) from the json
  countryData = document.createElement('p');
  countryData.textContent = country;
  currentWeather.append(countryData);

  let feelsLikeTemp = `Currently feels like ${json.current_condition[0].FeelsLikeF} °F`;// a variable is created containing an interpolated string of the stored fahreinheit temperature available in the json at its first index
  tempData = document.createElement('p'); //a new paragraph is created and stored
  tempData.textContent = feelsLikeTemp; //our interpolated string becomes its text content
  currentWeather.append(tempData);// and this is appened onto the stored article variable

  const chanceOfSunshine = json.weather[0].hourly[0].chanceofsunshine;//constants were established for each variation of weather (at their first index) with which to be referred to below
  const chanceOfRain = json.weather[0].hourly[0].chanceofrain;
  const chanceOfSnow = json.weather[0].hourly[0].chanceofsnow;

  const sunny = document.createElement('p');//constants are then created and named after each applicable condition and having their text content changed to store a new interpolation that will properly display the relevant information
  sunny.textContent = `Chance of Sunshine ${chanceOfSunshine}%`;
  currentWeather.append(sunny);

  const rainy = document.createElement('p');
  rainy.textContent = `Chance of Rain ${chanceOfRain}%`;
  currentWeather.append(rainy);

  const snow = document.createElement('p');
  snow.textContent = `Chance of Snow ${chanceOfSnow}%`;
  currentWeather.append(snow);//each variation is appended respectively into the stored article variable

  //Here we are looping through the hourly array's amount of entries to the keys with the appropriate name. Should there be a chance of either sunshine, rain, or snow above a threshod of 50, an appropriate .gif file will be displayed in the report.
  for (let i = 0; i < json.weather[0].hourly.length; i++) {
    //50% chance of Sunshine
    if (Number(json.weather[0].hourly[i].chanceofsunshine) > 50) {
      weatherIcon.src = './assets/icons8-summer.gif';
      weatherIcon.alt = 'sun';
    }
    //50% chance of Rain
    if (Number(json.weather[0].hourly[i].chanceofrain) > 50) {
      weatherIcon.src = './assets/icons8-torrential-rain.gif';
      ('https://img.freepik.com/free-photo/rainy-day-icon-3d-render-illustration-style_516190-319.jpg?w=996');
      weatherIcon.alt = 'rain';
    }
    //50% chance of Snow
    if (Number(json.weather[0].hourly[i].chanceofsnow) > 50) {
      weatherIcon.src = './assets/icons8-light-snow.gif';
      weatherIcon.alt = 'snow';
    }
  }
  currentWeather.prepend(weatherIcon);

  //This block handles the three day forecast to follow the current weather outputted. constants are created to house a direct path to our html element and to house an array of string values which will be sorted to their appropriate category. Looping through what is currently in our article section (current-weather), we clear the results (line 120) so as to not clutter the returned results together. We create a paragraph tag and have its content be our established forecast variable, and we create three more paragraphs to house the Avg, Min, and Max temperatures given to us by the json. We then change the text content of each to hold the information and finally append it to the aforementioned article. Our FeelsLikeTemp variable is returned to the user which outputs an interpolated statement containing the relevant information.
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

//This part will handle the temperature convertion. An event listener is introduced to key in for when the user submits an input into the conveter. We then make the inputed value a constant temperature variable. a constant variable named types is created to house the value of the converted temperature, which is done via the if statement located below. There the forumla for converting from C to F and from F to C are stored in constants and stored as the content of the header in which the results are set to appear in the html.
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

//A very huge thanks to fellows Herman, Derek, Luis and Oscar, for helping me with this code and for helping me shape my logic. My gratitude is immesaurable.