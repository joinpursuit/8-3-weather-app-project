let myWeather = null;
const strong = document.querySelectorAll("strong");
const article = document.querySelectorAll("article");
const main = document.querySelector("main");

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(
    `https://wttr.in/${event.target.location.value}?format=j1`,
    "HELLO FROM THE OTHER SIDE"
  );
  fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
    .then((result) => {
      console.log("Fetch was successful");
      return result.json();
    })
    .then((weather) => {
      previousSearch(event.target.location.value, weather);

      document.querySelector("input").value = "";

      weatherDisplay(weather)
    });
});

function weatherDisplay(weather) {
  const mainArticle = document.getElementById("main_article");
  mainArticle.remove();
  const newArticle = document.createElement("article");
  newArticle.setAttribute("id", "main_article");
  main.prepend(newArticle);
  const h2 = document.createElement("h2");
  h2.textContent = weather.nearest_area[0].areaName[0].value;
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  p1.innerHTML = `<strong>Area:</strong> ${weather.nearest_area[0].areaName[0].value}`;
  p2.innerHTML = `<strong>Region:</strong> ${weather.nearest_area[0].region[0].value}`;
  p3.innerHTML = `<strong>Country:</strong> ${weather.nearest_area[0].country[0].value}`;
  p4.innerHTML = `<strong>Currently:</strong> Feels like ${weather.current_condition[0].FeelsLikeF}°F`;

  newArticle.append(h2, p1, p2, p3, p4);

  let today = document.querySelector(".today");
  let tomorrow = document.querySelector(".tomorrow");
  let day = document.querySelector(".day_after_tomorrow");

  today.innerHTML = `<h2>Today</h2>`;
  let pToday = document.createElement("p");

  pToday.innerHTML = `<span class="today"><strong>Average Temperature:</strong> ${weather.weather[0].avgtempF} &#8457</span>
<br>
<span class="today"><strong>Max Temperature:</strong> ${weather.weather[0].maxtempF} &#8457</span>
<br>
<span class="today"><strong>Min Temperature:</strong> ${weather.weather[0].mintempF} &#8457</span>`;
  today.append(pToday);

  tomorrow.innerHTML = `<h2>Tomorrow</h2>`;
  let pTom = document.createElement("p");
  pTom.innerHTML = `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[1].avgtempF} &#8457</span>
<br>
<span class="today"><strong>Max Temperature:</strong> ${weather.weather[1].maxtempF} &#8457</span>
<br>
<span class="today"><strong>Min Temperature:</strong> ${weather.weather[1].mintempF} &#8457</span>`;
  tomorrow.append(pTom);

  day.innerHTML = `<h2>Day After Tomorrow</h2>`;
  let dayAfter = document.createElement("p");
  dayAfter.innerHTML = `<span class="today"><strong>Average Tempature:</strong> ${weather.weather[2].avgtempF} &#8457</span>
<br>
<span class="today"><strong>Max Temperature:</strong> ${weather.weather[2].maxtempF} &#8457</span>
<br>
<span class="today"><strong>Min Temperature:</strong> ${weather.weather[2].mintempF} &#8457</span>`;
  day.append(dayAfter);

}
function previousSearch(location, data) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  const pSearch = document.getElementById("previous_searches");   pSearch.style.display = "none";
// if(document.getElementById(`pSearch`))document.getElementById(`pSearch`).remove();

  li.innerHTML = `<a id="${location}" href="#">${location}</a> - ${data.current_condition[0].FeelsLikeF}°F`;
  
//   for (let i = 0; i < ul.children; i++) {
//    if (ul.children[i] === li){
//     return 
//    } 
//   }
  ul.append(li);
  console.log(ul.children[1].firstElementChild.textContent)
  const a = document.getElementById(`${location}`);
  a.addEventListener("click", () => {
    weatherDisplay(data)
    li.remove()
    ul.append(li)


  });
}


//Can't have 2 event listener in one code block.
const conversion = document.querySelector("#conversionForm");
conversion.addEventListener("submit", (event) => {
  event.preventDefault();
  let conversion = event.target.convert.value;
  let toC = document.querySelector("#to-c");
  let toF = document.querySelector("#to-f");
  if (toC.checked) {
    conversion = (conversion - 32) * (5 / 9);
    document.querySelector("#result").innerHTML = `${conversion.toFixed(2)}°C`;
  } else {
    conversion = conversion * (9 / 5) + 32;
    document.querySelector("#result").innerHTML = `${conversion.toFixed(2)}°F`;
  }
});
