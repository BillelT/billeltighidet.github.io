// Declare global variables used in this script
const navLinks = ["À propos", "Projets", "Contact", "Mon CV"];
const headTranslateLeft = document.querySelectorAll(".from-left");
const headTranslateRight = document.querySelectorAll(".from-right");
const imgGrid = document.getElementById("imgGrid");
const cardContainers = document.querySelectorAll(".card-container");
const Dates = new Date();
const year = Dates.getFullYear();
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");
// const magneticElements = document.querySelectorAll(".has-attraction");

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  const leftTranslate = window.scrollY / 5;
  const rightTranslate = -window.scrollY / 5;
  headTranslateLeft.forEach((head) => {
    head.style.transform = "translateX(" + leftTranslate + "px)";
  });
  headTranslateRight.forEach((head) => {
    head.style.transform = "translateX(" + rightTranslate + "px)";
  });
});

header.addEventListener("click", (e) => {
  const targetText = e.target.innerText;
  console.log(e);
  if (targetText === "Menu") {
    menu.classList.toggle("visible");
    header.classList.toggle("visible");
    body.classList.toggle("no-scroll");
    menuButton.innerText = "Close";
  }
  if (targetText === "Close" || navLinks.includes(targetText)) {
    menu.classList.toggle("visible");
    header.classList.toggle("visible");
    body.classList.toggle("no-scroll");
    menuButton.innerText = "Menu";
  }
});

// give cursor position
if ("ontouchstart" in window || navigator.maxTouchPoints) {
  cardContainers.forEach((cardContainer) => {
    cardContainer.addEventListener("touchend", () => {
      cardContainer.classList.toggle("rotate");
    });
  });
} else {
  document.addEventListener("mousemove", (e) => {
    cursor.classList.add("visible");
    cursor.style.transform = "translate(" + e.pageX + "px," + e.pageY + "px)";
  });
  cardContainers.forEach((cardContainer) => {
    cardContainer.addEventListener("mouseenter", () => {
      cardContainer.classList.add("rotate");
    });
    cardContainer.addEventListener("mouseleave", () => {
      cardContainer.classList.remove("rotate");
    });
  });
}

document.addEventListener("mouseleave", (e) => {
  cursor.classList.remove("visible");
});

// credits year autorefresh
credits.innerText = "© " + year + " Billel Tighidet Tous droits réservés";

// function hasAttraction(e) {
//   const mouseX = e.clientX;
//   const mouseY = e.clientY;
//   const elementX = e.target.offsetLeft;
//   const elementY = e.target.offsetTop;
//   const dx = mouseX - elementX;
//   const dy = mouseY - elementY;
//   const attractionSpeed = 0.1;
//   const translateX = elementX + dx * attractionSpeed + "px";
//   const translateY = elementY + dy * attractionSpeed + "px";
//   e.target.style.transform = "translate(" + translateX + "," + translateY + ")";
// }

// // loader animation
// document.addEventListener("DOMContentLoaded", () => {
//   // force go back top when page refresh
//   window.scrollTo(0, 0);
//   if ("scrollRestoration" in history) {
//     history.scrollRestoration = "manual";
//   }
//   setTimeout(() => {
//     loaderText.style.opacity = "0.05";
//   }, 1400);
//   setTimeout(() => {
//     loaderText.innerText = "Billel Tighidet";
//   }, 1950);
//   setTimeout(() => {
//     loaderText.style.opacity = "1";
//   }, 1950);
//   setTimeout(() => {
//     loaderText.style.display = "none";
//     loader.remove();
//     h1.style.opacity = "1";
//     document.body.classList.add("scroll");
//     linkedInAnimation.classList.add("reveal")
//     anim.play();
//   }, 3250);
//   setTimeout(() => {
//     linkedInAnimation.classList.remove("reveal")
//   }, 6830);
// });

// me.addEventListener("mouseenter", () => {
//   linkedInAnimation.classList.add("reveal");
//   anim.goToAndPlay(0);
// });
// me.addEventListener("mouseleave", () => {
//   linkedInAnimation.classList.remove("reveal");
// });
