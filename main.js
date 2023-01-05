const BASE_URL = 'https://wttr.in/';
const locationForm = document.querySelector('.locationForm');
const locationWeather = document.querySelector('#locationWeather');


locationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let citySearched = event.target.location.value;
    event.target.location.value = '';
    let searchInfo = {};
    console.log(`${BASE_URL}${citySearched}?format=j1`, 'Button click!')


    fetch(`${BASE_URL}${citySearched}?format=j1`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);


            locationWeather.textContent = '';
            let nearest = json.nearest_area[0].areaName[0].value
            searchInfo['nearest-area'] = nearest;
            document.querySelector('.forecast').append(nearest)

            let region = json.nearest_area[0].region[0].value;
            searchInfo['region'] = region;
            
            let country = json.nearest_area[0].country[0].value;
            searchInfo['country'] = country;
            
            let currently = json.current_condition[0].FeelsLikeF;
            searchInfo['currently'] = currently;
            
            let sunChance = json.weather[0].hourly[4].chanceofsunshine;
            searchInfo['chOfSun'] = sunChance;
            
            let rainChance = json.weather[0].hourly[4].chanceofrain;
            searchInfo['chOfRain'] = rainChance;
            
            let snowChance = json.weather[0].hourly[4].chanceofsnow;
            searchInfo['chOfSnow'] = snowChance;
            console.log(searchInfo);

        })
        .catch((error) => console.log(error));
})