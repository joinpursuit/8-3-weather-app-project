const BASE_URL = "https://wttr.in/";
const JSON_URL = "?format=j1";

const typeLocation = document.querySelector("#typeLocation");
const typeLocationForm = document.querySelector("#typeLocationForm");

typeLocationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchWeather = `${BASE_URL}${typeLocation.value}${JSON_URL}`;

  fetch(searchWeather)
    .then((res) => res.json())
    .then((json) => {
      const { current_condition, nearest_area, weather } = json;
      displayContent();
      loopThroughArrs(current_condition, nearest_area, weather);
    })
    .catch((e) => {
      errors(e);
    });
});

const errors = (e) => {
  const currentLocationError = document.querySelector("#currentLocation p");
  currentLocationError.textContent = e;
};

const displayContent = () => {
  const tempConversionWidget = document.querySelector("#tempConversionWidget");
  tempConversionWidget.style.display = "block";

  const main = document.querySelector("main");

  // checks screen size once in order to display correct media query
  if ($(window).width() > 500) {
    main.style.gridColumn = "2";
  }
  // persistently checks screen size in order to display correct media query
  window.onresize = () => {
    if ($(window).width() > 500) {
      main.style.gridColumn = "2";
    } else {
      main.style.gridRow = "3";
      main.style.gridColumnStart = "span 3";
    }
  };

  const upcomingWeather = document.querySelector("#upcomingWeather");
  upcomingWeather.style.display = "grid";

  const weatherHistory = document.querySelector("#weatherHistory");
  weatherHistory.style.height = "40rem";
};

const loopThroughArrs = (current, area, weather) => {
  const currentObj = {
    CurrentlyC: null,
    CurrentlyF: null,
    weatherDesc: null,
  };

  const areaObj = {
    Area: null,
    Region: null,
    Country: null,
  };

  const weatherObj = {
    Today: {
      avgTempC: weather[0].avgtempC,
      avgTempF: weather[0].avgtempF,
      maxTempC: weather[0].maxtempC,
      maxTempF: weather[0].maxtempF,
      minTempC: weather[0].mintempC,
      minTempF: weather[0].mintempF,
      hourly: weather[0].hourly,
    },
    Tomorrow: {
      avgTempC: weather[1].avgtempC,
      avgTempF: weather[1].avgtempF,
      maxTempC: weather[1].maxtempC,
      maxTempF: weather[1].maxtempF,
      minTempC: weather[1].mintempC,
      minTempF: weather[1].mintempF,
    },
    DayAfterTomorrow: {
      avgTempC: weather[2].avgtempC,
      avgTempF: weather[2].avgtempF,
      maxTempC: weather[2].maxtempC,
      maxTempF: weather[2].maxtempF,
      minTempC: weather[2].mintempC,
      minTempF: weather[2].mintempF,
    },
  };

  for (const cur of current) {
    currentObj.CurrentlyC = cur.FeelsLikeC;
    currentObj.CurrentlyF = cur.FeelsLikeF;
    currentObj.weatherDesc = cur.weatherDesc;
  }

  for (const are of area) {
    for (const areaName of are.areaName) {
      areaObj.Area = areaName;
    }
    for (const region of are.region) {
      areaObj.Region = region;
    }
    for (const country of are.country) {
      areaObj.Country = country;
    }
  }

  return gotLocation(currentObj, areaObj, weatherObj);
};

const h2 = document.createElement("h2");

const Area = document.querySelector("#Area");
const Region = document.querySelector("#Region");
const Country = document.querySelector("#Country");
const Currently = document.querySelector("#Currently");

const todayAvgTemp = document.querySelector("#todayWeather #avgTemp");
const todayMaxTemp = document.querySelector("#todayWeather #maxTemp");
const todayMinTemp = document.querySelector("#todayWeather #minTemp");

const tomorrowAvgTemp = document.querySelector("#tomorrowWeather #avgTemp");
const tomorrowMaxTemp = document.querySelector("#tomorrowWeather #maxTemp");
const tomorrowMinTemp = document.querySelector("#tomorrowWeather #minTemp");

const dayAfterAvgTemp = document.querySelector("#dayAfterWeather #avgTemp");
const dayAfterMaxTemp = document.querySelector("#dayAfterWeather #maxTemp");
const dayAfterMinTemp = document.querySelector("#dayAfterWeather #minTemp");

