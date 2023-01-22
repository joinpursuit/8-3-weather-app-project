document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    let previous = document.querySelector('.ul li')
    let ul = document.querySelector('.ul')
    let article = document.querySelector('article')
    const BASE_URL= 'https://v3.wttr.in/'
    // let city = event.target.location.value;
    const userInput = event.target.location.value
    event.target.location.value = ''
    // article.innerText = ''
    console.log(`https://v3.wttr.in/${userInput}}?format=j1`, "HELLO FROM THE OTHER SIDE")
    fetch(`https://v3.wttr.in/${userInput}?format=j1`).then(result => {
        console.log("Fetch was successful", result)
        return result.json()
    }).then(weather => {
        updateWeather(weather)
        todaysWeather(weather)
        tomorrowsWeather(weather)
        dayAfterTomorrowWeather(weather)

        console.log(weather, "Finally properly formatted weather")
        console.log(previous)
        if (previous.textContent === 'No previous searches.'){
            previous.remove()
            console.log('test')
            let li = document.createElement('li');
            // li.textContent = 'test'
            li.innerHTML = `<a href="#">${weather.nearest_area[0].areaName[0].value}</a>`;
            ul.appendChild(li)
        }else{
            let li = document.createElement('li');
            li.innerHTML = `<a href="#">${weather.nearest_area[0].areaName[0].value}</a>`;
            ul.appendChild(li)
        }
        

    })
    
});
function updateWeather(weather){
    let weatherObject = {
        title: weather.nearest_area[0].areaName[0].value,
        // area: weather.nearest_area[0].areaName[0].value,
        region: weather.nearest_area[0].region[0].value,
        country: weather.nearest_area[0].country[0].value,
        currently: weather.current_condition[0].FeelsLikeF
    }
let weatherTitle = document.querySelector('#title')
let weatherArea = document.querySelector('#area')
let weatherRegion = document.querySelector('#region')
let weatherCountry = document.querySelector('#country')
let weatherCurrently = document.querySelector('#currently')
weatherTitle.innerHTML= weatherObject.title
// weatherArea.innerHTML = weatherObject.area
weatherRegion.innerHTML = weatherObject.region
weatherCountry.innerHTML = weatherObject.country
weatherCurrently.innerHTML = weatherObject.currently

}
function todaysWeather(weather){
    let todaysObject = {
        Min: weather.weather[0].mintempF,
        ave: weather.weather[0].avgtempF,
        day: 'Today',
        max: weather.weather[0].maxtempF

    }
let todaysDay = document.querySelector('#todaysday')
let todaysAve = document.querySelector('#todayaverage')
let todaysMax = document.querySelector('#todaymax')
let todaysMin = document.querySelector('#todaymin')
todaysDay.innerHTML = todaysObject.day
todaysAve.innerHTML = `<b>Today's Average: </b>`+ todaysObject.ave
todaysMax.innerHTML = `<b>Today's Max: </b>`+ todaysObject.max
todaysMin.innerHTML = `<b>Today's Min: </b>`+todaysObject.Min
}
function tomorrowsWeather(weather){
let tomorrowsObject = {
    day: 'Tomorrow',
    ave: weather.weather[1].avgtempF,
    min: weather.weather[1].mintempF,
    max: weather.weather[1].maxtempF,

}
let tomorrowsDay = document.querySelector('#tomorrowday')
let tomorrowsAve = document.querySelector('#tomorrowaverage')
let tomorrowsMax = document.querySelector('#tomorrowmax')
let tomorrowsMin = document.querySelector('#tomorrowmin')
tomorrowsDay.innerHTML = tomorrowsObject.day
tomorrowsAve.innerHTML = `<b>Tomorrow's Average:</b>` + tomorrowsObject.ave
tomorrowsMax.innerHTML = `<b>Tomorrow's Max: </b>` + tomorrowsObject.max
tomorrowsMin.innerHTML = `<b>Tomorrow's Min: </b>` + tomorrowsObject.min
}
function dayAfterTomorrowWeather(weather){
let dayAfterTomorrowObject = {
    day: 'Day After Tomorrow',
    ave: weather.weather[2].avgtempF,
    min: weather.weather[2].mintempF,
    max: weather.weather[2].maxtempF,
}
let dayAfterTomorrowsDay = document.querySelector('#dayaftertomorrowday')
    let dayAfterTomorrowsAve = document.querySelector('#dayaftertomorrowaverage')
    let dayAfterTomorrowsMax = document.querySelector('#dayaftertomorrowmax')
    let dayAfterTomorrowsMin = document.querySelector('#dayaftertomorrowmin')

    dayAfterTomorrowsDay.innerHTML = dayAfterTomorrowObject.day
    dayAfterTomorrowsAve.innerHTML = `<b>Day After Tomorrow Average: </b>` + dayAfterTomorrowObject.ave
    dayAfterTomorrowsMax.innerHTML = `<b>Day After Tomorrow Max: </b>`+
    dayAfterTomorrowObject.max
    dayAfterTomorrowsMin.innerHTML = `<b>Day After Tomorrow Min: </b>` +
    dayAfterTomorrowObject.min
    

}
