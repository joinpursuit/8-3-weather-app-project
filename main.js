
// document.querySelector("form").addEventListener("submit", (event) => {
//     event.preventDefault()
//     console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")
//     fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`).then(result => {
//         console.log("Fetch was successful")
//         return result.json()
//     }).then(weather => {
//         console.log(weather, "Finally properly formatted weather")
//     })
// });

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
    .then(result => {
       return result.json()
    })
    .then(weather => {

        let mainArticle = document.querySelector('article')

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
    
        mainArticle.appendChild(newPTag)

    })


    fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
    .then(result => {
       return result.json()
    })
    .then(weather => {


        let todayTag = document.querySelector('.today')
        let tomorrowTag = document.querySelector('.tomorrow')
        let dayTag = document.querySelector('.day')

        todayTag.innerHTML = `<h1>Today</h1>`

        let pToday = document.createElement('p')

        pToday.innerHTML = 
        `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[0].avgtempF} &#8457</span>
        <br>
        <span class="today"><strong>Max Temperature:</strong> ${weather.weather[0].maxtempF} &#8457</span>
        <br>
        <span class="today"><strong>Min Temperature:</strong> ${weather.weather[0].mintempF} &#8457</span>`

        todayTag.appendChild(pToday)


        tomorrowTag.innerHTML = `<h1>Tomorrow</h1>`

        let pTom = document.createElement('p')

        pTom.innerHTML =
        `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[1].avgtempF} &#8457</span>
        <br>
        <span class="today"><strong>Max Temperature:</strong> ${weather.weather[1].maxtempF} &#8457</span>
        <br>
        <span class="today"><strong>Min Temperature:</strong> ${weather.weather[1].mintempF} &#8457</span>`

        tomorrowTag.appendChild(pTom)


        dayTag.innerHTML = `<h1>Day After Tomorrow</h1>`

        let dayAfterP = document.createElement('p')

        dayAfterP.innerHTML = 
        `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[1].avgtempF} &#8457</span>
        <br>
        <span class="today"><strong>Max Temperature:</strong> ${weather.weather[1].maxtempF} &#8457</span>
        <br>
        <span class="today"><strong>Min Temperature:</strong> ${weather.weather[1].mintempF} &#8457</span>`

        dayTag.appendChild(dayAfterP)


    })

    
    fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
        .then(result => {
           return result.json()
        })
        .then(weather => {

        let ul = document.querySelector('ul')
        let li = document.createElement('li')

        li.innerHTML = `${weather.nearest_area[0].areaName[0].value} -${weather.current_condition[0]['FeelsLikeF']} &#8457;`
        ul.append(li)

        })

    })




        // let todayTag = document.querySelector('.today')
        // let tomorrowTag = document.querySelector('.tomorrow')
        // let dayTag = document.querySelector('.day')

        // todayTag.innerHTML = `<h1>Today</h1>`

        // let pToday = document.createElement('p')

        // pToday.innerHTML = 
        // `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[0].avgtempF} &#8457</span>
        // <br>
        // <span class="today"><strong>Max Temperature:</strong> ${weather.weather[0].maxtempF} &#8457</span>
        // <br>
        // <span class="today"><strong>Min Temperature:</strong> ${weather.weather[0].mintempF} &#8457</span>`

        // todayTag.appendChild(pToday)


        // tomorrowTag.innerHTML = `<h1>Tomorrow</h1>`

        // let pTom = document.createElement('p')

        // pTom.innerHTML =
        // `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[1].avgtempF} &#8457</span>
        // <br>
        // <span class="today"><strong>Max Temperature:</strong> ${weather.weather[1].maxtempF} &#8457</span>
        // <br>
        // <span class="today"><strong>Min Temperature:</strong> ${weather.weather[1].mintempF} &#8457</span>`

        // tomorrowTag.appendChild(pTom)


        // dayTag.innerHTML = `<h1>Day After Tomorrow</h1>`

        // let dayAfterP = document.createElement('p')

        // dayAfterP.innerHTML = 
        // `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[1].avgtempF} &#8457</span>
        // <br>
        // <span class="today"><strong>Max Temperature:</strong> ${weather.weather[1].maxtempF} &#8457</span>
        // <br>
        // <span class="today"><strong>Min Temperature:</strong> ${weather.weather[1].mintempF} &#8457</span>`

        // dayTag.appendChild(dayAfterP)
        






    


        


// document.querySelector('form').addEventListener('submit', (event) => {
    
    // let ul = document.querySelector('ul')
    // let li = document.createElement('li')

    // li.innerHTML = `${event.target.location.value}`

    // ul.appendChild(li)

    // })






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