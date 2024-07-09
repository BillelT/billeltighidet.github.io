import React from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import "./gallery.css";

export default function Gallery({ count }) {
  const { t } = useTranslation("gallery");

  return (
    <section className="container padding-container grid m-t-256 r-g-128-256">
      <h2 className="h2 font-family-lb">Galerie</h2>
      <div className="grid r-g-128 g-t-c-12">
        <article className="flex f-d-c gc-6-9">
          <div className="video-container">
            <video controls muted className="video as-9-16">
              <source
                src="/img/gallery-element/gameboy-in-nature.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p className="meta">Nintendo</p>
          <p className="meta">Gameboy in nature</p>
        </article>
        <article className="flex f-d-c gc-1-8">
          <div className="video-container">
            <video controls muted className="video as-16-9">
              <source
                src="/img/gallery-element/kc-blue-smoke.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p className="meta">Nintendo</p>
          <p className="meta">Gameboy in nature</p>
        </article>
        <article className="flex f-d-c gc-7">
          <div className="video-container">
            <video controls muted className="video as-9-16">
              <source
                src="/img/gallery-element/laylow-mr-anderson.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p className="meta">Nintendo</p>
          <p className="meta">Gameboy in nature</p>
        </article>
      </div>
    </section>
  );
}
