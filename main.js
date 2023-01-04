const BASE_URL = 'https://wttr.in/';
const form = document.querySelector('.form');
const currentWeather = document.querySelector('article');
const weatherIcon = document.createElement('img');




form.addEventListener("submit", (event) => {
    event.preventDefault();

    let city = event.target.location.value;

    fetch(`${BASE_URL}${city}?format=j1`)
        .then((res) => {
            return res.json()
        })
        .then((response) => {
            
        })
        .catch((error) => {
            console.log(error);
        });
})