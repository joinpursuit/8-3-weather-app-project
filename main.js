/*
From Jose C.
  const article = document.querySelectorAll("article")
  const ul=document.createElement("ul")

  From Paola
  const locationInput = document.querySelector("input")

  From Evan
  let city = event.target.location.value; 
*/

/* 
Pressing the submit button will do the following things.
1) fetch code from the API
2) JSON translates the code
3) use the code to create an expanded main box that lists the user-chosen location, as well as information about that area.
4) Un-hide the temperature conversion area

*/

document.querySelector("form").addEventListener("submit",(event) => {
    // Select the form instead of the so that it doesn't stop on every letter that the user inputs.

    // In order to see what is going on, prevent the default action. 
    event.preventDefault()

    //use console log here so if our code breaks, we can keep track of where it broke.
    console.log(`https://wttr.in/${event.target.location.value}?format=j1`, "Hello from the other side")

//Tell the program to go get the result.

fetch(`https://wttr.in/${event.target.location.value}?format=j1`)

// Then take the result and do something with it. 
.then (result => {

// Console log here so if the code breaks, we know where.
    console.log("Fetch was successful")

 //this returns the result, translated to JSON
    return result.json() })

    //But wait! There's more! Create "weather" function.
.then(weather =>{

  // Console log here so if the code breaks, we know where but also so we can look at the json without going to the source URL  
    console.log(weather);

//creating elements to use later
    const strong = document.createElement("strong")
    const nearest = document.createElement("nearest")

//creating lines for the main part of the app
    const ul = document.createElement("ul")
    ul.textContent=`Currently:`
    ul.after(`Feels Like ${weather.current_condition[0].FeelsLikeC}*C`)


//create a variable for the article, which I have already given the class "chosen" 
    
    const mainArticle = document.querySelector("article.chosen");
    console.log("This is mainArticle", mainArticle)
    mainArticle.textContent


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

    //adding the nearest Region to the chosen location

    const bigLocationRegion = document.createElement ("p");
    bigLocationRegion.innerText = `Region: ${weather.nearest_area[0].region[0].value}`;
    mainArticle.append(bigLocationRegion);
    console.log("This is bigLocationRegion", bigLocationRegion);


    //adding the Country in which the chosen location is located

    const bigLocationCountry = document.createElement ("p");
    bigLocationCountry.innerText = `Country: ${weather.nearest_area[0].country[0].value}`;
    mainArticle.append(bigLocationCountry);
    console.log("This is bigLocationCountry", bigLocationCountry);

//should I be using textContent instead of innerText?

    const bigLocationFeelsLike = document.createElement("p");
    bigLocationFeelsLike.innerText = `Feels like: ${weather.current_condition[0].FeelsLikeC}°C`;
    mainArticle.append(bigLocationFeelsLike);
    console.log("This is bigLocationFeelsLike", bigLocationFeelsLike);




    //Make variables for all of the temps for the grid on the bottom.

    const threeInOne = document.querySelectorAll(".threeInOne");
    threeInOne.textContent
    console.log("Three in one reporting for duty", threeInOne);
  


    const bottom = document.createElement("ul");
    bottom.classList.add("last")
    bottom.innerText = `Today\nAverage Temperature: ${weather.weather[0].avgtempC}°C\nMaximum Temperature: ${weather.weather[0].maxtempC}°C\nMinimum Temperature: ${weather.weather[0].mintempC}`;
    console.log("Is this appending",bottom);
    threeInOne[0].append(bottom);


    const tomorrow = document.createElement("ul");
    tomorrow.classList.add("last")
    tomorrow.innerText = `Tomorrow\nAverage Temperature: ${weather.weather[1].avgtempC}°C\nMaximum Temperature: ${weather.weather[1].maxtempC}°C\nMinimum Temperature: ${weather.weather[1].mintempC}`;
    console.log("Is this appending",tomorrow);
    threeInOne[1].append(tomorrow);


    const assate = document.createElement("ul");
    assate.classList.add("last")
    assate.innerText = `Tomorrow\nAverage Temperature: ${weather.weather[2].avgtempC}°C\nMaximum Temperature: ${weather.weather[2].maxtempC}°C\nMinimum Temperature: ${weather.weather[2].mintempC}`;
    console.log("Is this appending",assate);
    threeInOne[2].append(assate);



    // const p = document.createElement('p');
    // p.classList.add("bottom");
    // let text = document.createTextNode("TEST");
    // p.appendChild(text);
    // document.mainArticle.append(p);


})    
});

/* still need to
add event listener/s
get the previous searches in the  aside
make the toeday/tomorrow/day after tomorrow work
fix the temperatire conversion part
*/


// juan via MaxW
// const mainArticle = document.getElementById("main_article")
// mainArticle.remove()
// const newArticle = document.createElement("article")
// newArticle.setAttribute("id", "xxxxx")


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

//I am taking out the next line for now but not sure where I got it so i may need it later.
// let current =document.getElementById('current').remove()

  //Harold suggested doing this without the "magic numbers"
// function tempConversion (type, temp) {
//     if (type === CELCIUS) {
//         return ((temp - sc.DEGREE_DIFFERENCE) * sc.FAHRENHEIT_TO_CELSIUS_RATIO).toFixed(2); 
//     } else if (type === sc.FAHRENHEIT) {
//         return (temp *   sc.CELCIUS_TO_FAHRENHEIT_RATIO)+sc.DEGREE_DIFFERENCE; }}

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


DID NOT USE:
    // const chosen=document.querySelector(".chosen")
    // chosen.textContent=`Currently:`
    // chosen.after(`Feels Like ${weather.current_condition[0].FeelsLikeC}*C`);
    // console.log("This is chosen", chosen)

I added a display none item to the conversion aside, so I will have to unhide that when someone submits.
*/