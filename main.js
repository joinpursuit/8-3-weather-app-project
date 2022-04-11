const BASE_URL = 'https://wttr.in/'
const form = document.querySelector("form")
const input = document.querySelector("input")


const getSearches = (city) => {
  const ul = document.getElementById("searchHistory")
  const searchP = document.getElementById("searchPlaceholder")
  const li = document.createElement("li")
  li.setAttribute("id", "request")
  searchP.textContent = ""
  li.textContent = city

  ul.append(li)
  console.log("welcome to the party")
}

const getWeather = ( response ) => {
  console.log(response)
  const area = response.nearest_area[0].areaName[0].value
  const region = response.nearest_area[0].region[0].value
  const country = response.nearest_area[0].country[0].value
  const feelsLikeF = response.current_condition[0].FeelsLikeF


  const placeholderP = document.getElementById("placeholder")
  placeholderP.textContent = ""

  const request = document.getElementById("request")
  const headingCity = document.getElementById("city")
  headingCity.textContent = request.innerHTML
  // <strong id="areaHold"></strong><p id="area"></p>
  const areaHeader = document.getElementById("areaHold")
  const areaSpan = document.getElementById("area") 
  areaHeader.textContent = `Area: `
  areaSpan.textContent = area
  
  // <strong id="regionHold"></strong><p id="region"></p>
  const regionHeader = document.getElementById("regionHold")
  const regionSpan = document.getElementById("region") 
  regionHeader.textContent = `Region: `
  regionSpan.textContent = region
  // <strong id="countryHold"></strong><p id="country"></p>
  const countryHeader = document.getElementById("countryHold")
  const countrySpan = document.getElementById("country") 
  countryHeader.textContent = `Country: `
  countrySpan.textContent = country
  // <strong id="currentlyHold"></strong><p id="currently"></p>
  const currentlyHeader = document.getElementById("currentlyHold")
  const currentlySpan = document.getElementById("currently") 
  currentlyHeader.textContent = `Currently: `
  currentlySpan.textContent = `Feels Like ${feelsLikeF}°F`



  for (let forecast of response.weather){
    console.log("These are avgTemps: ", forecast.avgtempF)
    console.log("Thes are maxTemps: ",forecast.maxtempF)
    console.log("These are minTemps: ", forecast.mintempF)
  }
}







const button = document.getElementById("myButton")
button.addEventListener("click", (event) => {
  event.preventDefault()
  const city = input.value
  
  fetch(`${BASE_URL}${city}?format=j1`)
    .then((response) => {
      return response.json();
    })
    .then(getWeather)
    .then(getSearches(city))
    .catch((err) => {
      console.log(err)
      });
    form.reset()
})