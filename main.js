document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let inputSearch = document.getElementById("user-input").value;
  // console.log(inputSearch[0].current_condition);

  console.log(inputSearch);
  console.log(
    `https://v3.wttr.in/${inputSearch}?format=j1`,
    "HELLO FROM THE OTHER SIDE"
  );
  fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`)
    .then((result) => {
      console.log("Fetch was successful");
      return result.json();
    })
    .then((weather) => {
      //article for current search
      let current = document.getElementById("current");

      let currentHeading = document.createElement("h2");
      currentHeading.innerHTML = `<b>${weather.nearest_area[0].areaName[0].value}</b>`;

      //area for current search w. html
      let searchArea = document.createElement("p");
      // searchArea with HTML
      searchArea.innerHTML = `<b>Area: </b>${weather.nearest_area[0].areaName[0].value}`;

      //create region element
      let searchRegion = document.createElement("p");
      //region innerHTML
      searchRegion.innerHTML = `<b>Region: </b>${weather.nearest_area[0].region[0].value}`;

      // create country HTML
      let searchCounty = document.createElement("p");
      searchCounty.innerHTML = `<b>Country: </b>${weather.nearest_area[0].country[0].value}`;

      //Create currently & currently inner html
      let searchCurrentF = document.createElement("p");
      searchCurrentF.innerHTML = `<b> Currently: </b> Feels Like ${weather.weather[2].mintempF}° F`;

      //joininga all elements in current article
      current.append(
        currentHeading,
        searchArea,
        searchRegion,
        searchCounty,
        searchCurrentF
      );

      //-----adding CHANCE OF SUN + RAIN + SNOW-----

      //creating chance of sun element + adding text
      let chanceOfSun = document.createElement("p");
      chanceOfSun.innerHTML = `<b> Chance of Sunshine: </b>${weather.weather[0].hourly[0].chanceofsunshine}`;
      console.log(chanceOfSun.innerHTML);
      //creating chance of rain element + adding text
      let chanceOfRain = document.createElement("p");
      chanceOfRain.innerHTML = `<b> Chance of Rain: </b>${weather.weather[0].hourly[0].chanceofrain}`;

      //creating chance of snow element + adding text
      let chanceOfSnow = document.createElement("p");
      chanceOfSnow.innerHTML = `<b> Chance of Snow: </b>${weather.weather[0].hourly[0].chanceofsnow}`;

      //adding all those to first article,
      current.append(chanceOfSun, chanceOfRain, chanceOfSnow);
      //-------Aritcle for Today section ---

      //gets article for today section
      let article = document.getElementById("today");
      //adds an header for "today" + adding text
      let articleHeader = document.createElement("h2");
      articleHeader.innerHTML = `<b> Today </b>`;

      // creating TodayAvgTemp + inner HTML
      let todayAvgTemp = document.createElement("p");
      todayAvgTemp.innerHTML = `<b> Average Temperature: </b> ${weather.weather[0].avgtempF}°F`;

      // creating TodayMaxTemp + inner HTML
      let todayMaxTemp = document.createElement("p");
      todayMaxTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[0].maxtempF}°F`;

      // creating TodayMinTemp + inner HTML
      let todayMinTemp = document.createElement("p");
      todayMinTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[0].mintempF}°F`;

      // joining all lelemnts for today section
      article.append(articleHeader, todayAvgTemp, todayMaxTemp, todayMinTemp);

      //--------------Article for TOMORROW-----------
      //gets article for TOMORROW  section
      let tomorrow = document.getElementById("tomorrow");

      //adds an header for "TOMORROW" + adding text
      let tomorrowHeader = document.createElement("h2");
      tomorrowHeader.innerHTML = `<b>Tomorrow</b>`;

      // creating TomorrowAvgTemp + inner HTML
      let tmmAvgTemp = document.createElement("p");
      tmmAvgTemp.innerHTML = `<b> Average Temperature: </b> ${weather.weather[1].avgtempF}°F`;

      // creating TomorrowMaxTemp + inner HTML
      let tmmMaxTemp = document.createElement("p");
      tmmMaxTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[1].maxtempF}°F`;

      // creating TomorrowMinTemp + inner HTML
      let tmmMinTemp = document.createElement("p");
      tmmMinTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[1].mintempF}°F`;

      // joining all elements into TOMORROW'S article
      tomorrow.append(tomorrowHeader, tmmAvgTemp, tmmMaxTemp, tmmMinTemp);

      //--------------DAY AFTER TOMOROW-----------

      //gets article for TOMORROW  section
      let dayAfter = document.getElementById("day-after");
      //adds an header for "day after" + adding text
      let dayAferHeading = document.createElement("h2");
      dayAferHeading.innerHTML = `<b>Day After Tomorrow</b>`;

      // creating dayAfterAvgTemp + inner HTML
      let dayAfteryAvgTemp = document.createElement("p");
      dayAfteryAvgTemp.innerHTML = `<b> Average Temperature: </b> ${weather.weather[2].avgtempF}°F`;

      // creating dayAfterMaxTemp + inner HTML
      let dayAfterMaxTemp = document.createElement("p");
      dayAfterMaxTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[2].maxtempF}°F`;

      // creating dayAfterMinTemp + inner HTML
      let dayAfterMinTemp = document.createElement("p");
      dayAfterMinTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[2].mintempF}°F`;
      // joining all element into day after article
      dayAfter.append(
        dayAferHeading,
        dayAfteryAvgTemp,
        dayAfterMaxTemp,
        dayAfterMinTemp
      );
      //------Creatung Aside ----
      console.log(weather, "Finally properly formatted weather");
    });
});

// const inputSearch = document.querySelector(input[(type = "text")]);

// console.log(inputSearch);
