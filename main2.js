// const explain = document.querySelector(".h2");
const header = document.querySelector(".h1");
const pic = document.querySelector(".pic");
const form = document.querySelector("form");

form.addEventListener("click", (event) => {
  event.preventDefault();
  fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
    .then((result) => {
      return result.json();
    })
    .then((astronomy) => {
      function clearform() {
        document.querySelector("div").innerHTML = "";
      }
      clearform();
      const div = document.querySelector("div");
      const h3dis = document.createElement("h3");
      h3dis.textContent = "Explanation";
      div.appendChild(h3dis);

      const paragraphExp = document.createElement("p");
      const strong13 = document.createElement("strong");
      strong13.textContent = `🌙 `;
      const explanation = astronomy.explanation;
      paragraphExp.append(strong13, explanation);
      div.appendChild(paragraphExp);

      //   const h3dis = div.appendChild(document.createElement("h3"));
      //   h3dis.textContent = "Explanation";

      //   const paragraphExp = div.appendChild(document.createElement("p"));
      //   paragraphExp.className = "text";
      //   const strong13 = document.createElement("strong");
      //   strong13.textContent = `🌙 `;
      //   const explanation = astronomy.explanation;
      //   paragraphExp.append(strong13, explanation);
      //   div.append(h3dis, paragraphExp);

      const text = document.querySelector(".text");
      //   text.innerHTML = ""

      // const img = `https://apod.nasa.gov/apod/image/2301/MoonEnhanced_Mirza_4085.jpg`
      //      console.log("astronomy.url.value")
      //       header.append("img")
      //     console.log("astronomy.hdurl")
      const pictureOfTheDay = astronomy.hdurl;
      let newImg = document.createElement("img");
      newImg.setAttribute("src", pictureOfTheDay);
      document.querySelector("div").appendChild(newImg);
      document.querySelector(".pic").appendChild(newImg);
    });
});
// const strong13 = document.createElement("h3");
// strong13.textContent = `Explanation: ` ;
// // paragraphExp = document.createElement("p")
// const exp = astronomy.explanation;
//  console.log(astronomy.explanation);

//  explain.append(strong13);
