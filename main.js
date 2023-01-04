
//get the searches list element
const searchedList = document.querySelector(".searches");

//get the article element for the main results
const searchResult = document.querySelector(".search-result");

//get the aside element for the results of today, tomorrow, and the day after tomorrow
const upcoming = document.querySelector(".upcoming")

console.log(searchResult, searchedList)
//get the form and add the submit event listener
document.querySelector("form").addEventListener("submit",(event) => {
    //stop the page from refreshing
    event.preventDefault();

    //assign the search to a variable and capitalize the first letter
    let searchLocation = event.target.location.value[0].toUpperCase() + event.target.location.value.substring(1);

    //the link for the searches in json
    fetch(`https://wttr.in/${searchLocation}?format=j1`)

    .then((res) => {
        //log a success message
        console.log("Fetch was successful")
        //convert from json
        return res.json();
    })

    .then((result) => {





        // //place the link to the search in previous section

        //make the p tag empty
        document.querySelector(".searches p").textContent = "";
        
        //create a new list item
        const prevSearch = document.createElement("li");

        //put the link in the new list item, along with the feels like temperature
        prevSearch.innerHTML = (`<a class="recent">${searchLocation}</a> - ${result.current_condition[0].FeelsLikeF}°F`);

        //put at the end of the searches list
        searchedList.append(prevSearch);

        //give the recent link a click event




        // //place the results in the main .search-result article

        //change the inner html of the search-result article element to the data
        searchResult.innerHTML = `<h2>${searchLocation}</h2>
        <p><b>Area:</b> ${result.nearest_area[0].areaName[0].value}</p>
        <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
        <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
        <p><b>Currently:</b> Feels Like ${result.current_condition[0].FeelsLikeF}°F</p>`;





        // //create 3 articles with today, tomorrow, and day after tomorrow results

        //create the articles
        const today = document.createElement("article");
        const tomorrow = document.createElement("article");
        const dayAfter = document.createElement("article");

        //put the data for those days into the articles


        //append the articles to the upcoming class aside element
        upcoming.append(today, tomorrow, dayAfter);


    })
})

