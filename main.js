const header = document.querySelector("header");
const form = document.querySelector("form");

const parse_data = (file) => {
	return undefined;
};

fetch(`wttr.in/NewYork?format=j1`)
	.then((response) => response.json())
	.then(parse_data)
	.catch((error) => console.log(error));
