let links = [];
let feelsLike = [];

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (document.querySelector("article")) {
    let text = document.querySelectorAll("article");
    for (element of text) {
      element.textContent = "";
    }
  }
  if (document.querySelector("br")) {
    let lineBreak = document.querySelectorAll("br");
    for (element of lineBreak) {
      element.remove();
    }
  }

  // console.log(city);
  let BASE_URL = `http://wttr.in/`;
  let city = event.target.location.value;
  // const weatherInfo = fetchData(`${BASE_URL}${city}?format=j1`);

  fetch(`${BASE_URL}${city}?format=j1`)
    .then((result) => {
      return result.json();
    })
    .then((weather) => {
      // giving variables to the area, region, country and current temp for the inputted city
      // clear search bar after submit
      document.getElementById("input").value = "";

      let area = weather.nearest_area[0].areaName[0].value;
      let region = weather.nearest_area[0].region[0].value;
      let country = weather.nearest_area[0].country[0].value;
      let currently = weather.current_condition[0].FeelsLikeF;
      let mainArticle = document.querySelector("article");
      if (weather.weather[0].hourly[0].chanceofrain > 50) {
        let img = mainArticle.appendChild(document.createElement("img"));
        img.setAttribute("alt", "rain");
        img.src = "./assets/icons8-torrential-rain.gif";
        let blurb = mainArticle.appendChild(document.createElement("p"));
        blurb.innerText = 'Chance of Rain'
    } else if (weather.weather[0].hourly[0].chanceofsnow > 50) {
        let img = mainArticle.appendChild(document.createElement("img"));
        img.setAttribute("alt", "snow");
        img.src = "./assets/icons8-light-snow.gif";
        let blurb = mainArticle.appendChild(document.createElement("p"));
        blurb.innerText = 'Chance of Snow'
    } else if (weather.weather[0].hourly[0].chanceofsunshine > 50) {
        let img = mainArticle.appendChild(document.createElement("img"));
        img.setAttribute("alt", "sun");
        img.src = "./assets/icons8-summer.gif";  
        let blurb = mainArticle.appendChild(document.createElement("p"));
        blurb.innerText = 'Chance of Sunshine'
     
    }
      let header = mainArticle.appendChild(document.createElement("h2"));
      let p1 = mainArticle.appendChild(document.createElement("p"));
      if (area.toLowerCase() != city.toLowerCase()) {
        header.append(`${city}`);
        p1.innerText = `Nearest Area: ${area}`;
      } else {
        header.append(`${area}`);
        p1.innerText = `Area: ${area}`;
      }
     
      let p2 = mainArticle.appendChild(document.createElement("p"));
      p2.append(`Region: ${region}`);
      let p3 = mainArticle.appendChild(document.createElement("p"));
      p3.append(`Country: ${country}`);
      let p4 = mainArticle.appendChild(document.createElement("p"));
      p4.append(`Currently: Feels Like ${currently}°F`);

      // today's weather forecast for inputted city
      let average = weather.weather[0].avgtempF;
      let min = weather.weather[0].mintempF;
      let max = weather.weather[0].maxtempF;
      let today = document.querySelector("article.today");
      let todayHeader = today.appendChild(document.createElement("h3"));
      todayHeader.append("Today");
      let p5 = today.appendChild(document.createElement("p"));
      p5.append(`Average Temperature: ${average}°F`);
      let p6 = today.appendChild(document.createElement("p"));
      p6.append(`Max Temperature: ${max}°F`);
      let p7 = today.appendChild(document.createElement("p"));
      p7.append(`Min Temperature: ${min}°F`);
      
      //tomorrow's forecast
      let average2 = weather.weather[1].avgtempF;
      let min2 = weather.weather[1].mintempF;
      let max2 = weather.weather[1].maxtempF;
      let tomorrow = document.querySelector("article.tomorrow");
      let tomorrowHeader = tomorrow.appendChild(document.createElement("h3"));
      tomorrowHeader.append("Tomorrow");
      let p8 = tomorrow.appendChild(document.createElement("p"));
      p8.append(`Average Temperature: ${average2}°F`);
      let p9 = tomorrow.appendChild(document.createElement("p"));
      p9.append(`Max Temperature: ${max2}°F`);
      let p10 = tomorrow.appendChild(document.createElement("p"));
      p10.append(`Min Temperature: ${min2}°F`);

      // day after tomorrow's forecast
      let average3 = weather.weather[2].avgtempF;
      let min3 = weather.weather[2].mintempF;
      let max3 = weather.weather[2].maxtempF;
      let dayAfterTom = document.querySelector("article.dayAfterTom");
      let dayAfterHeader = dayAfterTom.appendChild(document.createElement("h3"));
      dayAfterHeader.append("Day After Tomorrow");
      let p11 = dayAfterTom.appendChild(document.createElement("p"));
      p11.append(`Average Temperature: ${average3}°F`);
      let p12 = dayAfterTom.appendChild(document.createElement("p"));
      p12.append(`Max Temperature: ${max3}°F`);
      let p13 = dayAfterTom.appendChild(document.createElement("p"));
      p13.append(`Min Temperature: ${min3}°F`);

      let list = document.querySelector("ul");

      feelsLike.push(currently);

      let listItem = document.createElement("li");

      let a = document.createElement("a");
      a.href = `${BASE_URL}${city}?format=j1`;
      a.textContent = area;
      if (!links.includes(city)) {
          listItem.append(a);
          listItem.append(` - ${currently}°F`);
          list.append(listItem);
          links.push(city);
          let removeP = document.querySelector(".previous p");
          if (document.querySelector(".previous p")) {
              removeP.remove();
          }
        } else {
            let remove = document.querySelectorAll('li');
            for (element of remove) {
                if (element.innerText.includes(city)) {
                    element.remove();
                    listItem.append(a);
                    listItem.append(` - ${currently}°F`);
                    list.append(listItem);
                    links.push(city);
                }
            }
        }

      a.addEventListener("click", (event) => {
        event.preventDefault();
        event.target.parentNode.remove();
        fetchData(event.target.href, city);
      });

      // convert f to c
    });
});

