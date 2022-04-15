const header = document.querySelector("header");
const form = document.querySelector("form");
const searchBar = document.querySelector("input.search-bar");
const converter = document.querySelector("form.converter");

/** Clears any previous entries as well as initial html for empty search. */
const clear_defaults = () => {
	document.querySelectorAll(".defaults").forEach((item) => item.classList.add("hidden"));
	document.querySelectorAll(".weather").forEach((item) => (item.innerHTML = ""));
};

/** Populates html file with current weather in search location, as well as the three-day forecast.
 * @param {object} file - Contains weather API object with all relevant information
 * @param {string} location - location string passed by the user
 */
const add_weather = (file, location) => {
	searchBar.value = "";
	const currentWeather = document.querySelector("article.current-weather");
	let city = document.createElement("h2");
	city.textContent = location;
	currentWeather.append(city);

	let area = document.createElement("p");
	area.innerHTML =
		file.nearest_area[0].areaName[0].value.toLowerCase() === location.toLowerCase()
			? `<strong>Area:</strong> ${file.nearest_area[0].areaName[0].value}`
			: `<strong>Nearest Area:</strong> ${file.nearest_area[0].areaName[0].value}`;
	currentWeather.append(area);

	let region = document.createElement("p");
	region.innerHTML = `<strong>Region:</strong> ${file.nearest_area[0].region[0].value}`;
	currentWeather.append(region);

	let country = document.createElement("p");
	country.innerHTML = `<strong>Country:</strong> ${file.nearest_area[0].country[0].value}`;
	currentWeather.append(country);

	let currently = document.createElement("p");
	currently.innerHTML = `<strong>Currently:</strong> Feels Like ${file.current_condition[0].FeelsLikeF}°F`;
	currentWeather.append(currently);

	let today = document.querySelector("article.today-weather");
	let todayText = document.createElement("h4");
	todayText.textContent = "Today";
	today.append(todayText);

	let avgToday = document.createElement("p");
	avgToday.innerHTML = `<strong>Average Temperature:</strong> ${file.weather[0].avgtempF}°F`;
	today.append(avgToday);

	let maxToday = document.createElement("p");
	maxToday.innerHTML = `<strong>Max Temperature:</strong> ${file.weather[0].maxtempF}°F`;
	today.append(maxToday);

	let minToday = document.createElement("p");
	minToday.innerHTML = `<strong>Min Temperature:</strong> ${file.weather[0].mintempF}°F`;
	today.append(minToday);

	let tomorrow = document.querySelector("article.tomorrow-weather");
	let tomorrowText = document.createElement("h4");
	tomorrowText.textContent = "Tomorrow";
	tomorrow.append(tomorrowText);

	let avgTomorrow = document.createElement("p");
	avgTomorrow.innerHTML = `<strong>Average Temperature:</strong> ${file.weather[1].avgtempF}°F`;
	tomorrow.append(avgTomorrow);

	let maxTomorrow = document.createElement("p");
	maxTomorrow.innerHTML = `<strong>Max Temperature:</strong> ${file.weather[1].maxtempF}°F`;
	tomorrow.append(maxTomorrow);

	let minTomorrow = document.createElement("p");
	minTomorrow.innerHTML = `<strong>Min Temperature:</strong> ${file.weather[1].mintempF}°F`;
	tomorrow.append(minTomorrow);

	let dayAfterTomorrow = document.querySelector("article.day-after-tomorrow-weather");
	let dayAfterTomorrowText = document.createElement("h4");
	dayAfterTomorrowText.textContent = "Day After Tomorrow";
	dayAfterTomorrow.append(dayAfterTomorrowText);

	let avgDayAfterTomorrow = document.createElement("p");
	avgDayAfterTomorrow.innerHTML = `<strong>Average Temperature:</strong> ${file.weather[2].avgtempF}°F`;
	dayAfterTomorrow.append(avgDayAfterTomorrow);

	let maxDayAfterTomorrow = document.createElement("p");
	maxDayAfterTomorrow.innerHTML = `<strong>Max Temperature:</strong> ${file.weather[2].maxtempF}°F`;
	dayAfterTomorrow.append(maxDayAfterTomorrow);

	let minDayAfterTomorrow = document.createElement("p");
	minDayAfterTomorrow.innerHTML = `<strong>Min Temperature:</strong> ${file.weather[2].mintempF}°F`;
	dayAfterTomorrow.append(minDayAfterTomorrow);

	let chanceOfSunshine = document.createElement("p");
	chanceOfSunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${file.weather[0].hourly[0].chanceofsunshine}`;
	currentWeather.append(chanceOfSunshine);

	let chanceOfRain = document.createElement("p");
	chanceOfRain.innerHTML = `<strong>Chance of Rain:</strong> ${file.weather[0].hourly[0].chanceofrain}`;
	currentWeather.append(chanceOfRain);

	let chanceOfSnow = document.createElement("p");
	chanceOfSnow.innerHTML = `<strong>Chance of Snow:</strong> ${file.weather[0].hourly[0].chanceofsnow}`;
	currentWeather.append(chanceOfSnow);

	let img = document.createElement("img");
	if (file.weather[0].hourly[0].chanceofsunshine > 50) {
		img.setAttribute("alt", "sun");
		img.setAttribute("src", "./assets/icons8-summer.gif");
	} else if (file.weather[0].hourly[0].chanceofrain > 50) {
		img.setAttribute("alt", "rain");
		img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
	} else if (file.weather[0].hourly[0].chanceofsnow > 50) {
		img.setAttribute("alt", "snow");
		img.setAttribute("src", "./assets/icons8-light-snow.gif");
	}
	currentWeather.prepend(img);
};

/** Adds a hyperlink of previously searched locations to be referenced later.
 *
 * @param {object} file - Contains weather API object with all relevant information
 * @param {string} location - location string passed by the user
 */
const add_prev_search = (file, location) => {
	let previousSearchesList = document.querySelector("aside.weather-history ul");
	let listItem = document.createElement("li");

	listItem.innerHTML = `<a href="#">${location}</a> - ${file.current_condition[0].FeelsLikeF}°F`;
	previousSearchesList.append(listItem);

	listItem.addEventListener("click", (event) => {
		event.preventDefault();
		fetch(`https://wttr.in/${location}?format=j1`)
			.then((response) => response.json())
			.then((json) => {
				clear_defaults();
				add_weather(json, location);
			})
			.catch((error) => console.log(error));
	});
};

form.addEventListener("submit", (event) => {
	event.preventDefault();
	//let temp =
	let location = document.querySelector("input.search-bar").value;
	if (!location) {
		window.reload();
	}
	fetch(`https://wttr.in/${location}?format=j1`)
		.then((response) => response.json())
		.then((json) => {
			clear_defaults();
			add_weather(json, location);
			add_prev_search(json, location);
		})
		.catch((error) => console.log(error));
});

converter.addEventListener("submit", (event) => {
	event.preventDefault();
	let result = document.querySelector("h4.converted-temp");
	let convertC = document.getElementById("to-c");
	let convertF = document.getElementById("to-f");
	let originalNumber = document.querySelector("#temp-to-convert");

	if (convertC.checked) {
		result.textContent = `${((originalNumber.value - 32) / 1.8).toFixed(2)}`;
	} else if (convertF.checked) {
		result.textContent = `${(originalNumber.value * 1.8 + 32).toFixed(2)}`;
	}
});
