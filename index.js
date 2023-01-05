document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`)
    .then((result) => {
      return result.json();
    })
    .then((weather) => {
      let article = document.querySelector("article");
      article.innerHTML = `<h1 class="city">${weather.nearest_area[0].areaName[0].value}</h1>`;

      let p = document.createElement("p");
      p.innerHTML = `<span class="details"><strong>Area:</strong> ${weather.nearest_area[0].region[0].value}</span>
        <br> <span class="details"><strong>Country:</strong> ${weather.nearest_area[0].country[0].value}</span> 
        <br> <span class="details"><strong>Region:</strong> ${weather.nearest_area[0].region[0].value}</span> 
        <br> <span class="details"><strong>Currently feels like:</strong> ${weather.current_condition[0]["FeelsLikeF"]}</span>`;

      article.appendChild(p);

      console.log(weather);
    });
});

// document.querySelector("form").addEventListener("submit", (event) => {
//     event.preventDefault()
//     console.log(`https://v3.wttr.in/${event.target.location.value}?format=j1`, "HELLO FROM THE OTHER SIDE")
//     fetch(`https://v3.wttr.in/${event.target.location.value}?format=j1`).then(result => {
//         console.log("Fetch was successful")
//         return result.json()
//     }).then(weather => {
//         console.log(weather, "Finally properly formatted weather")
//     })
// });
