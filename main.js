const input = document.querySelector('.input');
const form = document.querySelector('.form');
const cityName = document.querySelector('.city-name');
const region = document.querySelector('.region');
const country = document.querySelector('.country');
const currently = document.querySelector('.currently');
const placementWeatherInfo = document.querySelector('.placement');
const defaultMsg = document.querySelector('.default-msg');
const todayWeather = document.querySelector('.today-weather-info');
const tmmWeather = document.querySelector('.tmm-weather-info');
const datWeather = document.querySelector('.dat-weather-info');
const todayAvgTemp = document.querySelector('.today-avg-temp');
const todayMaxTemp = document.querySelector('.today-max-temp');
const todayMinTemp = document.querySelector('.today-min-temp');
const tmmAvgTemp = document.querySelector('.tmm-avg-temp');
const tmmMaxTemp = document.querySelector('.tmm-max-temp');
const tmmMinTemp = document.querySelector('.tmm-min-temp');
const datAvgTemp = document.querySelector('.dat-avg-temp');
const datMaxTemp = document.querySelector('.dat-max-temp');
const datMinTemp = document.querySelector('.dat-min-temp');
const weatherDataSummary = document.querySelector('.weather-days');
const previousSect = document.querySelector('.previous');
const previousSearch = document.querySelector('.previous-search');
const previousList = document.querySelector('.previous-list');
const noSearchMsgP = document.querySelector('.no-search-msg');
const area = document.querySelector('.area');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    theInput = event.target.location.value; 

    const url = `https://wttr.in/` + theInput + `?format=j1`;
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => { 

        console.log(data);

        defaultMsg.style.display = `none`; 
        placementWeatherInfo.style.height = `270px`
        weatherDataSummary.style.opacity = `100%`;
        
        cityName.textContent = theInput;
        area.textContent = "Nearest Area: " + data.nearest_area[0].areaName[0].value;
        region.textContent = "Region: " + data.nearest_area[0].region[0].value;
        country.textContent = "Country: " + data.nearest_area[0].country[0].value;
        currently.textContent = "Currently: " + "Feels like " + data.current_condition[0].FeelsLikeF + "°F";

        todayAvgTemp.textContent = `Average Temperature: ${data.weather[0].avgtempF} °F`;
        todayMaxTemp.textContent = `Max Temperature: ${data.weather[0].maxtempF} °F`;
        todayMinTemp.textContent = `Min Temperature: ${data.weather[0].mintempF} °F`;

        tmmAvgTemp.textContent = `Average Temperature: ${data.weather[1].avgtempF} °F`;
        tmmMaxTemp.textContent = `Max Temperature: ${data.weather[1].maxtempF} °F`;
        tmmMinTemp.textContent = `Min Temperature: ${data.weather[1].mintempF} °F`;

        datAvgTemp.textContent = `Average Temperature: ${data.weather[2].avgtempF} °F`;
        datMaxTemp.textContent = `Max Temperature: ${data.weather[2].maxtempF} °F`;
        datMinTemp.textContent = `Min Temperature: ${data.weather[2].mintempF} °F`;

        if (noSearchMsgP.textContent.length > 2) {
            noSearchMsgP.remove();
        }

        const li = document.createElement('li'); 
        previousList.appendChild(li);
        li.style = `list-style: none`;
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        li.appendChild(a);
        a.textContent = data.nearest_area[0].areaName[0].value + ' ' + data.current_condition[0].FeelsLikeF + "°F";

        a.addEventListener('click', (event) => {
           
            theInput = event.target.textContent.split(' ')[0];

            cityName.textContent = theInput;

            fetch(url)
            .then((response) => response.json())
            .then((data) => { 

        defaultMsg.style.display = `none`; 
        placementWeatherInfo.style.height = `270px`
        weatherDataSummary.style.opacity = `100%`;
        
        cityName.textContent = data.nearest_area[0].areaName[0].value;
        region.textContent = "Region: " + data.nearest_area[0].region[0].value;
        country.textContent = "Country: " + data.nearest_area[0].country[0].value;
        currently.textContent = "Currently: " + "Feels like " + data.current_condition[0].FeelsLikeF + "°F";

        todayAvgTemp.textContent = `Average Temperature: ${data.weather[0].avgtempF} °F`;
        todayMaxTemp.textContent = `Max Temperature: ${data.weather[0].maxtempF} °F`;
        todayMinTemp.textContent = `Min Temperature: ${data.weather[0].mintempF} °F`;

        tmmAvgTemp.textContent = `Average Temperature: ${data.weather[1].avgtempF} °F`;
        tmmMaxTemp.textContent = `Max Temperature: ${data.weather[1].maxtempF} °F`;
        tmmMinTemp.textContent = `Min Temperature: ${data.weather[1].mintempF} °F`;

        datAvgTemp.textContent = `Average Temperature: ${data.weather[2].avgtempF} °F`;
        datMaxTemp.textContent = `Max Temperature: ${data.weather[2].maxtempF} °F`;
        datMinTemp.textContent = `Min Temperature: ${data.weather[2].mintempF} °F`;
        })
        .catch((error) => {
            console.log(error)
        })
        })         
    })
    .catch((error) => {
        console.log(error)
    })
    form.reset();
})

//if previos search includes cityname do not record
//check that all these variables are indeed being used when done with command find