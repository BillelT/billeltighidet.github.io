import { StrictMode, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useTranslation } from "react-i18next";
import Cursor from "./components/cursor/cursor";
import Header from "./components/header/header";
import Index from "./pages/index";
import Projects from "./pages/projects";
import Gallery from "./pages/gallery";
import About from "./pages/about";
import i18n from "./i18n";
import "./App.css";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { i18n } = useTranslation();
  const [lenis, setLenis] = useState(null);

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
    const updateHtmlLang = (lang) => {
      document.documentElement.lang = lang;
    };

    updateHtmlLang(i18n.language);

    const handleLanguageChange = (lng) => {
      updateHtmlLang(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <Router>
      {window.innerWidth > 760 && <Cursor></Cursor>}
      <Header lenis={lenis} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
