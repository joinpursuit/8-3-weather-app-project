// // const url = `https://v3.wttr.in/${event.target.location.value}?format=j1`;
// // const locationInput = document.querySelector("input")
// const ul = document.querySelectorAll("strong")
// const h2= document.querySelector("bold")
// const p = document.querySelector("p")
// const article = document.querySelectorAll("article")
// const arr = []
// const inputs= document.querySelector("input")
// const today = document.querySelector("today")

// document.querySelector("form").addEventListener("submit", (event) => {
//     event.preventDefault();
//     fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
//         .then((result) => {
//             return result.json();
//         })
//         .then((weather) => {
//             article[0].textContent= "";
//              inputs.value = "";
//              const ulTags = document.querySelectorAll("main ul");
//              ulTags.forEach((ul) => ul.lastChild.remove());
//             h2.textContent =weather.nearest_area[0].areaName[0].value
//             ul[0].textContent = `Area:`
//             ul[0].after(weather.nearest_area[0].areaName[0].value)
//             ul[1].textContent = `Region:`
//             ul[1].after(weather.nearest_area[0].region[0].value)
//             ul[2].textContent = `Country:`
//             ul[2].after(weather.nearest_area[0].country[0].value)
//             ul[3].textContent = `Currently:`
//             ul[3].after(` Feels like ${weather.current_condition[0].FeelsLikeF}°F`)
//             ul[4].after(weather.weather[0].hourly[0].chanceofsunshine)
//             ul[4].textContent= `Chance Of Sunshine: `
//             ul[5].after(weather.weather[0].hourly[0].chanceofrain)
//             ul[5].textContent= `Chance Of Rain: `
//             ul[6].after(weather.weather[0].hourly[0].chanceofsnow)
//             ul[6].textContent= `Chance Of Snow: `;
//             // ul.value = " "
//             // div[0].after(`Average Temperature:${weather.current_condition[0].avgtempF.value}°F`)

// //  document.querySelector("form").addEventListener("submit", (event) => {
// //     event.preventDefault();

// // })

//         });
// });

// const url = `https://v3.wttr.in/${event.target.location.value}?format=j1`;
// const locationInput = document.querySelector("input")
const ul = document.querySelectorAll("strong");
const h2 = document.querySelector("bold");
const p = document.querySelector("p");
const article = document.querySelectorAll("article");
const arr = [];
const inputs = document.querySelector("input");
const today = document.querySelector("today");

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
    .then((result) => {
      return result.json();
    })
    .then((weather) => {
      article[0].textContent = "";
      inputs.value = "";

      const ulTags = document.querySelectorAll("main ul");
      ulTags.forEach((ul) => ul.lastChild.remove());

      h2.textContent = weather.nearest_area[0].areaName[0].value;
      ul[0].textContent = `Area:`;
      ul[0].after(weather.nearest_area[0].areaName[0].value);
      ul[1].textContent = `Region:`;
      ul[1].after(weather.nearest_area[0].region[0].value);
      ul[2].textContent = `Country:`;
      ul[2].after(weather.nearest_area[0].country[0].value);
      ul[3].textContent = `Currently:`;
      ul[3].after(` Feels like ${weather.current_condition[0].FeelsLikeF}°F`);
      ul[4].after(weather.weather[0].hourly[0].chanceofsunshine);
      ul[4].textContent = `Chance Of Sunshine: `;
      ul[5].after(weather.weather[0].hourly[0].chanceofrain);
      ul[5].textContent = `Chance Of Rain: `;
      ul[6].after(weather.weather[0].hourly[0].chanceofsnow);
      ul[6].textContent = `Chance Of Snow: `;
    });
});
