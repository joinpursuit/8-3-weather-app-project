const form = document.querySelector('form')
const text = document.querySelector("input[type='text']")
let submit = document.querySelector("input[type='submit']")
let h2 = document.querySelector('h2')
let currentWeather = document.querySelectorAll(
  ' main article.current-weather p'
)
let articleToday = document.querySelectorAll('article.today p')
let articleTomrrow = document.querySelectorAll('article.tomorrow-weather p')
let articleDayAfterTom = document.querySelectorAll(
  'article.day-after-tomorrow p'
)
let previousSearch = document.querySelector('ul')

let noPreviousSearch = document.querySelector('ul p')

let articleLocation = document.querySelector('main article p.text')

let image = document.querySelector('img')

let convertTemp = document.querySelector('aside.widget h4')

const number = document.getElementById('temp-to-convert')

let submitTemp = document.querySelector('aside.widget form')

let freh = document.getElementById('to-f')

//this is convert temp to celcius to Fahrenheit
submitTemp.addEventListener('submit', (event) => {
  event.preventDefault()

  if (number.value === '') {
    window.reload()
  }
  let result = 0
  if (freh.checked) {
    result = (number.value * 9) / 5 + 32
    convertTemp.textContent = `${result.toFixed(2)}°F`
  } else {
    result = ((number.value - 32) * 5) / 9
    convertTemp.textContent = `${result.toFixed(2)}°C`
    
  }
  submitTemp.reset()
})

// weather data for current weather, three day weather, and icons 
function weather({ nearest_area, current_condition, weather }, place) {
  h2.innerHTML = place

  if (text.value === nearest_area[0].areaName[0].value) {
    currentWeather[1].textContent = `Area: ${nearest_area[0].areaName[0].value}`
  } else {
    currentWeather[1].textContent = `Nearest Area: ${nearest_area[0].areaName[0].value}`
  }

  currentWeather[2].textContent = `Region: ${nearest_area[0].region[0].value}`
  currentWeather[3].textContent = `Country: ${nearest_area[0].country[0].value}`

  currentWeather[4].textContent = `Currently: Feels Like ${current_condition[0].FeelsLikeF}°F`

  articleToday[0].textContent = `Average Temperature: ${weather[0].avgtempF}°F`
  articleTomrrow[0].textContent = `Average Temperature: ${weather[1].avgtempF}°F`
  articleDayAfterTom[0].textContent = `Average Temperature: ${weather[2].avgtempF}°F`

  articleToday[1].textContent = `Max Temperature: ${weather[0].maxtempF}°F`
  articleTomrrow[1].textContent = `Max Temperature: ${weather[1].maxtempF}°F`
  articleDayAfterTom[1].textContent = `Max Temperature: ${weather[2].maxtempF}°F`

  articleToday[2].textContent = `Min Temperature: ${weather[0].mintempF}°F`
  articleTomrrow[2].textContent = `Min Temperature: ${weather[1].mintempF}°F`
  articleDayAfterTom[2].textContent = `Min Temperature: ${weather[2].mintempF}°F`

  let sun = weather[0].hourly[0].chanceofsunshine
  let rain = weather[0].hourly[0].chanceofrain
  let snow = weather[0].hourly[0].chanceofsnow
  currentWeather[5].textContent = ` Chance of Sunshine:
${weather[0].hourly[0].chanceofsunshine}`
  currentWeather[6].textContent = `Chance of Rain: ${weather[0].hourly[0].chanceofrain} `
  currentWeather[7].textContent = `Chance of Snow:
${weather[0].hourly[0].chanceofsnow}`

  if (sun > 50) {
    image.setAttribute('src', './assets/icons8-summer.gif')
    image.setAttribute('alt', 'sun')
  } else if (rain > 50) {
    image.setAttribute('src', './assets/icons8-torrential-rain.gif')
    image.setAttribute('alt', 'rain')
  } else if (snow > 50) {
    image.setAttribute('src', './assets/icons8-light-snow.gif')
    image.setAttribute('alt', 'snow')
  }
}

//list history sidebar
const searchPrevious = ({ current_condition }, place) => {
  let li = document.createElement('li')

  let a = document.createElement('a')
  a.setAttribute('href', '#')

  a.textContent = `${place} - ${current_condition[0].FeelsLikeF}°F`

  previousSearch.append(li)

  li.append(a)

  a.addEventListener('click', (event) => {
    event.preventDefault()

    fetch(`https://wttr.in/${place}?format=j1`)
      .then((response) => response.json())
      .then((json) => {
        weather(json, place)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

//search bar for location text input
form.addEventListener('submit', (event) => {
  event.preventDefault()

  let city = text.value

  articleLocation.remove()

  noPreviousSearch.remove()

  if (text.value === '') {
    window.reload()
  }

  fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      weather(json, city), searchPrevious(json, city)
    })
    .catch((error) => {
      console.log(error)
    })

  text.value = ''
})
