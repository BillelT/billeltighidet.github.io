// Declare global variables used in this script
const navLinks = ["À propos", "Projets", "Contact", "Mon CV"];
const magneticElements = document.querySelectorAll(".has-attraction");
const h1 = document.querySelector("h1");
const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
const mockUps = document.querySelectorAll(".mockUp");
const Dates = new Date();
const year = Dates.getFullYear();
const animationPath = "./motion/logo linkedin b&w.json";
const animationOptions = {
  container: document.getElementById("linkedInAnimation"),
  path: "./motion/logo linkedin b&w.json",
  render: "svg",
  loop: false,
  autoplay: false,
};
const anim = bodymovin.loadAnimation(animationOptions);

function hasAttraction(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const elementX = e.target.offsetLeft;
  const elementY = e.target.offsetTop;
  const dx = mouseX - elementX;
  const dy = mouseY - elementY;
  const attractionSpeed = 0.1;
  const translateX = elementX + dx * attractionSpeed + "px";
  const translateY = elementY + dy * attractionSpeed + "px";
  e.target.style.transform = "translate(" + translateX + "," + translateY + ")";
}

// give cursor position
document.addEventListener("mousemove", (e) => {
  cursor.classList.add("visible");
  cursor.style.transform = "translate(" + e.pageX + "px," + e.pageY + "px)";
});

document.addEventListener("mouseleave", (e) => {
  cursor.classList.remove("visible");
});

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

// playing projects videos on mouse enter and paused when mouse leave
mockUps.forEach(function hoverPlay(mockUp) {
  // video on autoplay and on start to fix bug on phone
  document.addEventListener("DOMContentLoaded", () => {
    mockUp.pause();
  });
  mockUp.addEventListener("mouseenter", () => {
    mockUp.play();
  });
  mockUp.addEventListener("mouseleave", () => {
    mockUp.pause();
  });
});

// credits year autorefresh
credits.innerText = "© " + year + " Billel Tighidet Tous droits réservés";
