const form = document.querySelector('form');
const article = document.querySelector('article');
const articles = document.querySelectorAll('aside article');
const current = document.querySelector('.currentData');


let list = document.querySelector('ul');
let input = document.querySelector('submit');
let search = document.querySelector('#searchbar');
const BASE_URL = 'http://wttr.in/';
const id_URL = '?format=j1';

form
    .addEventListener('submit', (event) => {
        event.preventDefault();
        document.querySelector('main p').hidden = true;
        let searchLocation = `${BASE_URL}${search.value}${id_URL}`;
        let city = search.value;
        fetch(searchLocation)
            .then((response) => {
                return response.json();
            })
            .then((weatherData) => {
                currentWeather(weatherData, city);
            })
            .catch((error) => {
                console.log(error);
            })
        form.reset();
    });;

function currentWeather(weatherData, city) {
    let area = weatherData.nearest_area[0].areaName[0].value;
    let h2Area = document.createElement('h2');
    h2Area.textContent = area;
    current.append(h2Area);

    nearestArea = weatherData.nearest_area[0].areaName[0].value;
    let areaP = document.createElement('p');

    if (nearestArea.toLowerCase() === city.toLowerCase()) {
        areaP.textContent = `Area: ${area}`;
        h2Area.textContent = city;
    } else {
        areaP.textContent = `Nearest Area: ${area}`;
        h2Area.textContent = city;
    }
    current.append(areaP);

    let region = weatherData.nearest_area[0].region[0].value;
    let regionP = document.createElement('p');
    regionP.textContent = `Region: ${region}`;
    current.append(regionP);

    let country = weatherData.nearest_area[0].country[0].value;
    let countryP = document.createElement('p');
    countryP.textContent = `Country: ${country}`;
    current.append(countryP);

    let currently = weatherData.current_condition[0].FeelsLikeF;
    let currentlyP = document.createElement('p');
    currentlyP.textContent = `Feels like it's ${currently}°F.`;
    current.append(currentlyP);
}


let widget = document.querySelector('#widget');

widget.addEventListener('submit', (event) => {
    event.preventDefault();
    let temp = Number(document.querySelector('#temp-to-convert').value);
    let finalResult = document.querySelector('#result');
    //https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value

    let convertTo = document.getElementsByName('convert-to');
    let checkedConversion = '';

    for (let convert of convertTo) {
        if (convert.checked) {
            checkedConversion = convert.value;
            break;
        }
    }

    if (checkedConversion === 'celsius') {
        finalResult.textContent = (((temp - 32) * 5) / 9).toFixed(2);
    } else {
        finalResult.textContent = ((temp * 9) / 5 + 32).toFixed(2);
    }
});