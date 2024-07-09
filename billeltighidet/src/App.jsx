import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Quote from "./components/quote-section/quote";
import Exploration from "./components/exploration-section/exploration";
import Projects from "./components/projects/projects";
import Gallery from "./components/gallery/gallery";
import About from "./components/about-section/about";
import Footer from "./components/footer/footer";
import "./App.css"; // Assurez-vous que les variables CSS sont définies ici
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lenis, setLenis] = useState(null);
  const explorationRef = useRef(null);
  const galleryRef = useRef(null);
  const footerRef = useRef(null);

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
        toggleActions: "play reverse play reverse",
      },
    })
      .to(":root", {
        "--bg-color": "#f9fafb",
        "--text-color": "#01010a",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 50%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      })
      .to(":root", {
        "--bg-color": "#01010a",
        "--text-color": "#f9fafb",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

    return () => {
      tl.kill(); // Clean up the timeline
    };
  }, []);

  return (
    <>
      <Header lenis={lenis} />
      <Hero />
      <Quote />
      <div ref={explorationRef}>
        <Exploration />
        <Projects count={2} />
      </div>
      <div ref={galleryRef}>
        <Gallery />
      </div>
      <About />
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
