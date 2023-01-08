const BASE_URL = 'https://wttr.in/';
const locationForm = document.querySelector('.locationForm');
const locationWeather = document.querySelector('.location-weather h2');


locationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let citySearched = event.target.location.value;
    event.target.location.value = '';
    console.log(`You want ${citySearched} weather!`)

    document.querySelector('#noSearch').hidden = true;
    let prevSearch = document.createElement('li');
    let prevCity = document.createElement('a');

    prevCity.textContent = citySearched;
    prevCity.href = `${BASE_URL}${citySearched}?format=j1`
    prevCity.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('You just clicked your last search');
        fetchWeather(citySearched);
    });

    document.querySelector('#previousSearches').append(prevSearch)
    // prevSearch.innerText = ` - prev temp °F`
    prevSearch.prepend(prevCity)
    prevSearch.classList = citySearched

    console.log(prevCity, prevSearch);

    fetchWeather(citySearched);

})

function fetchWeather(city) {
    fetch(`${BASE_URL}${city}?format=j1`)
        .then((response) => response.json())
        .then((json) => {
            locationWeather.innerText = city;
            document.querySelector(`.${city}`).append(` - ${json.current_condition[0].FeelsLikeF}°F`)
            // console.log(cityClass)
            displayWeather(json)
        })
        .catch((error) => console.log(error));
}

function displayWeather(data) {
    let { value: nearest } = data.nearest_area[0].areaName[0];
    let { value: region } = data.nearest_area[0].region[0];
    let { value: country } = data.nearest_area[0].country[0];
    let { FeelsLikeF } = data.current_condition[0];
    let { chanceofsunshine } = data.weather[0].hourly[4];
    let { chanceofrain } = data.weather[0].hourly[4];
    let { chanceofsnow } = data.weather[0].hourly[4];
    console.log(nearest, region, country, FeelsLikeF, chanceofsunshine, chanceofrain, chanceofsnow);
    document.querySelector(".nearest").innerHTML = `<b>Nearest Area:</b> ` + nearest;
    document.querySelector(".region").innerHTML = `<b>Region:</b> ` + region;
    document.querySelector(".country").innerHTML = `<b>Country:</b> ` + country;
    document.querySelector(".currentTemp").innerHTML = `<b>Currently:</b> Feels Like ` + FeelsLikeF + ` &degF`;
    document.querySelector(".sunChance").innerHTML = `<b>Chance of Sunshine:</b> ` + chanceofsunshine + `%`;
    document.querySelector(".rainChance").innerHTML = `<b>Chance of Rain:</b> ` + chanceofrain + `%`;
    document.querySelector(".snowChance").innerHTML = `<b>Chance of Snow:</b> ` + chanceofsnow + `%`;

    let weatherToday = document.createElement('article');
    weatherToday.innerHTML = `<b>Today</b>`
    document.createElement('p').append(weatherToday)
    let weatherTomorrow = document.createElement('article');
    let weatherThreeDay = document.createElement('article');

    // weatherToday.append(document.createElement('p').innerHTML = `<b>Average Temperature:</b> ${data.current_condition[0].FeelsLikeF}`)
    // weatherToday.createElement('p').innerHTML = `<b>Max Temperature: ${data.weather}`

    document.querySelector('.forecast').append(weatherToday)
}

