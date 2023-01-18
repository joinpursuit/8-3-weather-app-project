const API_URL = 'https://v3.wttr.in/'
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

        const mainSection = document.createElement('p');
        const area = weather.nearest_area[0].areaName[0].value;

        if (location == area) {
            mainSection.innerHTML = `<strong>Area:</strong> ${area}`;
        } else {
            mainSection.innerHTML = `<strong>Nearest Area:</strong> ${area}`
        }
        weatherDisplay.append(mainSection);
    })
});