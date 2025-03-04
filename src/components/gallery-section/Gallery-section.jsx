import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import "./Gallery-section.css";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection({ completeGallery, cta, title }) {
  const { t } = useTranslation("gallery");
  const location = useLocation();
  const parallaxArticles = useRef([]);

  useEffect(() => {
    const elements = parallaxArticles.current.filter((el) => el !== null);
    const animations = elements.map((element) =>
      gsap.to(element, {
        y: -50,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      })
    );

    return () => {
      animations.forEach((animation) => animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      className={`container padding-container grid r-g-128-256 ${
        location.pathname === "/gallery" ? "" : "m-t-256-512"
      }`}
      id="gallery"
    >
      {title && (
        <>
          <h2 className="h2 font-family-zodiak gc-1-13 thin"> {t(`h2`)} </h2>
        </>
      )}

      <div className="r-g-128 grid g-t-c-12 gc-1-13">
        {[
          {
            src: "/img/gallery-element/Anto Animation.mp4",
            text1: "Anto",
            text2: "product Animation",
            uniqueClasses: "js-c gc-f-1-8 as-16-9",
            videoType: "video/mp4",
            isPresent: true,
          },
          {
            src: "/img/gallery-element/gameboy-in-nature.webm",
            text1: "Nintendo",
            text2: "Gameboy in nature",
            uniqueClasses: "js-c gc-f-6-10 as-9-16",
            videoType: "video/webm",
            isPresent: true,
          },
          {
            src: "/img/gallery-element/kc-blue-smoke.webm",
            text1: "Karmine Corp",
            text2: "Blue smoke",
            uniqueClasses: "js-c gc-f-1-8 as-16-9",
            videoType: "video/webm",
            isPresent: true,
          },
          {
            src: "/img/gallery-element/laylow-mr-anderson.webm",
            text1: "Laylow",
            text2: "Mr. Anderson jacket",
            uniqueClasses: "js-e gc-f-7-11 as-9-16",
            videoType: "video/webm",
            isPresent: true,
          },
          {
            src: "/img/gallery-element/lightning-sword.mp4",
            text1: "Version of",
            text2: "Lightning sword",
            uniqueClasses: "gc-f-1-6 as-538-675",
            videoType: "video/mp4",
            isPresent: completeGallery,
          },
          {
            src: "/img/gallery-element/sword-in-stone.mp4",
            text1: "Version of",
            text2: "Sword in stone",
            uniqueClasses: "js-e gc-f-8-13 as-538-675 m-t-128-256",
            videoType: "video/mp4",
            isPresent: completeGallery,
          },
          {
            src: "/img/gallery-element/donuts.webp",
            text1: "Version of",
            text2: "The famous donut",
            uniqueClasses: "gc-f-3-11 as-16-9",
            alt: "Visuel 3D, version du 'fameux donut'",
            isPresent: completeGallery,
          },
        ].map(
          (item, index) =>
            item.isPresent && (
              <article
                key={index}
                ref={(el) => (parallaxArticles.current[index] = el)}
                className={`flex f-d-c parallax aife ${item.uniqueClasses}`}
              >
                {item.videoType && (
                  <div className="video-container">
                    <video
                      muted
                      autoPlay
                      loop
                      // controls
                      playsInline
                      preload="none"
                      className="video"
                      onClick={(e) => {
                        e.target.muted = !e.target.muted;
                        console.log(e.target.muted);
                      }}
                    >
                      <source src={item.src} type={item.videoType} />
                    </video>
                  </div>
                )}
                {item.alt && (
                  <div className="img-container">
                    <img src={item.src} alt={item.alt}></img>
                  </div>
                )}
                <p className="meta light">{item.text1}</p>
                <p className="meta light">{item.text2}</p>
              </article>
            )
        )}

        {cta && (
          <>
            <a
              href="/gallery"
              className=" gc-1-13 underline-hover-left-right js-c  magnet-element larger-cursor m-t-128 h4 medium flex p-16-32 col-g-16 aic"
            >
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
          </>
        )}
      </div>
    </section>
  );
}
