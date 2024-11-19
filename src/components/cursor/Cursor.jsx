import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursorr.css";

export default function Cursor() {
  const cursorRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      scaleX: 1,
      scaleY: 1,
    });

    gsap.set(outlineRef.current, {
      xPercent: -50,
      yPercent: -50,
      scaleX: 1,
      scaleY: 1,
    });

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      gsap.to(cursorRef.current, {
        duration: 0.2,
        x,
        y,
        ease: "power2.out",
      });

      gsap.to(outlineRef.current, {
        duration: 0.4,
        x: x + 6,
        y: y + 6,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      // gsap.to(cursorRef.current, {
      //   duration: 0.6,
      //   scaleX: 1.25,
      //   scaleY: 1.25,
      //   ease: "power2.out",
      // });
      // gsap.to(outlineRef.current, {
      //   duration: 0.6,
      //   scaleX: 1.25,
      //   scaleY: 1.25,
      //   ease: "power2.out",
      // });
      gsap.to(cursorRef.current, {
        duration: 0.6,
        backgroundColor: "#f9fafb",
        ease: "power2.out",
      });
      gsap.to(outlineRef.current, {
        duration: 0.6,
        backgroundColor: "#f9fafb",
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, {
        duration: 0.6,
        scaleX: 1,
        scaleY: 1,
        backgroundColor: "transparent",
        ease: "power2.out",
      });

      gsap.to(outlineRef.current, {
        duration: 0.6,
        scaleX: 1,
        scaleY: 1,
        backgroundColor: "transparent",
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const largers = document.querySelectorAll(".larger-cursor");

    largers.forEach((larger) => {
      larger.addEventListener("mouseenter", handleMouseEnter);
      larger.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      largers.forEach((larger) => {
        larger.removeEventListener("mouseenter", handleMouseEnter);
        larger.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor mix-blend-diff" />
      <div ref={outlineRef} className="cursor-outline mix-blend-diff" />
    </>
  );
}
