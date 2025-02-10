import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
// Components
import Hero from "../components/hero/Hero.jsx";
import Quote from "../components/quote-section/Quote.jsx";
import Projects from "../components/projects-section/Projects-section.jsx";
import Gallery from "../components/gallery-section/Gallery-section.jsx";
import About from "../components/about-section/About-section.jsx";
import Footer from "../components/footer/Footer.jsx";
import Experience from "../experience/Experience.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Index({ isLargeScreen }) {
  const projects = useRef();
  const gallery = useRef();
  const footer = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power2.inOut" },
    });

    tl.to(":root", {
      "--bg-color": "#01010a",
      "--text-color": "#f9fafb",
      scrollTrigger: {
        trigger: projects.current,
        start: "top 70%",
        end: "bottom top",
        markers: true,
        toggleActions: "play reverse play reverse",
      },
    })
      .to(":root", {
        "--bg-color": "#f9fafb",
        "--text-color": "#01010a",
        scrollTrigger: {
          trigger: gallery.current,
          start: "top 50%",
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
      <Experience isLargeScreen={isLargeScreen} />
      <Quote />
      <div ref={projects}>
        <Projects count={2} cta={true} title={true} />
      </div>
      <div ref={gallery}>
        <Gallery cta={true} title={true} />
      </div>
      <About cta={true} />
      <div ref={footer}>
        <Footer />
      </div>
    </>
  );
}
