const BASE_URL = 'https://wttr.in/';
const locationForm = document.querySelector('.locationForm');
const locationWeather = document.querySelector('article');
const weatherIcon = document.querySelector('img');

// Event Listener for City Submit Search
locationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Bucket for city searched, clears search text and invokes fetch function
    let citySearched = event.target.location.value;
    event.target.location.value = '';
    console.log(`You want ${citySearched} weather!`)
    // Invoking function to fetchWeather & and within that function, displayWeather
    fetchWeather(citySearched);
})

/**
 * Function to FETCH weather info
 *  Also creates previous search section
 */
function fetchWeather(city) {
    fetch(`${BASE_URL}${city}?format=j1`)
        .then((response) => response.json())
        .then((json) => {
            //Makes H2 in Main = to city searched, then invokes displayWeather function that I created to fill in data
            document.querySelector('article h2').innerText = city;
            console.log(json);
            displayWeather(json);

            /**
             * Previous Search History Creation
             */
            // Selecting and hiding message of no previous
            let prev = document.querySelector('#noSearch');
            if (prev) {
                prev.remove();
            }

            // Creating 2 new elements
            let prevSearch = document.createElement('li');
            let prevCity = document.createElement('a');

            // Edge case check to ensure no duplicate previous searches
            if (!document.querySelector(`.${city}`)) {
                // Adding CITY to a-tag, making it a link, and adding event listener
                prevCity.textContent = city;
                prevCity.href = `${BASE_URL}${city}?format=j1`
                prevCity.addEventListener('click', (event) => {
                    event.preventDefault();
                    console.log('You just clicked your last search');

                    fetchWeather(city);
                });
                // Add class to previous search a-tag that equals the city name
                // PREPENDS the City a-tag to the prevSearch li-tag
                // APPENDS the whole li-tag (that now contains the a-tag) to the previous search aside
                // Selects to a-tag based on the city class and APPENDS the temp

                prevSearch.classList = city
                prevSearch.prepend(prevCity)
                document.querySelector('#previous-searches').append(prevSearch)
                document.querySelector(`.${city}`).append(` - ${json.current_condition[0].FeelsLikeF}°F`);

                // console.log(prevSearch);

            }
        })
        .catch((error) => console.log(error));

    /**
     * Function to display all weather data once FETCH'd
     *  Nested within fetchWeather function for variable scpe reasons
     */
    function displayWeather(data) {
        // Using object destructuring to pull data from json
        let { value: nearest } = data.nearest_area[0].areaName[0];
        let { value: region } = data.nearest_area[0].region[0];
        let { value: country } = data.nearest_area[0].country[0];
        let { FeelsLikeF } = data.current_condition[0];
        let { chanceofsunshine } = data.weather[0].hourly[4];
        let { chanceofrain } = data.weather[0].hourly[4];
        let { chanceofsnow } = data.weather[0].hourly[4];

        console.log(nearest, region, country, FeelsLikeF, chanceofsunshine, chanceofrain, chanceofsnow);

        // Following lines take relevant info from json/data, and place into p-tags within main

        // Changes weather icon based on chance of relevant weather
        if (chanceofsunshine > 50) {
            weatherIcon.src = './assets/icons8-summer.gif';
            weatherIcon.alt = 'sun';
        } else if (chanceofrain > 50) {
            weatherIcon.src = './assets/icons8-torrential-rain.gif';
            weatherIcon.alt = 'rain';
        } else if (chanceofsnow > 50) {
            weatherIcon.src = './assets/icons8-light-snow.gif';
            weatherIcon.alt = 'snow';
        }

        // Edge case check of NEAREST value to switch between 'Area' & 'Nearest Area'
        if (city.toLowerCase() === nearest.toLowerCase()) {
            document.querySelector(".nearest").innerHTML = `<b>Area:</b> ` + nearest;
        } else {
            document.querySelector(".nearest").innerHTML = `<b>Nearest Area:</b> ` + nearest;
        }
        document.querySelector(".region").innerHTML = `<b>Region:</b> ` + region;
        document.querySelector(".country").innerHTML = `<b>Country:</b> ` + country;
        document.querySelector(".currentTemp").innerHTML = `<b>Currently:</b> Feels Like ` + FeelsLikeF + ` &degF`;
        document.querySelector(".sunChance").innerHTML = `<b>Chance of Sunshine:</b> ` + chanceofsunshine + `%`;
        document.querySelector(".rainChance").innerHTML = `<b>Chance of Rain:</b> ` + chanceofrain + `%`;
        document.querySelector(".snowChance").innerHTML = `<b>Chance of Snow:</b> ` + chanceofsnow + `%`;


        document.querySelector('.forecast').innerHTML = '';
        const forecastDays = ['Today', 'Tomorrow', 'Day After Tomorrow'];

        // Loop for Forecast
        for (let i = 0; i < data.weather.length; i++) {

            let forecastDay = document.createElement('article');
            forecastDay.innerHTML = `<b>${forecastDays[i]}</b>`

            let avgTemp = document.createElement('p');
            avgTemp.innerHTML = `<b>Average Temperature:</b> ${data.weather[i].avgtempF}°F`

            let maxTemp = document.createElement('p');
            maxTemp.innerHTML = `<b>Max Temperature:</b> ${data.weather[i].maxtempF}°F`

            let minTemp = document.createElement('p');
            minTemp.innerHTML = `<b>Min Temperature:</b> ${data.weather[i].mintempF}°F`

            forecastDay.append(avgTemp, maxTemp, minTemp);
            document.querySelector('.forecast').append(forecastDay)

            // weatherToday.append(document.createElement('p').innerHTML = `<b>Average Temperature:</b> ${data.current_condition[0].FeelsLikeF}`)
            // weatherToday.createElement('p').innerHTML = `<b>Max Temperature: ${data.weather}`
        }
    }
}


// Temperature Conversion
const tempConvert = document.querySelector('.tempConversion');
tempConvert.addEventListener('submit', (event) => {
    event.preventDefault();

    const tempToConvert = event.target.querySelector('#temp-to-convert').value;
    console.log(tempToConvert);

    if (document.querySelector('#to-c').checked) {
        let celc = (tempToConvert - 32) * 5 / 9;
        document.querySelector('.convertedTemp').innerText = `${celc.toFixed(2)} °C`;
    } else if (document.querySelector('#to-f').checked) {
        let fahr = (tempToConvert * 9) / 5 + 32;
        document.querySelector('.convertedTemp').innerText = `${fahr.toFixed(2)} °F`;
    }
})
