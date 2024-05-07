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

window.addEventListener("scroll", () => {
  headTranslateLeft.forEach((head) => {
    const rect = head.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const leftTranslate = rect.top / 3;
      head.style.transform = "translateX(" + leftTranslate + "px)";
    }
  });
  headTranslateRight.forEach((head) => {
    const rect = head.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const rightTranslate = -rect.top / 3;
      head.style.transform = "translateX(" + rightTranslate + "px)";
    }
  });
});

header.addEventListener("click", (e) => {
  const childElementCount = e.target.childElementCount;
  const targetText = e.target.innerText;
  if (targetText === "Menu" && childElementCount === 0) {
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
