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
      ease: "sine.out",
    });

    gsap.to(outline.current, {
      duration: 0.6,
      x: x + 8,
      y: y + 8,
      ease: "sine.out",
    });
  };

  const handleMouseEnter = () => {
    gsap.set(outline.current, {
      xPercent: -75,
      yPercent: -75,
    });

    gsap.to(outline.current, {
      duration: 0.4,
      rotate: 45,
      width: 32,
      height: 32,
      ease: "power2.out",
    });
    gsap.to(cursor.current, {
      duration: 0.4,
      rotate: 45,
      backgroundColor: "#ffffff",
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.set(outline.current, {
      xPercent: -50,
      yPercent: -50,
    });

    gsap.to(outline.current, {
      duration: 0.4,
      width: 16,
      height: 16,
      rotate: 0,
      ease: "power2.out",
    });
    gsap.to(cursor.current, {
      duration: 0.4,
      rotate: 0,
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
      // Supprime les animations GSAP associées aux éléments
      gsap.killTweensOf(cursor.current);
      gsap.killTweensOf(outline.current);

      // Supprime l'observateur des mutations
      if (observer.current) observer.current.disconnect();

      // Supprime l'écouteur de mouvement de souris
      window.removeEventListener("mousemove", moveCursor);

      // Supprime les écouteurs d'événements des éléments avec .larger-cursor
      document.querySelectorAll(".larger-cursor").forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
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
