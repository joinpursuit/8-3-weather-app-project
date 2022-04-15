//WEATHER
const BASE_URL= 'https://wttr.in/'
const form = document.querySelector('#locationForm')

form.addEventListener('submit', (event) => {
event.preventDefault() 

const {location} = event.target
console.log(location)
getNewWeatherSearch(location.value)


})

function getNewWeatherSearch(location){
    fetch(`${BASE_URL}${location}?format=j1`)
.then((response) => response.json ())
.then((json) => {
    console.log(`${json}`)
let searchInfo ={}
searchInfo["location"] = json.nearest_area[0].areaName[0].value;
searchInfo["Region"] = json.nearest_area[0].region[0].value;
searchInfo["#country"] = json.nearest_area[0].country[0].value;
searchInfo["#currently"] = json.current_condition[0].FeelslikeF;
searchInfo["#chance-of-sun"] = json.weather[0].hourly[0].chanceofsunshine;
searchInfo["#chance-of-rain"] = json.weather[0].hourly[0].chanceofrain;
searchInfo["#chance-of-snow"] = json.weather[0].hourly[0].chanceofsnow;
getObjectData(searchInfo)
})
.catch((error) => {
    console.log(error);
});
}


function getObjectData (searchInfo){
const searchSection = document.getElementById('searchSection');
for (const [key, value] of Object.entries(searchInfo)){
console.log (`${key}: ${value}`);
let paragraph = document.createElement ('p');
paragraph.innerHTML = `${key}: ${value}`
searchSection.append(paragraph)
}
}

function getWeatherCondions(){
const imageSelector= ""
if (rain > 50){
imageSelector = '<img src="./assets/icons8-rain-cloud.gif" alt="rain>'
}else if (snow > 50){
    imageSelector = '<img src= ".assets/icons8-light-snow.gif" alt = "snow">'
}else if (sunshine > 50 ){

}else return imageSelector

if (imageSelector === ""){
    return "No previous searches"
}

}
// Behavior

let unorderedList = document.querySelector('ul')
let previousSearchList = document.createElement ('li')


// Media Quiries
