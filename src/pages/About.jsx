import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Components
import Hero from "../components/hero/Hero.jsx";
import AboutSection from "../components/about-section/About-section.jsx";
import Exploration from "../components/exploration-section/Exploration.jsx";
import Projects from "../components/projects-section/Projects-section.jsx";
import Footer from "../components/footer/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const explorationRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power2.inOut" },
    });

    tl.to(":root", {
      "--bg-color": "#01010a",
      "--text-color": "#f9fafb",
      scrollTrigger: {
        trigger: explorationRef.current,
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
      <div ref={explorationRef} className="m-t-256-512">
        <Exploration />
        <Projects count={2} cta={true} title={true} />
        <Footer />
      </div>
    </>
  );
}