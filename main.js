const API_URL = 'https://wttr.in/'
const query = '?format=j1'

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    fetch(API_URL + event.target.location.value + query)
    .then(result => result.json())
    .then(weather => {
        console.log(weather);
        const location = event.target.location.value;
        event.target.location.value = '';

        const weatherDisplay = document.querySelector('main article');
        weatherDisplay.innerHTML = '';
        // weather.current-condition.0.FeelsLikeF

        const city = document.createElement('h2');
        city.textContent = location;
        weatherDisplay.append(city);

        const areaP = document.createElement('p');
        const area = weather.nearest_area[0].areaName[0].value;

        if (location == area) {
            areaP.innerHTML = `<strong>Area:</strong> ${area}`;
        } else {
            areaP.innerHTML = `<strong>Nearest Area:</strong> ${area}`
        }
        weatherDisplay.append(areaP);

        const regionP = document.createElement('p');
        regionP.innerHTML = `<strong>Region:</strong> ${weather.nearest_area[0].region[0].value}`;
        weatherDisplay.append(regionP);
        
        const countryP = document.createElement('p');
        countryP.innerHTML = `<strong>Country:</strong> ${weather.nearest_area[0].country[0].value}`;
        weatherDisplay.append(countryP);

        const feelsFP = document.createElement('p');
        feelsFP.innerHTML = `<strong>Currently:</strong> Feels Like ${weather.current_condition[0].FeelsLikeF}°F`;
        weatherDisplay.append(feelsFP);

        const days = document.querySelectorAll('.main aside article');
        const avg = '<strong>Average Temperature:</strong>';
        const max = '<strong>Max Temperature:</strong>';
        const min = '<strong>Min Temperature:</strong>';
        for (let i = 0; i < 3; i++) {
            days[i].innerHTML = '';
            const dayHeading = document.createElement('h3');
            if (i == 0) {
                dayHeading.innerText = 'Today';
            } else if (i == 1) {
                dayHeading.innerText = 'Tomorrow';
            } else {
                dayHeading.innerText = 'Day After Tomorrow';
            }
            const dayAvg = document.createElement('div');
            const dayMax = document.createElement('div');
            const dayMin = document.createElement('div');
            dayAvg.innerHTML = `${avg} ${weather.weather[i].avgtempF}°F`;
            dayMax.innerHTML = `${max} ${weather.weather[i].maxtempF}°F`;
            dayMin.innerHTML = `${min} ${weather.weather[i].mintempF}°F`;
            days[i].append(dayHeading);
            days[i].append(dayAvg);
            days[i].append(dayMax);
            days[i].append(dayMin);
        }

        

        
        
        
    })
});