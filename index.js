const weatherFormSubmit = document.querySelector("form");


const weatherFormSubmitEvent = (event) => {
  
  event.preventDefault();
  const input = weatherFormSubmit.location.value;
  const BASE_URL = `https://wttr.in/${input}?format=j1`;
  
  getWeatherInfo(BASE_URL);
  event.target.location.value = "";
  
}

const getWeatherInfo = (url) => {
  fetch(url)
  .then((response) => response.json())
  .then((weather)  => {
    console.log(weather)
  })
}


weatherFormSubmit.addEventListener("submit", weatherFormSubmitEvent);


  // try {
  //   event.prevent
  //   const BASE_URL = "https://wttr.in/";
  //   const city = form.location.value;
  //   fetch(`${BASE_URL}${city}?format=j1`)
  //   .then((result) => {
  //     result.json();
  //   })
  //   .then((weather) => {
  //     console.log(weather);
  //   });
  // } catch {
  //   console.log("error")
  // }
//};

// document.querySelector("form").addEventListener("submit", (event) => {
// //   event.preventDefault();

// //   const BASE_URL = "https://wttr.in/";
// //   let article = document.querySelector("article");
// //   let ul = document.querySelector("ul");
// //   let previous = document.querySelector(".previous");
// //   let threeDays = document.querySelectorAll(".day");
// //   let forecast = ["Today", "Tomorrow", "Day After Tomorrow"];

// //   let city = event.target.location.value;
// //   event.target.location.value = ""; //to clear input

// //   fetch(`${BASE_URL}${city}?format=j1`) // is readability
// //     .then((result) => {
// //       return result.json();
// //     })
// //     .then((weather) => {

// //       conbsole.lof
// //     });
// //     });
