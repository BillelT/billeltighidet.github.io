import React from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import "./projects.css";

export default function Projects({ count }) {
  const { t } = useTranslation("projects");

  return (
    <section className="container padding-container grid bg-black m-t-256 r-g-128-256">
      <h2 className="h2 font-family-lb">Projets</h2>
      <div className="grid r-g-128-256">
        {Array.from({ length: count }).map((_, index) => (
          <article key={index} className="project grid r-g-64">
            <div className="grid r-g-54 ma-w-500">
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
                <button className="border button bg-black">
                  <a href="#" className="medium flex col-g-16 p-16-8">
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
            <div className="img-container">
              <img src="" alt="mock up" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
