//create variables for easy access for later functions
const base_url = "https://wttr.in/"
//adding a period in front selects the class in html
//adding a hashtag in front selects the id in html
const p = document.querySelector("p");
const weatherForecasts = document.querySelectorAll(".forecast");
const aside = document.querySelectorAll("aside");
const article = document.querySelectorAll("article");
const h2 = document.querySelector("bold");
const array = [];
const ul = document.querySelectorAll( "ul");

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()

    let location = event.target.location.value;
event.target.location.value = "";

     fetch(`${base_url}${location}?format=j1`)
     .then(result => {
        return result.json()
    }).then(weather => {
        console.log(weather)

const area = weather.nearest_area[0].areaName[0].value; //city , toronto
const region = weather.nearest_area[0].region[0].value; //region ,ontario
const country = weather.nearest_area[0].country[0].value; //country ,canada
const currentFeelsLikeF = weather.current_condition[0].FeelsLikeF; //temperature now

        function weatherResult(){
        document.getElementById('inputText').value = "";
        article[0].innerHTML = `<h2><bold>${area}</bold><h2>`
        article[0].innerHTML += `<p><strong>Area</strong>: ${area}</p><p><strong>Region</strong>: ${region}</p><p><strong>Country</strong>: ${country}</p><p><strong>Currently</strong>: Feels like ${currentFeelsLikeF}°F </p>`
        const head = document.querySelectorAll('h2')
        head[2].innerHTML = `<strong>Today</strong>`
        head[3].innerHTML = `<strong>Tomorrow</strong>` 
        head[4].innerHTML = `<strong>Day After Tomorrow</strong>`
        article[1].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[0].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[0].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[0].mintempF}°F`
        article[2].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[1].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[1].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[1].mintempF}°F`
        article[3].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[2].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[2].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[2].mintempF}°F`
        }
        
        weatherResult()
        let li = document.createElement('li')
        if(!array.includes(weather.nearest_area[0].areaName[0].value)){
            li.innerHTML = `<a href="">${area}</a>:${currentFeelsLikeF}°F`
            ul[4].append(li)
        }
        p.remove()
        array.push(weather.nearest_area[0].areaName[0].value)
        li.addEventListener("click", (event) => {
            event.preventDefault()
            weatherResult()
        })
        const conversion = document.querySelector('#converter');
        conversion.addEventListener('submit', (event) => {
        event.preventDefault();
        let conversion = event.target.convert.value;
        let toC = document.querySelector('#to-c')
        let toF = document.querySelector('#to-f')
        if (toC.checked) {
        conversion = (conversion - 32) * (5 / 9);
        document.querySelector('#result').innerHTML = `${conversion.toFixed(2)}°C`;
         } else {
        conversion = conversion * (9 / 5) + 32;
        document.querySelector('#result').innerHTML = `${conversion.toFixed(2)}°F`;
        }
        });
    })
});






// //create variables for easy access for later functions
// const base_url = "https://wttr.in/"
// //adding a period in front selects the class in html
// //adding a hashtag in front selects the id in html
// const weatherForecasts = document.querySelectorAll(".forecast");
// const article = document.querySelectorAll("article")


// //best to parse all data first
// //search for weather form
// const weatherForm = document.querySelector("#weatherForm");
// weatherForm.addEventListener("submit", (event) => {
//  event.preventDefault();

// let location = event.target.location.value;
// event.target.location.value = "";
// let baseAndLocation_url = `${base_url}${location}?format=j1`;
// const area = nearest_area[0].areaName[0].value; //city , toronto
// const region = nearest_area[0].region[0].value; //region ,ontario
// const country = nearest_area[0].country[0].value; //country ,canada
// const currentFeelsLikeF = current_condition[0].FeelsLikeF //temperature now
// fetch(`${baseAndLocation_url}`)
//      .then(result => {
//         return result.json()
//     }).then(weather => {
//         console.log(weather)
//         function get(){
//         document.getElementById('inputText').value = "";
//         article[0].innerHTML = `<h2><bold>${weather.nearest_area[0].areaName[0].value}</bold><h2>`
//         article[0].innerHTML += `<p><strong>Area</strong>: ${area}</p><p><strong>Region</strong>: ${region}</p><p><strong>Country</strong>: ${country}</p><p><strong>Currently</strong>: Feels like ${currentFeelsLikeF}°F </p>`

// function weatherResult(location, area, region, country, currentFeelsLikeF)

//create boxes with 1)weather app header 2)weather for location submitted box
//list of previous searches on right hand side with only farenheit temperature
//display 3 forecasts of today, tomorrow, day after tomorrow on bottom with average temp, max and min temperatures

// document.querySelector("form").addEventListener("submit", (event) => {
//     event.preventDefault()
//     console.log(`https://wttr.in/${event.target.location.value}?format=j1`, "Weather localized")
//     fetch(`https://wttr.in/${event.target.location.value}?format=j1`).then(result => {
//         console.log("Fetch was successful")
//         return result.json()
//     }).then(weather => {
//         const area = weather.nearest_area[0].areaName[0].value[0]; //toronto
//         const region = weather.nearest_area[0].region[0].value //ontario
//         const country = weather.nearest_area[0].country[0].value //canada
//         const temperature = weather.current_condition[0].FeelsLikeF
//     })
// });

//nearest_area[0].

  // console.log(weather, "here")
        // article[0].textContent = ""
        // h2.textContent = weather.nearest_area[0].areaName[0].value
        // ul[0].textContent = `Area