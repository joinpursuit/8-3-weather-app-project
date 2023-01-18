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
    })
});