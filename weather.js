const Base_URL = "https://wttr.in/"
const END_URL = '?format=j1'

const form = document.querySelector('#location');
const main = document.querySelector('main');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const weather = document.querySelector('#inputText');
    const current = document.querySelector('#currentWeather')

    let userLocationSubmit = weather.value

    const url = `${Base_URL}${userLocationSubmit}${END_URL}`
    form.reset();
    fetch(url)
    .then((res) => res.json())
    .then((res2) => {
        
        const hiddenLocation = document.querySelector('#currentWeather')
        hiddenLocation.innerHTML = `<h2>${userLocationSubmit}</h2>`

        const area = res2.nearest_area[0].areaName[0].value;
        const areaS = document.createElement('p');
        areaS.innerHTML = `<strong>Nearest Area: </strong>${area}`;
        current.append(areaS);

        const region = res2.nearest_area[0].region[0].value;
        const regionS = document.createElement('p');
        regionS.innerHTML = `<strong>Region: </strong>${region}`;
        current.append(regionS);

        const country = res2.nearest_area[0].country[0].value;
        const countries = document.createElement('p');
        countries.innerHTML = `<strong>Country: </strong>${country}`;
        current.append(countries);

        const feelsLike = res2.current_condition[0].FeelsLikeF;
        const feelsLike2 = document.createElement('p');
        feelsLike2.innerHTML = `<strong>Currently: </strong>Feels Like ${feelsLike}°F`;
        current.append(feelsLike2);

        const sun = res2.weather[0].hourly[0].chanceOfSunshine;
        const sunny = document.createElement('p');
        sunny.innerHTML = `<strong>Chance of Sunshine: </strong>${sun}`;
        current.append(sunny);

        const rain = res2.weather[0].hourly[0].chanceOfRain;
        const rainy = document.createElement('p');
        rainy.innerHTML = `<strong>Chance of Rain: </strong>${rain}`;
        current.append(rainy);

        const snow =res2.weather[0].hourly[0].chanceOfSnow;
        const snowy = document .createElement('p');
        snowy.innerHTML = `<strong>Chance of Snow: </strong>${snow}`;
        current.append(snowy);

        const today = document.querySelector('#today');
        today.innerHTML = `<h2>Today</h2>`
        const avgTempToday = document.createElement('p');
        const minTempToday = document.createElement('p');
        const maxTempToday = document.createElement('p');
        const avgTemp = res2.weather[0].avgtempF
        avgTempToday.innerHTML = `<strong>Average Temperature: </strong>${avgTemp}°F`;
        const minTemp = res2.weather[0].minTempF
        minTempToday.innerHTML = `<strong>Min Temperature: </strong>${minTemp}°F`;
        const maxTemp = res2.weather[0].maxtempF
        maxTempToday.innerHTML = `<strong>Max Temperature: </strong>${maxTemp}°F`;

        today.append(avgTempToday, minTempToday, maxTempToday);

        const tomorrow = document.querySelector('#tomorrow');
        tomorrow.innerHTML = `<h2>Tomorrow</h2>`
        const avgTempTmw = document.createElement('p');
        const minTempTmw = document.createElement('p');
        const maxtempTmw = document.createElement('p');
        const avgTemp1 = res2.weather[1].avgtempF
        avgTempTmw.innerHTML = `<strong>Average Temperature: </strong>${avgTemp1}°F`;
        const minTemp1 = res2.weather[1].mintempF
        minTempTmw.innerHTML = `<strong>Min Temperature: </strong>${minTemp1}°F`;
        const maxTemp1 = res2.weather[1].maxtempF
        maxtempTmw.innerHTML = `<strong>Max Temperature: </strong>${maxTemp1}°F`;

        tomorrow.append(avgTempTmw, minTempTmw, maxtempTmw);

        const afterTmw = document.querySelector('#afterTomorrow');
        afterTmw.innerHTML = `<h2>Day After Tomorrow</2>`
        const avgTempAfter = document.createElement('p')
        const minTempAfter =


    })
})