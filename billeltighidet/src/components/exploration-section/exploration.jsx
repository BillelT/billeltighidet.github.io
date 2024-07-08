import React, { useState } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import "./exploration.css";

export default function Exploration() {
  const { t } = useTranslation("exploration");
  const [openSections, setOpenSections] = useState([]);

  const handleToggle = (index) => {
    const isOpen = openSections.includes(index);

    if (isOpen) {
      gsap.to(`.open[data-index="${index}"]`, {
        maxHeight: 0,
        opacity: 0,
        marginTop: 0,
        duration: 1.2,
        ease: "power1.inOut",
        onComplete: () => {
          setOpenSections(openSections.filter((i) => i !== index));
        },
      });
    } else {
      setOpenSections([...openSections, index]);
      gsap.fromTo(
        `.open[data-index="${index}"]`,
        {
          maxHeight: 0,
          opacity: 0,
          marginTop: 0,
        },
        {
          maxHeight: 500, // Think to update value when text is dynamic
          opacity: 1,
          marginTop: 64,
          duration: 1.2,
          ease: "power1.inOut",
        }
      );
    }
  };

  return (
    <section className="container padding-container grid r-g-128-256 bg-black">
      <h2 className="h2 font-family-lb">Explorations du moment</h2>
      <div className="grid r-g-48 jic">
        {[0, 1, 2, 3, 4].map((index) => (
          <article key={index} className="p-b-32 border-bottom">
            <div className="flex sb aic">
              <h3 className="h3">Three.js Journey {index + 1}</h3>
              <p className="body">5 chapitres complétés sur 7</p>
              <img
                src="/img/chevrons-dropdown-menu.svg"
                alt="icône de chevrons"
                onClick={() => handleToggle(index)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="open f-d-c aife" data-index={index}>
              <p className="m-b-32">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                itecto!
              </p>
              <p className="m-b-48 meta light">
                Date de fin prévue : 20 juillet 2024
              </p>
              <button className="bg-black">
                <a
                  href="#"
                  className="medium flex col-g-16 p-16-8 border-bottom"
                >
                  site Three.js Journey {index + 1}
                  <img
                    className="rotate-45"
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône fléche diagonale"
                  />
                </a>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
