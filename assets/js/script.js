// Declare global variables used in this script
const dateSpan = document.getElementById("currentDate");
const hourSpan1 = document.getElementById("currentHour1");
const hourSpan2 = document.getElementById("currentHour2");
const navLinks = ["Projets", "Contact", "Mon CV"];

function dateAndhour() {
  let date = new Date(); // create an object date
  let hour = {
    // define hour format
    hour: "numeric",
    minute: "numeric",
  };
  let dateFormate = date.toLocaleDateString("fr-FR", hour); // stocking date and hour in a variable string

  dateSpan.innerText = dateFormate.slice(0, 10);
  hourSpan1.innerText = dateFormate.slice(11, 13);
  hourSpan2.innerText = dateFormate.slice(14, 16);
}

dateAndhour();
setInterval(dateAndhour, 1000);

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
