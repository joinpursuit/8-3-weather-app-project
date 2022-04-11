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
	//See detailed information for the current day and the next two days below the main element.
	//See the city name and "feels like" temperature show up in the aside element.
	return undefined;
};

/** Event listener for "Get Weather" form */
form.addEventListener("submit", (event) => {
	let location = event.target.textContent; //"Melbourne"

	fetch(`wttr.in/${location}?format=j1`) //wttr.in/Melbourne?format=j1
		.then((response) => response.json())
		.then(parse_data)
		.catch((error) => console.log(error));
});
