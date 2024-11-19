import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
// Components
import Hero from "../components/hero/Her.jsx";
import Exploration from "../components/exploration-section/Exploratio.jsx";
import ProjectsSection from "../components/projects-section/Projects-sectio.jsx";
import GallerySection from "../components/gallery-section/Gallery-sectio.jsx";
import Footer from "../components/footer/Foote.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
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
        start: "top 10%",
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
      <Hero page="projects" />
      <div ref={explorationRef} className="r-g-128-256 grid">
        <ProjectsSection count={5} />
        <Exploration />
      </div>
      <div ref={galleryRef}>
        <GallerySection cta={true} title={true} />
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
