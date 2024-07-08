import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./header.css";

export default function Header() {
  const { t } = useTranslation("header");
  const headerRef = useRef(null);
  const navigationRef = useRef(null);

  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationVisible((prev) => !prev);
  };

  useEffect(() => {
    navigationRef.current.style.opacity = "0";
    navigationRef.current.style.visibility = "hidden";
  }, []);

  useEffect(() => {
    if (isNavigationVisible) {
      navigationRef.current.style.visibility = "visible";
      navigationRef.current.style.opacity = "1";
      navigationRef.current.style.zIndex = "10";
      gsap.fromTo(
        navigationRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power1.inOut" }
      );
    } else {
      gsap.fromTo(
        navigationRef.current,
        { clipPath: "inset(0% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.1,
          ease: "power1.inOut",
          onComplete: () => {
            navigationRef.current.style.opacity = "0";
            navigationRef.current.style.visibility = "hidden";
            navigationRef.current.style.zIndex = "-1";
          },
        }
      );
    }
  }, [isNavigationVisible]);

  return (
    <>
      <header
        ref={headerRef}
        className="padding-container p-t-20 container flex sb fixed mix-blend-diff aic">
          <span className="font-family-lb index gc-1">BT</span>
          <span
            className="nav-link p-8-4 pointer"
            onClick={toggleNavigation}
          >
            Menu
          </span>
      </header>

      <div
        className={`container bg-black padding-container navigation  ${
          isNavigationVisible ? "visible" : ""
        }`}
        ref={navigationRef}
      >
        <div className=" p-t-20 container gc-1-13 flex sb aic">
          <span className="font-family-lb index gc-1">BT</span>
          <div className="flex col-g-32-16 gc-13">
            <ul className="flex sb">
              <li className="p-8-4" onClick={toggleNavigation}>
                <a href="#" className=" p-8-4 actual-lang body">
                  FR
                </a>
              </li>
              <li className="p-8-4 " onClick={toggleNavigation}>
                <a href="#" className="p-8-4">
                  EN
                </a>
              </li>
            </ul>
            <span className="nav-link p-8-4 pointer" onClick={toggleNavigation}>
              Menu
            </span>
          </div>
        </div>
        <div className=" grid gc-1-13 r-g-64 m-t-14-rem">
          <nav className="gc-1-5 ">
            <ul className="r-g-32 grid">
              <li className="h2 font-family-lb">
                <a href="#" className="no-underline" onClick={toggleNavigation}>
                  Projets
                </a>
              </li>
              <li className="h2 font-family-lb">
                <a href="#" className="no-underline" onClick={toggleNavigation}>
                  Galerie
                </a>
              </li>
              <li className="h2 font-family-lb">
                <a href="#" className="no-underline" onClick={toggleNavigation}>
                  À propos
                </a>
              </li>
            </ul>
          </nav>
          <div className="grid r-g-32">
            <div>
              <p className="h5 m-b-16">
                En recherche d'une alternance de 2 ans, à partir de septembre
                2024, sur Paris.
              </p>
              <a
                href="mailto:billel.tighidet@mmibordeaux.com"
                className="h4 underline-hover-left-right"
              >
                <p>billel.tighidet@mmibordeaux.com</p>
              </a>
            </div>
            <nav>
              <ul className="grid r-g-8">
                <li className="underline-hover-left-right infinite">
                  <a href="#" className="nav-link flex aic col-g-8 ">
                    Téléchargez mon CV{" "}
                    <img
                      src="/img/thin-arrow-white-down.svg"
                      alt="icône flèche vers le bas"
                    />
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link no-underline">
                    Behance
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link no-underline">
                    Github
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link no-underline">
                    Linkedin
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
