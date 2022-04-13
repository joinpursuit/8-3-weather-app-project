const header = document.querySelector("header");
const form = document.querySelector("form");

/** Adds the weather at given location */
const parse_data = (file) => {
	//toggle hidden parts: "No previous searches" and "Choose a location..."
	document.querySelectorAll("p.hidden").forEach((item) => item.classList.toggle("hidden"));

	//TODO: See the text disappear from the search bar
	const searchBar = document.querySelector("input.search-bar");
	let searchQuery = searchBar.textContent;
	searchBar.textContent = "";
	//TODO: See the name of the city that was searched as well as the area, region, country, and currently "feels like" temperature for that location.
	const currentWeather = document.querySelector("article.current-weather");
	let city = document.createElement("h3");
	city.textContent = searchQuery;
	currentWeather.append(city);

	let area = document.createElement("p");
	area.innerHTML = `<strong>Area:</strong> ${file.nearest_area[0].areaName[0].value}`;
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
	//TODO: See detailed information for the current day and the next two days below the main element.
	//TODO: THIS PROCESS CAN DEFINITELY BE LOOPED SOME WAY
	//@mToday START
	let today = document.querySelector("article.today-weather");
	let todayText = document.createElement("h4");
	todayText.textContent = "Today";
	today.append(todayText);

	let avgToday = document.createElement("p");
	avgToday.innerHTML = `<strong>Average Temperature:</strong> ${file.weather[0].avgtempF}°F`; //for tomorrow, index 1; for day after, index 2
	today.append(avgToday);

	let maxToday = document.createElement("p");
	//TODO: in order to find max and min, might need to search through an array of hourly reports located in file.weather[].hourly[].FeelslikeF
	maxToday.innerHTML = `<strong>Max Temperature:</strong> ${file.weather[0].maxtempF}°F`; //file.weather[0].what?!?!???! is it heat index?
	today.append(maxToday);

	let minToday = document.createElement("p");
	minToday.innerHTML = `<strong>Min Temperature:</strong> ${file.weather[0].mintempF}°F`; //file.weather[0].what should point to min weather. dew point?!
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
	maxTomorrow.innerHTML = `<strong>Max Temperature:</strong> ${file.weather[1].maxtempF}°F`; //file.weather[1].what?!?!???! is it heat index?
	tomorrow.append(maxTomorrow);

	let minTomorrow = document.createElement("p");
	minTomorrow.innerHTML = `<strong>Min Temperature:</strong> ${file.weather[1].mintempF}°F`; //file.weather[0].what should point to min weather. dew point?!
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
	maxDayAfterTomorrow.innerHTML = `<strong>Max Temperature:</strong> ${file.weather[2].maxtempF}°F`; //file.weather[1].what?!?!???! is it heat index?
	dayAfterTomorrow.append(maxDayAfterTomorrow);

	let minDayAfterTomorrow = document.createElement("p");
	minDayAfterTomorrow.innerHTML = `<strong>Min Temperature:</strong> ${file.weather[2].mintempF}°F`; //file.weather[0].what should point to min weather. dew point?!
	dayAfterTomorrow.append(minDayAfterTomorrow);
	//@Day-after-tomorrow END

	//TODO:See the city name and "feels like" temperature show up in the aside element.
	let previousSearchesList = document.querySelector("aside.weather-history ul");
	//make list item
	let listItem = document.createElement("li");
	listItem.innerHTML = `${city.textContent} - ${file.current_condition[0].FeelsLikeF}°F`;
	previousSearchesList.append(listItem); //TODO: make the Cityname a hyperlink
};

/** Event listener for "Get Weather" form */
form.addEventListener("submit", (event) => {
	event.preventDefault();
	//let temp =
	let location = document.querySelector("input.search-bar").value; //this works now. might be a better way to access value using the event object?

	fetch(`https://wttr.in/${location}?format=j1`) //wttr.in/Melbourne?format=j1
		.then((response) => response.json())
		.then((json) => parse_data(json))
		.catch((error) => console.log(error));
});
