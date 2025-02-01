// Dependencies
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { applyMagnetEffect } from "../magnetEffect/MagnetEffect.jsx";
import gsap from "gsap";

// Components
import Navigation from "./Navigation.jsx";

// Styles
import "./Header.css";

export default function Header({ lenis }) {
  // Translations Objects
  const { t, i18n } = useTranslation("header");
  const navigationLinks = t("navigationLinks", { returnObjects: true });

  const header = useRef(null);
  const menuButton = useRef(null);

  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationVisible((prev) => !prev);
  };

  return (
    <header ref={header} className="fixed flex sb aic">
      <a
        href="/"
        className="magnet-element padding-container p-t-20 p-b-16 larger-cursor"
      >
        <span className="font-family-zodiak index gc-1">BT</span>
      </a>

      <nav className="flex aic">
        <ul className={`flex col-g-16 `}>
          {Object.entries(navigationLinks).map(([key, value]) => (
            <li key={key} className="light larger-cursor">
              <a href={`/${key}`}>{value}</a>
            </li>
          ))}
        </ul>

        <span
          ref={menuButton}
          className={`nav-link light black pointer padding-container p-t-20 p-b-16 larger-cursor magnet-element`}
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
      />
    </header>
  );
}
