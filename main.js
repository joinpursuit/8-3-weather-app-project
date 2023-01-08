let myWeather = null
const article = document.querySelectorAll("article")
const ul = document.querySelectorAll("strong")
const h2 = document.querySelector("bold")
const p = document.querySelector("p")

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(`https://wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")

    fetch(`https://wttr.in/${event.target.location.value}?format=j1`).then(result => {
        console.log("Fetch was successful")
        return result.json()

    }).then(weather => {
        console.log(weather)
        article[0].textContent = ""
        h2.textContent = weather.nearest_area[0].areaName[0].value
        ul[0].textContent = `Area: `
        ul[0].after(weather.nearest_area[0].areaName[0].value)
        ul[1].textContent = `Region: `
        ul[1].after(weather.nearest_area[0].region[0].value)
        ul[2].textContent = `Country: `
        ul[2].after(weather.nearest_area[0].country[0].value)
        ul[3].textContent = `Currently: `
        ul[3].after(` Feels like ${weather.current_condition[0].FeelsLikeF}°F`)
    })
});

const conversion = document.querySelector('#conversionForm');
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









        // document.querySelector("form").addEventListener("submit", (event) => {
        //     event.preventDefault()
        //     history.push("Hi")
        //     p.textContent = history})


        // function myReset() {
        //     document.getElementById("myForm").reset()
        // }