import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursor.css";

export default function Cursor() {
  const cursor = useRef(null);
  const outline = useRef(null);
  const observer = useRef(null);

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

  useEffect(() => {
    if (!cursor.current || !outline.current) return;

    gsap.set(cursor.current, { xPercent: -50, yPercent: -50 });
    gsap.set(outline.current, { xPercent: -50, yPercent: -50 });

    window.addEventListener("mousemove", moveCursor);

    const updateHoverEffects = () => {
      document.querySelectorAll(".larger-cursor").forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    updateHoverEffects();

    observer.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          updateHoverEffects();
        } else if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const target = mutation.target;
          if (target.classList.contains("larger-cursor")) {
            target.addEventListener("mouseenter", handleMouseEnter);
            target.addEventListener("mouseleave", handleMouseLeave);
          } else {
            target.removeEventListener("mouseenter", handleMouseEnter);
            target.removeEventListener("mouseleave", handleMouseLeave);
          }
        }
      });
    });

    observer.current.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.current.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursor} className="cursor mix-blend-diff" />
      <div ref={outline} className="cursor-outline mix-blend-diff" />
    </>
  );
}
