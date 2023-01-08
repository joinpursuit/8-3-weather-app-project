const article = document.querySelectorAll("article")
const ul = document.querySelectorAll("ul")
const h2 = document.querySelector("bold")
const aside = document.querySelectorAll("aside")
const p = document.querySelector("p")

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
        .then(result => {
            return result.json()
        }).then(weather => {
            console.log(weather)
            document.getElementById('inputText').value = "";
            article[0].innerHTML = `<h2><bold>${weather.nearest_area[0].areaName[0].value}</bold><h2>`
            article[0].innerHTML += `<p><strong>Area</strong>: ${weather.nearest_area[0].areaName[0].value}</p><p><strong>Region</strong>: ${weather.nearest_area[0].region[0].value}</p><p><strong>Country</strong>: ${weather.nearest_area[0].country[0].value}</p><p><strong>Currently</strong>: Feels like ${weather.current_condition[0].FeelsLikeF}°F </p>`
            
            p.innerHTML = ''
            let li = document.createElement('li')
            li.innerHTML = `<a href="">${weather.nearest_area[0].areaName[0].value}</a>:${weather.current_condition[0].FeelsLikeF}°F`
            ul[4].append(li)
            const conversion = document.querySelector('#conversionForm');
       
        })
});