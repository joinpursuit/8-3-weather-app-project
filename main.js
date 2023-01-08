const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    //the user's input value. first letter upper case and the rest lower.
    const userInput = event.target.location.value;
    // It was giving Cypress Error if I put it this codes:
    //let userInput = event.target.location.value.toLowerCase();
    //userInput = userInput.charAt(0).toUpperCase() + userInput.slice(1);
   
    //to get the response after the user click on "Get Weather"
    getWeather(userInput);

    //to clear the input area AFTER it's submitted.
    form.reset();
});


//to get the response after the user click on "Get Weather"
function getWeather(userInput) {
    fetch(`https://wttr.in/${userInput}?format=j1`)
    .then((response) => response.json())
    .then(climate => {
        //datas
        const current = climate.current_condition[0]; //"current_condition" object.
        const near = climate.nearest_area[0]; //"nearest_area" object.
        const temp = climate.weather; //"weather" object.

        const area = near.areaName[0].value; //the name of the city
        const region = near.region[0].value; //the name of the region
        const country = near.country[0].value; //the name of the country
        const feelsLikeF = current.FeelsLikeF; //feels like temperature value
        const chanceSunshine = temp[0].hourly[0].chanceofsunshine; //chance of sunshine value
        const chanceRain = temp[0].hourly[0].chanceofrain; //chance of rain value
        const chanceSnow = temp[0].hourly[0].chanceofsnow; //chance of snow value

        //to show the search result information.
        searchResult(userInput, area, region, country, feelsLikeF, chanceSunshine, chanceRain, chanceSnow);
        
        //to show (today, tomorrow, day after tomorrow)'s (average, max, min) temperatures.
        threeDaysWeather(temp);
        
        //to update the "Previous Searches" history each time the result is logged.
        //to "go back" to the weather search with name of the Location clicked under "Previous Searches".
        listOfPreviousSearches(area, feelsLikeF);

        //to convert the temperature to Celcius or to Fahrenheit.
        convertTemperature();
    })
}


//to show the search result information
function searchResult(userInput, area, region, country, feelsLikeF, chanceSunshine, chanceRain, chanceSnow) {
    const todays = document.querySelector(".todays")

    //if the user's input value is different than area data, show as "Nearest Area".
    todays.innerHTML = `
    <img />
    <h2>${userInput}</h2>
    `;
    if (userInput === area) {
        todays.innerHTML += `
        <p><strong>Area:</strong> ${area}</p>
        `;
    } else {
        todays.innerHTML += `
        <p><strong>Nearest Area:</strong> ${area}</p>
        `;
    }
    todays.innerHTML += `
    <p><strong>Region:</strong> ${region}</p>
    <p><strong>Country:</strong> ${country}</p>
    <p><strong>Currently:</strong> Feels Like ${feelsLikeF}°F</p>
    <p><strong>Chance of Sunshine:</strong> ${chanceSunshine}</p>
    <p><strong>Chance of Rain:</strong> ${chanceRain}</p>
    <p><strong>Chance of Snow:</strong> ${chanceSnow}</p>
    `;

    //set the image source and its text based on the chances.
    const img = document.querySelector("img")
    if (chanceSunshine >= 50) {
        img.setAttribute("src", "./assets/icons8-summer.gif");
        img.setAttribute("alt", "sun");
    } else if (chanceRain >= 50){
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        img.setAttribute("alt", "rain");
    } else if (chanceSnow >= 50){
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
        img.setAttribute("alt", "snow");
    }
}


//to show (today, tomorrow, day after tomorrow)'s (average, max, min) temperatures.
function threeDaysWeather(temp) {
    for (let i = 0; i < temp.length; i++) {
        const today = document.querySelector(".today")
        const tomorrow = document.querySelector(".tomorrow")
        const dayAfter = document.querySelector(".dayAfter")

        const daysStr = ["Today", "Tomorrow", "Day After Tomorrow"]
        const daysTag = [today, tomorrow, dayAfter];

        daysTag[i].innerHTML = `
        <h3>${daysStr[i]}</h3>
            <p><strong>Average Temperature:</strong> ${temp[i].avgtempF}°F</p>
            <p><strong>Max Temperature:</strong> ${temp[i].maxtempF}°F</p>
            <p><strong>Min Temperature:</strong> ${temp[i].mintempF}°F</p>
        `;
    }
}


//to update the "Previous Searches" history each time the result is logged.
function listOfPreviousSearches(area, feelsLikeF) {
    //to remove the message "No previous searches.", if there is. It will run only once when there's no list at all.
    const noPrevious = document.querySelector(".previous ul p");
    if (noPrevious) noPrevious.remove(); //noPrevious.setAttribute("style", "display: none");

    //to add a new list every time is submitted under the "Previous Searches".
    const unordered = document.querySelector(".previous ul");

    //Only add the list if it doens't exist in the list already.
    if (!unordered.innerHTML.includes(area)) {
        const list = document.createElement("li");
        list.innerHTML = `
        <a href="#">${area}</a> - ${feelsLikeF}°F
        `;
        unordered.append(list);
    
        //to add an "Event Listener" to the last anchor tag on the list, so every anchor tag can be functional.
        const links = document.querySelectorAll("a");
        links[links.length-1].addEventListener("click", event => {
            event.preventDefault();
    
            //get the name of the location and run it on the function "getWeather".
            const namesOfLocation = list.innerText.split(" ");
            getWeather(namesOfLocation[0]);
        })
    }
}


//convert the temperature to Celcius or to Fahrenheit.
function convertTemperature() {
    const convert = document.querySelector(".convert");
    convert.innerHTML = `
    <form id="convertIt">
        <p>Convert the temperature:</p>
        <input type="number" id="temp-to-convert" placeholder="0" />
        <br>
        <label for="to-c">To Celsius</label>
        <input type="radio" id="to-c" name="convert-temp" value="c" />
        <br>
        <label for="to-f">To Fahrenheit</label>
        <input type="radio" id="to-f" name="convert-temp" value="f" />
        <br>
        <input type="submit" />
        <br>
        <h4 id="converted">0.00</h4>
    </form>
    `
    
    const convertIt = document.querySelector("#convertIt");
    convertIt.addEventListener("submit", (event) => {
        //it wasn't working with "submit", I don't know why. select the form
        event.preventDefault();
        let convertedTemp = 0;
        
        const radioButtons = document.querySelectorAll('input[name="convert-temp"]');
        //OR: const radioButtons = document.getElementsByName("convert-temp");

        //turn the NodeList to an Array, and find the radio element that was checked.
        const checkedRadio = Array.from(radioButtons).find(radio => radio.checked);

        //if no radio was checked, alert the user. if it was, assign the value to the variable.
        if (!checkedRadio) {
            alert("You must select a temperature scale.");
        } else {
            //the number value that user submitted.
            const inputNumber = document.querySelector("#temp-to-convert").value;

            if (checkedRadio.value === "c") {
                convertedTemp = ((inputNumber - 32) * 5/9).toFixed(2);
            } else if (checkedRadio.value === "f") {
                convertedTemp = ((inputNumber * 9/5) + 32).toFixed(2);
            }
        }

        //if the two decimal numbers are zeros, remove it and reassign it to the variable.
        if (convertedTemp.slice(-2) === "00") {
            const zerosRemoved = convertedTemp.split(".");
            convertedTemp = zerosRemoved[0];
        }

        //update the number displayed with the converted temperature nubmer.
        document.querySelector("#converted").textContent = convertedTemp;
    });
}