// Declare global variables used in this script
const navLinks = ["Projets", "Contact", "Mon CV"];
const Dates = new Date();
const year = Dates.getFullYear();

// mobile menu class adding and CTA's innerText adaptation
document.addEventListener("click", (e) => {
  if (e.target.innerText === "Menu") {
    mobileNavClicked.classList.toggle("mobile-nav-clicked");
    test2.classList.toggle("mobile-nav-clicked");
    test3.classList.toggle("mobile-nav-clicked");
    mobileNav.innerText = "X";
  } else if (e.target.innerText === "X") {
    mobileNavClicked.classList.toggle("mobile-nav-clicked");
    test2.classList.toggle("mobile-nav-clicked");
    test3.classList.toggle("mobile-nav-clicked");
    mobileNav.innerText = "Menu";
  }
  if (navLinks.includes(e.target.innerText)) {
    mobileNavClicked.classList.toggle("mobile-nav-clicked");
    test2.classList.toggle("mobile-nav-clicked");
    test3.classList.toggle("mobile-nav-clicked");
    mobileNav.innerText = "Menu";
  }
})

// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     loader.innerText = "Welcome !"
//   }, 600)
//   setTimeout(() => {
//     loader.style.opacity = 0
//     loader.style.zIndex = -1
//   }, 1100)
// })

credits.innerText = "Billel Tighidet © " + year + " - Tous droits réservés"