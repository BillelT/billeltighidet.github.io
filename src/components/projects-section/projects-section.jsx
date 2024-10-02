import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { applyMagnetEffect } from "../magnetEffect/magnetEffect";
import "./projects-section.css";

export default function ProjectsSection({ count, cta, title }) {
  const { t } = useTranslation("projects");

  useEffect(() => {
    const magnetElements = document.querySelectorAll(".magnet-element");
    magnetElements.forEach((element) => {
      applyMagnetEffect({ current: element });
    });
  }, []);

  return (
    <section className="container padding-container grid m-t-128-256 r-g-128-256">
      {title && (
        <>
          <h2 className="h2 font-family-lb gc-1-13">{t(`h2`)}</h2>
        </>
      )}
      <div className="grid r-g-128-256 gc-1-13">
        {Array.from({ length: count }).map((_, index) => (
          <article key={index} className="project container r-g-64">
            <div
              className={`grid r-g-54 ma-w-500  magnet-container m-p--10 ${
                index % 2 === 1 ? "gc-f-1-6" : "gc-f-9-13"
              }`}
            >
              <div className="grid r-g-32">
                <p className="h4">{`/0${index + 1}`}</p>
                <div className="grid r-g-8">
                  <div className="flex sb col-g-8">
                    <h3 className="h3 medium">{t(`h3.${index + 1}`)}</h3>
                    <p className="year bg-white body light">
                      {t(`year.${index + 1}`)}
                    </p>
                  </div>
                  <p>{t(`typeDuration.${index + 1}`)}</p>
                </div>
                <ul className="skills flex f-d-c r-g-12">
                  <li className="p-l-8 p-b-16 border-bottom ma-w-305">
                    {t(`skills.${index + 1}.skill1`)}
                  </li>
                  <li className="p-l-8 p-b-16 border-bottom ma-w-305">
                    {t(`skills.${index + 1}.skill2`)}
                  </li>
                  <li className="p-l-8 p-b-16 border-bottom ma-w-305">
                    {t(`skills.${index + 1}.skill3`)}
                  </li>
                </ul>
                <p className="body light">{t(`content.${index + 1}`)}</p>
              </div>
              <div className="p-10">
                <button className="border semi-bold button hover-flying magnet-element">
                  <a
                    href={t(`links.${index + 1}`)}
                    className="medium flex col-g-16 p-8-16 aic"
                    target="_blank"
                  >
                    {t(`CTA`)}
                    <img
                      src="/img/thin-arrow-project-white.png"
                      alt="icône flèche diagnole"
                      className=" flying"
                    />
                  </a>
                </button>
              </div>
            </div>
            <div
              className={`img-container ${
                index % 2 === 1 ? "gc-f-6-13" : "gc-f-1-8 ls-gr-1"
              }`}
            >
              <a
                href={t(`links.${index + 1}`)}
                target="_blank"
                className="larger-cursor"
              >
                <img src={`/img/mockups/${index + 1}.png`} alt="mock up" />
              </a>
            </div>
          </article>
        ))}
      </div>
      {cta && (
        <>
          <button className=" gc-1-13 underline-hover-left-right js-c p-12-24 black larger-cursor magnet-element">
            <a href="/projects" className=" h4 medium flex col-g-16 aic ">
              <p className="ws-no-w">{t(`More`)}</p>
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
                  stroke="var(--text-color)"
                />
              </svg>
            </a>
          </button>
        </>
      )}
    </section>
  );
}
