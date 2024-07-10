import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./hero.css";

export default function Hero({ page }) {
  const { t } = useTranslation("hero");
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
          <span> {t(`${page}.h1`)} </span>
          <span className="space"> {t(`${page}.h2`)}</span>
          {t(`${page}.h3`)}
          <span className="me name">{t(`${page}.name`)}</span>
        </h1>
        <div className=" animated-scroll-line  asc" ref={scrollLineRef}></div>
      </section>
    </>
  );
}
