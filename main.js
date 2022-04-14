//let WEATHER_API = `https://wttr.in/Melbourne?format=j1`;
//let apiLocation = weatherSearchInput.value;
let BASE_URL = `https://wttr.in/`;
let API_FORMAT = `?format=j1`;
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let weatherPlaceInput = event.target.location.value;
  event.target.location.value = '';
  console.log(`${BASE_URL}${weatherPlaceInput}${API_FORMAT}`);
  fetch(`${BASE_URL}${weatherPlaceInput}${API_FORMAT}`)
    .then((response) => response.json()) /*{
    return response.json();
    }) */
    .then((weather) => {
      createForecast(weather, weatherPlaceInput);
      let unorderedList1 = document.querySelector('ul');
      let list1 = document.createElement('li');
      unorderedList1.append(list1);
    });
});
