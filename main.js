/** @format */

const base_url = 'https://wttr.in/';
const icon = document.createElement('img');
const form = document.querySelector('form');
const article = document.querySelector('article');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	//hide choose location
	document.querySelector('main p').hidden = true;

	let userInput = event.target.location.value;
	event.target.location.value = '';
	article.innerHtML = '';

	fetch(`${base_url}${userInput}?format=j1`)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			const currentWeather = document.querySelector('#current-weather');

			let area = `${json.nearest_area[0].areaName[0].value}`;
			let h3 = document.createElement('h3');
			h3.textContent = area;
			currentWeather.append(h3);

			let country = `${json.nearest_area[0].country[0].value}`;
			p = document.createElement('p');
			p.textContent = country;
			currentWeather.append(p);

			let region = `${json.nearest_area[0].region[0].value}`;
			p = document.createElement('p');
			p.textContent = region;
			currentWeather.append(p);

			let feelsTemp = `Currently feels like ${json.current_condition[0].FeelsLikeF}`;
			p = document.createElement('p');
			p.textContent = feelsTemp;
			currentWeather.append(p);

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

				const ul = document.querySelector('ul');
				const searchHistory = document.createElement('li');
				let a = document.createElement('a');
				a.textContent = userInput;
				a.href = `${base_url}${userInput}?format=j1`;
				searchHistory.textContent = feelsTemp;
				searchHistory.prepend(a);
				ul.append(searchHistory);
			}
		})
		.catch((error) => {
			console.log(error);
		});
});
