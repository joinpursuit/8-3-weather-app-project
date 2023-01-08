// const article = document.querySelectorAll("article")
// const ul=document.createElement("ul")
// //from Jose C (lines 1 and 2)

// const locationInput = document.querySelector("input") //from Paola
// let city = event.target.location.value; //from Evan

document.querySelector("form").addEventListener("submit",(event) => {
    // The reason that we say form instead of input is so that it doesn't stop on every letter that the user inputs.
    // In order to see what is going on, prevent the default action. 
    event.preventDefault()

    //use console log here so if our code breaks
    console.log(`https://wttr.in/${event.target.location.value}?format=j1`, "Hello from the other side")

fetch(`https://wttr.in/${event.target.location.value}?format=j1`).then
// Then we take the result and do something with it. 
// We have included the console log instruction so we can look at it as a developer when we want to to make sure that the fetch was succesful.
//the result wiill do the following
(result => {
    console.log("Fetch was successful")
    return result.json()  //this returns the translated result (to JSON)
}).then(weather =>{
    console.log(weather)
    const ul=document.querySelector("ul")
    ul.textContent=`Currently:`
    ul.after(`Feels Like ${weather.current_condition[0].FeelsLikeC}*C`)
    const mainArticle = document.querySelector(".chosen")
    const bigLocation = document.createElement("h1")
    bigLocation.innerText = `${event.target.location.value}`
    mainArticle.append(bigLocation)

    /* do each thing one by one before appending.

    const bigLocationArea = document.querySelector
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