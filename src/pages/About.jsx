import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
// Components
import Hero from "../components/hero/Hero.jsx";
import AboutSection from "../components/about-section/About-section.jsx";
import Footer from "../components/footer/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function About({ setIsExperiencePage }) {
  const { t } = useTranslation("about");

  const projects = useRef(null);

  useEffect(() => {
    setIsExperiencePage(false);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power2.inOut" },
    });

    tl.to(":root", {
      "--bg-color": "#01010a",
      "--text-color": "#f9fafb",
      scrollTrigger: {
        trigger: projects.current,
        start: "top 100%",
        end: "bottom top",
        // markers: true,
        toggleActions: "play reverse play reverse",
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <Hero page="about" />
      <AboutSection />
      <section className="container padding-container m-t-256-512 m-b-256-512">
        <h2 className="gc-1-13 h3 semi-bold" style={{ textAlign: "center" }}>
          {t(`teasing`)}
        </h2>
      </section>
      <div ref={projects} className="m-t-256-512">
        <Footer />
      </div>
    </>
  );
}
