const API_URL = 'https://v3.wttr.in/'
const query = '?format=j1'

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    fetch(API_URL + event.target.location.value + query)
    .then(result => result.json())
    .then(weather => {
        console.log(weather)
        document.querySelector("article")
        // weather.current-condition.0.FeelsLikeF
    })
});