import React from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import "./gallery.css";

export default function Gallery({ count }) {
  const { t } = useTranslation("gallery");

  return (
    <section className="container padding-container grid m-t-256-512 r-g-128-256">
      <h2 className="h2 font-family-lb gc-1-13"> {t(`h2`)} </h2>
      <div className="grid r-g-128-256 g-t-c-12 gc-1-13">
        <article className="flex f-d-c aife js-c gc-f-6-10 as-9-16">
          <div className="video-container ">
            <video controls muted className="video ">
              <source
                src="/img/gallery-element/gameboy-in-nature.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p className="meta light">Nintendo</p>
          <p className="meta light">Gameboy in nature</p>
        </article>
        <article className="flex f-d-c aife gc-f-1-8 as-16-9">
          <div className="video-container ">
            <video controls muted className="video ">
              <source
                src="/img/gallery-element/kc-blue-smoke.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p className="meta light">Karmine Corp</p>
          <p className="meta light">Blue smoke</p>
        </article>
        <article className="flex f-d-c aife js-e gc-f-7-11 as-9-16">
          <div className="video-container">
            <video controls muted className="video ">
              <source
                src="/img/gallery-element/laylow-mr-anderson.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p className="meta light">Laylow</p>
          <p className="meta light">Mr. Anderson jacket</p>
        </article>
        <button className=" gc-1-13 stable underline-hover-left-right js-c p-12-24">
          <a href="#" className=" stable h4 medium flex col-g-16 aic">
            <p className="ws-no-w"> {t(`CTA`)} </p>
            <svg
              className="rotate--45"
              width="32"
              height="32"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.15484 0.655273L9.15493 16.345M9.15493 16.345L17 8.49989M9.15493 16.345L1.31 8.5001"
                stroke="#01010a"
              />
            </svg>
          </a>
        </button>
      </div>
    </section>
  );
}
