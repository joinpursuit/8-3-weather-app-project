// submit should clear the field.
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(`https://wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")
    // changed v3.wttr.in to wttr.in
    fetch(`https://wttr.in/${event.target.location.value}?format=j1`).
        then(result => {
            console.log("Fetch was successful")
            return result.json()
        }).then(weather => {
            //stores text field data in storage variable, then clears field
            const locationStorage = event.target.location.value;
            event.target.location.value = "";
            console.log(weather, "Finally properly formatted weather");

            //clears field
            const screenLocation = document.querySelector(".main").querySelector("article");
            //setting innerHTML to "" wipes everything in article.
            screenLocation.innerHTML = "";

            //adds weather picture if certain condition met
            const chanceSunshine = weather.weather[0].hourly[0].chanceofsunshine;
            const chanceRain = weather.weather[0].hourly[0].chanceofrain;
            const chanceSnow = weather.weather[0].hourly[0].chanceofsnow;
            //overrides sun with rain, overwrites rain with snow
            const imgWeather = document.createElement("img");
            if (Number(chanceSnow) > 50) {
                imgWeather.src = "assets/icons8-light-snow.gif";
                imgWeather.alt = "snow";
            } else if (Number(chanceRain) > 50) {
                imgWeather.src = "assets/icons8-torrential-rain.gif";
                imgWeather.alt = "rain";
            } else if (Number(chanceSunshine) > 50) {
                imgWeather.src = "assets/icons8-summer.gif";
                imgWeather.alt = "sun";
            }
            screenLocation.appendChild(imgWeather);

            // h2 title main section.
            //For this and other main sections, will have to check if element already exists and remove if true.  Probably use &&, that seems to be common shortcut.  (Works by logical short-circuiting, if element exists (true) then goes to check second condition and removes element.  If element does not exist (false) then does not carry out second condition).  Or, could just wipe and set to blank to begin with.  Heh.
            const locationName = document.createElement("h2");
            locationName.innerText = locationStorage;
            screenLocation.appendChild(locationName);

            // Adds main section area
            const areaDiv = document.createElement("div");
            const nearestArea = weather.nearest_area[0].areaName[0].value;
            let appendAreaText = "";
            if (locationStorage === nearestArea) {
                appendAreaText = `<strong>Area:</strong> ${nearestArea}`;
            } else {
                appendAreaText = `<strong>Nearest Area:</strong> ${nearestArea}`
            }
            areaDiv.innerHTML = appendAreaText;
            screenLocation.appendChild(areaDiv);

            // adds main section region
            const regionDiv = document.createElement("div");
            regionDiv.innerHTML = `<strong>Region:</strong> ${weather.nearest_area[0].region[0].value}`;
            screenLocation.appendChild(regionDiv);

            // adds main section country
            const countryDiv = document.createElement("div");
            countryDiv.innerHTML = `<strong>Country:</strong> ${weather.nearest_area[0].country[0].value}`;
            screenLocation.appendChild(countryDiv);

            // adds main section Currently in Fahrenheit
            const feelsFDiv = document.createElement("div");
            feelsFDiv.innerHTML = `<strong>Currently:</strong> Feels Like ${weather.current_condition[0].FeelsLikeF}°F`;
            screenLocation.appendChild(feelsFDiv);

            //adds main section Chance of Sunshine
            const divChanceSunshine = document.createElement("div");
            divChanceSunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceSunshine}`;
            screenLocation.appendChild(divChanceSunshine);

            //adds main section Chance of Rain
            const divChanceRain = document.createElement("div");
            divChanceRain.innerHTML = `<strong>Chance of Rain:</strong> ${chanceRain}`;
            screenLocation.appendChild(divChanceRain);

            //adds main section Chance of Snow
            const divChanceSnow = document.createElement("div");
            divChanceSnow.innerHTML = `<strong>Chance of Snow:</strong> ${chanceSnow}`;
            screenLocation.appendChild(divChanceSnow);

            //setup to later add three sub-sections with today/tomorrow/day after tomorrow weather

            const mainArticles = document.querySelectorAll(".main aside article");

            mainArticles.forEach(mainArticle => mainArticle.innerHTML = "")

            const avgTemp = `<strong>Average Temperature:</strong>`;
            const maxTemp = `<strong>Max Temperature:</strong>`;
            const minTemp = `<strong>Min Temperature:</strong>`;

            //today sub-section
            const maZeroToday = document.createElement("h3");
            maZeroToday.innerText = "Today";
            const maZeroTodayAvgTemp = document.createElement("div");
            maZeroTodayAvgTemp.innerHTML = `${avgTemp} ${weather.weather[0].avgtempF}°F`;
            const maZeroTodayMaxTemp = document.createElement("div");
            maZeroTodayMaxTemp.innerHTML = `${maxTemp} ${weather.weather[0].maxtempF}°F`;
            const maZeroTodayMinTemp = document.createElement("div");
            maZeroTodayMinTemp.innerHTML = `${minTemp} ${weather.weather[0].mintempF}°F`;
            mainArticles[0].appendChild(maZeroToday);
            mainArticles[0].appendChild(maZeroTodayAvgTemp);
            mainArticles[0].appendChild(maZeroTodayMaxTemp);
            mainArticles[0].appendChild(maZeroTodayMinTemp);

            //tomorrow sub-section
            const maOneTomorrow = document.createElement("h3");
            maOneTomorrow.innerText = "Tomorrow";
            const maOneTomorrowAvgTemp = document.createElement("div");
            maOneTomorrowAvgTemp.innerHTML = `${avgTemp} ${weather.weather[1].avgtempF}°F`;
            const maOneTomorrowMaxTemp = document.createElement("div");
            maOneTomorrowMaxTemp.innerHTML = `${maxTemp} ${weather.weather[1].maxtempF}°F`;
            const maOneTomorrowMinTemp = document.createElement("div");
            maOneTomorrowMinTemp.innerHTML = `${minTemp} ${weather.weather[1].mintempF}°F`;
            mainArticles[1].appendChild(maOneTomorrow);
            mainArticles[1].appendChild(maOneTomorrowAvgTemp);
            mainArticles[1].appendChild(maOneTomorrowMaxTemp);
            mainArticles[1].appendChild(maOneTomorrowMinTemp);

            //day after tomorrow sub-section
            const maTwoDAT = document.createElement("h3");
            maTwoDAT.innerText = "Day After Tomorrow";
            const maTwoDATAvgTemp = document.createElement("div");
            maTwoDATAvgTemp.innerHTML = `${avgTemp} ${weather.weather[2].avgtempF}°F`;
            const maTwoDATMaxTemp = document.createElement("div");
            maTwoDATMaxTemp.innerHTML = `${maxTemp} ${weather.weather[2].maxtempF}°F`;
            const maTwoDATMinTemp = document.createElement("div");
            maTwoDATMinTemp.innerHTML = `${minTemp} ${weather.weather[2].mintempF}°F`;
            mainArticles[2].appendChild(maTwoDAT);
            mainArticles[2].appendChild(maTwoDATAvgTemp);
            mainArticles[2].appendChild(maTwoDATMaxTemp);
            mainArticles[2].appendChild(maTwoDATMinTemp);

            // //Changes Previous Searches section.
            // //Original implementation not accepted by test suite
            // //Change to include "a" element.
            // const delP = document.querySelector(".previous section ul p");
            // const ulHolder = document.querySelector(".previous section ul");
            // delP && ulHolder.removeChild(delP);
            // const liNew = document.createElement("li");
            // const spFakeLink = document.createElement("span");
            // spFakeLink.classList.add("fakeLink");
            // const spRemain = document.createElement("span");;
            // spFakeLink.innerText = locationStorage;
            // spFakeLink.addEventListener('click', (event) => {
            //    document.querySelector("main").innerHTML = event.target.parentElement.querySelector("div").innerHTML;
            // });
            // spRemain.innerText = ` - ${weather.current_condition[0].FeelsLikeF}°F`;
            // liNew.appendChild(spFakeLink);
            // liNew.appendChild(spRemain);

            // const dataStorage = document.createElement("div");
            // dataStorage.innerHTML = document.querySelector("main").innerHTML;
            // dataStorage.id = "fakeMain"; // I think I took this part out
            // dataStorage.hidden = "true";
            // liNew.appendChild(dataStorage);
            // ulHolder.appendChild(liNew);

            // //Changes Previous Searches section, second implementation.
            // const delP = document.querySelector(".previous section ul p");
            // const ulHolder = document.querySelector(".previous section ul");
            // delP && ulHolder.removeChild(delP);
            // const secondTry = document.querySelector(".previous section ul");
            // const aLIitem = document.createElement("li");
            // const a = document.createElement("a");
            // a.innerText = `${locationStorage} - ${weather.current_condition[0].FeelsLikeF}°F`;
            // a.addEventListener('click', (event) => {
            //     // console.log("Stored Value: ", event.target.parentElement.querySelector("div").querySelector("h2").innerText);
            //     // console.log("Current Value: ", document.querySelector("main h2").innerText);
            //     if (event.target.parentElement.querySelector("div").querySelector("h2").innerText !== document.querySelector("main h2").innerText) {
            //         document.querySelector("main").innerHTML = event.target.parentElement.querySelector("div").innerHTML;
            //     }
            // });

            //Changes Previous Searches section, third implementation.  Test doesn't like hidden values.
            const delP = document.querySelector(".previous section ul p");
            const ulHolder = document.querySelector(".previous section ul");
            delP && ulHolder.removeChild(delP);
            const secondTry = document.querySelector(".previous section ul");
            const aLIitem = document.createElement("li");
            const a = document.createElement("a");
            a.innerText = `${locationStorage} - ${weather.current_condition[0].FeelsLikeF}°F`;
            aLIitem.appendChild(a);
            secondTry.appendChild(aLIitem);
            a.addEventListener('click', (event) => {
                // console.log("Stored Selection ", event.target.innerText);
                // console.log("Main Selection ", document.querySelector("main h2").innerText);

                if (event.target.innerText !== document.querySelector("main h2").innerText) {
                    //Following is copy of previous code.  Inelegant, but eh.  Wherever reference to event.target.location.value, which is what the value in the text field was, now have event.target.parentElement.querySelector("div").querySelector("h2").innerText.  Other changes as appropriate.
                    {
                        event.preventDefault()
                        console.log(`https://wttr.in/${event.target.innerText}?format=j1`, "HELLO FROM THE OTHER SIDE")
                        // changed v3.wttr.in to wttr.in
                        fetch(`https://wttr.in/${event.target.innerText}?format=j1`).
                            then(result => {
                                console.log("Fetch was successful")
                                return result.json()
                            }).then(weather => {
                                //stores text field data in storage variable, then clears field
                                const locationStorage = event.target.innerText;
                                // event.target.location.value = "";
                                console.log(weather, "Finally properly formatted weather");
                    
                                //clears field
                                const screenLocation = document.querySelector(".main").querySelector("article");
                                //setting innerHTML to "" wipes everything in article.
                                screenLocation.innerHTML = "";
                    
                                //adds weather picture if certain condition met
                                const chanceSunshine = weather.weather[0].hourly[0].chanceofsunshine;
                                const chanceRain = weather.weather[0].hourly[0].chanceofrain;
                                const chanceSnow = weather.weather[0].hourly[0].chanceofsnow;
                                //overrides sun with rain, overwrites rain with snow
                                const imgWeather = document.createElement("img");
                                if (Number(chanceSnow) > 50) {
                                    imgWeather.src = "assets/icons8-light-snow.gif";
                                    imgWeather.alt = "snow";
                                } else if (Number(chanceRain) > 50) {
                                    imgWeather.src = "assets/icons8-torrential-rain.gif";
                                    imgWeather.alt = "rain";
                                } else if (Number(chanceSunshine) > 50) {
                                    imgWeather.src = "assets/icons8-summer.gif";
                                    imgWeather.alt = "sun";
                                }
                                screenLocation.appendChild(imgWeather);
                    
                                // h2 title main section.
                                //For this and other main sections, will have to check if element already exists and remove if true.  Probably use &&, that seems to be common shortcut.  (Works by logical short-circuiting, if element exists (true) then goes to check second condition and removes element.  If element does not exist (false) then does not carry out second condition).  Or, could just wipe and set to blank to begin with.  Heh.
                                const locationName = document.createElement("h2");
                                locationName.innerText = locationStorage;
                                screenLocation.appendChild(locationName);
                    
                                // Adds main section area
                                const areaDiv = document.createElement("div");
                                const nearestArea = weather.nearest_area[0].areaName[0].value;
                                let appendAreaText = "";
                                if (locationStorage === nearestArea) {
                                    appendAreaText = `<strong>Area:</strong> ${nearestArea}`;
                                } else {
                                    appendAreaText = `<strong>Nearest Area:</strong> ${nearestArea}`
                                }
                                areaDiv.innerHTML = appendAreaText;
                                screenLocation.appendChild(areaDiv);
                    
                                // adds main section region
                                const regionDiv = document.createElement("div");
                                regionDiv.innerHTML = `<strong>Region:</strong> ${weather.nearest_area[0].region[0].value}`;
                                screenLocation.appendChild(regionDiv);
                    
                                // adds main section country
                                const countryDiv = document.createElement("div");
                                countryDiv.innerHTML = `<strong>Country:</strong> ${weather.nearest_area[0].country[0].value}`;
                                screenLocation.appendChild(countryDiv);
                    
                                // adds main section Currently in Fahrenheit
                                const feelsFDiv = document.createElement("div");
                                feelsFDiv.innerHTML = `<strong>Currently:</strong> Feels Like ${weather.current_condition[0].FeelsLikeF}°F`;
                                screenLocation.appendChild(feelsFDiv);
                    
                                //adds main section Chance of Sunshine
                                const divChanceSunshine = document.createElement("div");
                                divChanceSunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceSunshine}`;
                                screenLocation.appendChild(divChanceSunshine);
                    
                                //adds main section Chance of Rain
                                const divChanceRain = document.createElement("div");
                                divChanceRain.innerHTML = `<strong>Chance of Rain:</strong> ${chanceRain}`;
                                screenLocation.appendChild(divChanceRain);
                    
                                //adds main section Chance of Snow
                                const divChanceSnow = document.createElement("div");
                                divChanceSnow.innerHTML = `<strong>Chance of Snow:</strong> ${chanceSnow}`;
                                screenLocation.appendChild(divChanceSnow);
                    
                                //setup to later add three sub-sections with today/tomorrow/day after tomorrow weather
                    
                                const mainArticles = document.querySelectorAll(".main aside article");
                    
                                mainArticles.forEach(mainArticle => mainArticle.innerHTML = "")
                    
                                const avgTemp = `<strong>Average Temperature:</strong>`;
                                const maxTemp = `<strong>Max Temperature:</strong>`;
                                const minTemp = `<strong>Min Temperature:</strong>`;
                    
                                //today sub-section
                                const maZeroToday = document.createElement("h3");
                                maZeroToday.innerText = "Today";
                                const maZeroTodayAvgTemp = document.createElement("div");
                                maZeroTodayAvgTemp.innerHTML = `${avgTemp} ${weather.weather[0].avgtempF}°F`;
                                const maZeroTodayMaxTemp = document.createElement("div");
                                maZeroTodayMaxTemp.innerHTML = `${maxTemp} ${weather.weather[0].maxtempF}°F`;
                                const maZeroTodayMinTemp = document.createElement("div");
                                maZeroTodayMinTemp.innerHTML = `${minTemp} ${weather.weather[0].mintempF}°F`;
                                mainArticles[0].appendChild(maZeroToday);
                                mainArticles[0].appendChild(maZeroTodayAvgTemp);
                                mainArticles[0].appendChild(maZeroTodayMaxTemp);
                                mainArticles[0].appendChild(maZeroTodayMinTemp);
                    
                                //tomorrow sub-section
                                const maOneTomorrow = document.createElement("h3");
                                maOneTomorrow.innerText = "Tomorrow";
                                const maOneTomorrowAvgTemp = document.createElement("div");
                                maOneTomorrowAvgTemp.innerHTML = `${avgTemp} ${weather.weather[1].avgtempF}°F`;
                                const maOneTomorrowMaxTemp = document.createElement("div");
                                maOneTomorrowMaxTemp.innerHTML = `${maxTemp} ${weather.weather[1].maxtempF}°F`;
                                const maOneTomorrowMinTemp = document.createElement("div");
                                maOneTomorrowMinTemp.innerHTML = `${minTemp} ${weather.weather[1].mintempF}°F`;
                                mainArticles[1].appendChild(maOneTomorrow);
                                mainArticles[1].appendChild(maOneTomorrowAvgTemp);
                                mainArticles[1].appendChild(maOneTomorrowMaxTemp);
                                mainArticles[1].appendChild(maOneTomorrowMinTemp);
                    
                                //day after tomorrow sub-section
                                const maTwoDAT = document.createElement("h3");
                                maTwoDAT.innerText = "Day After Tomorrow";
                                const maTwoDATAvgTemp = document.createElement("div");
                                maTwoDATAvgTemp.innerHTML = `${avgTemp} ${weather.weather[2].avgtempF}°F`;
                                const maTwoDATMaxTemp = document.createElement("div");
                                maTwoDATMaxTemp.innerHTML = `${maxTemp} ${weather.weather[2].maxtempF}°F`;
                                const maTwoDATMinTemp = document.createElement("div");
                                maTwoDATMinTemp.innerHTML = `${minTemp} ${weather.weather[2].mintempF}°F`;
                                mainArticles[2].appendChild(maTwoDAT);
                                mainArticles[2].appendChild(maTwoDATAvgTemp);
                                mainArticles[2].appendChild(maTwoDATMaxTemp);
                                mainArticles[2].appendChild(maTwoDATMinTemp);
                })}
// close if curly bracket immediately below.  Above, }) closing off .then, and } closing off (event) {
                }
            });

            // Below is old code from previous solution.
            // const dataStorage = document.createElement("div");
            // dataStorage.innerHTML = document.querySelector("main").innerHTML;
            // dataStorage.id = "fakeMain";
            // dataStorage.hidden = "true";

        })
});

