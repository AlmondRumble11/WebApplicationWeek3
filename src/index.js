import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  let dogList = ["airedale", "chow", "cockapoo", "dhole", "akita"];
  for (var x = 0; x < 5; x++) {
    getDogPics(dogList[x]);
  }
}

function getDogPics(dog) {
  const containerDiv = document.createElement("div");
  const itemDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const wikiHeader = document.createElement("h1");
  const textPara = document.createElement("p");
  const wikiImg = document.createElement("img");

  //asssign classes to elements
  containerDiv.className = "container";
  itemDiv.className = "wiki-item";
  contentDiv.className = "wiki-content";
  imgDiv.className = "img-container";
  wikiHeader.className = "wiki-header";
  textPara.className = "wiki-text";
  wikiImg.className = "wiki-img";

  wikiHeader.innerHTML = dog;
  //get picture for the breed
  let urlPic = "https://dog.ceo/api/breed/" + dog + "/images/random";

  fetch(urlPic, { method: "GET" })
    .then((response) => response.json())
    .then((getpic) => {
      let pic = getpic;
      wikiImg.src = pic.message;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //get text from wikipedia
  let wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + dog;
  fetch(wikiUrl, {
    method: "GET"
  })
    .then((response) => response.json())
    .then((data) => {
      textPara.innerHTML = data.extract;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //console.log(Object.keys(all.message).length);

  //combine all
  itemDiv.appendChild(wikiHeader);
  contentDiv.appendChild(textPara);
  contentDiv.appendChild(imgDiv);
  imgDiv.appendChild(wikiImg);
  itemDiv.appendChild(contentDiv);
  containerDiv.appendChild(itemDiv);

  //add to webpage
  document.body.appendChild(containerDiv);
}
