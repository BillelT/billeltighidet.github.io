// Declare global variables used in this script
const navLinks = ["Projets", "À propos", "Contact", "Mon CV"];
const smallArrows = document.querySelectorAll(".small-arrow");
const arrows = document.querySelectorAll(".arrow");
const h1 = document.querySelector("h1");
const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
const mockUps = document.querySelectorAll(".mockUp");
const Dates = new Date();
const year = Dates.getFullYear();


// give cursor position 
document.addEventListener('mousemove', (e) => {
  cursor.style.transform = "translate(" + e.pageX + "px," + e.pageY + "px)";
  cursorText.innerText = " ";
  if (e.target.attributes["data-text"]) {
    cursorText.innerText = e.target.attributes["data-text"].textContent;
  }
})


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

// loader animation
document.addEventListener("DOMContentLoaded", () => {
  // force go back top when page refresh
  window.scrollTo(0, 0);
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  setTimeout(() => {
    loaderText.style.opacity = "0.05";
  }, 1300);
  setTimeout(() => {
    loaderText.innerText = "Billel Tighidet";
  }, 1900);
  setTimeout(() => {
    loaderText.style.opacity = "1";
  }, 1900);
  setTimeout(() => {
    loaderText.style.display = "none";
    loader.remove();
    h1.style.opacity = "1";
    document.body.classList.add("scroll");
  }, 4150);
});


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
