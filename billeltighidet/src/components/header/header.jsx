import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./header.css";

export default function Header({ lenis }) {
  const { t, i18n } = useTranslation("header");
  const headerRef = useRef(null);
  const navigationRef = useRef(null);

  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationVisible((prev) => !prev);
  };

  const changeLanguage = (lng) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
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
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power1.inOut",
          onComplete: () => {
            if (lenis) lenis.stop(); // Stop Lenis when navigation is visible
          },
        }
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
            if (lenis) lenis.start(); // Restart Lenis when navigation is hidden
          },
        }
      );
    }
  }, [isNavigationVisible, lenis]);

  useEffect(() => {
    const langElements = document.querySelectorAll(".actual-lang");
    langElements.forEach((element) => {
      if (element.dataset.lang === i18n.language) {
        element.classList.add("active");
        console.log("tst");
      } else {
        element.classList.remove("active");
        console.log("tst2");
      }
    });
  }, [i18n.language]);

  return (
    <>
      <header
        ref={headerRef}
        className="padding-container p-t-20 container flex sb fixed mix-blend-diff aic"
      >
        <span className="font-family-lb index gc-1">BT</span>
        <span
          className="nav-link light p-4-8 pointer light"
          onClick={toggleNavigation}
        >
          Menu
        </span>
      </header>

      <div
        className={`container padding-container navigation  ${
          isNavigationVisible ? "visible" : ""
        }`}
        ref={navigationRef}
      >
        <div className=" p-t-20  gc-1-13 flex sb aic">
          <span className="font-family-lb index gc-1">BT</span>
          <div className="flex col-g-32-16 gc-13">
            <ul className="flex sb">
              <li className="p-t-b-4">
                <p
                  className={`p-4-8 body pointer light ${
                    i18n.language.includes("fr") ? "actual-lang" : ""
                  }`}
                  data-lang="fr"
                  onClick={() => {
                    changeLanguage("fr");
                    toggleNavigation();
                  }}
                >
                  FR
                </p>
              </li>
              <li className="p-t-b-4">
                <p
                  className={`p-4-8 body pointer  light ${
                    i18n.language.includes("en") ? "actual-lang" : ""
                  }`}
                  data-lang="en"
                  onClick={() => {
                    changeLanguage("en");
                    toggleNavigation();
                  }}
                >
                  EN
                </p>
              </li>
            </ul>
            <span
              className="nav-link light p-4-8 pointer light"
              onClick={toggleNavigation}
            >
              Menu
            </span>
          </div>
        </div>
        <div className=" container gc-1-13 r-g-64 m-t-14-rem aife">
          <nav className="gc-f-1-6">
            <ul className="r-g-32 grid">
              <li className="h2 ">
                <a
                  href="#"
                  className="no-underline font-family-lb"
                  onClick={toggleNavigation}
                >
                  {t(`h2.1`)}
                </a>
              </li>
              <li className="h2 ">
                <a
                  href="#"
                  className="no-underline font-family-lb"
                  onClick={toggleNavigation}
                >
                  {t(`h2.2`)}
                </a>
              </li>
              <li className="h2 ">
                <a
                  href="#"
                  className="no-underline font-family-lb"
                  onClick={toggleNavigation}
                >
                  {t(`h2.3`)}
                </a>
              </li>
            </ul>
          </nav>
          <div className="grid r-g-32-64 gc-f-7-13 js-e">
            <div>
              <p className="h5 m-b-16">{t(`apprenticeship`)}</p>
              <a
                href="mailto:billel.tighidet@mmibordeaux.com"
                className="h4 underline-hover-left-right black "
                target="_blank"
              >
                <p>billel.tighidet@mmibordeaux.com</p>
              </a>
            </div>
            <nav>
              <ul className="grid r-g-8 ms-f-c-g-16 aic">
                <li className="underline-hover-left-right infinite black">
                  <a
                    href="/resume-billel-tighidet.pdf"
                    className="nav-link light flex aic col-g-8 "
                    download={true}
                  >
                    {t(`resumeCTA`)}
                    <img
                      src="/img/thin-arrow-white-down.svg"
                      alt="icône flèche vers le bas"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.behance.net/billeltighidet"
                    className="nav-link light no-underline"
                    target="_blank"
                  >
                    Behance
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/BillelT"
                    className="nav-link light no-underline"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/billel-tighidet-76b292234/"
                    className="nav-link light no-underline"
                    target="_blank"
                  >
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
