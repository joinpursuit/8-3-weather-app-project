const search = document.getElementById('location')
const button = document.getElementById('submit-button')
const main = document.querySelector('main')
const choose = document.getElementById('choose')
const dis = document.querySelectorAll('article')
const convert = document.getElementById('convert-temp')
const convertAside = document.getElementById('convert')

const addPreviousSearch = (prevSearch, data) => {
  let add = true
  if (document.getElementById('no-prev'))
    document.getElementById('no-prev').remove()
  const liElements = document.querySelectorAll('a')
  console.log(liElements)
  liElements.forEach(el => {
    if (el.innerText === prevSearch) {
      add = false
    }
  })
  if (add) {
    const list = document.querySelector('ul')
    const li = document.createElement('li')
    console.log(data.current_condition[0].FeelLikeF)
    li.innerHTML = `<a href='#' id='${prevSearch}'>${prevSearch}</a> - ${data.current_condition[0].FeelsLikeF}°F`

    list.append(li)
    const a = document.getElementById(`${prevSearch}`)
    a.addEventListener('click', e => {
      displayWeather(prevSearch, data)
      li.remove()
      list.append(li)
    })
  }
}

const futuresDisplay = data => {
  dis.forEach(el => {
    el.classList.remove('none')
  })
  const todayAvg = document.getElementById('today_avg')
  const todayMax = document.getElementById('today_max')
  const todayMin = document.getElementById('today_min')
  const tomAvg = document.getElementById('tomorrow_avg')
  const tomMax = document.getElementById('tomorrow_max')
  const tomMin = document.getElementById('tomorrow_min')
  const nextAvg = document.getElementById('next_avg')
  const nextMax = document.getElementById('next_max')
  const nextMin = document.getElementById('next_min')
  todayAvg.innerText = `${data.weather[0].avgtempF}°F`
  todayMax.innerText = `${data.weather[0].maxtempF}°F`
  todayMin.innerText = `${data.weather[0].mintempF}°F`
  tomAvg.innerText = `${data.weather[1].avgtempF}°F`
  tomMax.innerText = `${data.weather[1].maxtempF}°F`
  tomMin.innerText = `${data.weather[1].mintempF}°F`
  nextAvg.innerText = `${data.weather[2].avgtempF}°F`
  nextMax.innerText = `${data.weather[2].maxtempF}°F`
  nextMin.innerText = `${data.weather[2].mintempF}°F`
}
const displayWeather = (search, data) => {
  futuresDisplay(data)
  let current = document.getElementById('current').remove()
  current = document.createElement('article')
  current.setAttribute('id', 'current')
  main.prepend(current)
  const gif = document.createElement('img')
  gif.setAttribute('id', 'gif')
  if (+data.weather[0].hourly[0].chanceofsunshine > 50) {
    gif.setAttribute('src', './assets/icons8-summer.gif')
    gif.setAttribute('alt', 'sun')
  } else if (+data.weather[0].hourly[0].chanceofrain > 50) {
    gif.setAttribute('src', './assets/icons8-torrential-rain.gif')
    gif.setAttribute('alt', 'rain')
  } else if (+data.weather[0].hourly[0].chanceofsnow > 50) {
    gif.setAttribute('src', './assets/icons8-light-snow.gif')
    gif.setAttribute('alt', 'snow')
  }
  const areaBig = document.createElement('h2')
  areaBig.innerText = search
  const area = document.createElement('p')
  if (data.nearest_area[0].areaName[0].value === capitalize(search)) {
    area.innerHTML = `<strong>Area:</strong> ${data.nearest_area[0].areaName[0].value}`
  } else {
    area.innerHTML = `<strong>Nearest Area:</strong> ${data.nearest_area[0].areaName[0].value}`
  }
  const region = document.createElement('p')
  region.innerHTML = `<strong>Region:</strong> ${data.nearest_area[0].region[0].value}`
  const country = document.createElement('p')
  country.innerHTML = `<strong>Country:</strong> ${data.nearest_area[0].country[0].value}`
  const currently = document.createElement('p')
  currently.innerHTML = `<strong>Currently:</strong> Feels Like ${data.current_condition[0].FeelsLikeF}°F`
  const chanceSunny = document.createElement('p')
  const chanceRain = document.createElement('p')
  const chanceSnow = document.createElement('p')
  chanceSunny.innerHTML = `<strong>Chance of Sunshine: </strong> ${data.weather[0].hourly[0].chanceofsunshine}`
  chanceRain.innerHTML = `<strong>Chance of Rain: </strong> ${data.weather[0].hourly[0].chanceofrain}`
  chanceSnow.innerHTML = `<strong>Chance of Snow: </strong> ${data.weather[0].hourly[0].chanceofsnow}`
  current.append(gif)
  current.append(areaBig)
  current.append(area)
  current.append(region)
  current.append(country)
  current.append(currently)
  current.append(chanceSunny)
  current.append(chanceRain)
  current.append(chanceSnow)
}

button.addEventListener('click', async e => {
  e.preventDefault()
  const url = `https://wttr.in/${search.value}?format=j1`
  const res = await fetch(url)
  const data = await res.json()
  displayWeather(search.value, data)
  console.log(data)
  addPreviousSearch(search.value, data)
  search.value = ''
})

document.getElementById('conversion').addEventListener('submit', e => {
  e.preventDefault()
  document.getElementById('h4-temp').remove()
  const temp = document.getElementById('temp-to-convert').value
  if (document.getElementById('to-f').checked) {
    const result = document.createElement('h4')
    result.setAttribute('id', 'h4-temp')
    result.innerText = `${Number.parseFloat(temp * (9 / 5) + 32, 2).toFixed(2)} °F`
    convertAside.append(result)
  } else {
    const result = document.createElement('h4')
    result.setAttribute('id', 'h4-temp')
    result.innerText = `${Number.parseFloat((temp - 32) * (5 / 9),2).toFixed(2)} °C`
    convertAside.append(result)
  }
})
function capitalize(word) {
  word = word.toLowerCase()
  return word.replace(word[0], word[0].toUpperCase())
}
