import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./gallery-section.css";

export default function GallerySection({ completeGallery, cta, title }) {
  const { t } = useTranslation("gallery");
  const parallaxArticle = useRef([]);

  useEffect(() => {
    const parallaxArticles =
      parallaxArticle.current.querySelectorAll("article");

    parallaxArticles.forEach((element) => {
      if (element) {
        gsap.fromTo(
          element,
          { y: 200 },
          {
            y: 0,
            scrollTrigger: {
              trigger: element,
              start: "top 95%",
              end: "top 10%",
              scrub: true,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section
      className="container padding-container grid m-t-256-512 r-g-128-256"
      id="gallery"
    >
      {title && (
        <>
          <h2 className="h2 font-family-lb gc-1-13"> {t(`h2`)} </h2>
        </>
      )}
      <div className="grid r-g-128-256 g-t-c-12 gc-1-13" ref={parallaxArticle}>
        <article className="flex f-d-c parallax aife js-c gc-f-6-10 as-9-16">
          <div className="video-container ">
            <video controls muted autoPlay className="video ">
              <source
                src="/img/gallery-element/gameboy-in-nature.webm"
                type="video/webm"
              />
            </video>
          </div>
          <p className="meta light">Nintendo</p>
          <p className="meta light">Gameboy in nature</p>
        </article>
        <article className="flex f-d-c parallax aife gc-f-1-8 as-16-9">
          <div className="video-container ">
            <video controls muted autoPlay className="video ">
              <source
                src="/img/gallery-element/kc-blue-smoke.webm"
                type="video/webm"
              />
            </video>
          </div>
          <p className="meta light">Karmine Corp</p>
          <p className="meta light">Blue smoke</p>
        </article>
        <article className="flex f-d-c  aife js-e gc-f-7-11 as-9-16">
          <div className="video-container">
            <video controls muted autoPlay className="video ">
              <source
                src="/img/gallery-element/laylow-mr-anderson.webm"
                type="video/webm"
              />
            </video>
          </div>
          <p className="meta light">Laylow</p>
          <p className="meta light">Mr. Anderson jacket</p>
        </article>

        {completeGallery && (
          <>
            <article className="flex f-d-c parallax aife gc-f-1-6  as-538-675">
              <div className="video-container">
                <video controls muted autoPlay className="video ">
                  <source
                    src="/img/gallery-element/lightning-sword.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <p className="meta light">Version of</p>
              <p className="meta light">Lightning sword</p>
            </article>
            <article className="flex f-d-c parallax aife js-e gc-f-8-13 as-538-675 m-t-256-512">
              <div className="video-container">
                <video controls muted autoPlay className="video ">
                  <source
                    src="/img/gallery-element/sword-in-stone.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <p className="meta light">Version of</p>
              <p className="meta light">Sword in stone</p>
            </article>
            <article className="flex f-d-c parallax aife gc-f-3-11 as-16-9">
              <div className="img-container">
                <img
                  src="/img/gallery-element/donuts.webp"
                  alt="Visuel 3D, version du 'fameux donut' "
                />
              </div>
              <p className="meta light">Version of</p>
              <p className="meta light">The famous donut</p>
            </article>
          </>
        )}

        {cta && (
          <>
            <button className=" gc-1-13  underline-hover-left-right js-c p-12-24 magnet-element larger-cursor">
              <a href="/gallery" className="  h4 medium flex col-g-16 aic">
                <p className="ws-no-w"> {t(`CTA`)} </p>
                <svg
                  className="rotate--45 "
                  width="32"
                  height="32"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.15484 0.655273L9.15493 16.345M9.15493 16.345L17 8.49989M9.15493 16.345L1.31 8.5001"
                    stroke="var(--text-color)"
                  />
                </svg>
              </a>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
