// Declare global variables used in this script
const navLinks = ["Projets", "À propos", "Contact", "Mon CV"];
const smallArrows = document.querySelectorAll(".small-arrow");
const arrows = document.querySelectorAll(".arrow");
const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
const mockUps = document.querySelectorAll(".mockUp");
const Dates = new Date();
const year = Dates.getFullYear();

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

function handleSmallArrowThemeChange(event) {
  smallArrows.forEach(function handleImg(arrow) {
    if (event.matches) {
      arrow.src = "./medias/arrow burger menu white.svg";
    } else {
      arrow.src = "./medias/arrow burger menu.svg";
    }
  });
}
handleSmallArrowThemeChange(darkTheme);
darkTheme.addEventListener("change", handleSmallArrowThemeChange);

function handleArrowThemeChange(event) {
  arrows.forEach(function handleImg(arrow) {
    if (event.matches) {
      arrow.src = "./medias/arrow projects white.svg";
    } else {
      arrow.src = "./medias/arrow projects.svg";
    }
  });
}
handleArrowThemeChange(darkTheme);
darkTheme.addEventListener("change", handleArrowThemeChange);

// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     loader.innerText = "Welcome !";
//   }, 600);
//   setTimeout(() => {
//     loader.style.opacity = 0;
//     loader.style.zIndex = -1;
//   }, 1100);
// });

mockUps.forEach(function hoverPlay(mockUp) {
  document.addEventListener("DOMContentLoaded", () => {
    mockUp.pause();
  });
  mockUp.addEventListener("mouseenter", () => {
    mockUp.play();
  });
  mockUp.addEventListener("mouseleave", () => {
    mockUp.pause();
  });
  mockUp.addEventListener("touchstart", () => {
    mockUp.play();
  });
  mockUp.addEventListener("touchend", () => {
    mockUp.pause();
  });
});

credits.innerText = "© " + year + " Billel Tighidet Tous droits réservés";
