 document.querySelector('form')
 form = document.querySelector('form')
 form.addEventListener('submit', (event) => {
        event.preventDefault();
        const userInput = event.target.location.value;
        event.target.location.value= ""
fetch(`https://wttr.in/${userInput}?format=j1`)
.then((response) => response.json())
.then((forecast) => {
generateWeatherDisplay(forecast, userInput);
let ul = document.querySelector("ul") 
let li = document.createElement("li")
ul.append(li)
let a = document.createElement("a")
a.textContent = userInput
// Hyperlinks that cause you to see the links to the area location; previously searched
a.href = "#"
// This is new variables written here so that it can display without the loop happenning
const newArea = forecast.nearest_area[0].areaName[0].value;
const newRegion = forecast.nearest_area[0].region[0].value;
const newCountry = forecast.nearest_area[0].country[0].value;
const newCurrently = forecast.current_condition[0].FeelsLikeF;
li.textContent = newCurrently
li.prepend(a)
//prepend is like unshift in an array and append is like push for this scenerio.
a.addEventListener('click', (event) => {
  event.preventDefault();
  generateWeatherDisplay(forecast, userInput);
 })
 })
})
// This is my helper function generateWeatherDisplay, bcause of this help I am able to call it anywhere I needed
function generateWeatherDisplay (forecast, userInput) {
  const display = document.querySelector('#display');
  display.innerHTML = ""
  const area = forecast.nearest_area[0].areaName[0].value;
  const region = forecast.nearest_area[0].region[0].value;
  const country = forecast.nearest_area[0].country[0].value;
  const currently = forecast.current_condition[0].FeelsLikeF;
  
  let h2 = document.createElement("h2")
  h2.textContent = userInput
  display.append(h2)
  let areaDisplay = document.createElement("p")
  if (userInput === area) {
    areaDisplay.textContent = `Area: ${area}`
  } else {
    areaDisplay.textContent = `Nearest Area: ${area}`
  }
  display.append(areaDisplay)
  let regionDisplay = document.createElement("p")
  regionDisplay.textContent = `Region: ${region}`
   display.append(regionDisplay)
   let countryDisplay = document.createElement("p")
  countryDisplay.textContent = `Country: ${country}`
   display.append(countryDisplay)
  let currentlyDisplay = document.createElement("p")
  currentlyDisplay.textContent = `Currently: ${currently}`
  display.append(currentlyDisplay)
 let forcastDate = document.querySelectorAll("aside article")
 // Icon will appear with the chance of Rain, Snow, and Sunshine
 let chanceOfSunshineSum = 0
 let chanceOfRainSum = 0
 let chanceOfSnowSum = 0
 for (let i = 0; i < forecast.weather[0].hourly; i++) {
  chanceOfSunshineSum += Number(forecast.weather[0].hourly[i].chanceofsunshine)
  chanceOfRainSum += Number(forecast.weather[0].hourly[i].chanceofrain)
  chanceOfSnowSum += Number(forecast.weather[0].hourly[i].chanceofsnow)
 }
 //Below here is to create the content of those three chances
 let chanceOfSunshineAvg = document.createElement("p")
 let chanceOfRainAvg = document.createElement("p")
 let chanceOfSnowAvg = document.createElement("p")
 chanceOfSunshineAvg.textContent = `Chance of Sunshine: ${chanceOfSunshineSum/forecast.weather[0].hourly.length}`
 chanceOfRainAvg.textContent = `Chance of Rain: ${chanceOfRainSum/forecast.weather[0].hourly.length}`
 chanceOfSnowAvg.textContent = `Chance of Snow: ${chanceOfSnowSum/forecast.weather[0].hourly.length}`
 display.append(chanceOfSunshineAvg, chanceOfRainAvg, chanceOfSnowAvg); 

let sunshineBool = false;
 let rainBool = false;
 let snowBool = false;
for  (let i =0; i < forecast.weather[0].hourly.length; i++) {
if (parseInt(forecast.weather[0].hourly[i].chanceofsunshine) > 50 ) {
  sunshineBool = true;
}
if (parseInt(forecast.weather[0].hourly[i].chanceofrain) > 50 ) {
  rainBool = true;
}
if (parseInt(forecast.weather[0].hourly[i].chanceofsnow) > 50 ) {
  snowBool = true;
}

let date = ["Today", "Tomorrow", "Day After Tomorrow"]
for (let i= 0; i < forcastDate.length; i++) {
    forcastDate[i].innerHTML = ""
    let dateDisplay = document.createElement("p")
    dateDisplay.textContent = date[i]
 // This is getting the display for avg, min, max for thw weather that's from the API   
const todayAvgTemp = forecast.weather[i].avgtempF;
const todayMaxTemp = forecast.weather[i].maxtempF;
const todayMinTemp = forecast.weather[i].mintempF;
let avgTempF = document.createElement("p")
let maxTempF = document.createElement("p")
let minTempF = document.createElement("p")
avgTempF.textContent = `Average Temperature: ${todayAvgTemp}`
maxTempF.textContent = `Max Temperature: ${todayMaxTemp}`
minTempF.textContent = `Min Temperature: ${todayMinTemp}`
forcastDate[i].append(dateDisplay,avgTempF, maxTempF, minTempF )
 } 
}
//This conditional statement shows a weather icon 
if (sunshineBool) {
  let icon = document.createElement("img")
  icon.src = "./assets/icons8-summer.gif" 
  icon.alt = "sun"
  display.prepend(icon)
  }

 else if (rainBool) {
  let icon = document.createElement("img")
  icon.src = "./assets/icons8-torrential-rain.gif" 
  icon.alt = "rain"
  display.prepend(icon)
  }

  else if (snowBool) {
    let icon = document.createElement("img")
    icon.src = "./assets/icons8-light-snow.gif" 
    icon.alt = "snow"
    display.prepend(icon)
   }}
// This section is for the conversion from f to c and c to f
 let convertingTemp = document.querySelector("aside form")
 convertingTemp.addEventListener("submit", (event) => {
   event.preventDefault()
  let userInputTemp = parseInt(event.target.querySelector("input").value)
let tempTypes = event.target.querySelectorAll(".converting-temp")
// This link is the conversion formula, https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
let type = ""
for (let tempType of tempTypes) {
  if (tempType.checked) {
    type = tempType.value 
    break
  }
}
if (type === "c") {
event.target.querySelector("h4").textContent = ((userInputTemp - 32) * 5/9).toFixed(2)
  }
else if (type === "f") {
  event.target.querySelector("h4").textContent = (userInputTemp * 9/5 + 32).toFixed(2)
}
 })
 
