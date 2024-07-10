import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./hero.css";

export default function Hero({ page }) {
  const { t, i18n } = useTranslation("hero");
  const scrollLineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(scrollLineRef.current, {
      scaleY: 1,
      duration: 1.4,
      ease: "power2.inOut",
      onComplete: () => {
        scrollLineRef.current.style.transformOrigin = "bottom";
      },
    }).to(scrollLineRef.current, {
      scaleY: 0,
      duration: 1.4,
      ease: "power2.inOut",
      onComplete: () => {
        scrollLineRef.current.style.transformOrigin = "top";
      },
    });
  }, []);

  return (
    <>
      <section className="hero flex f-d-c padding-container ">
        <h1 className="h1 font-family-lb">
          <p className="flex sb col-g-32 ">
            {t(`${page}.h1`)} <span>{t(`${page}.h2`)}</span>
          </p>
          <p className={`${i18n.language.includes("fr") ? "w-min-c" : ""}`}>
            {t(`${page}.h3`)}
          </p>
          {t(`${page}.h4`)}
          <span className="me name">{t(`${page}.name`)}</span>
        </h1>
        <div className=" animated-scroll-line  asc" ref={scrollLineRef}></div>
      </section>
    </>
  );
}
