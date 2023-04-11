

    // extract element from the DOM and store in a variable
const weatherForm = document.querySelector("weather_form");
console.log(weatherForm)



document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault()
    //use console log here so if our code breaks, we can keep track of where it broke.
    console.log(`https://wttr.in/${event.target.location.value}?format=j1`, "Hello from the other side")

fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
 
.then (result => {
    console.log("Fetch was successful")
    return result.json() })
.then(weather =>{
    console.log(weather);

    //creating lines for the main part of the app
    const ul = document.createElement("ul")
    ul.textContent=`Currently:`
    ul.after(`Feels Like ${weather.current_condition[0].FeelsLikeC}*C`)


    const mainSection = document.querySelector("section.main")


//create a variable for the article, which I have already given the class "chosen" 
    
    const oldArticle = document.querySelector("article.chosen");
    console.log("This is oldArticle", oldArticle);
    // oldArticle.textContent

//delete the oldArticle (before it is even seen one time). Hat tip Juan Feliz.
    oldArticle.remove();

//replace old article with newArticle
    const mainArticle=document.createElement("article");
    mainArticle.classList.add("chosen");
    mainSection.append(mainArticle);


//make a variable for the chosen location and assign it to an H1 header (which also makes it bold)

    const bigLocation = document.createElement("h1");
    bigLocation.innerText = `${event.target.location.value}`
    mainArticle.append(bigLocation);
    console.log("This is bigLocation", bigLocation)


//adding the nearest area to the chosen location
  
    const bigLocationArea = document.createElement("p");
    bigLocationArea.innerText = `Area: ${weather.nearest_area[0].areaName[0].value}`;
    mainArticle.append(bigLocationArea);
    console.log("This is bigLocationArea", bigLocationArea)

//adding the nearest Region, the Country, and the Feels Like to the chosen location

    const bigLocationRegion = document.createElement ("p");
    bigLocationRegion.innerText = `Region: ${weather.nearest_area[0].region[0].value}`;
    mainArticle.append(bigLocationRegion);
    console.log("This is bigLocationRegion", bigLocationRegion);

    const bigLocationCountry = document.createElement ("p");
    bigLocationCountry.innerText = `Country: ${weather.nearest_area[0].country[0].value}`;
    mainArticle.append(bigLocationCountry);
    console.log("This is bigLocationCountry", bigLocationCountry);

    const bigLocationFeelsLike = document.createElement("p");
    bigLocationFeelsLike.innerText = `Feels like: ${weather.current_condition[0].FeelsLikeC}°C`;
    mainArticle.append(bigLocationFeelsLike);
    console.log("This is bigLocationFeelsLike", bigLocationFeelsLike);




    //Make variables for all of the temps for the grid on the bottom.

    const threeInOne = document.querySelectorAll(".threeInOne");
    threeInOne.textContent
    console.log("Three in one reporting for duty", threeInOne);
  

    // const today2 = document.createElement("ul");
    // 

    
    const today = document.querySelector("#today ul")
    console.log("today?", today)
    today.remove();
    const newToday = document.createElement("ul");
    newToday.classList.add("last");
    newToday.innerText = `Today\nAverage Temperature: ${weather.weather[0].avgtempC}°C\nMaximum Temperature: ${weather.weather[0].maxtempC}°C\nMinimum Temperature: ${weather.weather[0].mintempC}°C`;
    console.log("Is this appending",newToday);
    document.getElementById("today").append(newToday);


    const oldTomorrow = document.querySelector("#tomorrow ul");
    console.log("oldTomorrow?", oldTomorrow);
    oldTomorrow.remove()
    const tomorrow = document.createElement("ul");
    tomorrow.classList.add("last");
    tomorrow.innerText = `Tomorrow\nAverage Temperature: ${weather.weather[1].avgtempC}°C\nMaximum Temperature: ${weather.weather[1].maxtempC}°C\nMinimum Temperature: ${weather.weather[1].mintempC}°C`;
    console.log("Tomorrow",tomorrow);
    document.getElementById("tomorrow").append(tomorrow);

    const originalAsatte = document.querySelector("#asatte ul")
    originalAsatte.remove() 
    const asatte = document.createElement("ul")
    asatte.innerText = `The Day After Tomorrow\nAverage Temperature: ${weather.weather[2].avgtempC}°C\nMaximum Temperature: ${weather.weather[2].maxtempC}°C\nMinimum Temperature: ${weather.weather[2].mintempC}°C`;
    console.log("Asatte",asatte);
    document.getElementById("asatte").append(asatte);



    // const p = document.createElement('p');
    // p.classList.add("today");
    // let text = document.createTextNode("TEST");
    // p.appendChild(text);
    // document.mainArticle.append(p);


})    
});


//this function should take the user inputted chosen location and add it here. It should be clickable so that it would then become the next input. There should also be temperature next to it.
function previousLocation (locationName, weather) {
    const ul = document.querySelector("ul");
    const li = document.querySelector("li");
    if(document.getElementById(`previous_searches`))document.getElementById(`previous_searches`).remove();
        li.innerHTML=`<a href="#">${location}</a>d`
}




/* When the input field receives input, convert the value from fahrenheit to celsius */

function temperatureConverterFarCel(valNum) {
    valNum = parseFloat(valNum);
    document.getElementById("outputCelsius").innerHTML = (valNum-32) / 1.8;
  }

  function temperatureConverterCelFar(valNum) {
    valNum = parseFloat(valNum);
    document.getElementById("outputFahrenheit").innerHTML=(valNum*1.8)+32;
  }
const displayWeather=data => {
}



/* in class:
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(event, "Hello from the other side")
    console.log(event.target, "Hello from there")
    console.log(event.target.location, "hello")
    console.log(event.target.location.value, "Hi from other side")
    fetch().then(result => {
        console.log("Fetch was successful")
        return result.json()
    }).then(weather => {
        console.log(weather, "Finally properly formatted weather")
    })
})


I added a display none item to the conversion aside, so I will have to unhide that when someone submits.
*/