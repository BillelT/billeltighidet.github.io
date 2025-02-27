import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./Hero.css";

export default function Hero({ page, isLoaded, isExperiencePage }) {
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
    if (!scrollLine.current) return;

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
    console.log(isExperiencePage);

    if (!isLoaded && isExperiencePage) return;

    const titleChars = title.current.querySelectorAll(".char");
    const nameChars = name.current.querySelectorAll(".name-char");

    gsap.to(titleChars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.025,
    });
    gsap.to(nameChars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.04,
    });
  }, [name, isLoaded, isExperiencePage]);

  return (
    <>
      <section className="hero flex f-d-c padding-container m-b-256-512">
        <div className="f-d-c-sm-f-d-r grid g-t-c-12 aife-sm-ais col-g-16">
          <h1 className="h1 font-family-zodiak thin gc-f-1-8" ref={title}>
            <p className="ws-no-w">{splitText(t(`${page}.h1-1`), "char")}</p>
            <p className="regular ws-no-w">
              {splitText(t(`${page}.h1-2`), "char")}
            </p>
            <p className="italic ws-no-w">
              {splitText(t(`${page}.h1-3`), "char")}
            </p>
          </h1>
          <span ref={name} className="me name gc-f-8-10">
            {splitText(t(`${page}.name`), "name-char")}
          </span>
        </div>
        <div ref={scrollLine} className="animated-scroll-line asc"></div>
      </section>
    </>
  );
}
