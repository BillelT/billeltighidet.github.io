import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.css";

export default function Loader({ progress, setIsLoaded, lenis }) {
  const loader = useRef(null);
  const progressBar = useRef(null);

  useEffect(() => {
    if (!loader.current) return;
    if (!progressBar.current) return;

    gsap.to(progressBar.current, {
      scaleX: progress / 100,
      duration: 1,
      ease: "power2.in",
    });

    if (progress === 100) {
      gsap.to(loader.current, {
        opacity: 0,
        duration: 0.8,
        delay: 2,
        ease: "power2.inOut",
        onComplete: () => {
          setIsLoaded(true);
        },
      });
    }
  }, [progress]);

  return (
    <>
      <section ref={loader} className="loader padding-container col-g-32-16">
        <span ref={progressBar} className="progress-bar"></span>
        <span className="me name loader-name gc-f-8-10 ">Billel Tighidet</span>
      </section>
    </>
  );
}
