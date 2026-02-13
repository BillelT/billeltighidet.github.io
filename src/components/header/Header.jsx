// Dependencies
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

// Components
import Navigation from "./Navigation.jsx";

// Styles
import "./Header.css";

export default function Header({ lenis, isLargeScreen, isLoaded }) {
  // Translations Objects
  const { t, i18n } = useTranslation("header");
  const navigationLinks = t("navigationLinks", { returnObjects: true });

  const header = useRef(null);
  const menuButton = useRef(null);
  const fadeHeroScrolled = useRef([]);

  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const navAnimationSetup = {
    duration: 0.8,
    ease: "power2.in",
    scrollTrigger: {
      trigger: ".hero",
      start: "bottom top",
      end: "150% top",
      toggleActions: "play none none reverse",
    },
  };

  const toggleNavigation = () => {
    setIsNavigationVisible((prev) => !prev);
  };

  useEffect(() => {
    fadeHeroScrolled.current = document.querySelectorAll(".fade-hero-scrolled");

    const ctx = gsap.context(() => {
      gsap.set(menuButton.current, { opacity: 1 });

      if (isLargeScreen) {
        gsap.fromTo(
          menuButton.current,
          { opacity: 0, x: -75 },
          {
            opacity: 1,
            x: 0,
            ...navAnimationSetup,
            onStart: () => {
              menuButton.current.classList.remove("display-none");
            },
            onReverseComplete: () => {
              menuButton.current.classList.add("display-none");
            },
          },
        );

        fadeHeroScrolled.current.forEach((element, index) => {
          gsap.fromTo(
            element,
            { opacity: 1, x: 0 },
            {
              opacity: 0,
              x: 100 / (index + 1),
              ...navAnimationSetup,
            },
          );
        });
      }
    });

    return () => ctx.revert();
  }, [isLargeScreen]);

  return (
    <header ref={header} className="fixed flex sb aic">
      <a
        href="/"
        className="magnet-element padding-container p-t-b-20 larger-cursor"
      >
        <span className="font-family-zodiak index gc-1">BT</span>
      </a>

      <nav className="flex aic relative">
        <ul
          className={`flex col-g-32 ${
            !isLargeScreen ? "display-none" : "padding-container"
          } `}
        >
          {Object.entries(navigationLinks).map(([key, value]) => (
            <li key={key} className="light fade-hero-scrolled larger-cursor">
              <a href={`/${key}`}>{value}</a>
            </li>
          ))}
        </ul>
        <span
          ref={menuButton}
          className={`menu-button nav-link light padding-container black pointer p-t-b-20 larger-cursor magnet-element ${
            isLargeScreen ? "display-none" : ""
          }`}
          onClick={() => {
            toggleNavigation();
          }}
        >
          Menu
        </span>
      </nav>

      <Navigation
        isNavigationVisible={isNavigationVisible}
        toggleNavigation={toggleNavigation}
        lenis={lenis}
        isLoaded={isLoaded}
      />
    </header>
  );
}
