import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./Quote.css";

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
              start: "top 100%",
              end: "bottom 30%",
              scrub: true,
              // markers: true,
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
        className=" container padding-container .r-g-256-512"
        id="quote"
      >
        <article className="flex f-d-c m-b-256-512  quote-container ase fade-in gc-f-7-13 js-e-s">
          <p className="quote font-family-zodiak">
            {t(`tale.rhymeA`)} <br />
            {t(`tale.rhymeAA`)} <br />
            {t(`tale.rhymeB`)} <br />
            {t(`tale.rhymeBB`)} <br /> <br />
            {t(`tale.rhymeC`)}
          </p>
          <p className="ase meta light">Billel Tighidet</p>
        </article>
      </section>
    </>
  );
}
