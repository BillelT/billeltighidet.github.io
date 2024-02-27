// Declare global variables used in this script
const navLinks = ["Projets", "Contact", "Mon CV"];
const Dates = new Date();
const year = Dates.getFullYear();
const mockUps = document.querySelectorAll(".mockUp");

// mobile menu class adding and CTA's innerText adaptation
document.addEventListener("click", (e) => {
  if (e.target.innerText === "Menu") {
    mobileNavClicked.classList.toggle("mobile-nav-clicked");
    offbeat1.classList.toggle("mobile-nav-clicked");
    offbeat2.classList.toggle("mobile-nav-clicked");
    offbeat3.classList.toggle("mobile-nav-clicked");
    mobileNav.innerText = "X";
  } else if (e.target.innerText === "X") {
    mobileNavClicked.classList.toggle("mobile-nav-clicked");
    offbeat1.classList.toggle("mobile-nav-clicked");
    offbeat2.classList.toggle("mobile-nav-clicked");
    offbeat3.classList.toggle("mobile-nav-clicked");
    mobileNav.innerText = "Menu";
  }
  if (navLinks.includes(e.target.innerText)) {
    mobileNavClicked.classList.toggle("mobile-nav-clicked");
    offbeat1.classList.toggle("mobile-nav-clicked");
    offbeat2.classList.toggle("mobile-nav-clicked");
    offbeat3.classList.toggle("mobile-nav-clicked");
    mobileNav.innerText = "Menu";
  }
});

// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     loader.innerText = "Welcome !"
//   }, 600)
//   setTimeout(() => {
//     loader.style.opacity = 0
//     loader.style.zIndex = -1
//   }, 1100)
// })

mockUps.forEach(function hoverPlay(mockUp) {
  mockUp.play();
  mockUp.addEventListener("mouseenter", () => {
    mockUp.play();
  });
  mockUp.addEventListener("mouseleave", () => {
    mockUp.pause();
  });
});

credits.innerText = "© " + year + " Billel Tighidet Tous droits réservés";
