import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Quote from "./components/quote-section/quote";
import Exploration from "./components/exploration-section/exploration";
import Projects from "./components/projects/projects";
import Gallery from "./components/gallery/gallery";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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

  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       // trigger: sectionsRef.current[0],
  //       start: "top top",
  //       end: "bottom top",
  //       scrub: true,
  //       pin: true,
  //       toggleActions: "play reverse play reverse",
  //     }
  //   });
  // }, []);

  return (
    <>
      <Header lenis={lenis}></Header>
      <Hero></Hero>
      <Quote></Quote>
      <Exploration></Exploration>
      <Projects count={2} />
      <Gallery></Gallery>
    </>
  );
}
