let menuModal;
let menuBtn;
let closeBtn;
let counter = 0;
let dataDb;
let destinationBtns;
let crewBtns;
let technoBtns;
function init() {
  menuModal = document.getElementById("mobile-nav")
  menuBtn = document.getElementById("header-menuBtn");
  closeBtn = document.getElementById("mobile-nav-closeBtn");
  menuBtn.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);
  destinationBtns = document.querySelectorAll(".destination-content-section-information-buttons_btn");
  destinationBtns.forEach(btn => {
    btn.addEventListener("click", publishPlanets);
  })
  crewBtns = document.querySelectorAll(".crew-content-section-information-buttons_btn");
  crewBtns.forEach(btn => {
    btn.addEventListener("click", publishCrews);
  });
  technoBtns = document.querySelectorAll(".technology-content-section-information-buttons_btn");
  technoBtns.forEach(btn => {
    btn.addEventListener("click", publishTechnology);
  });
  getLocationUrl();
} //End init
window.addEventListener("load", init)
/* Toggle function för mobile menu */
function toggleMenu() {
  menuModal.classList.toggle("open");
}
/*Check url adress  */
async function getLocationUrl() {
  if (window.location.pathname == "/") {
    return;
  } else if (window.location.pathname == "/destination-moon.html") {
    let res = await fetch('./data.json');
    dataDb = await res.json();
    dataDb = dataDb.destinations
    publishPlanets();
  } else if (window.location.pathname == "/crew-commander.html") {
    let res = await fetch('./data.json');
    dataDb = await res.json();
    dataDb = dataDb.crew
    publishCrews();
  } else if (window.location.pathname == "/technology-spaceport.html") {
    let res = await fetch('./data.json');
    dataDb = await res.json();
    dataDb = dataDb.technology
    publishTechnology();
  }
}
/* Show information about choosen planets */
function publishPlanets(e) {
  if (e != undefined) {
    counter = this.getAttribute("data-nr")
  }
  destinationBtns.forEach(btns => {
    btns.classList.remove("active")
  })
  destinationBtns[counter].classList.add("active");

  let titel = document.getElementById("destinationTitel")
  titel.innerHTML = dataDb[counter].name;
  let desc = document.getElementById("destinationDesc");
  desc.innerHTML = dataDb[counter].description;
  let img = document.getElementById("destinationImg");
  img.src = dataDb[counter].images.webp;
  img.alt = dataDb[counter].name + " Image";
  distance = document.getElementById("distance");
  distance.innerHTML = dataDb[counter].distance;
  travelTime = document.getElementById("travelTime");
  travelTime.innerHTML = dataDb[counter].travel
}
/* Show information about choosen crew */
function publishCrews(e) {
  if (e != undefined) {
    counter = this.getAttribute("data-nr")
  }
  crewBtns.forEach(btns => {
    btns.classList.remove("active")
  })
  crewBtns[counter].classList.add("active");

  let crewPosition = document.getElementById("crewPosition");
  crewPosition.innerHTML = dataDb[counter].role;
  let crewName = document.getElementById("crewName");
  crewName.innerHTML = dataDb[counter].name;
  let crewDesc = document.getElementById("crewDesc");
  crewDesc.innerHTML = dataDb[counter].bio;
  let crewImg = document.getElementById("crewImg");
  crewImg.src = dataDb[counter].images.webp
  crewImg.alt = dataDb[counter].name + " Image"
  console.log(crewImg.srs = dataDb[counter].images.webp)
};
/* Show information about choosen technology */
function publishTechnology(e) {
  if (e != undefined) {
    counter = this.getAttribute("data-nr")
  }
  technoBtns.forEach(btns => {
    btns.classList.remove("active")
  })
  technoBtns[counter].classList.add("active");
  let technologyInfo = document.getElementById("technologyInfo");
  technologyInfo.innerHTML = dataDb[counter].name;
  let technologyDesc = document.getElementById("technologyDesc");
  technologyDesc.innerHTML = dataDb[counter].description;
  let technologyImg = document.getElementById("technologyImg");
  if (window.innerWidth > 1024) {
    technologyImg.style.backgroundImage = 'url("' + dataDb[counter].images.portrait + '")'
  } else {
    technologyImg.style.backgroundImage = 'url("' + dataDb[counter].images.landscape + '")'
  }
}