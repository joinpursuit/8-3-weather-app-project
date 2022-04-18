//WEATHER
const BASE_URL = "https://wttr.in/";
const form = document.querySelector("#locationForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { location } = event.target;
  console.log(location);
  getNewWeatherSearch(location.value);
});

let searchInfo = {};

function getNewWeatherSearch(location) {
  fetch(`${BASE_URL}${location}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      console.log(`${json}`);

      searchInfo["location"] = json.nearest_area[0].areaName[0].value;
      searchInfo["Region"] = json.nearest_area[0].region[0].value;
      searchInfo["Country"] = json.nearest_area[0].country[0].value;
      searchInfo["Currently"] = json.current_condition[0].FeelsLikeF;
      searchInfo["Chance-of-sun"] = json.weather[0].hourly[0].chanceofsunshine;
      searchInfo["Chance-of-rain"] = json.weather[0].hourly[0].chanceofrain;
      searchInfo["Chance-of-snow"] = json.weather[0].hourly[0].chanceofsnow;
      getObjectData(searchInfo);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getObjectData(searchInfo) {
  const searchSection = document.getElementById("searchSection");
  for (const [key, value] of Object.entries(searchInfo)) {
    console.log(`${key}: ${value}`);
    let paragraph = document.createElement("p");
    paragraph.innerHTML = `${key}: ${value}`;
    searchSection.append(paragraph);
  }
}

function condtionIcon(finalImag) {
  function getIcon(icon) {
    let lastIcon = "";
    const rain = json.weather[0].hourly[0].chanceofrain;
    sunshine = json.weather[0].hourly[0].chanceofsunshine;
    snow;

    if (sunshine > 50) {
      icon = '<img src="./assets/icons8-summer.gif" alt="sun" />';
    } else if (rain > 50) {
      icon = '<img src="./assets/icons8-rain-cloud.gif" alt="rain" />';
    }
    return lastIcon
  }


let finalImg = getIcon(icon);

  const finalImgArticle = document.getElementById("condition-icon");
  

  finalImgArticle.appendChild(finalImg);
}

// // getIcon(){
// //     const src = document.getElementById ("condition-icon")
// //     const img = document.createElement ("img")
// //     let result = ""
// //      src.appendChild(img)

// //      if (json.weather[0].hourly[0].chanceofsunshine > 50){
// //         result (".assets/icons8-summer.gif")
// //      }
// //      img.appendChild(result)
//     //  return result
// }
// Behavior

let unorderedList = document.querySelector("ul");
let previousSearchList = document.createElement("li");

unorderedList.append(previousSearchList);
//add location & degree to list if search is done.
function addSearchToList(searchInfo, previosSearchList, getWeatherButton) {
  // const previousSearch = document.querySelector('getWeatherButton')
  // form.addEventListener('submit', (event) => {
  // add to the li list
  const link = document.createElement("a");
}
// Media Quiries
