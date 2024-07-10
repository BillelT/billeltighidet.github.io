import React from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import "./projects.css";

export default function Projects({ count }) {
  const { t } = useTranslation("projects");

  return (
    <section className="container padding-container grid m-t-128-256 r-g-128-256">
      <h2 className="h2 font-family-lb gc-1-13">{t(`h2`)}</h2>
      <div className="grid r-g-128-256 gc-1-13">
        {Array.from({ length: count }).map((_, index) => (
          <article key={index} className="project container r-g-64">
            <div
              className={`grid r-g-54 ma-w-500  magnet-container m-p--10 ${
                index % 2 === 0 ? "gc-f-1-6" : "gc-f-9-13"
              }`}
            >
              <div className="grid r-g-32">
                <h4 className="h4">{`/0${index + 1}`}</h4>
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
                <button className="border semi-bold button hover-flying">
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
                index % 2 === 0 ? "gc-f-6-13" : "gc-f-1-8 gr-1"
              }`}
            >
              <img src={`/img/mockups/${index + 1}.png`} alt="mock up" />
            </div>
          </article>
        ))}
      </div>
      <button className=" gc-1-13 underline-hover-left-right js-c p-12-24 black">
        <a href="#" className=" h4 medium flex col-g-16 aic">
          <p className="ws-no-w">Voir plus de projets</p>
          <svg
            className="rotate--45 mix-blend-diff"
            width="32"
            height="32"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.15484 0.655273L9.15493 16.345M9.15493 16.345L17 8.49989M9.15493 16.345L1.31 8.5001"
              stroke="#f9fafb"
            />
          </svg>
        </a>
      </button>
    </section>
  );
}
