// Create fetch function to retrieve weather data -------------------------------------
const URL = "https://wttr.in/"

const inputBar = document.querySelector("form")


inputBar.addEventListener("submit", async (event) => {
    event.preventDefault()

    await fetch(`${URL}${event.target.place.value}?format=j1`)
        .then( result => {
            return result.json()
        }).then (weather => {
            const weatherData = weather
            const areaData = (weatherData.nearest_area[0].areaName[0].value)
            const regionData = (weatherData.nearest_area[0].region[0].value)
            const countryData = (weatherData.nearest_area[0].country[0].value)
            const currentData = (weatherData.current_condition[0].FeelsLikeF)
            let chanceOfSunshine = Number(weatherData.weather[0].hourly[0].chanceofsunshine)
            let chanceOfRain = Number(weatherData.weather[0].hourly[0].chanceofrain)
            let chanceOfSnow = Number(weatherData.weather[0].hourly[0].chanceofsnow)
            let weatherIcon = document.querySelector('.icon')
            
         

// Set variables to store access main elements--------------------------------------------       

let mainTagDefault = document.querySelector('main article p')
let mainTagHead = document.querySelector('main article h2')

        const liArea = document.getElementById('area')
        const liRegion = document.getElementById('region')
        const liCountry = document.getElementById('country')
        const liCurrently = document.getElementById('currently')
        const liChanceOfSunshine = document.getElementById('chance-of-sunshine')
        const liChanceOfRain = document.getElementById('chance-of-rain')
        const liChanceOfSnow = document.getElementById('chance-of-snow')


//MAIN modify the content of main elements-------------------------------------------------------
mainTagDefault.innerText = ""
mainTagHead.innerText = areaData
liArea.innerHTML = `<strong>Area:</strong> ${areaData}`

liRegion.innerHTML = `<strong>Region:</strong> ${regionData}`
liCountry.innerHTML = `<strong>Country:</strong> ${countryData}`
liCurrently.innerHTML = `<strong>Currently:</strong> Feels like ${currentData}°F`
liChanceOfSunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceOfSunshine}`
liChanceOfRain.innerHTML = `<strong>Chance of Rain:</strong> ${chanceOfRain}`
liChanceOfSnow.innerHTML = `<strong>Chance of Snow:</strong> ${chanceOfSnow}`

//WEATHER ICON IN MAIN---------------------------------
function icon() { weatherIcon.innerHTML = ""
if(chanceOfSunshine >= 50){
weatherIcon.innerHTML = `<img src="./assets/icons8-summer.gif"></img>`
}
if(chanceOfRain >= 50 ){    
weatherIcon.innerHTML = `<img src="./assets/icons8-rain-cloud.gif"></img>`
} 
if(chanceOfSnow >=50 ){
weatherIcon.innerHTML = `<img src="./assets/icons8-light-snow.gif"></img>`
}
}

//TODAY select and modify the elements under the today section --------------------------------------------------------
        const avgTempToday = (weatherData.weather[0].avgtempF) /* Index 0=>today, 1=>tomorrow, 2=>day-after */
        const maxTempToday = (weatherData.weather[0].maxtempF) 
        const minTempToday = (weatherData.weather[0].mintempF) 

let todayHeader = document.querySelector('#today h3')
todayHeader.innerHTML = "Today"

let avgTempL = document.querySelector('#today p.avg-tempL')
avgTempL.innerText = `Average Temperature: ${avgTempToday}°F`

let maxTempL = document.querySelector('#today p.max-tempL')
maxTempL.innerText = `Max Temperature: ${maxTempToday}°F`

let minTempL = document.querySelector('#today p.min-tempL')
minTempL.innerText = `Min Temperature: ${minTempToday}°F`

//TOMMOROW select and modify the elements under the tomorrow section-----------------------------------------------------
        const avgTempTomorrow = (weatherData.weather[1].avgtempF) /* Index 0=>today, 1=>tomorrow, 2=>day-after */
        const maxTempTomorrow = (weatherData.weather[1].maxtempF) 
        const minTempTomorrow = (weatherData.weather[1].mintempF) 

        let tommorowHeader = document.querySelector('#tomorrow h3')
tommorowHeader.innerHTML = "Tomorrow"

let avgTempM = document.querySelector('#tomorrow p.avg-tempM')
avgTempM.innerText = `Average Temperature: ${avgTempTomorrow}°F`

let maxTempM = document.querySelector('#tomorrow p.max-tempM')
maxTempM.innerText = `Max Temperature: ${maxTempTomorrow}°F`

let minTempM = document.querySelector('#tomorrow p.min-tempM')
minTempM.innerText = `Min Temperature: ${minTempTomorrow}°F`
//DAY-AFTER select and modify the elements under the day-after section-------------------------------------------------------
            const avgTempDayAfter = (weatherData.weather[2].avgtempF) /* Index 0=>today, 1=>tomorrow, 2=>day-after */
            const maxTempDayAfter = (weatherData.weather[2].maxtempF) 
            const minTempDayAfter = (weatherData.weather[2].mintempF) 

let dayAfterHeader = document.querySelector('#day-after h3')
dayAfterHeader.innerHTML = "Day After Tomorrow"

let avgTempR = document.querySelector('#day-after p.avg-tempR')
avgTempR.innerText = `Average Temperature: ${avgTempDayAfter}°F`

let maxTempR = document.querySelector('#day-after p.max-tempR')
maxTempR.innerText = `Max Temperature: ${maxTempDayAfter}°F`

let minTempR = document.querySelector('#day-after p.min-tempR')
minTempR.innerText = `Min Temperature: ${minTempDayAfter}°F`

//PREVIOUS SEARCH  select and modify the previous search section----------------------------------------------

const prevPlaceholderText = document.querySelector('#prev-search p')
prevPlaceholderText.innerText = ""

const prevList = document.querySelector('#prev-search')
let li = document.createElement('li')
li.innerHTML = `<a href="#">${areaData}</a> - ${currentData}°F`

const links = document.querySelectorAll('#prev-search li a')


prevList.append(li)

icon()

document.querySelector('#form').reset()

// document.querySelector('#form input:nt-child(1)').reset()

// document.getElementsByClassName('main').reset()

            // console.log(previousSearch)
        })
})

