document.querySelector("form").addEventListener("submit", (event) => {

  event.preventDefault();

  let article = document.querySelector("article");
  let ul = document.querySelector("ul");
  let previous = document.querySelector(".previous");
  let p = document.createElement("p");

  fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
    .then((result) => {
      return result.json();
    })
    .then((weather) => {
      article.innerHTML = `<h1 class="city">${weather.nearest_area[0].areaName[0].value}</h1>`;
      p.innerHTML = `<span class="details"><strong>Area:</strong> ${weather.nearest_area[0].region[0].value}</span>
        <br> <span class="details"><strong>Country:</strong> ${weather.nearest_area[0].country[0].value}</span> 
        <br> <span class="details"><strong>Region:</strong> ${weather.nearest_area[0].region[0].value}</span> 
        <br> <span class="details"><strong>Currently feels like:</strong> ${weather.current_condition[0]["FeelsLikeF"]}</span>`;

      article.appendChild(p);
    });

  // second fetch call for previous searches

  fetch(`https://wttr.in/${event.target.location.value}?format=j1`)
    .then((res) => {
      return res.json();
    })
    .then((weather) => {
      // previous.remove()
      if (previous) {
        previous.remove()
        let li = document.createElement('li')
        li.innerHTML= `${weather.nearest_area[0].areaName[0].value}`
        ul.append(li)

      } else {
        let li = document.createElement('li')
        li.innerHTML= `${weather.nearest_area[0].areaName[0].value}`
        ul.append(li)
      }
      
    });
    
    
});

// let li = (document.createElement("li").innerHTML = `${event.target.location.value}`);

// previous.innerHTML = li;

//  ul.append(li)
