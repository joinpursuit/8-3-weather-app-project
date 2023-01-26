const API_URL = 'https://wttr.in/'
const query = '?format=j1'

// Selects the form and attaches a consequence for submitting it
document.querySelector("form").addEventListener("submit", (event) => {
// Avoids submitting the form before consequences are attached
event.preventDefault();
// Gets information from the API to be used
fetch(API_URL + event.target.location.value + query)
// Transforms the received JSON to usable JS
.then(result => result.json())
// Allows the received info from the API to be used
.then(weather => {
    // Stores the input and clears the input field
    const location = event.target.location.value;
    event.target.location.value = '';
    // Selects and clears the main section of the page
    const weatherDisplay = document.querySelector('main article');
    weatherDisplay.innerHTML = '';

    // Adds icon based on chance data
    const chanceOfSunshine = weather.weather[0].hourly[0].chanceofsunshine;
    const chanceOfRain = weather.weather[0].hourly[0].chanceofrain;
    const chanceOfSnow = weather.weather[0].hourly[0].chanceofsnow;
    const icon = document.createElement('img');

    if (chanceOfSunshine > 50) {
        icon.setAttribute('src', './assets/icons8-summer.gif');
        icon.setAttribute('alt', 'sun');
    } else if (chanceOfRain > 50) {
        icon.setAttribute('src', './assets/icons8-torrential-rain.gif');
        icon.setAttribute('alt', 'rain');
    } else if (chanceOfSnow > 50) {
        icon.setAttribute('src', './assets/icons8-light-snow.gif');
        icon.setAttribute('alt', 'snow');
    }
    weatherDisplay.appendChild(icon);

    // Creates a header with the input text and adds it to the main section 
    const city = document.createElement('h2');
    city.textContent = location;
    weatherDisplay.append(city);
    // Displays the area, or the nearest to it if not found
    const areaP = document.createElement('p');
    const area = weather.nearest_area[0].areaName[0].value;
    if (location == area) {
        areaP.innerHTML = `<strong>Area:</strong> ${area}`;
    } else {
        areaP.innerHTML = `<strong>Nearest Area:</strong> ${area}`
    }
    weatherDisplay.append(areaP);
    // Displays the region
    const regionP = document.createElement('p');
    regionP.innerHTML = `<strong>Region:</strong> ${weather.nearest_area[0].region[0].value}`;
    weatherDisplay.append(regionP);
    // Displays the country
    const countryP = document.createElement('p');
    countryP.innerHTML = `<strong>Country:</strong> ${weather.nearest_area[0].country[0].value}`;
    weatherDisplay.append(countryP);
    // Displays the temperature that is felt currently
    const feelsFP = document.createElement('p');
    feelsFP.innerHTML = `<strong>Currently:</strong> Feels Like ${weather.current_condition[0].FeelsLikeF}°F`;
    weatherDisplay.append(feelsFP);
    // Displays the chance of sunshine, rain and snow
    const sunshine = document.createElement('p');
    sunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceOfSunshine}`;
    weatherDisplay.append(sunshine);
    const rain = document.createElement('p');
    rain.innerHTML = `<strong>Chance of Rain:</strong> ${chanceOfRain}`;
    weatherDisplay.append(rain);
    const snow = document.createElement('p');
    snow.innerHTML = `<strong>Chance of Snow:</strong> ${chanceOfSnow}`;
    weatherDisplay.append(snow);
    // Selects all articles below the main section to be filled
    const days = document.querySelectorAll('.main aside article');
    // Templates to be used
    const avg = '<strong>Average Temperature:</strong>';
    const max = '<strong>Max Temperature:</strong>';
    const min = '<strong>Min Temperature:</strong>';
    // Adds relevant information to each article for each day using the templates by looping through the days
    for (let i = 0; i < 3; i++) {
        // Clears each article
        days[i].innerHTML = '';
        // Creates a heading with text appropriate to the day
        const dayHeading = document.createElement('h3');
        if (i == 0) {
            dayHeading.innerText = 'Today';
        } else if (i == 1) {
            dayHeading.innerText = 'Tomorrow';
        } else {
            dayHeading.innerText = 'Day After Tomorrow';
        }
        // Creates sections with the average, max and min temperatures for each day
        const dayAvg = document.createElement('div');
        const dayMax = document.createElement('div');
        const dayMin = document.createElement('div');
        dayAvg.innerHTML = `${avg} ${weather.weather[i].avgtempF}°F`;
        dayMax.innerHTML = `${max} ${weather.weather[i].maxtempF}°F`;
        dayMin.innerHTML = `${min} ${weather.weather[i].mintempF}°F`;
        // Adds the created headers and sections to the respective articles
        days[i].append(dayHeading);
        days[i].append(dayAvg);
        days[i].append(dayMax);
        days[i].append(dayMin);
    }
    // Selects the default message in the previous searches section and removes it
    const clearMsg = document.querySelector('.previous section ul p');
    const clearPrev = document.querySelector('.previous section ul');
    clearMsg && clearPrev.removeChild(clearMsg);
    // Displays the recently made search on the previous searches section, with a clickable link to it
    const updatePrev = document.querySelector('.previous section ul');
    const newSearch = document.createElement('li');
    const linkPrev = document.createElement('a');
    linkPrev.innerText = `${location} - ${weather.current_condition[0].FeelsLikeF}°F`;
    newSearch.append(linkPrev);
    updatePrev.append(newSearch);

    linkPrev.addEventListener('click', (e) => {
        // Selects the current location of which the weather information is being shown
        const currentLocation = document.querySelector('main h2');
        // If the clicked link is not of the location of which the weather information is being shown, run the 
        // previous code again for the clicked location
        if (e.target.innerText != currentLocation.innerText) {
            {
            // Avoids submitting the form before consequences are attached
            e.preventDefault();
            // Gets information from the API to be used
            fetch(API_URL + e.target.innerText + query)
            // Transforms the received JSON to usable JS
            .then(result => result.json())
            // Allows the received info from the API to be used
            .then(weather => {
                // Stores the input 
                const location = e.target.innerText;
                // Selects and clears the main section of the page
                const weatherDisplay = document.querySelector('main article');
                weatherDisplay.innerHTML = '';
                // Adds icon based on chance data
                const chanceOfSunshine = weather.weather[0].hourly[0].chanceofsunshine;
                const chanceOfRain = weather.weather[0].hourly[0].chanceofrain;
                const chanceOfSnow = weather.weather[0].hourly[0].chanceofsnow;
                const icon = document.createElement('img');

                if (chanceOfSunshine > 50) {
                    icon.setAttribute('src', './assets/icons8-summer.gif');
                    icon.setAttribute('alt', 'sun');
                } else if (chanceOfRain > 50) {
                    icon.setAttribute('src', './assets/icons8-torrential-rain.gif');
                    icon.setAttribute('alt', 'rain');
                } else if (chanceOfSnow > 50) {
                    icon.setAttribute('src', './assets/icons8-light-snow.gif');
                    icon.setAttribute('alt', 'snow');
                }
                weatherDisplay.appendChild(icon);
                // Creates a header with the input text and adds it to the main section 
                const city = document.createElement('h2');
                city.textContent = location;
                weatherDisplay.append(city);
                // Displays the area, or the nearest to it if not found
                const areaP = document.createElement('p');
                const area = weather.nearest_area[0].areaName[0].value;
                if (location == area) {
                    areaP.innerHTML = `<strong>Area:</strong> ${area}`;
                } else {
                    areaP.innerHTML = `<strong>Nearest Area:</strong> ${area}`
                }
                weatherDisplay.append(areaP);
                // Displays the region
                const regionP = document.createElement('p');
                regionP.innerHTML = `<strong>Region:</strong> ${weather.nearest_area[0].region[0].value}`;
                weatherDisplay.append(regionP);
                // Displays the country
                const countryP = document.createElement('p');
                countryP.innerHTML = `<strong>Country:</strong> ${weather.nearest_area[0].country[0].value}`;
                weatherDisplay.append(countryP);
                // Displays the temperature that is felt currently
                const feelsFP = document.createElement('p');
                feelsFP.innerHTML = `<strong>Currently:</strong> Feels Like ${weather.current_condition[0].FeelsLikeF}°F`;
                weatherDisplay.append(feelsFP);
                // Displays the chance of sunshine, rain and snow
                const sunshine = document.createElement('p');
                sunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceOfSunshine}`;
                weatherDisplay.append(sunshine);
                const rain = document.createElement('p');
                rain.innerHTML = `<strong>Chance of Rain:</strong> ${chanceOfRain}`;
                weatherDisplay.append(rain);
                const snow = document.createElement('p');
                snow.innerHTML = `<strong>Chance of Snow:</strong> ${chanceOfSnow}`;
                weatherDisplay.append(snow);
                // Selects all articles below the main section to be filled
                const days = document.querySelectorAll('.main aside article');
                // Templates to be used
                const avg = '<strong>Average Temperature:</strong>';
                const max = '<strong>Max Temperature:</strong>';
                const min = '<strong>Min Temperature:</strong>';
                // Adds relevant information to each article for each day using the templates by looping through the days
                for (let i = 0; i < 3; i++) {
                    // Clears each article
                    days[i].innerHTML = '';
                    // Creates a heading with text appropriate to the day
                    const dayHeading = document.createElement('h3');
                    if (i == 0) {
                        dayHeading.innerText = 'Today';
                    } else if (i == 1) {
                        dayHeading.innerText = 'Tomorrow';
                    } else {
                        dayHeading.innerText = 'Day After Tomorrow';
                    }
                    // Creates sections with the average, max and min temperatures for each day
                    const dayAvg = document.createElement('div');
                    const dayMax = document.createElement('div');
                    const dayMin = document.createElement('div');
                    dayAvg.innerHTML = `${avg} ${weather.weather[i].avgtempF}°F`;
                    dayMax.innerHTML = `${max} ${weather.weather[i].maxtempF}°F`;
                    dayMin.innerHTML = `${min} ${weather.weather[i].mintempF}°F`;
                    // Adds the created headers and sections to the respective articles
                    days[i].append(dayHeading);
                    days[i].append(dayAvg);
                    days[i].append(dayMax);
                    days[i].append(dayMin);
                }   
            })
            }
        }
    });    
})
});
// // Temperature conversion widget
// const widget = document.querySelector('.aside form').addEventListener('submit', (e) => {
//     e.preventDefault();
// })

