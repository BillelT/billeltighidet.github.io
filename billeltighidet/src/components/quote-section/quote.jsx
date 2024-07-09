import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./quote.css";

export default function Quote() {
  const { t } = useTranslation("quote");
  const quotesRef = useRef([]);

  useEffect(() => {
    const quote = quotesRef.current.querySelectorAll("article");

    quote.forEach((element) => {
      if (element) {
        gsap.fromTo(
          element,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: element,
              start: "top 95%",
              end: "top 50%",
              scrub: true,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <>
      <section
        ref={quotesRef}
        className="m-t-256-512 container padding-container .r-g-256-512"
        id="quote"
      >
        <article className="flex f-d-c m-b-256-512 quote-container fade-in gc-f-8-13 js-e-s">
          <p className="quote font-family-lb">
            “ La créativité, <br />
            c'est l'intelligence qui s'amuse ”
          </p>
          <p className="ase meta light">Albert Einstein</p>
        </article>
        <article className="flex f-d-c m-b-256-512 quote-container fade-in gc-f-2-13">
          <p className="quote font-family-lb">
            “ La créativité demande du courage ”
          </p>
          <p className="ase meta light">Henri Matisse</p>
        </article>
        <article className="flex f-d-c m-b-256-512  quote-container ase fade-in gc-f-7-13 js-e-s">
          <p className="quote font-family-lb">
            Créer me rend heureux. Littéralement, <br />
            3D art, design, développement, <br />
            Je partage ma vision avec passion, <br />
            En veillant à chaque détail avec discrétion. <br /> <br />
            Rendre chaque expérience mémorable.
          </p>
          <p className="ase meta light">Billel Tighidet</p>
        </article>
      </section>
    </>
  );
}
