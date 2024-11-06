import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import Hero from "../components/hero/hero";
import GallerySection from "../components/gallery-section/gallery-section";
import About from "../components/about-section/about-section";
import Footer from "../components/footer/footer";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const { i18n } = useTranslation();
  const gallerySectionRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power2.inOut" },
    });

    tl.to(":root", {
      "--bg-color": "#f9fafb",
      "--text-color": "#01010a",
      scrollTrigger: {
        trigger: gallerySectionRef.current,
        start: "top 50%",
        end: "bottom center",
        // markers: true,
        toggleActions: "play none none reverse",
      },
    }).to(":root", {
      "--bg-color": "#01010a",
      "--text-color": "#f9fafb",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        end: "bottom top",
        // markers: true,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <Hero page="gallery" />
      <div ref={gallerySectionRef}>
        <GallerySection completeGallery={true} />
      </div>
      <About cta={true} />
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
