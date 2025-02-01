import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursor.css";

export default function Cursor() {
  const cursor = useRef(null);
  const outline = useRef(null);

  useEffect(() => {
    gsap.set(cursor.current, {
      xPercent: -50,
      yPercent: -50,
    });

    gsap.set(outline.current, {
      xPercent: -50,
      yPercent: -50,
    });

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      gsap.to(cursor.current, {
        duration: 0.2,
        x,
        y,
        ease: "power2.out",
      });

      gsap.to(outline.current, {
        duration: 0.4,
        x: x + 6,
        y: y + 6,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.set(outline.current, {
        xPercent: -100,
        yPercent: -100,
        scaleX: 1.2,
        scaleY: 1.2,
      });

      gsap.to(outline.current, {
        duration: 0.4,
        backgroundColor: "#ffffff",
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.set(outline.current, {
        xPercent: -50,
        yPercent: -50,
        scaleX: 1,
        scaleY: 1,
      });
      gsap.to(outline.current, {
        duration: 0.4,
        backgroundColor: "transparent",
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    // window.addEventListener("mousedown", handleMouseEnter);
    // window.addEventListener("mouseup", handleMouseLeave);

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
      <div ref={cursor} className="cursor mix-blend-diff" />
      <div ref={outline} className="cursor-outline mix-blend-diff" />
    </>
  );
}
