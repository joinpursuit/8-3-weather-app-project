const search = (obj) => {
    const area = obj.nearest_area[0].areaName[0].value;
    const region = obj.nearest_area[0].region[0].value;
    const country = obj.nearest_area[0].country[0].value;
    const currently = obj.current_condition[0].FeelsLikeF;
  
    const avgTemp1 = obj.weather[0].avgtempF;
    const maxTemp1 = obj.weather[0].maxtempF;
    const minTemp1 = obj.weather[0].mintempF;
  
    const avgTemp2 = obj.weather[1].avgtempF;
    const maxTemp2 = obj.weather[1].maxtempF;
    const minTemp2 = obj.weather[1].mintempF;
  
    const avgTemp3 = obj.weather[2].avgtempF;
    const maxTemp3 = obj.weather[2].maxtempF;
    const minTemp3 = obj.weather[2].mintempF;
  
    document.querySelector("#curr_search").innerHTML = `<h2>${area}</h2>
        <p><strong>Area:</strong> ${area}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Currently:</strong> Feels Like ${currently} °F</p>`;
  
    document.querySelector("#today").innerHTML = `<h3>Today</h3>
      <p><strong>Average Temperature:</strong> ${avgTemp1} °F</p>
      <p><strong>Max Temperature:</strong> ${maxTemp1} °F</p>
      <p><strong>Min Temperature:</strong> ${minTemp1} °F</p>`;
  
    document.querySelector("#tmw").innerHTML = `<h3>Tomorrow</h3>
      <p><strong>Average Temperature:</strong> ${avgTemp2} °F</p>
      <p><strong>Max Temperature:</strong> ${maxTemp2} °F</p>
      <p><strong>Min Temperature:</strong> ${minTemp2} °F</p>`;
  
    document.querySelector("#after_tmw").innerHTML = `<h3>Day After Tomorrow</h3>
      <p><strong>Average Temperature:</strong> ${avgTemp3} °F</p>
      <p><strong>Max Temperature:</strong> ${maxTemp3} °F</p>
      <p><strong>Min Temperature:</strong> ${minTemp3} °F</p>`;
  };
  
  if (typeof search === "undefined") {
    search = undefined;
  }
  
  if (typeof module !== "undefined") {
    module.exports = search;
  }