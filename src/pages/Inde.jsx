import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
// Components
import Hero from "../components/hero/Her.jsx";
import Quote from "../components/quote-section/Quot.jsx";
import Exploration from "../components/exploration-section/Exploratio.jsx";
import Projects from "../components/projects-section/Projects-sectio.jsx";
import Gallery from "../components/gallery-section/Gallery-sectio.jsx";
import About from "../components/about-section/About-sectio.jsx";
import Footer from "../components/footer/Foote.jsx";

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
        start: "top 70%",
        end: "bottom top",
        // markers: true,
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
          // markers: true,
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
      <Hero page="index" />
      <Quote />
      <div ref={explorationRef}>
        <Exploration />
        <Projects count={2} cta={true} title={true} />
      </div>
      <div ref={galleryRef}>
        <Gallery cta={true} title={true} />
      </div>
      <About cta={true} />
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
