import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./hero.css";

export default function Hero() {
  const { t } = useTranslation("hero");
  const scrollLineRef = useRef(null)




  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(scrollLineRef.current, {
      scaleY: 1,
      duration: 1.4,
      ease: "power2.inOut",
      onComplete: () => {
        scrollLineRef.current.style.transformOrigin = "bottom"
      }
    })
    .to(scrollLineRef.current, {
      scaleY: 0,
      duration: 1.4,
      ease: "power2.inOut",
      onComplete: () => {
        scrollLineRef.current.style.transformOrigin = "top"
      }
    })
  }, []);

  return (
    <>
    <section className="hero flex f-d-c padding-container ">

        <h1 className="h1 font-family-lb">
            <span>Designer </span>
            <span className="space">& </span>
            Développeur Créatif
            <span className="me">Billel Tighidet</span>
        </h1>
      <div className=" animated-scroll-line  asc" ref={scrollLineRef}></div>

    </section>
    </>
  );
}
