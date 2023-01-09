
let array = []

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
    .then(result => {
       return result.json()
    })
    .then(weather => {

        document.getElementById('inputText').value = "";

        let mainArticle = document.querySelector('article')
        function getWeather(){
        mainArticle.innerHTML =
        `<h1 class='city'> ${weather.nearest_area[0].areaName[0].value}</h1>`
    
        let newPTag = document.createElement('p')
    
        newPTag.innerHTML =
        `<span class="details"><strong>Area:</strong> ${weather.nearest_area[0].areaName[0].value}</span>
        <br>
        <span class="details"><strong>Region:</strong> ${weather.nearest_area[0].region[0].value}</span>
        <br>
        <span class="details"><strong>Country:</strong> ${weather.nearest_area[0].country[0].value}</span>
        <br>
        <span class="details"><strong>Currently:</strong> Feels Like ${weather.current_condition[0]['FeelsLikeF']} &#8457;</span>`
    
        mainArticle.append(newPTag)


        let todayTag = document.querySelector('.today')
        let tomorrowTag = document.querySelector('.tomorrow')
        let dayTag = document.querySelector('.day')

        todayTag.innerHTML = `<h2>Today</h2>`

        let pToday = document.createElement('p')

        pToday.innerHTML = 
        `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[0].avgtempF} &#8457</span>
        <br>
        <span class="today"><strong>Max Temperature:</strong> ${weather.weather[0].maxtempF} &#8457</span>
        <br>
        <span class="today"><strong>Min Temperature:</strong> ${weather.weather[0].mintempF} &#8457</span>`

        todayTag.append(pToday)


        tomorrowTag.innerHTML = `<h2>Tomorrow</h2>`

        let pTom = document.createElement('p')

        pTom.innerHTML =
        `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[1].avgtempF} &#8457</span>
        <br>
        <span class="today"><strong>Max Temperature:</strong> ${weather.weather[1].maxtempF} &#8457</span>
        <br>
        <span class="today"><strong>Min Temperature:</strong> ${weather.weather[1].mintempF} &#8457</span>`

        tomorrowTag.append(pTom)


        dayTag.innerHTML = `<h2>Day After Tomorrow</h2>`

        let dayAfterP = document.createElement('p')

        dayAfterP.innerHTML = 
        `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[2].avgtempF} &#8457</span>
        <br>
        <span class="today"><strong>Max Temperature:</strong> ${weather.weather[2].maxtempF} &#8457</span>
        <br>
        <span class="today"><strong>Min Temperature:</strong> ${weather.weather[2].mintempF} &#8457</span>`

        dayTag.append(dayAfterP)
    }
        getWeather()

        let ul = document.querySelector('ul')
        let previous = document.querySelector(".previous")
        let li = document.createElement('li')

        
        if (previous){
            previous.remove()

            li.innerHTML = `<a href="">${weather.nearest_area[0].areaName[0].value}</a> -${weather.current_condition[0]['FeelsLikeF']} &#8457;`
        ul.append(li)
        }
        
        else if(!array.includes(weather.nearest_area[0].areaName[0].value)) {
            // let li = document.createElement('li')

            li.innerHTML = `<a href="">${weather.nearest_area[0].areaName[0].value}</a> -${weather.current_condition[0]['FeelsLikeF']} &#8457;`
        ul.append(li)
        }
        
        array.push(weather.nearest_area[0].areaName[0].value)


        li.addEventListener("click", (event) => {
            event.preventDefault()
            getWeather()
        })
        })
    })


    let conversion = document.querySelector('#conversionForm')
    conversion.addEventListener('submit', (event) => {
        event.preventDefault()

        let convInput = event.target.convert.value
        let toF = document.querySelector('#to-f')
        let toC = document.querySelector('to-c')


        if (toF.checked) {
            convInput = convInput * (9 / 5) + 32
            document.querySelector('#result').innerHTML = `${convInput.toFixed(2)}°F`
        
        }else {
            convInput = (convInput - 32) * (5 / 9)
            document.querySelector('#result').innerHTML = `${convInput.toFixed(2)}°C`
        }
    })


// article main city & area :weather.nearest_area[0].areaName[0].value 
// Region: weather.nearest_area[0].region[0].value
// country: weather.nearest_area[0].country[0].value
// currently: weather.current_condition[0].FeelsLikeF

// Today
// Average Tempature: weather.weather[0].avgtempF
// Max Tempature: weather.weather[0].maxtempF
// Min Tempature: weather.weather[0].mintempF

// Tomorrow

// Average Tempature: weather.weather[1].avgtempF
// Max Tempature: weather.weather[1].maxtempF
// Min Tempature: weather.weather[1].mintempF

// Day After Tomorrow 

// Average Tempature: weather.weather[2].avgtempF
// Max Tempature: weather.weather[2].maxtempF
// Min Tempature: weather.weather[2].mintempF

// Previous Searches

//weather.nearest_area[0].areaName[0].value
// weather.weather[0].avgtempF

//https://v3.wttr.in/?format=j1