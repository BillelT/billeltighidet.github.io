// Dependencies
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Navigation({
  isNavigationVisible,
  toggleNavigation,
  lenis,
  isLoaded,
  isExperiencePage,
}) {
  // Translation Objects
  const { t, i18n } = useTranslation("header");
  const navigationLinks = t("navigationLinks", { returnObjects: true }) || {};
  const socials = t("socials", { returnObjects: true }) || {};

  // References
  const navigation = useRef();

  const changeLanguage = (lng) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  };

  useEffect(() => {
    if (navigation.current) {
      navigation.current.style.opacity = "0";
      navigation.current.style.visibility = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!isLoaded && isExperiencePage) return;

    if (isNavigationVisible) {
      gsap.set(navigation.current, {
        clipPath: "inset(100% 0% 0% 0%)",
      });
      gsap.to(navigation.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          navigation.current.style.visibility = "visible";
          navigation.current.style.opacity = "1";
          navigation.current.style.zIndex = "10";
        },
        onComplete: () => {
          if (lenis) lenis.stop();
        },
      });
    } else {
      gsap.to(navigation.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          navigation.current.style.opacity = "0";
          navigation.current.style.visibility = "hidden";
          navigation.current.style.zIndex = "-1";
          if (lenis) lenis.start();
        },
      });
    }
  }, [isNavigationVisible, lenis, isLoaded]);

  useEffect(() => {
    const langElements = document.querySelectorAll(".actual-lang");
    langElements.forEach((element) => {
      if (element.dataset.lang === i18n.language) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  }, [i18n.language]);

  return (
    <div
      className={`container navigation  ${
        isNavigationVisible ? "visible" : ""
      }`}
      ref={navigation}
    >
      <div className="gc-1-13 flex sb aic">
        <a
          href="/"
          className="p-t-b-20 padding-container magnet-element larger-cursor"
        >
          <span className="font-family-zodiak index gc-1">BT</span>
        </a>
        <div className="flex col-g-32-16 aic">
          <ul
            className={`flex sb actual-lang-container ${
              i18n.language.includes("en") ? "lang-2" : ""
            } `}
          >
            <li className="p-t-b-2">
              <p
                className={`p-4-8 body pointer light ${
                  i18n.language.includes("fr-FR")
                    ? "actual-lang "
                    : "larger-cursor"
                }`}
                data-lang="fr-FR"
                onClick={() => {
                  changeLanguage("fr-FR");
                  toggleNavigation();
                }}
              >
                FR
              </p>
            </li>
            <li className="p-t-b-2">
              <p
                className={`p-4-8 body pointer  light ${
                  i18n.language.includes("en-EN")
                    ? "actual-lang"
                    : "larger-cursor"
                }`}
                data-lang="en-EN"
                onClick={() => {
                  changeLanguage("en-EN");
                  toggleNavigation();
                }}
              >
                EN
              </p>
            </li>
          </ul>
          <span
            className="nav-link padding-container light pointer light p-t-b-20 magnet-element larger-cursor"
            onClick={() => {
              toggleNavigation();
            }}
          >
            {i18n.language.includes("en") ? "Close" : "Fermer"}
          </span>
        </div>
      </div>
      <div className=" container padding-container gc-1-13 m-t-4-rem r-g-64 aife">
        <nav className="gc-f-1-6">
          <ul className={`r-g-16 grid `}>
            {Object.entries(navigationLinks).map(([key, value]) => (
              <li key={key} className="h2 no-underline larger-cursor">
                <a
                  href={`/${key}`}
                  onClick={() => {
                    toggleNavigation();
                  }}
                  className="font-family-zodiak thin"
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid r-g-32-64 gc-f-7-13 js-e">
          <div>
            <p className="h5 m-b-16">{t(`apprenticeship`)}</p>
            <a
              href="mailto:billel.tighidet@mmibordeaux.com"
              className="h4 underline-hover-left-right black magnet-element larger-cursor"
              target="_blank"
            >
              <p>billel.tighidet@mmibordeaux.com</p>
            </a>
          </div>
          <nav>
            <ul className="grid r-g-8 ms-f-c-g-16 aic">
              <li className="underline-hover-left-right infinite black larger-cursor">
                <a
                  href="/resume-billel-tighidet.pdf"
                  className="nav-link light flex aic col-g-8 "
                  download={true}
                  target="_blank"
                >
                  {t(`resumeCTA`)}
                  <img
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône flèche vers le bas"
                    width={18}
                    height={18}
                  />
                </a>
              </li>
              {Object.entries(socials).map(([key, value]) => (
                <li key={key} className="h2 no-underline larger-cursor">
                  <a
                    href={`${value}`}
                    className="nav-link light no-underline hover-underline white-underline "
                    target="_blank"
                  >
                    {key}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
