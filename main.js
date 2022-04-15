/** @format */

const base_url = 'https://wttr.in/';
const icon = document.createElement('img');
const form = document.querySelector('form');
const currentWeather = document.querySelector('article');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	//hide choose location
	document.querySelector('main p').hidden = true;

	let userInput = event.target.location.value;
	event.target.location.value = '';

	fetch(`${base_url}${userInput}?format=j1`)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			let feelsTemp = weatherReport(currentWeather, json, userInput);
			const ul = document.querySelector('ul');
			const searchHistory = document.createElement('li');
			let a = document.createElement('a');
			a.textContent = userInput;
			a.href = `${base_url}${userInput}?format=j1`;
			searchHistory.textContent = feelsTemp;
			searchHistory.prepend(a);
			ul.append(searchHistory);
			a.addEventListener('click', (event) => {
				event.preventDefault();
				weatherReport(currentWeather, json, userInput);
			});
		})
		.catch((error) => {
			console.log(error);
		});
});

function weatherReport(currentWeather, json, userInput) {
	currentWeather.innerHTML = '';
	let location = document.createElement('h2');
	location.textContent = userInput;
	currentWeather.append(location);

	let area = `${json.nearest_area[0].areaName[0].value}`;
	let areaData = document.createElement('p');
	currentWeather.append(areaData);

	nearestArea = json.nearest_area[0].areaName[0].value;
	if (nearestArea.toLowerCase() === userInput.toLowerCase()) {
		areaData.textContent = `Area: ${area}`;
	} else {
		areaData.textContent = `Nearest Area: ${area}`;
	}

	let region = `${json.nearest_area[0].region[0].value}`;
	regionData = document.createElement('p');
	regionData.textContent = region;
	currentWeather.append(regionData);

	let country = `${json.nearest_area[0].country[0].value}`;
	countryData = document.createElement('p');
	countryData.textContent = country;
	currentWeather.append(countryData);

	let feelsTemp = `Currently feels like ${json.current_condition[0].FeelsLikeF}`;
	tempData = document.createElement('p');
	tempData.textContent = feelsTemp;
	currentWeather.append(tempData);

	const chanceOfSunshine = json.weather[0].hourly[0].chanceofsunshine;
	const chanceOfRain = json.weather[0].hourly[0].chanceofrain;
	const chanceOfSnow = json.weather[0].hourly[0].chanceofsnow;

	//chance of sunshine
	const sunny = document.createElement('p');
	sunny.textContent = `Chance of Sunshine ${chanceOfSunshine}`;
	currentWeather.append(sunny);

	//chance of rain
	const rainy = document.createElement('p');
	rainy.textContent = `Chance of Rain ${chanceOfRain}`;
	currentWeather.append(rainy);

	//chance of snow
	const snow = document.createElement('p');
	snow.textContent = `Chance of Snow ${chanceOfSnow}`;
	currentWeather.append(snow);

	// displaying the sunny icon
	for (let i = 0; i < json.weather[0].hourly.length; i++) {
		if (Number(json.weather[0].hourly[i].chanceofsunshine) > 50) {
			icon.src = './assets/icons8-summer.gif';
			icon.alt = 'sun';
		}

		if (Number(json.weather[0].hourly[i].chanceofrain) > 50) {
			icon.src = './assets/icons8-torrential-rain.gif';
			icon.alt = 'rain';
		}

		if (Number(json.weather[0].hourly[i].chanceofsnow) > 50) {
			icon.src = './assets/icons8-light-snow.gif';
			icon.alt = 'snow';
		}
	}
	currentWeather.prepend(icon);

	const articles = document.querySelectorAll('aside article');
	const dates = ['Today', 'Tomorrow', 'Day After Tomorrow'];

	for (let i = 0; i < articles.length; i++) {
		articles[i].innerHTML = '';

		let days = document.createElement('p');
		days.textContent = dates[i];

		const avgTemp = document.createElement('p');
		avgTemp.textContent = `Average Temperature: ${json.weather[i].avgtempF}`;

		const maxTemp = document.createElement('p');
		maxTemp.textContent = `Max Temperature: ${json.weather[i].maxtempF}`;

		const minTemp = document.createElement('p');
		minTemp.textContent = `Min Temperature: ${json.weather[i].mintempF}`;

		articles[i].append(days, avgTemp, maxTemp, minTemp);
	}
	return feelsTemp;
}

const tempConversion = document.querySelector(
	'aside.temperature-conversion form'
);
tempConversion.addEventListener('submit', (event) => {
	event.preventDefault();

	const temperature = event.target.querySelector('#temp-to-convert').value;

	const types = event.target.querySelectorAll('.temperature');
	if (types[0].checked) {
		event.target.querySelector('h4').textContent = (
			((temperature - 32) * 5) /
			9
		).toFixed(2);
	} else if (types[1].checked) {
		event.target.querySelector('h4').textContent = (
			(temperature * 9) / 5 +
			32
		).toFixed(2);
	}
});
