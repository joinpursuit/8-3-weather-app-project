let myWeather = null
const strong = document.querySelectorAll("strong")
const article = document.querySelectorAll("article")
const main = document.querySelector("main")
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(`https://wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")
    fetch(`https://wttr.in/${event.target.location.value}?format=j1`).then(result => {
        console.log("Fetch was successful")
        return result.json()
        
    }).then(weather => {
        document.querySelector("input").value = ""
        console.log(weather, "here")
        const mainArticle = document.getElementById("main_article")
        mainArticle.remove()
        const newArticle = document.createElement("article")
        newArticle.setAttribute("id", "main_article")
        main.prepend(newArticle)
        const h2 = document.createElement("h2")
        h2.textContent = weather.nearest_area[0].areaName[0].value
        console.log(strong)
        const p1 = document.createElement("p")
        const p2 = document.createElement("p")
        const p3 = document.createElement("p")
        const p4 = document.createElement("p")
        p1.textContent = `Area: ${weather.nearest_area[0].areaName[0].value}`
        p2.textContent = `Region: ${weather.nearest_area[0].region[0].value}`
        p3.textContent = `Country: ${weather.nearest_area[0].country[0].value}`
        p4.textContent = `Currently: Feels like ${weather.current_condition[0].FeelsLikeF}°F`
        
        newArticle.append(h2, p1, p2, p3, p4)
       
    })

    
});