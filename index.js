document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const BASE_URL = "https://wttr.in/";
  let article = document.querySelector("article");
  let ul = document.querySelector("ul");
  let previous = document.querySelector(".previous");
  let threeDays = document.querySelectorAll(".day");
  let forecast = ["Today", "Tomorrow", "Day After Tomorrow"];

  let city = event.target.location.value;
  event.target.location.value = ""; //to clear input

  fetch(`${BASE_URL}${city}?format=j1`) // is readability
    .then((result) => {
      return result.json();
    })
    .then((weather) => {
      article.innerHTML = `<h1 class="city">${weather.nearest_area[0].areaName[0].value}</h1>`;

      let area = document.createElement("p");
      area.innerHTML = `<span><strong>Area:</strong> ${weather.nearest_area[0].region[0].value}</span>`;

      let region = document.createElement("p");
      region.innerHTML = `<span><strong>Region:</strong> ${weather.nearest_area[0].region[0].value}</span>`;

      let country = document.createElement("p");
      country.innerHTML = `<span><strong>Country:</strong> ${weather.nearest_area[0].country[0].value}</span>`;

      let current = document.createElement("p");
      current.innerHTML = `<span class="details"><strong>Currently feels like:</strong> ${weather.current_condition[0]["FeelsLikeF"]}</span>`;

      article.append(area, region, country, current);

      // populate the search aside
      if (previous) {
        previous.remove(); //ask jose the logic of this. i was using it without an if
        let li = document.createElement("li");
        li.innerHTML = `<a href="${BASE_URL}${city}?format=j1">${weather.nearest_area[0].areaName[0].value}</a> `;
        ul.append(li);
      } else {
        let li = document.createElement("li");
        li.innerHTML = `<a href="${BASE_URL}${city}?format=j1"></a> - ${weather.current_condition[0]["FeelsLikeF"]}`;
        ul.append(li);
      }

      //populate forecast, tried to use map.. didn't work..tried to use for of ...didnt work

      for (let i = 0; i < threeDays.length; i++) {
        threeDays[i].innerHTML = "";

        let day = (document.createElement("h2").innerHTML = forecast[i]); //why it didnt work with backticks ? like creating a new element

        let averageTemperature = document.createElement("section");
        averageTemperature.innerHTML = `<span><strong>Average Temperature:</strong> ${weather.weather[0].avgtempF}</span>`;

        let maxTemperature = document.createElement("section");
        maxTemperature.innerHTML = `Max Temperature: ${weather.weather[0].maxtempF}`;

        let minTemperature = document.createElement("section");
        minTemperature.innerHTML = `Min Temperature: ${weather.weather[0].mintempF}`;

        threeDays[i].append(
          day,
          averageTemperature,
          maxTemperature,
          minTemperature
        );
      }
      console.log(weather);
    });
});
