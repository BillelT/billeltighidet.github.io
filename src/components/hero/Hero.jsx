import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./Hero.css";

export default function Hero({ page }) {
  const { t, i18n } = useTranslation("hero");
  const title = useRef(null);
  const name = useRef(null);
  const scrollLine = useRef(null);

  const splitText = (text, className) => {
    return text.split("").map((char, index) => {
      if (char === "\n") {
        return <br key={`br-${index}`} />;
      }
      return (
        <span key={index} className={className}>
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(scrollLine.current, {
      scaleY: 1,
      duration: 1.4,
      ease: "power2.inOut",
      onComplete: () => {
        scrollLine.current.style.transformOrigin = "bottom";
      },
    }).to(scrollLine.current, {
      scaleY: 0,
      duration: 1.4,
      ease: "power2.inOut",
      onComplete: () => {
        scrollLine.current.style.transformOrigin = "top";
      },
    });
  }, [scrollLine]);

  useEffect(() => {
    const titleChars = title.current.querySelectorAll(".char");
    const nameChars = name.current.querySelectorAll(".name-char");

    gsap.fromTo(
      titleChars,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.025,
      }
    );
    gsap.fromTo(
      nameChars,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.04,
      }
    );
  }, [name]);

  return (
    <>
      <section className="hero flex f-d-c padding-container m-b-256-512">
        <div className="f-d-c-sm-f-d-r flex aife-sm-ais col-g-16">
          <h1 className="h1 font-family-zodiak thin" ref={title}>
            <p>{splitText(t(`${page}.h1-1`), "char")}</p>
            <p className="medium">{splitText(t(`${page}.h1-2`), "char")}</p>
            <p className="italic">{splitText(t(`${page}.h1-3`), "char")}</p>
          </h1>
          <span ref={name} className="me name">
            {splitText(t(`${page}.name`), "name-char")}
          </span>
        </div>
        <div ref={scrollLine} className="animated-scroll-line asc"></div>
      </section>
    </>
  );
}
