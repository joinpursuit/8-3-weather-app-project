

const locationForm = document.querySelector("form");

locationForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const mainWeatherOutput = document.querySelector("main article")
    mainWeatherOutput.innerHTML = ""

    let userSearch = event.target.userSearch.value
    
    const formattedUserSearch = userSearch.toLowerCase()[0].toUpperCase() + userSearch.toLowerCase().slice(1)
    const BASE_URL = `https://wttr.in/${userSearch}?format=j1`

    fetch(BASE_URL)
    .then((res) => res.json())
    .then((response) => {
        displayForecast(response)
        displayWeather(response)
    })
    .catch((error) => console.log(error))

    let searchedLocation = document.createElement("p")
    searchedLocation.innerText = `${userSearch}`
    mainWeatherOutput.append(searchedLocation)
})

let displayWeather = (weatherObj) => {
    const mainWeatherOutput = document.querySelector("main article")

    let area = document.createElement("p")
    area.innerText = `Area: ${weatherObj.nearest_area[0].areaName[0].value}`
    mainWeatherOutput.append(area)

    let region = document.createElement("p")
    region.innerText = `Region: ${weatherObj.nearest_area[0].region[0].value}`
    mainWeatherOutput.append(region)

    let country = document.createElement("p")
    country.innerText = `Country: ${weatherObj.nearest_area[0].country[0].value}`
    mainWeatherOutput.append(country)

    let currentTemp = document.createElement("p")
    currentTemp.innerText = `Currently: ${weatherObj.current_condition[0].FeelsLikeF}`
    mainWeatherOutput.append(currentTemp)
}

let displayForecast = (weatherObj) => {
    const todayForecast = document.querySelectorAll("main aside article")


    const todaysAvgForecast = document.createElement("p")
    todaysAvgForecast.innerText = `Avg Temp: ${weatherObj.weather[0].avgtempF}`
    todayForecast[0].append(todaysAvgForecast)

    const todaysMaxForecast = document.createElement("p")
    todaysMaxForecast.innerText = `Max Temp: ${weatherObj.weather[0].maxtempF}`
    todayForecast[0].append(todaysMaxForecast)

    const todaysMinForecast = document.createElement("p")
    todaysMinForecast.innerText = `Min Temp: ${weatherObj.weather[0].mintempF}`
    todayForecast[0].append(todaysMinForecast)
}