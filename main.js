
//get the searches list element
const searchedList = document.querySelector(".searches");

//get the article element for the main results
const searchResult = document.querySelector(".search-result");

//get the aside element for the results of today, tomorrow, and the day after tomorrow
const upcoming = document.querySelector(".upcoming")

//get the form and add the submit event listener
document.querySelector("form").addEventListener("submit", async (event) => {
    //stop the page from refreshing
    event.preventDefault();

    //assign the search to a variable and capitalize the first letter
    let searchLocation = event.target.location.value[0].toUpperCase() + event.target.location.value.substring(1).toLowerCase();

    //clear the search box
    event.target.location.value = "";

    //the link for the searches in json
    await fetch(`https://wttr.in/${searchLocation}?format=j1`)

        .then((res) => {
            //log a success message
            console.log("Fetch was successful")
            //convert from json
            return res.json();
        })

        .then((result) => {

            
            // //place the results in the main .search-result article

            //check if the location matches the area
            if (searchLocation.toLowerCase() === result.nearest_area[0].areaName[0].value.toLowerCase()){

                //change the inner html of the search-result article element to the data
                searchResult.innerHTML = `<h2>${searchLocation}</h2>
                <p><b>Area:</b> ${result.nearest_area[0].areaName[0].value}</p>
                <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
                <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
                <p><b>Currently:</b> Feels Like ${result.current_condition[0].FeelsLikeF}°F</p>`;

            } else {
                //its not the exact area
                //change the inner html of the search-result article element to the data
                searchResult.innerHTML = `<h2>${searchLocation}</h2>
                <p><b>Nearest Area:</b> ${result.nearest_area[0].areaName[0].value}</p>
                <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
                <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
                <p><b>Currently:</b> Feels Like ${result.current_condition[0].FeelsLikeF}°F</p>`;
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


            // //place the link to the search in previous section

            //delete the p tag empty
            document.querySelector(".searches p").remove();

            //create a new list item

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

                            // //place the results in the main .search-result article

                            // //place the results in the main .search-result article

                            //check if the location matches the area
                            if (searchLocation.toLowerCase() === result.nearest_area[0].areaName[0].value.toLowerCase()) {

                                //change the inner html of the search-result article element to the data
                                searchResult.innerHTML = `<h2>${searchLocation}</h2>
                                <p><b>Area:</b> ${result.nearest_area[0].areaName[0].value}</p>
                                <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
                                <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
                                <p><b>Currently:</b> Feels Like ${result.current_condition[0].FeelsLikeF}°F</p>`;

                            } else {
                                //its not the exact area
                                //change the inner html of the search-result article element to the data
                                searchResult.innerHTML = `<h2>${searchLocation}</h2>
                                <p><b>Nearest Area:</b> ${result.nearest_area[0].areaName[0].value}</p>
                                <p><b>Region:</b> ${result.nearest_area[0].region[0].value}</p>
                                <p><b>Country:</b> ${result.nearest_area[0].country[0].value}</p>
                                <p><b>Currently:</b> Feels Like ${result.current_condition[0].FeelsLikeF}°F</p>`;
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
                        })
                })

                //remove the recent class links class
                recent.classList.toggle("recent")
                



            }


        })
})

