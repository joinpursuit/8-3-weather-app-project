const form = document.querySelector("form");
const enteredLocation = document.querySelector("#input-text");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let locationName = enteredLocation.value;
  const apiURL = `https://wttr.in/${locationName}?format=j1`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      // write data from api to local variables for current conditions
      const current = document.querySelector(".current");
      const areaName = data.nearest_area[0].areaName[0].value;
      const locationRegion = data.nearest_area[0].region[0].value;
      const locationCountry = data.nearest_area[0].country[0].value;
      const locationFeelsLike = data.current_condition[0].FeelsLikeF;
      const chanceOfSunshine = Number(
        data.weather[0].hourly[0].chanceofsunshine
      );
      const chanceOfRain = Number(data.weather[0].hourly[0].chanceofrain);
      const chanceOfSnow = Number(data.weather[0].hourly[0].chanceofsnow);

      // assign area name to location name if blank
      if (!locationName) {
        locationName = areaName;
      }

      // update icon
      let image;
      if (chanceOfSunshine > 50) {
        image = `<img alt="sun" src="./assets/icons8-summer.gif">\n`;
      } else if (chanceOfRain > 50) {
        image = `<img alt="rain" src="./assets/icons8-torrential-rain.gif">\n`;
      } else if (chanceOfSnow > 50) {
        image = `<img alt="snow" src="./assets/icons8-light-snow.gif">\n`;
      } else {
        image = "";
      }

      // update current conditions with values
      current.innerHTML = `${image}
      <h2>${locationName}</h2>
        <p><b>Area:</b> ${areaName}</p> <p>Region: ${locationRegion}</p> 
        <p><b>Country:</b> ${locationCountry}</p> 
        <p><b>Currently:</b> Feels Like ${locationFeelsLike}&deg;F</p>
        <p><b>Chance of Sunshine:</b> ${chanceOfSunshine}%</p>
        <p><b>Chance of Rain:</b> ${chanceOfRain}%</p>
        <p><b>Chance of Snow:</b> ${chanceOfSnow}%</p>`;

      const li = document.createElement("li");
      const noResults = document.getElementById("no-results");
      noResults.innerHTML = "";
      li.innerHTML = `<a href="#">${locationName}</a> ${locationFeelsLike}°F`;
      document.querySelector("ul").append(li);

      li.addEventListener("click", (event) => {
        current.innerHTML = `<h3>${areaName}</h3> 
            <p><b>Area:</b> ${areaName}</p> <p>Region: ${locationRegion}</p> 
            <p><b>Country:</b> ${locationCountry}</p> 
            <p><b>Currently:</b> Feels Like ${locationFeelsLike}&deg;F</p>
            <p><b>Chance of Sunshine:</b> ${chanceOfSunshine}%</p>
            <p><b>Chance of Rain:</b> ${chanceOfRain}%</p>
            <p><b>Chance of Snow:</b> ${chanceOfSnow}%</p>`;

        const forecastArr = ["Today", "Tomorrow", "Day After-Tomorrow"];

        // write data from api to local variables for forecast
        for (let i = 0; i < forecastArr.length; i++) {
          const avgTempF = data.weather[i].avgtempF;
          const maxTempF = data.weather[i].maxtempF;
          const minTempF = data.weather[i].mintempF;
          const div = document.querySelectorAll(".forecast div");
          div[i].innerHTML = `<h3>${forecastArr[i]}</h3>
                <p><b>Average Temperature:</b> ${avgTempF}&deg;F</p>
                <p><b>Max Temperature: </b>${maxTempF}&deg;F</p>
                <p><b>Min Temperature:</b> ${minTempF}&deg;F</p>`;
        }
      });

      const forecastArr = ["Today", "Tomorrow", "Day After Tomorrow"];
      for (let i = 0; i < forecastArr.length; i++) {
        const avgTempF = data.weather[i].avgtempF;
        const maxTempF = data.weather[i].maxtempF;
        const minTempF = data.weather[i].mintempF;
        const div = document.querySelectorAll(".forecast div");

        // update current conditions with values
        div[i].innerHTML = `<h3>${forecastArr[i]}</h3>
                <p><b>Average Temperature:</b> ${avgTempF}&deg;F</p>
                <p><b>Max Temperature: </b>${maxTempF}&deg;F</p>
                <p><b>Min Temperature:</b> ${minTempF}&deg;F</p>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  event.target.reset();
});
