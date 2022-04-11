const header = document.querySelector("header");
const form = document.querySelector("form");

/** Adds the weather at given location */
const parse_data = (file) => {
	//See the text disappear from the search bar
	const searchBar = document.querySelector("input.search-bar");
	let temp = searchBar.textContent;
	searchBar.textContent = "";
	//See the name of the city that was searched as well as the area, region, country, and currently "feels like" temperature for that location.
	const currentWeather = document.querySelector("article.current-weather");
	let city = document.createElement("h3");
	city.textContent = temp;
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
	currently.innerHTML = `<strong>Currently:</strong> Feels like ${file.current_condition[0].FeelsLikeF}°F`;
	currentWeather.append(currently);
	//See detailed information for the current day and the next two days below the main element.
	//See the city name and "feels like" temperature show up in the aside element.
};

/** Event listener for "Get Weather" form */
form.addEventListener("submit", (event) => {
	event.preventDefault();
	let location = event.target.value; //TODO: not passing proper location str

	fetch(`https://wttr.in/${location}?format=j1`) //wttr.in/Melbourne?format=j1
		.then((response) => response.json())
		.then((json) => parse_data(json))
		.catch((error) => console.log(error));
});
