const article = document.querySelectorAll("article")
const ul = document.querySelectorAll( "ul")
const h2 = document.querySelector("bold")
const aside = document.querySelectorAll("aside")
const p = document.querySelector("p")
const empty = []
// const sunny = document.querySelector("sunny")
// const rain = document.querySelector("rain")
// const snow = document.querySelector("snow")

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    
    //!maybe i should create a function to fetch
    fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
     .then(result => {
        return result.json()
    }).then(weather => {
        console.log(weather)
        document.getElementById('inputText').value = "";
        article[0].innerHTML = `<h2><bold>${weather.nearest_area[0].areaName[0].value}</bold><h2>`
        article[0].innerHTML += `<p><strong>Area</strong>: ${weather.nearest_area[0].areaName[0].value}</p><p><strong>Region</strong>: ${weather.nearest_area[0].region[0].value}</p><p><strong>Country</strong>: ${weather.nearest_area[0].country[0].value}</p><p><strong>Currently</strong>: Feels like ${weather.current_condition[0].FeelsLikeF}°F </p>`

        const head = document.querySelectorAll('h2')
        head[3].innerHTML = `<strong>Today</strong>`
        head[4].innerHTML = `<strong>Tomorrow</strong>` 
        head[5].innerHTML = `<strong>Day After Tomorrow</strong>`
        article[1].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[0].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[0].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[0].mintempF}°F`
        article[2].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[1].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[1].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[1].mintempF}°F`
        article[3].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[2].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[2].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[2].mintempF}°F`

        //remove duplicates from previous searches
        p.innerHTML = ''
        let li = document.createElement('li')
        if(!empty.includes(weather.nearest_area[0].areaName[0].value)){
        li.innerHTML = `<a href="">${weather.nearest_area[0].areaName[0].value}</a>:${weather.current_condition[0].FeelsLikeF}°F`
        ul[4].append(li)
        }
        p.remove()
        empty.push(weather.nearest_area[0].areaName[0].value)

        // make your previous searches functional ie: display the same infro on click event.
        li.addEventListener("click", (event)=>{
            event.preventDefault()
            article[0].innerHTML = `<h2><bold>${weather.nearest_area[0].areaName[0].value}</bold><h2>`
            article[0].innerHTML += `<p><strong>Area</strong>: ${weather.nearest_area[0].areaName[0].value}</p><p><strong>Region</strong>: ${weather.nearest_area[0].region[0].value}</p><p><strong>Country</strong>: ${weather.nearest_area[0].country[0].value}</p><p><strong>Currently</strong>: Feels like ${weather.current_condition[0].FeelsLikeF}°F </p>`
    
            
            const head = document.querySelectorAll('h2')
            head[3].innerHTML = `<strong>Today</strong>`
            head[4].innerHTML = `<strong>Tomorrow</strong>` 
            head[5].innerHTML = `<strong>Day After Tomorrow</strong>`
            article[1].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[0].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[0].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[0].mintempF}°F`
            article[2].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[1].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[1].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[1].mintempF}°F`
            article[3].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[2].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[2].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[2].mintempF}°F`
    
        })

        //start the chance of snow, rain, sunny and add a Gif image from assets.
        // for (i=0; i < )
        // let chanceOfSunshine = document.querySelector("chanceofsunshine")
        // let chanceOfRain = document.querySelector("chanceofrain")
        // let chanceOfSnow = document.querySelector("chanceofsnow")

        // if (chanceofrain > 50){
        //     weatherIcon.src = 'assets/icons8-torrential-rain.gif'
        //     weatherIcon.alt = 'rain'
        // } else (
        //     weatherIcon.src = 'assets/icons8-summer.gif'
        //     weatherIcon.alt = 'sun'
        // )

        // if (chanceofsunshine > 0){
        //     weatherIcon.src = 'assets/icons8-summer.gif'
        //     weatherIcon.alt = 'sun'
        // } 

        // if (chanceOfsnow > 0){
        //     weatherIcon.src = 'assets/icons8-torrential-rain.gif'
        //     weatherIcon.alt = 'rain'
        // } else (
        //     weatherIcon.src = 'assets/icons8-summer.gif'
        //     weatherIcon.alt = 'sun'
        // )

        //Start your conversion for the left aside functioning buttons
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
    })
});