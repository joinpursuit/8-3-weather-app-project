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
}) /
  /**
   * @description  getting weather data from the api for current weather, three day forcast, and weather icons.
   * @param {object} - object destructing from api information
   * @param {string} place - string of user input information
   *
   */
  function weather({ nearest_area, current_condition, weather }, place) {
    h2.innerHTML = place

    if (text.value === nearest_area[0].areaName[0].value) {
      currentWeather[1].innerHTML = `<b>Area:</b> ${nearest_area[0].areaName[0].value}`
    } else {
      currentWeather[1].innerHTML = `<b>Nearest Area:</b> ${nearest_area[0].areaName[0].value}`
    }

    // current weather info
    currentWeather[2].innerHTML = `<b>Region:</b> ${nearest_area[0].region[0].value}`
    currentWeather[3].innerHTML = `<b>Country:</b> ${nearest_area[0].country[0].value}`
    currentWeather[4].innerHTML = `<b>Currently:</b> Feels Like ${current_condition[0].FeelsLikeF}°F`

    //three day forcast info
    articleToday[0].innerHTML = `<b>Average Temperature:</b> ${weather[0].avgtempF}°F`
    articleTomrrow[0].innerHTML = `<b>Average Temperature:</b> ${weather[1].avgtempF}°F`
    articleDayAfterTom[0].innerHTML = `<b>Average Temperature:</b> ${weather[2].avgtempF}°F`

    articleToday[1].innerHTML = `<b>Max Temperature:</b> ${weather[0].maxtempF}°F`
    articleTomrrow[1].innerHTML = `<b>Max Temperature:</b> ${weather[1].maxtempF}°F`
    articleDayAfterTom[1].innerHTML = `<b>Max Temperature:</b> ${weather[2].maxtempF}°F`

    articleToday[2].innerHTML = `<b>Min Temperature:</b> ${weather[0].mintempF}°F`
    articleTomrrow[2].innerHTML = `<b>Min Temperature:</b> ${weather[1].mintempF}°F`
    articleDayAfterTom[2].innerHTML = `<b>Min Temperature:</b> ${weather[2].mintempF}°F`

    //icons
    let sun = weather[0].hourly[0].chanceofsunshine
    let rain = weather[0].hourly[0].chanceofrain
    let snow = weather[0].hourly[0].chanceofsnow
    currentWeather[5].innerHTML = `<b>Chance of Sunshine:</b>
${weather[0].hourly[0].chanceofsunshine}`
    currentWeather[6].innerHTML = `<b>Chance of Rain:</b> ${weather[0].hourly[0].chanceofrain} `
    currentWeather[7].innerHTML = `<b>Chance of Snow:</b>
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

/**
 * @description - higher order function of getting the user search history on the sidebar as list.
 * @param {object}  - object destructing from api information.
 * @param {string} place - string of user input information.
 */
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

//search bar for user to input location
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
