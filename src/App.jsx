// Dependencies
import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import Lenis from "lenis";

// Components
import Cursor from "./components/cursor/Cursor.jsx";
import Loader from "./components/loader/Loader.jsx";
import Header from "./components/header/Header.jsx";
import Index from "./pages/Index.jsx";
import Projects from "./pages/Project.jsx";
import Gallery from "./pages/Gallery.jsx";
import About from "./pages/About.jsx";

// Utils
import { applyMagnetEffect } from "./components/magnetEffect/MagnetEffect.jsx";

// Stylesheets
import "./App.css";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { i18n } = useTranslation();
  const [lenis, setLenis] = useState(null);

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 760);

  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isExperiencePage, setIsExperiencePage] = useState(true);

  const handleSetIsLargeScreen = () => {
    setIsLargeScreen(window.innerWidth > 760);
  };

  useEffect(() => {
    const magnetElements = document.querySelectorAll(".magnet-element");
    magnetElements.forEach((element) => {
      applyMagnetEffect({ current: element });
    });
  }, []);

  useEffect(() => {
    const lenisInstance = new Lenis();

    lenisInstance.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(lenisInstance.raf);
    };
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";

    const updateHtmlLang = (lang) => {
      document.documentElement.lang = lang;
    };

    updateHtmlLang(i18n.language);

    const handleLanguageChange = (lng) => {
      updateHtmlLang(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    window.addEventListener("resize", handleSetIsLargeScreen);

    return () => {
      window.removeEventListener("resize", handleSetIsLargeScreen);
    };
  }, [isLargeScreen]);

  useEffect(() => {
    if (!isExperiencePage) return;

    if (!lenis) return;

    if (lenis) {
      lenis.stop();
    }

    if (lenis && isLoaded) {
      lenis.start();
    }
  }, [isLoaded, lenis, isExperiencePage]);

  return (
    <>
      {isLargeScreen && <Cursor />}
      {!isLoaded && isExperiencePage && (
        <Loader progress={progress} lenis={lenis} setIsLoaded={setIsLoaded} />
      )}
      <Header
        lenis={lenis}
        isLargeScreen={isLargeScreen}
        isLoaded={isLoaded}
        isExperiencePage={isExperiencePage}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Index
              setProgress={setProgress}
              isLoaded={isLoaded}
              isExperiencePage={isExperiencePage}
              setIsExperiencePage={setIsExperiencePage}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <Projects
              setProgress={setProgress}
              isLoaded={isLoaded}
              isExperiencePage={isExperiencePage}
              setIsExperiencePage={setIsExperiencePage}
            />
          }
        />
        <Route
          path="/gallery"
          element={<Gallery setIsExperiencePage={setIsExperiencePage} />}
        />
        <Route
          path="/about"
          element={<About setIsExperiencePage={setIsExperiencePage} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
