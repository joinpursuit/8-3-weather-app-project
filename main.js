const BASE_URL = "https://wttr.in/"
let sub = document.getElementById("submit")
let txt = document.getElementById("text")
let main = document.querySelector("main")
let solo = document.getElementsByClassName("solo")
let tri1 = document.getElementsByClassName("tri1")
let tri2 = document.getElementsByClassName("tri2")
let tri3 = document.getElementsByClassName("tri3")
let ul = document.querySelector("ul")
let noPrev = document.getElementById("noprev")




function clicked() {
    fetch(
        `${BASE_URL}${txt.value}?format=j1`
        ).then((response) => response.json())
        .then((result) => {

            
            
            solo[0].innerHTML = `
            <p><b>Area:</b> ${txt.value.charAt(0).toUpperCase() + txt.value.slice(1)}</p>
            <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
            <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
            <p><b>Currently:</b> Feels like ${result.current_condition[0].FeelsLikeF}°F<p>
            `
            
            
            tri1[0].innerHTML = `
            <p><b>Today</b></p>
            <p><b>Average Temperature:</b> ${result.weather[0].avgtempF}°F</p>
            <p><b>Max Temperature:</b> ${result.weather[0].maxtempF}°F</p>
            <p><b>Min Temperature:</b> ${result.weather[0].mintempF}°F</p>   
            `
            
            tri2[0].innerHTML = `
            <p><b>Tomorrow</b></p>
            <p><b>Average Temperature:</b> ${result.weather[1].avgtempF}°F</p>
            <p><b>Max Temperature:</b> ${result.weather[1].maxtempF}°F</p>
            <p><b>Min Temperature:</b> ${result.weather[1].mintempF}°F</p>   
            `
            
            tri3[0].innerHTML = `
            <p><b>Day After Tomorrow</b></p>
            <p><b>Average Temperature:</b> ${result.weather[2].avgtempF}°F</p>
            <p><b>Max Temperature:</b> ${result.weather[2].maxtempF}°F</p>
            <p><b>Min Temperature:</b> ${result.weather[2].mintempF}°F</p>   
            `



           if(document.getElementById("noprev")) {
            ul.removeChild(noPrev)
           }


            
            if(!document.getElementById(`${txt.value.charAt(0).toUpperCase() + txt.value.slice(1)}`) && txt.value.length > 1){

                ul.innerHTML += `
                <li class="list" id="${txt.value.charAt(0).toUpperCase() + txt.value.slice(1)}"><a href="#">${txt.value.charAt(0).toUpperCase() + txt.value.slice(1)}</a> - ${result.current_condition[0].FeelsLikeF}°F</li>
                `
            }

            
            


            txt.value = ""
        }).catch((error) => console.log(error))
}




sub.addEventListener("click", (event) => {
    event.preventDefault()
    clicked()
})

ul.addEventListener("click", (event) => {
    event.preventDefault()

    
    fetch(
        `${BASE_URL}${event.target.innerHTML}?format=j1`
    ).then((response) => response.json())
        .then((result) => {

           

            solo[0].innerHTML = `
            <p><b>Area:</b> ${event.target.innerHTML}</p>
            <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
            <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
            <p><b>Currently:</b> Feels like ${result.current_condition[0].FeelsLikeF}°F<p>
            `


            tri1[0].innerHTML = `
            <p><b>Today</b></p>
            <p><b>Average Temperature:</b> ${result.weather[0].avgtempF}°F</p>
            <p><b>Max Temperature:</b> ${result.weather[0].maxtempF}°F</p>
            <p><b>Min Temperature:</b> ${result.weather[0].mintempF}°F</p>   
            `

            tri2[0].innerHTML = `
            <p><b>Tomorrow</b></p>
            <p><b>Average Temperature:</b> ${result.weather[1].avgtempF}°F</p>
            <p><b>Max Temperature:</b> ${result.weather[1].maxtempF}°F</p>
            <p><b>Min Temperature:</b> ${result.weather[1].mintempF}°F</p>   
            `

            tri3[0].innerHTML = `
            <p><b>Day After Tomorrow</b></p>
            <p><b>Average Temperature:</b> ${result.weather[2].avgtempF}°F</p>
            <p><b>Max Temperature:</b> ${result.weather[2].maxtempF}°F</p>
            <p><b>Min Temperature:</b> ${result.weather[2].mintempF}°F</p>   
            `
    
        }).catch((error) => console.log(error))
    })