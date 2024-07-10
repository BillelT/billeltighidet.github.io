import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/hero/hero";
import Quote from "../components/quote-section/quote";
import Exploration from "../components/exploration-section/exploration";
import Projects from "../components/projects-section/projects-section";
import Gallery from "../components/gallery-section/gallery-section";
import About from "../components/about-section/about-section";
import Footer from "../components/footer/footer";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const explorationRef = useRef(null);
  const galleryRef = useRef(null);
  const footerRef = useRef(null);

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
      tl.kill();
    };
  }, []);

  return (
    <>
      <Hero page="index" />
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
