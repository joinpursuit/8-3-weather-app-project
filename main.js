const header = document.querySelector("header");
const form = document.querySelector("form");
const searchBar = document.querySelector("input.search-bar");
const converter = document.querySelector("form.converter");

const clear_defaults = () => {
	//toggle hidden parts: "No previous searches" and "Choose a location..."
	document.querySelectorAll(".defaults").forEach((item) => item.classList.add("hidden"));
	//clear previous entry from add_weather
	document.querySelectorAll(".weather").forEach((item) => (item.innerHTML = ""));
};

/** Adds the weather at given location */
const add_weather = (file, location) => {
	//TODO: See the text disappear from the search bar
	//const searchBar = document.querySelector("input.search-bar");
	//let searchQuery = searchBar.value;
	searchBar.value = "";
	//TODO: See the name of the city that was searched as well as the area, region, country, and currently "feels like" temperature for that location.
	const currentWeather = document.querySelector("article.current-weather");
	let city = document.createElement("h2");
	city.textContent = location; //file.nearest_area[0].areaName[0].value;
	currentWeather.append(city);

	//TODO: area check/nearest area check (input form?!)
	let area = document.createElement("p");
	area.innerHTML =
		file.nearest_area[0].areaName[0].value.toLowerCase() === location
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
	//TODO: THIS PROCESS CAN DEFINITELY BE LOOPED SOME WAY

	//@mToday START
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
	//@Today END

	//@Tomorrow START
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
	//@Tomorrow END

	//@Day-after-tomorrow START
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
	//@Day-after-tomorrow END

	//chance of sun
	let chanceOfSunshine = document.createElement("p");
	chanceOfSunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${file.weather[0].hourly[0].chanceofsunshine}`;
	currentWeather.append(chanceOfSunshine);
	//chance of rain
	let chanceOfRain = document.createElement("p");
	chanceOfRain.innerHTML = `<strong>Chance of Rain:</strong> ${file.weather[0].hourly[0].chanceofrain}`;
	currentWeather.append(chanceOfRain);
	//chance of snow
	let chanceOfSnow = document.createElement("p");
	chanceOfSnow.innerHTML = `<strong>Chance of Snow:</strong> ${file.weather[0].hourly[0].chanceofsnow}`;
	currentWeather.append(chanceOfSnow);
	//image handling
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

const add_prev_search = (file, location) => {
	let previousSearchesList = document.querySelector("aside.weather-history ul");
	let searchItems = document.querySelectorAll("ul li a");
	//make list item
	let listItem = document.createElement("li");
	// let link = document.createElement("a");
	// link.setAttribute("href", "#");
	// link.textContent = location;
	// listItem.append(link);
	listItem.innerHTML = `<a href="#">${location}</a> - ${file.current_condition[0].FeelsLikeF}°F`;
	previousSearchesList.append(listItem); //TODO: make the Cityname a hyperlink

	// document.querySelectorAll("a").forEach((link) => {
	listItem.addEventListener("click", (event) => {
		event.preventDefault();
		//let endpoint = link.textContent.indexOf("-");
		//let location = link.textContent.substring(0, endpoint);
		fetch(`https://wttr.in/${location}?format=j1`) //wttr.in/Melbourne?format=j1
			.then((response) => response.json())
			.then((json) => {
				clear_defaults();
				add_weather(json, location);
				//add_prev_search(json, location);
			})
			.catch((error) => console.log(error));
	});
	//});
};

/** Event listener for "Get Weather" form */
form.addEventListener("submit", (event) => {
	event.preventDefault();
	//let temp =
	let location = document.querySelector("input.search-bar").value; //this works now. might be a better way to access value using the event object?

	fetch(`https://wttr.in/${location}?format=j1`) //wttr.in/Melbourne?format=j1
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
	//converter.append(result);
	if (convertC.checked) {
		result.textContent = `${((originalNumber.value - 32) / 1.8).toFixed(2)}`;
	} else if (convertF.checked) {
		result.textContent = `${(originalNumber.value * 1.8 + 32).toFixed(2)}`;
	}
});
