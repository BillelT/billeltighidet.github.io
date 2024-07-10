import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/hero/hero";
import GallerySection from "../components/gallery-section/gallery-section";
import AboutSection from "../components/about-section/about-section";
import Footer from "../components/footer/footer";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const footerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power2.inOut" },
    });

    tl.to(":root", {
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
      <Hero page="about" />
      <AboutSection />
      <GallerySection />
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
