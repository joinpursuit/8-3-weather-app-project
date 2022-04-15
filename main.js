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

/*const form = document.querySelector('form');
const list = document.querySelector('ul');
const input = document.querySelector('submit');
const search = document.querySelector('searchbar')
const BASE_URL = "http://wttr.in"
const id_URL = "?format=j1"

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const text = search.value;
	const submitted = document.createElement('li');
	submitted.textContent = text;
	list.append(submitted);
    form.reset();
})

    
/*
	const searchLocation = `${BASE_URL}${search.value}${id_URL}`
	fetch (searchLocation)
	.then((response) =>response.json())
	.then((data) =>	{ console.log(data)
	});
 /*function data(){
		const { city } = data;
		const { currentTemp, description } = data.weather
		const { chanceOfRain, chanceOfSunshine, chanceOfSnow} = data.conditions
	}
})
*/
