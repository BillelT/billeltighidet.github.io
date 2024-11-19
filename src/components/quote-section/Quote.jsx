import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./Quot.css";

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
        className=" container padding-container .r-g-256-512"
        id="quote"
      >
        <article className="flex f-d-c m-b-256-512 quote-container fade-in gc-f-8-13 js-e-s">
          <p className="quote font-family-lb">
            “ {t(`quote1.up`)} <br />
            {t(`quote1.down`)} ”
          </p>
          <p className="ase meta light">Albert Einstein</p>
        </article>
        <article className="flex f-d-c m-b-256-512 quote-container fade-in gc-f-2-13">
          <p className="quote font-family-lb">“ {t(`quote2.quote`)} ”</p>
          <p className="ase meta light">Henri Matisse</p>
        </article>
        <article className="flex f-d-c m-b-256-512  quote-container ase fade-in gc-f-7-13 js-e-s">
          <p className="quote font-family-lb">
            {t(`tale.rhymeA`)} <br />
            {t(`tale.rhymeAA`)}, <br />
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
