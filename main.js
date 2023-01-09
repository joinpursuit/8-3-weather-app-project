const mainApi = `https://wttr.in/`

const art1 = document.querySelector('.art1')
// function capFirLet(word){
    //     return word[0].toUpperCase() + word.substring(1);
    // }
   // let prevSearches = []
    
    const list = document.querySelector('ul')

    let newListItem, img, alt

    function nearArea(city, area){
        let x;
        if (city.toLowerCase() === area.toLowerCase()){
            x= `Area`
        } else{
            x= `Nearest Area`
        }
        return x
    }
    
    function getWeather(x, city){
        headP = city
        let areaNam = x.nearest_area[0].areaName[0].value
        let region = x.nearest_area[0].region[0].value
        let country = x.nearest_area[0].country[0].value
        let feels = x.current_condition[0].FeelsLikeF
        let heading2 =['Today', 'Tomorrow', 'Day After Tomorrow']
        
        let forecast = x.weather
        let sun = forecast[0].hourly[0].chanceofsunshine
        let snow = forecast[0].hourly[0].chanceofsnow
        let rain = forecast[0].hourly[0].chanceofrain

        if (sun > 50){
            img = "./assets/icons8-summer.gif"
            alt = "sun"
        } if (snow > 50){
            img = "./assets/icons8-light-snow.gif"
            alt = "snow"
        } if (rain > 50){
            img = "./assets/icons8-torrential-rain.gif"
            alt = "rain"
        }

        let articless = document.querySelectorAll('.articles article')
        
        for (let i=0; i<forecast.length; i++){
            articless[i].innerHTML = `
            <h2><strong>${heading2[i]}<strong/></h2>
            <p><strong>Average Temperature:</strong> ${forecast[i].avgtempF}°F</p>
            <p><strong>Max Temperature:</strong> ${forecast[i].maxtempF}°F</p>
            <p><strong>Min Temperature:</strong> ${forecast[i].mintempF}°F</p> 
            `
        }
        art1.innerHTML = `
        <img src="${img}" alt="${alt}">
        <h2 class="boldhead">${city}</h2>
        <p><strong>${nearArea(city, areaNam)}:</strong> ${areaNam}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Currently:</strong> Feels Like ${feels}°F
        <p><strong>Chance of Sunshine:</strong> ${sun}</p>
        <p><strong>Chance of Rain:</strong> ${rain}</p>
        <p><strong>Chance of Snow:</strong> ${snow}</p>
        `
    }

    const form = document.querySelector('form')
    form.addEventListener("submit", (e) =>{
        e.preventDefault()
        fetch(`${mainApi}${e.target.location.value}?format=j1`)
        .then((res) => res.json())
        .then((x) => {
            console.log(x)
            art1.innerHTML = '';
            getWeather(x, e.target.location.value)  
            e.target.reset()
        })
        .catch((e)=>{
            console.log(e)
        })
    })

    function appending(x, y){
        x.append(y)
    }
    
    
    // let newArr = []
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        let location = e.target.location.value
        // prevSearches = prevSearches.filter((j) => {
            //     return j !== e.target.location.value
            // })
            // prevSearches.unshift(e.target.location.value)
            
            // prevSearches.push(e.target.location.value)
            
            fetch(`${mainApi}${e.target.location.value}?format=j1`)
            .then((res) => res.json())
            .then((x) =>{
                //console.log(prevSearches)
                
                document.querySelector('ul p').textContent = ``
                
                let newItem = document.createElement('li')
                
                let link = document.createElement('p')
                
                // link.textContent = `${x.nearest_area[0].areaName[0].value} - ${x.current_condition[0].FeelsLikeF}°F`
        // link.href = `${mainApi}${e.target.location.value}?format=j1`
          link.innerHTML = `
          <a href="${mainApi}${e.target.location.value}?format=j1">${x.nearest_area[0].areaName[0].value}</a> - ${x.current_condition[0].FeelsLikeF}°F
          `
          link.addEventListener('click', (y) =>{
            y.preventDefault()
            getWeather(x, location)
          })
        
        newItem.prepend(link)

        //let listss = document.querySelectorAll('.prevList li')

//   listss.forEach((li)=>{
//     appending(list, li)
//   })
        // for (let j of listss){
        //     let a = document.querySelector('a')
         
        // }

        //newItem.id = `list1`
       
        
        
       // let listss = [...document.querySelectorAll('.prevList li')]

        // listss.forEach((li)=>{
        //     list.append(li)
        // })
        
        // console.log(listss, "ul list")

        // }
        
        // let texts = new Set(listss.map(x => x.innerHTML))
        
        // listss.forEach(li => {
        //     if (texts.has(li.innerHTML)){
        //         texts.delete(li.innerHTML)
        //     }
        //     else{
        //         li.remove()
        //     }
        // })
        
        list.append(newItem)
    }).catch((e) => console.log(e))
    //console.log(e)
    // map loc & temp as value, every time list is updated the map value is also updated.
    //a the list items
        })
        
        //separate event listener to update data when prev searches changes
        //print all data on page and add <<a>> 
        // on click trigger same logic as getting weather initially
        

const convert = document.querySelector('.convert')
let conversion = document.querySelector('.convert h4')
let total, sign;

convert.addEventListener('submit', (e)=>{
    e.preventDefault()
    //let num = document.getElementById('#temp-to-convert')
    let input = e.target.toConvert.value
    // let cel = e.target.querySelector('#to-c').value
    // let far = e.target.querySelector('to-F').value
    let radios = document.querySelectorAll('.radio')

    console.log (input)
    if (radios[0].checked){
       total = (input - 32) * 5/9
        sign = '°C'
    } if (radios[1].checked){
        total = (input * 9/5) + 32
        sign = '°F'
    }
    conversion.textContent = `${total.toFixed(2)}${sign}`
})