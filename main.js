let myWeather = null
let history = []
const ul = document.querySelectorAll("strong")
const h2 = document.querySelector("bold")
const p = document.querySelector("p")
const article = document.querySelectorAll("article")


document.querySelector("form").addEventListener("submit", (event)=> {
event.preventDefault()
console.log(`https://wttr.in/${event.target.location.value}?format=j1`, "Hey You There")
fetch(`https://wttr.in/${event.target.location.value}?format=j1`).then(result => {
    console.log("Fetch Happened")
    return result.json()
    }).then(weather => {
        console.log(weather, "FINALLY");
        article[0].textContent= ""
        h2.textContent= (weather.nearest_area[0].areaName[0].value)
        ul[0].textContent= `Area: `
        ul[0].after(weather.nearest_area[0].areaName[0].value)
        ul[1].textContent= `Region: `
        ul[1].after(weather.nearest_area[0].region[0].value)
        ul[2].textContent = ""
        ul[2].textContent= `Country: `
        ul[2].after(weather.nearest_area[0].country[0].value)
        ul[3].textContent = `Currently: `
        ul[3].after(`Feels like ${weather.current_condition[0].FeelsLikeF}°F`)
       
        document.querySelector("form").addEventListener("submit", (event)=> {
            event.preventDefault()
            history.push("hello")
            p.textContent = history

            //need to loop through and grab certain search values and remove the previous search to put in aside class.
        })
    })
});

