const explain = document.querySelector(".h2")
const header = document.querySelector(".h1")
const pic = document.querySelector(".pic")

document.querySelector("form").addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
    .then((result) => {
        return result.json();
      })
      .then((astronomy) => {
    // const strong13 = document.createElement("h3");
    // strong13.textContent = `Explanation: ` ;
    // // paragraphExp = document.createElement("p")
    // const exp = astronomy.explanation;
    //  console.log(astronomy.explanation);
   
    //  explain.append(strong13);

    const h3dis = document.createElement("h3");
      h3dis.textContent = "Explanation";

      const paragraphExp = document.createElement("p");
      const strong13 = document.createElement("strong");
      strong13.textContent = `🌙 `;
      const explanation = astronomy.explanation;
      paragraphExp.append(strong13, explanation);
      explain.append(h3dis, paragraphExp);
      


    //   const img = `https://apod.nasa.gov/apod/image/2301/MoonEnhanced_Mirza_4085.jpg`
    //   console.log("astronomy.url.value")
    //   header.append("img")
    // console.log("astronomy.hdurl")
    // const pictureOfTheDay = astronomy.hdurl
    // let newImg = document.createElement("img");
    // newImg.setAttribute("src", pictureOfTheDay);
    
   
})
})