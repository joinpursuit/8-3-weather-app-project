const article = document.querySelectorAll("article")
const ul=document.createElement("ul")
//from Jose C (lines 1 and 2)

const locationInput = document.querySelector("input") //from Paola

document.querySelector("form").addEventListener("submit",(event) => {
    event.preventDefault()
    console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "Hello from the other side")

fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`).then(result => {
    console.log("Fetch was successful")
    return result.json()
}).then(weather =>{
    console.log(weather)
    ul.textContent=`Currently:`
    ul.after(`Feels Like ${weather.current_condition[0].FeelsLikeC}*C`)
    
    const mainArticle = document.querySelector(".chosen")
    const bigLocation = document.createElement("h1")
    bigLocation.innerText = `${event.target.location.value}`
    mainArticle.append(bigLocation)

    // ul.textContent = `Feels Like ${weather.current_condition[0].FeelsLikeC}*C`
    // article[0].append(ul)
    })
});




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