// Declare global variables used in this script
const dateSpan = document.getElementById("currentDate");
const hourSpan1 = document.getElementById("currentHour1");
const hourSpan2 = document.getElementById("currentHour2");
const navLinks = ["Projets", "Contact", "Mon CV"];

// mobile menu class adding and CTA's innerText adaptation
document.addEventListener("click", (e) => {
  if (e.target.innerText === "Menu") {
    mobileNavClicked.classList.toggle("mobile-nav-clicked");
    mobileNav.innerText = "X";
  } else if (e.target.innerText === "X") {
    mobileNavClicked.classList.toggle("mobile-nav-clicked");
    mobileNav.innerText = "Menu";
  }
  if (navLinks.includes(e.target.innerText)) {
    mobileNavClicked.classList.toggle("mobile-nav-clicked");
    mobileNav.innerText = "Menu";
  }
});
