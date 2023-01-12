const article = document.querySelectorAll("article")
const ul = document.querySelectorAll( "ul")
const h2 = document.querySelector("bold")
const aside = document.querySelectorAll("aside")
const p = document.querySelector("p")
const array = []
const image = document.querySelector("img")

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
     fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
     .then(result => {
        return result.json()
    }).then(weather => {
        console.log(weather)
        function chance(){
            if(weather.weather[0].hourly[0].chanceofsunshine > 50){
                image.setAttribute("src", "./assets/icons8-summer.gif")
                image.setAttribute("alt", "sun")
            } else if (weather.weather[0].hourly[0].chanceofrain > 50){
                image.setAttribute("src", "./assets/icons8-torrential-rain.gif")
                image.setAttribute("alt", "rain")
            } else if (weather.weather[0].hourly[0].chanceofsnow > 50){
                image.setAttribute("src", "./assets/icons8-light-snow.gif")
                image.setAttribute("alt", "snow")
            }
        }
        function get(){
        let input = document.getElementById('inputText')
            if(input.value.toLowerCase() === weather.nearest_area[0].areaName[0].value.toLowerCase()){
                article[0].innerHTML = `<h2>${weather.nearest_area[0].areaName[0].value}<h2>`
                chance()
                article[0].innerHTML += `<p><strong>Area</strong>: ${weather.nearest_area[0].areaName[0].value}</p>`

            } else {
                article[0].innerHTML = `<h2>${input.value}<h2>`
                chance()
                article[0].innerHTML += `<p><strong>Nearest Area</strong>: ${weather.nearest_area[0].areaName[0].value}</p>`

            }
        input.value = "";
        article[0].innerHTML += `<p><strong>Region</strong>: ${weather.nearest_area[0].region[0].value}</p><p><strong>Country</strong>: ${weather.nearest_area[0].country[0].value}</p><p><strong>Currently</strong>: Feels like ${weather.current_condition[0].FeelsLikeF}°F </p>`
        article[0].innerHTML += `<p><strong>Chance of Sunshine</strong>: ${weather.weather[0].hourly[0].chanceofsunshine}</p><p><strong>Chance of Rain</strong>: ${weather.weather[0].hourly[0].chanceofrain}</p><p><strong>Chance of Snow</strong>: ${weather.weather[0].hourly[0].chanceofsnow}</p>`
        const head = document.querySelectorAll('h2')
        head[2].innerHTML = `<strong>Today</strong>`
        head[3].innerHTML = `<strong>Tomorrow</strong>` 
        head[4].innerHTML = `<strong>Day After Tomorrow</strong>`
        article[1].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[0].avgtempF}°F<br><br><strong>Max Temperature</strong>: ${weather.weather[0].maxtempF}°F<br><br><strong>Min Temperature</strong>: ${weather.weather[0].mintempF}°F`
        article[2].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[1].avgtempF}°F<br><br><strong>Max Temperature</strong>: ${weather.weather[1].maxtempF}°F<br><br><strong>Min Temperature</strong>: ${weather.weather[1].mintempF}°F`
        article[3].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[2].avgtempF}°F<br><br><strong>Max Temperature</strong>: ${weather.weather[2].maxtempF}°F<br><br><strong>Min Temperature</strong>: ${weather.weather[2].mintempF}°F`
        }
        get()
        let li = document.createElement('li')
        if(!array.includes(weather.nearest_area[0].areaName[0].value)){
            li.innerHTML = `<a href="">${weather.nearest_area[0].areaName[0].value}</a>:${weather.current_condition[0].FeelsLikeF}°F`
            ul[4].append(li)
        }
        p.remove()
        array.push(weather.nearest_area[0].areaName[0].value)
        li.addEventListener("click", (event) => {
            event.preventDefault()
            get()
        })

        const convertTemp = document.querySelector('#conversionForm');
        convertTemp.addEventListener('submit', (event) => {
        event.preventDefault();
        let convertTemp = event.target.convert.value;
        let toC = document.querySelector('#to-c')
        let toF = document.querySelector('#to-f')
        if (toC.checked) {
            convertTemp = (convertTemp - 32) * (5 / 9);
        document.querySelector('#result').innerHTML = `${convertTemp.toFixed(2)}°C`;
         } else {
            convertTemp = convertTemp * (9 / 5) + 32;
        document.querySelector('#result').innerHTML = `${convertTemp.toFixed(2)}°F`;
        }
        });
    })
    
});