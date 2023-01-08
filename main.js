//create a that posts all the weather results
function weatherFunc(searchLocation, result){
    //create a variable for the results of the first object in the hourly array
    let chanceOf = result.weather[0].hourly[0];

    //create an array of objects of the chance of each weather type
    let chanceOfWeather = [
    {chance: chanceOf.chanceofsunshine,
    weather: "Sunshine",
    alt: "sun",
    img: "./assets/icons8-summer.gif"},
    {chance: chanceOf.chanceofrain,
    weather: "Rain",
    alt: "rain",
    img: "./assets/icons8-torrential-rain.gif"},
    {chance: chanceOf.chanceofsnow,
    weather: "Snow",
    alt: "snow",
    img: "./assets/icons8-light-snow.gif"},
    {chance: chanceOf.chanceofwindy,
    weather: "Windy",
    alt: "wind",
    img: "./assets/icons8-wind.gif"},
    {chance: chanceOf.chanceoffog,
    weather: "Fog",
    alt: "fog",
    img: "./assets/icons8-fog.gif"},
    {chance: chanceOf.chanceofovercast,
    weather: "Overcast",
    alt: "overcast",
    img: "./assets/icons8-night.gif"},
    ];
    
    //clear the weather div
    weatherDiv.innerHTML = "";

    //put the weather chance of every weather type into the div
    for (weather of chanceOfWeather){
        let sentence = document.createElement("p");
        sentence.innerHTML = `<b>Chance of ${weather.weather}:</b> ${weather.chance}`
        weatherDiv.append(sentence);
    }
    
    // //calculate which has the highest chance, and set the appropriate photo

    //assign the highest weather chance to a variable
    let highestChance = chanceOfWeather.reduce((a, b) => {
        //compare the weather chance
        let weather = a.chance > b.chance ? a : b;
        return weather;
    })

    //set the src and alt for the weather type of the highest chance
    pic.setAttribute("src", highestChance.img);
    pic.setAttribute("alt", highestChance.alt);

    // //place the results in the main .search-result article

    //check if the location matches the area
    if (searchLocation === result.nearest_area[0].areaName[0].value){

        //change the inner html of the search-result article element to the data
        searchResult.innerHTML = `<h2>${searchLocation}</h2>
        <p><b>Area:</b> ${result.nearest_area[0].areaName[0].value}</p>
        <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
        <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
        <p><b>Currently:</b> Feels Like ${result.current_condition[0].FeelsLikeF}°F</p>`;

        //check if the highest result is at least 50
        if (highestChance.chance >= 50) {
            //prepend the picture
            searchResult.prepend(pic);
        }
        
        //attach the weather chance div
        searchResult.append(weatherDiv);

    } else {
        //its not the exact area
        //change the inner html of the search-result article element to the data
        searchResult.innerHTML = `<h2>${searchLocation}</h2>
        <p><b>Nearest Area:</b> ${result.nearest_area[0].areaName[0].value}</p>
        <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
        <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
        <p><b>Currently:</b> Feels Like ${result.current_condition[0].FeelsLikeF}°F</p>`;

        //check if the highest result is at least 50
        if (highestChance.chance >= 50) {
            //prepend the picture
            searchResult.prepend(pic);
        }
        
        //attach the weather chance div
        searchResult.append(weatherDiv);
    }

    // //create 3 articles with today, tomorrow, and day after tomorrow results

    //create the articles
    const today = document.createElement("article");
    const tomorrow = document.createElement("article");
    const dayAfter = document.createElement("article");

    //put the data for those days into the articles
    today.innerHTML = `<h2>Today</h2>
    <p><b>Average Temperature:</b> ${result.weather[0].avgtempF}°F</p>
    <p><b>Max Temperature:</b> ${result.weather[0].maxtempF}°F</p>
    <p><b>Min Temperature:</b> ${result.weather[0].mintempF}°F</p>`

    tomorrow.innerHTML = `<h2>Tomorrow</h2>
    <p><b>Average Temperature:</b> ${result.weather[1].avgtempF}°F</p>
    <p><b>Max Temperature:</b> ${result.weather[1].maxtempF}°F</p>
    <p><b>Min Temperature:</b> ${result.weather[1].mintempF}°F</p>`

    dayAfter.innerHTML = `<h2>Day After Tomorrow</h2>
    <p><b>Average Temperature:</b> ${result.weather[2].avgtempF}°F</p>
    <p><b>Max Temperature:</b> ${result.weather[2].maxtempF}°F</p>
    <p><b>Min Temperature:</b> ${result.weather[2].mintempF}°F</p>`

    //empty the upcoming aside tag
    upcoming.innerHTML = "";

    //append the articles to the upcoming class aside element
    upcoming.append(today, tomorrow, dayAfter);
}



//get the searches list element
const searchedList = document.querySelector(".searches");

//get the article element for the main results
const searchResult = document.querySelector(".search-result");

//get the aside element for the results of today, tomorrow, and the day after tomorrow
const upcoming = document.querySelector(".upcoming")

//create an image
const pic = document.createElement("img");

//create an empty div
const weatherDiv = document.createElement("div");



//get the form and add the submit event listener
document.querySelector("form").addEventListener("submit", (event) => {
    //stop the page from refreshing
    event.preventDefault();

    //////!!Messes up the imperfect search test!!
    //assign the search to a variable and capitalize the first letter
    // let searchLocation = event.target.location.value[0].toUpperCase() + event.target.location.value.substring(1).toLowerCase();
    let searchLocation = event.target.location.value;

    //clear the search box
    event.target.location.value = "";

    //the link for the searches in json
    fetch(`https://wttr.in/${searchLocation}?format=j1`)

        .then((res) => {
            //log a success message
            console.log("Fetch was successful")
            //convert from json
            return res.json();
        })

        .then((result) => {

            //call the wather function
            weatherFunc(searchLocation, result)

            // //place the link to the search in previous section

            //delete the p tag 
            if (document.querySelector(".searches p")) {
                document.querySelector(".searches p").remove();
            }
            
            //create a new list item if an item with the same name isnt already there
            if (!searchedList.textContent.includes(searchLocation)) {
                const prevSearch = document.createElement("li");

                //put the link in the new list item, along with the feels like temperature
                prevSearch.innerHTML = (`<a  class="recent">${searchLocation}</a> - ${result.current_condition[0].FeelsLikeF}°F`);

                //put at the end of the searches list
                searchedList.append(prevSearch);

                //get the recent class link
                const recent = document.querySelector(".recent")

                //give the recent link a click event
                recent.addEventListener("click", () => {

                    ////Make the link show the results
                    fetch(`https://wttr.in/${recent.textContent}?format=j1`)

                        .then((res) => {
                            //log a success message
                            console.log("Fetch was successful")
                            //convert from json
                            return res.json();
                        })

                        .then((result) => {

                            //call the weather function
                            weatherFunc(searchLocation,result);
                        })
                })

                //remove the recent class links class
                recent.classList.toggle("recent")

            }
        })
})