function fetchData(url, city) {
  fetch(url)
    .then((response) => response.json())
    .then((weather) => {
      handleWeather(weather, city);
    })
    .catch((error) => console.log(error));
}

function handleWeather(weather1, city) {
  const { nearest_area, weather, current_condition } = weather1;
  

  document.getElementById("input").value = "";

  clearElements();
  
  let area = nearest_area[0].areaName[0].value;
  let region = nearest_area[0].region[0].value;
  let country = nearest_area[0].country[0].value;
  let currently = current_condition[0].FeelsLikeF;
  let mainArticle = document.querySelector("article");
  let header = mainArticle.appendChild(document.createElement("h2"));
  if (Number(weather[0].hourly[0].chanceofsunshine) > 50) {
    let img = mainArticle.appendChild(document.createElement("img"));
    img.setAttribute("alt", "sun");
    img.src = "./assets/icons8-summer.gif";
    let blurb = mainArticle.appendChild(document.createElement("p"));
    blurb.innerText = 'Chance of Sunshine'
} else if (Number(weather[0].hourly[0].chanceofrain) > 50) {
    let img = mainArticle.appendChild(document.createElement("img"));
    img.setAttribute("alt", "rain");
    img.src = "./assets/icons8-torrential-rain.gif";  
    let blurb = mainArticle.appendChild(document.createElement("p"));
    blurb.innerText = 'Chance of Rain'
} else if (Number(weather[0].hourly[0].chanceofsnow) > 50) {
    let img = mainArticle.appendChild(document.createElement("img"));
    img.setAttribute("alt", "snow");
    img.src = "./assets/icons8-light-snow.gif";
    let blurb = mainArticle.appendChild(document.createElement("p"));
    blurb.innerText = 'Chance of Snow'
}

  if (area.toLowerCase() != city.toLowerCase()) {
    header.append(`${city}`);
    mainArticle.append(`Nearest Area: ${area}`);
  } else {
    header.append(`${area}`);
    mainArticle.append(`Area: ${area}`);
  }
  mainArticle.appendChild(document.createElement("br"));
  mainArticle.append(`Region: ${region}`);
  mainArticle.appendChild(document.createElement("br"));
  mainArticle.append(`Country: ${country}`);
  mainArticle.appendChild(document.createElement("br"));
  mainArticle.append(`Currently: Feels Like ${currently}°F`);

  // today's weather forecast for inputted city
  let average = weather[0].avgtempF;
  let min = weather[0].mintempF;
  let max = weather[0].maxtempF;
  let today = document.querySelector("article.today");
  let todayHeader = today.appendChild(document.createElement("h3"));
  todayHeader.append("Today");
  today.append(`Average Temperature: ${average}°F`);
  today.appendChild(document.createElement("br"));
  today.append(`Max Temperature: ${max}°F`);
  today.appendChild(document.createElement("br"));
  today.append(`Min Temperature: ${min}°F`);

  //tomorrow's forecast
  let average2 = weather[1].avgtempF;
  let min2 = weather[1].mintempF;
  let max2 = weather[1].maxtempF;
  let tomorrow = document.querySelector("article.tomorrow");
  let tomorrowHeader = tomorrow.appendChild(document.createElement("h3"));
  tomorrowHeader.append("Tomorrow");
  tomorrow.append(`Average Temperature: ${average2}°F`);
  tomorrow.appendChild(document.createElement("br"));
  tomorrow.append(`Max Temperature: ${max2}°F`);
  tomorrow.appendChild(document.createElement("br"));
  tomorrow.append(`Min Temperature: ${min2}°F`);

  // day after tomorrow's forecast
  let average3 = weather[2].avgtempF;
  let min3 = weather[2].mintempF;
  let max3 = weather[2].maxtempF;
  let dayAfterTom = document.querySelector("article.dayAfterTom");
  let dayAfterHeader = dayAfterTom.appendChild(document.createElement("h3"));
  dayAfterHeader.append("Day After Tomorrow");
  dayAfterTom.append(`Average Temperature: ${average3}°F`);
  dayAfterTom.appendChild(document.createElement("br"));
  dayAfterTom.append(`Max Temperature: ${max3}°F`);
  dayAfterTom.appendChild(document.createElement("br"));
  dayAfterTom.append(`Min Temperature: ${min3}°F`);

  let list = document.querySelector("ul");

  feelsLike.push(currently);

  let listItem = document.createElement("li");

  let a = document.createElement("a");

  const user_URL = `http://wttr.in/${city}?format=j1`;

  a.href = user_URL;
  a.textContent = area;
  listItem.append(a);
  listItem.append(` - ${currently}°F`);
  list.append(listItem);

  a.addEventListener("click", (event) => {
    event.preventDefault();
    fetchData(user_URL, city);
    event.target.parentNode.remove();
    //     event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  });
}


function clearElements() {
  document.getElementById("input").value = "";
  document.querySelector("main article").innerHTML = "";
  document.querySelector("aside .today").innerHTML = "";
  document.querySelector("aside .tomorrow").innerHTML = "";
  document.querySelector("aside .dayAfterTom").innerHTML = "";
}


document.querySelector('.conversion').addEventListener('submit', (event) => {
    event.preventDefault();
        let valueToConvert = event.target.tempToConvert.value;
        console.log(valueToConvert);
        const toF = document.querySelector("#to-f");
        const toC = document.querySelector("#to-c");
        let h4 = document.querySelector('aside h4');
        if (toF.checked) {
            valueToConvert = valueToConvert * (9/5) + 32;
            h4.innerText = `${valueToConvert.toFixed(2)}°F`;
        } else if (toC.checked) {
            valueToConvert = (valueToConvert - 32) * (5/9);
            h4.innerText = `${valueToConvert.toFixed(2)}°C`;
        }    
    });

