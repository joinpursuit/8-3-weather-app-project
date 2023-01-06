document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const BASE_URL = "https://wttr.in/";
  let article = document.querySelector("article");
  let ul = document.querySelector("ul");
  let previous = document.querySelector(".previous");
  let p = document.createElement("p");
  let threeDays = document.querySelectorAll(".forecast .day");
  let forecast = ["Today", "Tomorrow", "Day After Tomorrow"];

  let city = event.target.location.value;
  event.target.location.value = ""; //to clear input

  fetch(`${BASE_URL}${city}?format=j1`)
    .then((result) => {
      return result.json();
    })
    .then((weather) => {
      article.innerHTML = `<h1 class="city">${weather.nearest_area[0].areaName[0].value}</h1>`;
      p.innerHTML = `<span class="details"><strong>Area:</strong> ${weather.nearest_area[0].region[0].value}</span>
        <br> <span class="details"><strong>Country:</strong> ${weather.nearest_area[0].country[0].value}</span> 
        <br> <span class="details"><strong>Region:</strong> ${weather.nearest_area[0].region[0].value}</span> 
        <br> <span class="details"><strong>Currently feels like:</strong> ${weather.current_condition[0]["FeelsLikeF"]}</span>`;

      article.appendChild(p);

      // populate the search aside
      if (previous) {
        previous.remove(); //ask jose the logic of this. i was using it without an if
        let li = document.createElement("li");
        li.innerHTML = `${weather.nearest_area[0].areaName[0].value}`;
        ul.append(li);
      } else {
        let li = document.createElement("li");
        li.innerHTML = `${weather.nearest_area[0].areaName[0].value}`;
        ul.append(li);
      }

      //populate forecast

      for (let i = 0; i < threeDays.length; i++) {
        threeDays.innerHTML = "";
        let days = document.createElement("p");
        days.innerHTML = forecast[i]
        threeDays[i].append(days);
      }
    });
    console.log(threeDays);
});
