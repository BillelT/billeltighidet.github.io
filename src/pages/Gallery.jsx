import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
// Components
import Hero from "../components/hero/Hero.jsx";
import GallerySection from "../components/gallery-section/Gallery-section.jsx";
import About from "../components/about-section/About-section.jsx";
import Footer from "../components/footer/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery({ setIsExperiencePage }) {
  const { i18n } = useTranslation();
  const gallery = useRef(null);
  const footer = useRef(null);

  useEffect(() => {
    setIsExperiencePage(false);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power2.inOut" },
    });

    tl.to(":root", {
      "--bg-color": "#F2EEE8",
      "--text-color": "#0E0F14",
      scrollTrigger: {
        trigger: gallery.current,
        start: "top 50%",
        end: "bottom center",
        // markers: true,
        toggleActions: "play none none reverse",
      },
    }).to(":root", {
      "--bg-color": "#0E0F14",
      "--text-color": "#F2EEE8",
      scrollTrigger: {
        trigger: footer.current,
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
      <div ref={gallery}>
        <GallerySection completeGallery={true} />
      </div>
      <About cta={true} />
      <div ref={footer}>
        <Footer />
      </div>
    </>
  );
}
