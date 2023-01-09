document.querySelector("form").addEventListener("submit", (event) => {

    event.preventDefault()

    console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")

    fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`).then(result => {

        console.log("Fetch was successful")

        return result.json()

    }).then(weather => {

        // we need to return what we right inside submit box
        // event.target would be form we selected & location would be specific text .value would be whats in the text
        let searchLocation = event.target.location.value
        // setting value to empty string / after searching previous search is delted from search bar
         event.target.location.value = ""
        
        // storing article from HTML / Just getting the empty article
         let searchResult = document.querySelector("article") 
        // set to be empty 
        searchResult.innerHTML = ""
        let h2 = document.createElement("h2")
        // h2 tag put search location as text
        h2.textContent = searchLocation
        // attached search to article we've made
        searchResult.append(h2)
        
        // data from Api (AREA NAME )
        let area = weather.nearest_area[0].areaName[0].value
        // creating empty P tag 
        let areaP = document.createElement("p")
        // setting the text content to be equaled data 
            areaP.textContent = `Area: ${area}`
        // attaching P tag to article 
        searchResult.append(areaP)

        //  data from Api (REGION)
        let region =  weather.nearest_area[0].region[0].value

        // Creating empty P tag for Region
        let regionP =document.createElement("p")

        // setting the text content to be equaled data  
        regionP.textContent = `Region: ${region}`
       // attaching P tag to article 
        searchResult.append(regionP)

        //  data from Api (Country)
        let country =  weather.nearest_area[0].country[0].value

        // Creating empty P tag for Country
        let countryP = document.createElement("p")

        // setting the text content to be equaled data  
        countryP.textContent = `Country: ${country}`
       // attaching P tag to article 
        searchResult.append(countryP)

        let feelsLike = weather.current_condition[0].FeelsLikeF

        let feelsLikeP =document.createElement("p")

        feelsLikeP.textContent = `Currently: Feels Like ${feelsLike}°F`

        searchResult.append(feelsLikeP)

        let firstAvg = weather.weather[0].avgtempF

        let firstAvgP = document.createElement("p")

        firstAvgP.textContent = `Average Temperature: ${firstAvg}°F`
        
        //  selecting empty articles in HTML 
        let today = document.querySelector(".today")
        let tomorrow = document.querySelector(".tomorrow")
        let dayaftertomorrow = document.querySelector(".dayaftertomorrow")
       
        // put this HTML in the HTML file
        // _________________________________________________
        today.innerHTML = "<h2> Today </h2>"

        today.append(firstAvgP)
        
        let firstMax = weather.weather[0].maxtempF

        let firstMaxP = document.createElement("p")

        firstMaxP.textContent = `Max Temperature: ${firstMax}°F`

        today.append(firstMaxP)

        let firstMin = weather.weather[0].mintempF

        let firstMinP = document.createElement("p")

        firstMinP.textContent = `Min Temperature: ${firstMin}°F`

        today.append(firstMinP)
// _________________________________________________________
    tomorrow.innerHTML = "<h2> Tomorrow </h2>"

        let secondMax = weather.weather[1].maxtempF

        let secondMaxP = document.createElement("p")

        secondMaxP.textContent = `Max Temperature: ${secondMax}°F`

        tomorrow.append(secondMaxP)

        let secondAvg = weather.weather[1].avgtempF

        let secondAvgP = document.createElement("p")

        secondAvgP.textContent = `Average Temperature: ${secondAvg}°F`

        tomorrow.append(secondAvgP)

        let secondMin = weather.weather[1].mintempF

        let secondMinP = document.createElement("p")

        secondMinP.textContent = `Min Temperature: ${secondMin}°F`

        tomorrow.append(secondMinP)

        // _________________________________________________

        dayaftertomorrow.innerHTML = "<h2> Day After Tomorrow </h2>"

        let thirdMax = weather.weather[2].maxtempF

        let thirdMaxP = document.createElement("p")

        thirdMaxP.textContent = `Max Temperature: ${thirdMax}°F`

        dayaftertomorrow.append(thirdMaxP)

        let thirdAvg = weather.weather[2].avgtempF

        let thirdAvgP = document.createElement("p")

        thirdAvgP.textContent = `Average Temperature: ${thirdAvg}°F`

        dayaftertomorrow.append(thirdAvgP)

        let thirdMin = weather.weather[2].mintempF

        let thirdMinP = document.createElement("p")

        thirdMinP.textContent = `Min Temperature: ${thirdMin}°F`

        dayaftertomorrow.append(thirdMinP)

        








    })

});