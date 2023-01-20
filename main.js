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

      //area for current search w. html
      let searchArea = document.createElement("p");

      searchArea.innerHTML = `<b>Area: </b>${weather.nearest_area[0].areaName[0].value}`;

      //create region element
      let searchRegion = document.createElement("p");
      //region innerHTML
      searchRegion.innerHTML = `<b>Region: </b>${weather.nearest_area[0].region[0].value}`;

      current.append(searchRegion);
      searchRegion.prepend(searchArea);
      // console.log(searchRegion);

      let searchCounty = document.createElement("p");
      searchCounty.innerHTML = `<b>Country: </b>${weather.nearest_area[0].country[0].value}`;

      let searchCurrentF = document.createElement("p");

      searchCurrentF.innerHTML = `<b> Currently: </b> Feels Like ${weather.weather[2].mintempF}° F`;
      searchRegion.append(searchCounty, searchCurrentF);

      let article = document.getElementById("today");

      let todayAvgTemp = document.createElement("p");

      todayAvgTemp.innerHTML = `<b> Average Temperature: </b> ${weather.weather[0].avgtempF}°F`;

      let todayMaxTemp = document.createElement("p");

      todayMaxTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[0].maxtempF}°F`;

      let todayMinTemp = document.createElement("p");

      todayMinTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[0].mintempF}°F`;

      article.append(todayAvgTemp, todayMaxTemp, todayMinTemp);

      let tomorrow = document.getElementById("tomorrow");

      let tomorrowHeader = document.createElement("h2");

      tomorrowHeader.innerHTML = `<b>Tomorrow</b>`;
      article.append(tomorrowHeader);
      let tmmAvgTemp = document.createElement("p");

      tmmAvgTemp.innerHTML = `<b> Average Temperature: </b> ${weather.weather[1].avgtempF}°F`;

      let tmmMaxTemp = document.createElement("p");
      tmmMaxTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[1].maxtempF}°F`;

      let tmmMinTemp = document.createElement("p");

      tmmMinTemp.innerHTML = `<b> Max Temperature: </b> ${weather.weather[1].mintempF}°F`;

      tomorrow.append(tmmAvgTemp, tmmMaxTemp, tmmMinTemp);

      let dayAfteryAvgTemp = document.createElement("p");

      let dayAfterMaxTemp = document.createElement("p");

      let dayAfterMinTemp = document.createElement("p");
      // weather.current_condition[0].FeelsLikeC;
      // //area of search
      // console.log(weather.nearest_area[0].areaName[0].value);
      // region of search
      // console.log(weather.nearest_area[0].region[0].value);
      // country of search
      // console.log(weather.nearest_area[0].country[0].value);
      // console.log(weather.weather[2].mintempF);

      //aside
      // console.log("today temp");
      // //TODAY- avg temp
      // console.log(weather.weather[0].avgtempF);

      // today maX temo
      // console.log(weather.weather[0].maxtempF);

      //today min
      // console.log(weather.weather[0].mintempF);

      console.log("tomorrow");
      //TM- avg temp
      console.log(weather.weather[1].avgtempF);

      //TM maX temo
      console.log(weather.weather[1].maxtempF);

      //TM min
      console.log(weather.weather[1].mintempF);

      console.log("day after tomorrow");
      //TM- avg temp
      console.log(weather.weather[2].avgtempF);

      //TM maX temo
      console.log(weather.weather[2].maxtempF);

      //TM min
      console.log(weather.weather[2].mintempF);
      console.log("p");
      console.log(weather, "Finally properly formatted weather");
    });
});

// const inputSearch = document.querySelector(input[(type = "text")]);

// console.log(inputSearch);
