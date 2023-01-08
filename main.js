const article = document.querySelectorAll("article")
const ul = document.querySelectorAll( "ul")
const h2 = document.querySelector("bold")
const aside = document.querySelectorAll("aside")
const p = document.querySelector("p")
const empty= []

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    
    //!create a function to fetch
    fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
     .then(result => {
        return result.json()
    }).then(weather => {
        console.log(weather)
        
        article[0].textContent = ''
        h2.textContent = weather.nearest_area[0].areaName[0].value
        ul[0].innerHTML = `<strong>Area</strong>: ${weather.nearest_area[0].areaName[0].value}`
        ul[1].innerHTML = `<strong>Region</strong>: ${weather.nearest_area[0].region[0].value}`
        ul[2].innerHTML = `<strong>Country</strong>: ${weather.nearest_area[0].country[0].value}`
        ul[3].innerHTML = `<strong>Currently</strong>: Feels like ${weather.current_condition[0].FeelsLikeF}°F `

        const head = document.querySelectorAll('h2')
        head[1].innerHTML = `<strong>Today</strong>`
        head[2].innerHTML = `<strong>Tomorrow</strong>` 
        head[3].innerHTML = `<strong>Day After Tomorrow</strong>`
        article[1].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[0].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[0].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[0].mintempF}°F`
        article[2].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[1].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[1].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[1].mintempF}°F`
        article[3].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[2].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[2].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[2].mintempF}°F`

        p.innerHTML = ''
        let li = document.createElement('li')
        if(!empty.includes(weather.nearest_area[0].areaName[0].value)){
        li.innerHTML = `<a href="">${weather.nearest_area[0].areaName[0].value}</a>:${weather.current_condition[0].FeelsLikeF}°F`
        ul[4].append(li)
        }
        p.remove()
        empty.push(weather.nearest_area[0].areaName[0].value)


        li.addEventListener("click", (event)=>{
            event.preventDefault()
            article[0].textContent = ''
            h2.textContent = weather.nearest_area[0].areaName[0].value
            ul[0].innerHTML = `<strong>Area</strong>: ${weather.nearest_area[0].areaName[0].value}`
            ul[1].innerHTML = `<strong>Region</strong>: ${weather.nearest_area[0].region[0].value}`
            ul[2].innerHTML = `<strong>Country</strong>: ${weather.nearest_area[0].country[0].value}`
            ul[3].innerHTML = `<strong>Currently</strong>: Feels like ${weather.current_condition[0].FeelsLikeF}°F `
    
            
            const head = document.querySelectorAll('h2')
            head[1].innerHTML = `<strong>Today</strong>`
            head[2].innerHTML = `<strong>Tomorrow</strong>` 
            head[3].innerHTML = `<strong>Day After Tomorrow</strong>`
            article[1].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[0].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[0].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[0].mintempF}°F`
            article[2].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[1].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[1].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[1].mintempF}°F`
            article[3].innerHTML = `<strong>Average Temperature</strong>: ${weather.weather[2].avgtempF}°F<br><strong>Max Temperature</strong>: ${weather.weather[2].maxtempF}°F<br><strong>Min Temperature</strong>: ${weather.weather[2].mintempF}°F`
    
        })




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