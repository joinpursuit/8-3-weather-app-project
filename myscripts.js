const form = document.querySelector("form");
const main = document.querySelector("article.text");
const chooseLocation = document.querySelector("p.text2");
const noSearches = document.querySelector("p.text3");
const ul = document.querySelector("ul");
const widget = document.querySelector("#widget form");

let img = document.querySelector("img");
let sun = document.querySelector("#sun");
let rain = document.querySelector("#rain");
let snow = document.querySelector("#snow");

const article1 = document.querySelectorAll("article.day1 p");
const article2 = document.querySelectorAll("article.day2 p");
const article3 = document.querySelectorAll("article.day3 p");

let h2 = document.createElement("h2");
let p1 = document.createElement("p");
let p2 = document.createElement("p");
let p3 = document.createElement("p");
let p4 = document.createElement("p");

main.append(h2, p1, p2, p3, p4, sun, rain, snow);

//gets area, region, and country values
const weather = ({ nearest_area, current_condition, weather }, text) => {
  h2.innerHTML = text;

  nearest_area.forEach((element) => {
    let [val] = element.areaName;
    let { value } = val;

    if (text.toLowerCase() === value.toLowerCase()) {
      p1.textContent = `Area: ${value}`;
    } else {
      p1.textContent = `Nearest Area: ${value}`;
    }
  });

  nearest_area.forEach((element2) => {
    let [val2] = element2.region;
    let { value } = val2;
    p2.textContent = `Region: ${value}`;
  });

  nearest_area.forEach((element3) => {
    let [val3] = element3.country;
    let { value } = val3;
    p3.textContent = `Country: ${value}`;
  });
  current_condition.forEach((tempF) => {
    let { FeelsLikeF } = tempF;
    p4.textContent = `Currently: Feels Like ${FeelsLikeF}°F`;
  });

  //weather icon and values
  let sunChance = weather[0].hourly[0].chanceofsunshine;
  let rainChance = weather[0].hourly[0].chanceofrain;
  let snowChance = weather[0].hourly[0].chanceofsnow;

  sun.innerHTML = `<strong> Chance of Sunshine: </strong> ${sunChance}`;
  rain.innerHTML = `<strong> Chance of Rain: </strong> ${rainChance}`;
  snow.innerHTML = `<strong> Chance of Snow: </strong> ${snowChance}`;

  if (sunChance > 50) {
    img.setAttribute("src", "./assets/icons8-summer.gif");
    img.setAttribute("alt", "sun");
  } else if (rainChance > 50) {
    img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
    img.setAttribute("alt", "rain");
  } else if (snowChance > 50) {
    img.setAttribute("src", "./assets/icons8-light-snow.gif");
    img.setAttribute("alt", "snow");
  }
};

//get all today, tmr, DAT temps
const temps = ({ weather }) => {
  article1[0].textContent = `Average Temperature: ${weather[0].avgtempF}°F`;
  article1[1].textContent = `Max Temperature: ${weather[0].maxtempF}°F`;
  article1[2].textContent = `Min Temperature: ${weather[0].mintempF}°F`;

  article2[0].textContent = `Average Temperature: ${weather[1].avgtempF}°F`;
  article2[1].textContent = `Max Temperature: ${weather[1].maxtempF}°F`;
  article2[2].textContent = `Min Temperature: ${weather[1].mintempF}°F`;

  article3[0].textContent = `Average Temperature: ${weather[2].avgtempF}°F`;
  article3[1].textContent = `Max Temperature: ${weather[2].maxtempF}°F`;
  article3[2].textContent = `Min Temperature: ${weather[2].mintempF}°F`;
};

//helper function to add previous searches onto list
function searchList(string, degrees) {
  let li = document.createElement("li");
  let a = document.createElement("a");

  a.setAttribute("href", "#");
  li.append(a);

  a.innerHTML = `${string} - ${degrees}°F`;

  a.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`https://wttr.in/${string}?format=j1`)
      .then((res) => res.json())
      .then((json) => {
        weather(json, string);
        temps(json);
      })
      .catch((error) => console.log(error));
  });

  return li;
}

//get current condition value
const temp = ({ current_condition }, text) => {
  current_condition.forEach((tempF) => {
    let { FeelsLikeF } = tempF;

    ul.append(searchList(text, FeelsLikeF)); //appends search history list
  });
};

//widget converter
function convertTemp(form) {
  let num = document.getElementById("temp-to-convert");
  let convertC = document.getElementById("to-c");
  let convertF = document.getElementById("to-f");
  let result = document.querySelector("h4");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (convertC.checked) {
      let product = (5 / 9) * (num.value - 32);
      product = product.toFixed(2);

      result.innerHTML = `${product} °C`;
    } else if (convertF.checked) {
      let product = (9 / 5) * num.value + 32;

      product = product.toFixed(2);

      result.innerHTML = `${product} °F`;
    }
    console.log(num.value);
    num.value = "";
  });
}
convertTemp(widget);
//events that happen after clicking 'Get Weather' button
form.addEventListener("submit", (event) => {
  const text = document.querySelector("input[type='text']");

  let location = event.target.value;
  event.preventDefault();

  //if text box empty, will not load value
  location = text.value;
  if (location === "") {
    window.reload();
  }

  text.value = "";

  noSearches.remove();
  chooseLocation.remove();

  //fetch API
  fetch(`https://wttr.in/${location}?format=j1`)
    .then((res) => res.json())
    .then((json) => {
      weather(json, location);
      temps(json);
      temp(json, location);
      console.log(location);
    })
    .catch((error) => console.log(error));
});

//COULDNT HAVE DONE THIS WITHOUT EMALEE, EDWIN, LUIS, LILY
