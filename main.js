// const article = document.querySelectorAll("article")
// const ul=document.createElement("ul")
// //from Jose C (lines 1 and 2)

// const locationInput = document.querySelector("input") //from Paola
// let city = event.target.location.value; //from Evan


document.querySelector("form").addEventListener("submit",(event) => {
    // The reason that we say form instead of input is so that it doesn't stop on every letter that the user inputs.
    // In order to see what is going on, prevent the default action. 
    event.preventDefault()

    //use console log here so if our code breaks, we can keep track of where it broke.
    console.log(`https://wttr.in/${event.target.location.value}?format=j1`, "Hello from the other side")

//Tell the program to go get the result.

fetch(`https://wttr.in/${event.target.location.value}?format=j1`).then

// Then take the result and do something with it. 

//the result wiill do the following
(result => {

// Console log here so if the code breaks, we know where.
    console.log("Fetch was successful")

 //this returns the result, translated to JSON
    return result.json() 

    //But wait! There's more!
}).then(weather =>{

  // Console log here so if the code breaks, we know where but also so we can look at the json without going to the source URL  
    console.log(weather);

    const strong = document.createElement("strong")
    const ul=document.createElement("ul")


//make a variable for the chosen location. I had the article as a class="chosen" but now I think I will create it in its entirety here.
    const chosen=document.querySelector(".chosen")
    chosen.textContent=`Currently:`
    chosen.after(`Feels Like ${weather.current_condition[0].FeelsLikeC}*C`);
    
    const mainArticle = document.querySelector(".chosen");
    
    const bigLocation = document.createElement("h1");
    bigLocation.innerText = `${event.target.location.value}`
    mainArticle.append(bigLocation);

    //adding the nearest area to the chosen location
  
    const bigLocationArea = document.createElement("p");
    bigLocationArea.innerText = `Area: ${weather.nearest_area[0].areaName[0].value}`;
    mainArticle.append(bigLocationArea);

    //adding the nearest Region to the chosen location

    const bigLocationRegion = document.createElement ("p");
    bigLocationRegion.innerText = `Region: ${weather.nearest_area[0].region[0].value}`;
    mainArticle.append(bigLocationRegion);


    //adding the Country in which the chosen location is located

    const bigLocationCountry = document.createElement ("p");
    bigLocationCountry.innerText = `Country: ${weather.nearest_area[0].country[0].value}`;
    mainArticle.append(bigLocationRegion);

    /* do each thing one by one before appending.
    const bigLocationRegion
    const bigLocationCountry
    const bigLocationFeelsLike
*/
    // ul.textContent = `Feels Like ${weather.current_condition[0].FeelsLikeC}*C`
    // article[0].append(ul)
    })
});


/* When the input field receives input, convert the value from fahrenheit to celsius */
function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    document.getElementById("outputCelsius").innerHTML = (valNum-32) / 1.8;
  }

  function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    document.getElementById("outputFahrenheit").innerHTML=(valNum*1.8)+32;
  }



const displayWeather=data => {

}

//I am taking out the next line for now but not sure where I got it so i may need it later.
// let current =document.getElementById('current').remove()



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
*/