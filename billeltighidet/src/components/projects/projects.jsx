import React from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import "./projects.css";

export default function Projects({ count }) {
  const { t } = useTranslation("projects");

  return (
    <section className="container padding-container grid m-t-128-256 r-g-128-256">
      <h2 className="h2 font-family-lb gc-1-13">Projets</h2>
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
                    <h3 className="h3 medium">Low Poly style Kame House</h3>
                    <p className="year bg-white body light">2024</p>
                  </div>
                  <p>Projet personnel, 3jours</p>
                </div>
                <ul className="skills flex f-d-c r-g-12">
                  <li className="p-l-8 p-b-16 border-bottom ma-w-305">
                    Three.js
                  </li>
                  <li className="p-l-8 p-b-16 border-bottom ma-w-305">
                    Three.js
                  </li>
                  <li className="p-l-8 p-b-16 border-bottom ma-w-305">
                    Three.js
                  </li>
                </ul>
                <p className="body light">
                  Ce projet m'a permis d'approfondir mes connaissances en
                  JavaScript, notamment en ce qui concerne le DOM et les
                  interactions qu'il permet de créer. En essayant différentes
                  calculatrices, j'ai pu comprendre par moi-même comment
                  améliorer l'expérience utilisateur
                </p>
              </div>
              <div className="p-10">
                <button className="border semi-bold button">
                  <a href="#" className="medium flex col-g-16 p-8-16 aic">
                    Découvrir le projet{" "}
                    <img
                      src="/img/thin-arrow-white-down.svg"
                      alt="icône flèche diagnole"
                      className="rotate--135"
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
    </section>
  );
}
