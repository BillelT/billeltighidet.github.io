import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
// Components
import Hero from "../components/hero/Hero.jsx";
import ProjectsSection from "../components/projects-section/Projects-section.jsx";
import GallerySection from "../components/gallery-section/Gallery-section.jsx";
import Footer from "../components/footer/Footer.jsx";
import Experience from "../experience/Experience.jsx";
import Experience2 from "../experience/test.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projects = useRef(null);
  const gallery = useRef(null);
  const footer = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power2.inOut" },
    });

    tl.to(":root", {
      "--bg-color": "#01010a",
      "--text-color": "#f9fafb",
      scrollTrigger: {
        trigger: projects.current,
        start: "top 85%",
        end: "bottom 10%",
        // markers: true,
        toggleActions: "play reverse play reverse",
      },
    })
      .to(":root", {
        "--bg-color": "#f9fafb",
        "--text-color": "#01010a",
        scrollTrigger: {
          trigger: gallery.current,
          start: "top 60%",
          end: "bottom center",
          // markers: true,
          toggleActions: "play none none none",
        },
      })
      .to(":root", {
        "--bg-color": "#01010a",
        "--text-color": "#f9fafb",
        scrollTrigger: {
          trigger: footer.current,
          start: "top 60%",
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
      <Hero page="projects" />
      <Experience2 isProjectPage={true} />
      <div ref={projects} className="r-g-128-256 grid">
        <ProjectsSection count={3} />
      </div>
      <div ref={gallery}>
        <GallerySection cta={true} title={true} />
      </div>
      <div ref={footer}>
        <Footer />
      </div>
    </>
  );
}