const gotLocation = (current, area, weather) => {
  const chooseALocation = document.querySelector("#chooseALocation");
  if (chooseALocation) {
    chooseALocation.remove();
  }

  h2.textContent = typeLocation.value;

  Area.innerHTML = `<strong> Nearest Area: </strong> ${area.Area.value}`;
  Region.innerHTML = `<strong> Region: </strong> ${area.Region.value}`;
  Country.innerHTML = `<strong> Country: </strong> ${area.Country.value}`;
  Currently.innerHTML = `<strong> Currently: </strong> Feels like ${current.CurrentlyF}\u00B0F`;

  const currentLocationData = document.querySelector("#currentLocationData");
  currentLocationData.style.display = "block";
  currentLocationData.append(h2, Area, Region, Country, Currently);

  todayAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${weather.Today.avgTempF}\u00B0F`;
  todayMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${weather.Today.maxTempF}\u00B0F`;
  todayMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${weather.Today.minTempF}\u00B0F`;

  tomorrowAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${weather.Tomorrow.avgTempF}\u00B0F`;
  tomorrowMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${weather.Tomorrow.maxTempF}\u00B0F`;
  tomorrowMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${weather.Tomorrow.minTempF}\u00B0F`;

  dayAfterAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${weather.DayAfterTomorrow.avgTempF}\u00B0F`;
  dayAfterMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${weather.DayAfterTomorrow.maxTempF}\u00B0F`;
  dayAfterMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${weather.DayAfterTomorrow.minTempF}\u00B0F`;

  chancesOfSunshineRainSnow(currentLocationData, weather);
  previousSearchesFunc(area.Area.value, h2.textContent, current.CurrentlyF);

  const typeLocationForm = document.querySelector("#typeLocationForm");
  typeLocationForm.reset();
};

const sunIcon = "./assets/icons8-summer.gif";
const rainIcon = "./assets/icons8-torrential-rain.gif";
const snowIcon = "./assets/icons8-light-snow.gif";
const darkSunIcon = "./assets/icons8-summer-dark.gif";
const darkRainIcon = "./assets/icons8-torrential-rain-dark.gif";
const darkSnowIcon = "./assets/icons8-light-snow-dark.gif";
let fullLightMode = true;
let fullDarkMode = false;

const chancesOfSunshineRainSnow = (currentLocationData, weather) => {
  const Sunshine = document.querySelector("#ChanceOfSunshine");
  const Rain = document.querySelector("#ChanceOfRain");
  const Snow = document.querySelector("#ChanceOfSnow");

  const iconImg = document.querySelector("#iconImg");
  iconImg.style.paddingTop = "20px";

  let sunshineChance = weather.Today.hourly.reduce((previous, next) => {
    return previous > Number(next.chanceofsunshine)
      ? previous
      : (previous = Number(next.chanceofsunshine));
  });

  let rainChance = weather.Today.hourly.reduce((previous, next) => {
    return previous > Number(next.chanceofrain)
      ? previous
      : (previous = Number(next.chanceofrain));
  });

  let snowChance = weather.Today.hourly.reduce((previous, next) => {
    return previous > Number(next.chanceofsnow)
      ? previous
      : (previous = Number(next.chanceofsnow));
  });

  if (sunshineChance > rainChance && sunshineChance > snowChance) {
    if (fullLightMode) {
      iconImg.src = sunIcon;
      iconImg.alt = "sun";
    } else if (fullDarkMode) {
      iconImg.src = darkSunIcon;
      iconImg.alt = "darkSun";
    }
  } else if (rainChance > sunshineChance && rainChance > snowChance) {
    if (fullLightMode) {
      iconImg.src = rainIcon;
      iconImg.alt = "rain";
    } else if (fullDarkMode) {
      iconImg.src = darkRainIcon;
      iconImg.alt = "darkRain";
    }
  } else if (snowChance > sunshineChance && snowChance > rainChance) {
    if (fullLightMode) {
      iconImg.src = snowIcon;
      iconImg.alt = "snow";
    } else if (fullDarkMode) {
      iconImg.src = darkSnowIcon;
      iconImg.alt = "darkSnow";
    }
  }

  Sunshine.innerHTML = `<strong> Chance of Sunshine: </strong> ${sunshineChance}`;
  Rain.innerHTML = `<strong> Chance of Rain: </strong> ${rainChance}`;
  Snow.innerHTML = `<strong> Chance of Snow: </strong> ${snowChance}`;
  currentLocationData.prepend(iconImg);
  currentLocationData.append(Sunshine, Rain, Snow);
};

const previousSearchesFunc = (nearest, typedLocation, currentFeel) => {
  const previousSearches = document.querySelector("#previousSearches");
  const noSearches = document.querySelector("#noSearches");
  const li = document.createElement("li");
  const locationLink = document.createElement("a");

  if (noSearches) {
    noSearches.remove();
  }

  if (typedLocation === "") {
    locationLink.textContent = nearest;
    PreviousLocation(locationLink, li);
    li.append(locationLink, ` - ${currentFeel}\u00B0F`);
    previousSearches.append(li);
  } else {
    locationLink.textContent = typedLocation;
    PreviousLocation(locationLink, li);
    li.append(locationLink, ` - ${currentFeel}\u00B0F`);
    previousSearches.append(li);
  }
};

const PreviousLocation = (locationLink, li) => {
  let PREVIOUS_URL = `${BASE_URL}${locationLink.textContent}${JSON_URL}`;
  locationLink.href = PREVIOUS_URL;

  locationLink.addEventListener("click", (e) => {
    e.preventDefault();

    typeLocation.value = locationLink.textContent;
    h2.textContent = typeLocation.value;
    li.remove();

    fetch(PREVIOUS_URL)
      .then((res) => res.json())
      .then((json) => {
        const { current_condition, nearest_area, weather } = json;
        loopThroughArrs(current_condition, nearest_area, weather);
      })
      .catch((e) => {
        errors(e);
      });
  });
};

const tempConversionForm = document.querySelector("#tempConversionForm");

const tempToConvert = document.querySelector("#temp-to-convert");
const toCelcius = document.querySelector("#to-c");
const toFahrenheit = document.querySelector("#to-f");
const convertedTempButton = document.querySelector("#convertedTempButton");
const convertedTempResult = document.querySelector("#convertedTempResult");

let selected = null;

toCelcius.addEventListener("click", (e) => {
  selected = "celcius";
});

toFahrenheit.addEventListener("click", (e) => {
  selected = "fahrenheit";
});

tempConversionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let result = 0;

  if (selected === "celcius") {
    if (tempToConvert.value) {
      result = `${((tempToConvert.value - 32) * (5 / 9)).toFixed(2)}\u00B0C`;
    }
  } else if (selected === "fahrenheit") {
    if (tempToConvert.value) {
      result = `${(tempToConvert.value * (9 / 5) + 32).toFixed(2)}\u00B0F`;
    }
  }

  convertedTempResult.textContent = result;
});

// Switches between dark & light modes
const darkLightMode = () => {
  const modeSwticher = document.querySelector("#modeSwticher");
  const modeName = document.querySelector("#modeName");
  const body = document.querySelector("#body");
  const header = document.querySelector("#header");
  const tempConversionWidget = document.querySelector("#tempConversionWidget");
  const main = document.querySelector("main");
  const weatherHistory = document.querySelector("#weatherHistory");

  const iconImg = document.querySelector("#iconImg");

  modeSwticher.addEventListener("click", () => {
    if (modeName.textContent === "LIGHT") {
      modeName.textContent = "DARK";

      if (iconImg.alt === "sun") {
        iconImg.src = darkSunIcon;
        iconImg.alt = "darkSun";
      } else if (iconImg.alt === "rain") {
        iconImg.src = darkRainIcon;
        iconImg.alt = "darkRain";
      } else if (iconImg.alt === "snow") {
        iconImg.src = darkSnowIcon;
        iconImg.alt = "darkSnow";
      }
      fullDarkMode = true;
      fullLightMode = false;

      body.classList.remove("body-lightMode");
      header.classList.remove("header-lightMode");
      tempConversionWidget.classList.remove("tempConversionWidget-lightMode");
      main.classList.remove("main-lightMode");
      weatherHistory.classList.remove("weatherHistory-lightMode");

      body.classList.add("body-darkMode");
      header.classList.add("header-darkMode");
      tempConversionWidget.classList.add("tempConversionWidget-darkMode");
      main.classList.add("main-darkMode");
      weatherHistory.classList.add("weatherHistory-darkMode");
    } else if (modeName.textContent === "DARK") {
      modeName.textContent = "LIGHT";

      if (iconImg.alt === "darkSun") {
        iconImg.src = sunIcon;
        iconImg.alt = "sun";
      } else if (iconImg.alt === "darkRain") {
        iconImg.src = rainIcon;
        iconImg.alt = "rain";
      } else if (iconImg.alt === "darkSnow") {
        iconImg.src = snowIcon;
        iconImg.alt = "snow";
      }
      fullLightMode = true;
      fullDarkMode = false;

      body.classList.remove("body-darkMode");
      header.classList.remove("header-darkMode");
      tempConversionWidget.classList.remove("tempConversionWidget-darkMode");
      main.classList.remove("main-darkMode");
      weatherHistory.classList.remove("weatherHistory-darkMode");

      body.classList.add("body-lightMode");
      header.classList.add("header-lightMode");
      tempConversionWidget.classList.add("tempConversionWidget-lightMode");
      main.classList.add("main-lightMode");
      weatherHistory.classList.add("weatherHistory-lightMode");
    }
  });
};

darkLightMode();
