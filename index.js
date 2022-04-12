'use strict';

// > API's base url
const BASE_URL = "https://wttr.in"

const form            = document.querySelector("form"),
      prevSearches    = document.getElementById("prev-searches"),
      inputLocation   = document.getElementById("location"),
      storedLocations = {};
let   defaultUnit     = '°F';

inputLocation.focus();     
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { location } = event.target;
    // => Getting data
    getLocationByName(location.value);
    form.reset();
     
});

function getLocationByName(location) {
  fetch(`${BASE_URL}/${location}?format=j1`)
    .then((response) => response.json())
    .then(result => {
        const currentList   = document.getElementById('curr-search'),
              prevSearches  = document.getElementById('prev-searches'),
              initMessage   = document.querySelector('.current-forecast p'),
              currForecast  = document.querySelector('.current-forecast'),
              dailyForecast = document.querySelector('.daily-forecast'),
              dataSearch    = {};

        // > Hidding initial message
        initMessage.classList.add('hidden');
        // > Refresh data
        currentList.querySelectorAll('*').forEach(node => {node.remove()});
        dailyForecast.querySelectorAll('*').forEach(node => {node.remove()});

        //console.log(result)
        // console.log(result.weather[0].date)
        // console.log(result.nearest_area[0].areaName[0].value)
        
        // > Creating object with data 
        dataSearch.locationName = location;
        dataSearch['Area'] = result.nearest_area[0].areaName[0].value;
        dataSearch['Region'] = result.nearest_area[0].region[0].value;
        dataSearch['Country'] = result.nearest_area[0].country[0].value;
        dataSearch['Currently'] = `Feels like ${result.current_condition[0].FeelsLikeF}°F`;
        
        // > Loading current forecast
        getCurrentForecast(dataSearch);
        // > Aside: previous searches
        previousSearches(location, `${result.current_condition[0].FeelsLikeF}°F`);
        reloadLocation();
        // > Loading daily forecast
        getDailyForecast(result.weather);

    })
    .catch((error) => {
        //console.log(error)
        const message = createErrorMessage(error);
        document.querySelector("main").append(message);
    });
}

function getCurrentForecast(data){
    const currForecast = document.querySelector('.current-forecast'),
          dataList     = document.getElementById('curr-search');
    //console.log(data)
    for (const [key, value] of Object.entries(data)) {
        // >
        //console.log(key)
        const dataItem = document.createElement('li');
        if(key === 'locationName'){ 
            dataItem.innerHTML = `<h2>${value}</h2>`;
        }else{
            dataItem.innerHTML = `<span>${key}:</span> ${value}`;
        }
        
        dataList.append(dataItem);
    }
    
    return dataList;
}

function getDailyForecast(data){
    const dailyForecast = document.querySelector('.daily-forecast');
          
    data.forEach((element) => {
        const dataList = document.createElement('ul');
            //   li1 = document.createElement('li'),   
            //   li2 = document.createElement('li'),  
            //   li3 = document.createElement('li');   
        // > Creating list with data      
        dataList.innerHTML = `
                        <li><h4>${validateDay(element.date)}</h4></li>
                        <li><span>Average Temperature:</span> ${element.avgtempF}</li>
                        <li><span>Max Temperature:</span> ${element.maxtempF}</li>
                        <li><span>Min Temperature:</span> ${element.mintempF}</li>`;
        
        dailyForecast.append(dataList);
    });
    
    
    return dailyForecast;
}

function validateDay(date) {
    const currentDate   = new Date(),
          getCurrentDay = currentDate.getDate(),
          weatherDay    = date.substring(date.length-2); 
    let dayForecast;
    console.log(currentDate.getDate())
    console.log(date.substring(date.length-2))

    if(getCurrentDay === Number(weatherDay)){
        dayForecast = 'Today';
    }
    if(getCurrentDay === Number(weatherDay-1)){
        dayForecast = 'Tomorrow';
    }
    if(getCurrentDay === Number(weatherDay-2)){
        dayForecast = 'Day After Tomorrow';
    }

    return dayForecast;
}

function previousSearches(location, temp){
    const searchList        = document.getElementById('prev-searches'),
          prevSearchMessage = document.querySelector('main aside p');
          
    searchList.querySelectorAll('*').forEach(node => {node.remove()});
    prevSearchMessage.classList.add('hidden');
    
    checkPreviousSearch(location, temp)
    console.log(storedLocations)
    
    // => Looping through the object of searches
    for (const [key, value] of Object.entries(storedLocations)) {
        const searchItem = document.createElement('li');
        searchItem.innerHTML = `<a href='javascript:void(0)' rel='${key}'>${key}</a> - ${value}`;
        searchList.append(searchItem)
    }    

    return searchList;
}

function checkPreviousSearch(location, temp){
    //console.log(location)
    //console.log(storedLocations)
    // if(!storedLocations.includes(location)){
    //     storedLocations.push(location);
    // }
    // console.log(storedLocations.length)
    storedLocations[location] = temp;

    return storedLocations;
}

function reloadLocation(){
    // => Getinng all previous searches
    const prevSearchLink = document.querySelectorAll('#prev-searches a');

    // >>
    prevSearchLink.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            getLocationByName(item.getAttribute('rel'));
        });   
    })
    
}

function createErrorMessage(message) {
    const section = document.createElement("section");
    section.classList.add("error");
    section.innerHTML = `<p>There was an error!</p><p class="message">${message}</p>`
  
    return section;
}