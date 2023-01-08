const BASE_URL = "https://wttr.in/"
let sub = document.getElementById("submit")
let txt = document.getElementById("text")
let main = document.querySelector("main")
let solo = document.getElementsByClassName("solo")
let tri1 = document.getElementsByClassName("tri1")
let tri2 = document.getElementsByClassName("tri2")
let tri3 = document.getElementsByClassName("tri3")
let ul = document.querySelector("ul")
let noPrev= document.getElementsByClassName("noprev")
console.log(solo)



sub.addEventListener("click", (event) => {
    event.preventDefault()


    fetch(
        `${BASE_URL}${txt.value}?format=j1`
    ).then((response) => response.json())
        .then((result) => {
            console.log(result)
            // `<p><b>Area:</b> ${txt.value}</p>`
            solo[0].innerHTML  = `
            <p><b>Area:</b> ${txt.value.charAt(0).toUpperCase()+txt.value.slice(1)}</p>
            <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
            <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
            <p><b>Currently:</b> Feels like ${result.current_condition[0].FeelsLikeF}°F<p>
            `
            console.log(tri1[0].innerHTML)

            // tri1[0].innerHTML = `
            // <p><b>Today</b></p>
            // <p><b>Average Temperature:</b> ${result.}°F</p>
            // <p><b>Max Temperature:</b> ${}°F</p>
            // <p><b>Min Temperature:</b> ${}°F</p>
            // `
            tri1[0].innerHTML=`
            <p><b>Today</b></p>
            <p><b>Average Temperature:</b> ${result.weather[0].avgtempF}°F</p>
            <p><b>Max Temperature:</b> ${result.weather[0].maxtempF}°F</p>
            <p><b>Min Temperature:</b> ${result.weather[0].mintempF}°F</p>   
            `

            tri2[0].innerHTML=`
            <p><b>Tomorrow</b></p>
            <p><b>Average Temperature:</b> ${result.weather[1].avgtempF}°F</p>
            <p><b>Max Temperature:</b> ${result.weather[1].maxtempF}°F</p>
            <p><b>Min Temperature:</b> ${result.weather[1].mintempF}°F</p>   
            `

            tri3[0].innerHTML=`
            <p><b>Day After Tomorrow</b></p>
            <p><b>Average Temperature:</b> ${result.weather[2].avgtempF}°F</p>
            <p><b>Max Temperature:</b> ${result.weather[2].maxtempF}°F</p>
            <p><b>Min Temperature:</b> ${result.weather[2].mintempF}°F</p>   
            `
            //////////
            
            ul.innerHTML += `
            <li><a href="${BASE_URL}">${txt.value.charAt(0).toUpperCase()+txt.value.slice(1)}</a></li>
            `



        })
        .catch((error) => console.log(error))


})