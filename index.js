const form = document.querySelector("form");
const enteredLocation = document.querySelector("#input-text");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const locationName = enteredLocation.value;
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

      // update current conditions with values
      current.innerHTML = `<h3>${locationName}</h3> 
        <p><b>Area:</b> ${areaName}</p> <p>Region: ${locationRegion}</p> 
        <p><b>Country:</b> ${locationCountry}</p> 
        <p><b>Currently:</b> Feels Like ${locationFeelsLike}&deg;F</p>`;

      const li = document.createElement("li");
      li.innerHTML = `<a href="#">${locationName}</a> ${locationFeelsLike}°F`;
      document.querySelector("ul").append(li);

      li.addEventListener("click", (event) => {
        current.innerHTML = `<h3>${areaName}</h3> 
            <p><b>Area:</b> ${areaName}</p> <p>Region: ${locationRegion}</p> 
            <p><b>Country:</b> ${locationCountry}</p> 
            <p><b>Currently:</b> Feels Like ${locationFeelsLike}&deg;F</p>`;

        const forecastArr = ["Today", "Tomorrow", "Day After-Tomorrow"];

        // write data from api to local variables for forecast
        for (let i = 0; i < forecastArr.length; i++) {
          const avgTempF = data.weather[i].avgtempF;
          const maxTempF = data.weather[i].maxtempF;
          const minTempF = data.weather[i].mintempF;
          const div = document.querySelectorAll(".forecast div");
          div[i].innerHTML = `<h2>${forecastArr[i]}</h2>
                <p>Average Temperature:${avgTempF}</p>
                <p>Max Temperature: ${maxTempF}</p>
                <p>Min Temperature: ${minTempF}</p>`;
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
