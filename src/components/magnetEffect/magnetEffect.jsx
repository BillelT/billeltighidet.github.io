import { gsap } from "gsap";

export const applyMagnetEffect = (elementRef) => {
  const handleMouseMove = (event) => {
    const rect = elementRef.current.getBoundingClientRect();
    const distance = 100;

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    const distanceFromCenter = Math.hypot(x, y);

    if (distanceFromCenter < distance) {
      gsap.to(elementRef.current, {
        x: x * 0.6,
        y: y * 0.6,
        ease: "power2.out",
      });
    } else {
      gsap.to(elementRef.current, {
        x: 0,
        y: 0,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(elementRef.current, {
      x: 0,
      y: 0,
      ease: "power2.out",
    });
  };

  elementRef.current.addEventListener("mousemove", handleMouseMove);
  elementRef.current.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    elementRef.current.removeEventListener("mousemove", handleMouseMove);
    elementRef.current.removeEventListener("mouseleave", handleMouseLeave);
  };
};
