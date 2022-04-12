const BASE_URL = "https://wttr.in/";
const JSON_URL = "?format=j1";

const typeLocation = document.querySelector("#typeLocation");
const getWeather = document.querySelector("#getWeather");

getWeather.addEventListener("click", (e) => {
  e.preventDefault();

  const searchWeather = `${BASE_URL}${typeLocation.value}${JSON_URL}`;

  fetch(searchWeather)
    .then((res) => res.json())
    .then((json) => {
      const { current_condition, nearest_area, weather } = json;
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

const h1 = document.createElement("h1");

const Area = document.createElement("h3");
const Region = document.createElement("h3");
const Country = document.createElement("h3");
const Currently = document.createElement("h3");

// TODO: FIGURE OUT VALUES LATER \\
const Sunshine = document.createElement("h3");
const Rain = document.createElement("h3");
const Snow = document.createElement("h3");
// LATER ^^^^ \\

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
  const currentLocationP = document.querySelector("#currentLocation p");
  currentLocationP.textContent = "";

  const tempConversion = document.querySelector("#tempConversion");
  tempConversion.style.display = "grid";

  const upcomingWeather = document.querySelector("#upcomingWeather");
  upcomingWeather.style.display = "grid";

  const caseInsensitive = typeLocation.value.toLowerCase();
  const areaLocation =
    caseInsensitive.charAt(0).toUpperCase() + caseInsensitive.slice(1);
  h1.textContent = areaLocation;

  Area.innerHTML = `<strong> Nearest Area: </strong> ${area.Area.value}`;
  Region.innerHTML = `<strong> Region: </strong> ${area.Region.value}`;
  Country.innerHTML = `<strong> Country: </strong> ${area.Country.value}`;
  Currently.innerHTML = `<strong> Currently: Feels like </strong> ${current.CurrentlyF}\u00B0F`;

  const currentLocation = document.querySelector("#currentLocation");
  currentLocation.style.gridColumn = "2 / 2";
  currentLocation.append(h1, Area, Region, Country, Currently);

  todayAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${weather.Today.avgTempF}\u00B0F`;
  todayMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${weather.Today.maxTempF}\u00B0F`;
  todayMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${weather.Today.minTempF}\u00B0F`;

  tomorrowAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${weather.Tomorrow.avgTempF}\u00B0F`;
  tomorrowMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${weather.Tomorrow.maxTempF}\u00B0F`;
  tomorrowMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${weather.Tomorrow.minTempF}\u00B0F`;

  dayAfterAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${weather.DayAfterTomorrow.avgTempF}\u00B0F`;
  dayAfterMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${weather.DayAfterTomorrow.maxTempF}\u00B0F`;
  dayAfterMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${weather.DayAfterTomorrow.minTempF}\u00B0F`;

  previousSearchesFunc(area.Area.value, areaLocation, current.CurrentlyF);

  const typeLocationForm = document.querySelector("#typeLocationForm");
  typeLocationForm.reset();
};

const newArr = [];

const previousSearchesFunc = (nearest, typedLocation, currentFeel) => {
  const previousSearches = document.querySelector("#previousSearches");
  const noSearches = document.querySelector("#noSearches");
  const li = document.createElement("li");
  const locationLink = document.createElement("a");

  if (noSearches) {
    noSearches.remove();
  }

  // CURRENTLY WORKING ON \\
  // const newArr = [];
  // check through that array to see if the name is already in the UL and if so break out of the append loop

  if (typedLocation === "") {
    locationLink.textContent = nearest;
    savePreviousLocation(locationLink, li);

    li.append(locationLink, ` - ${currentFeel}\u00B0F`);
    newArr.push(locationLink.textContent);

    previousSearches.append(li);
    // for (const newA of newArr) {
    //   if (newA === locationLink.textContent) {
    //     console.log(newA, locationLink.textContent);
    //     break;
    //   } else {
    //     console.log("inside else");
    //     previousSearches.append(li);
    //   }
    // }
  } else {
    locationLink.textContent = typedLocation;
    savePreviousLocation(locationLink, li);

    li.append(locationLink, ` - ${currentFeel}\u00B0F`);
    previousSearches.append(li);
  }
};

const savePreviousLocation = (locationLink, li) => {
  let PREVIOUS_URL = `${BASE_URL}${locationLink.textContent}${JSON_URL}`;
  locationLink.href = PREVIOUS_URL;

  locationLink.addEventListener("click", (e) => {
    e.preventDefault();

    h1.textContent = locationLink.textContent;
    li.append(locationLink);
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

const tempConvertButton = document.querySelector("#tempConvertButton");
tempConvertButton.addEventListener("click", (e) => {
  e.preventDefault();
});

// for dark & light mode later
// const switchModes = document.querySelector("#switchModes");
