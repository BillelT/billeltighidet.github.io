import React, { useState } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import "./exploration.css";

export default function Exploration() {
  const { t } = useTranslation("exploration");
  const [openSections, setOpenSections] = useState([]);

  const handleToggle = (index) => {
    const isOpen = openSections.includes(index);
    const rafters = document.querySelectorAll(".rafter");

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
      rafters[index].classList.remove("rafter-open");
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
          maxHeight: 650, // Think to update value when text is dynamic
          opacity: 1,
          marginTop: 64,
          duration: 1.2,
          ease: "power1.inOut",
        }
      );
      rafters[index].classList.add("rafter-open");
    }
  };

  return (
    <section className="container padding-container grid r-g-128-256">
      <h2 className="h2 font-family-lb gc-1-13">{t(`h2`)}</h2>
      <div className="container r-g-48 jic gc-1-13">
        {[0, 1, 2, 3, 4].map((index) => (
          <article key={index} className="p-b-32 border-bottom gc-f-3-11 w-100">
            <div className="container sb aic">
              <h4 className="h4 medium gc-f-1-7 ">
                {t(`dropDownTitle.${index + 1}`)}
              </h4>
              <p className="body light sm-dn gc-7-12">
                {t(`dropDownMeta.${index + 1}`)}
              </p>
              <img
                src="/img/chevrons-dropdown-menu.svg"
                alt="icône de chevrons"
                onClick={() => handleToggle(index)}
                className="gc-13 mix-blend-diff rafter larger-cursor"
              />
            </div>
            <div className="open" data-index={index}>
              <p className="m-b-32 gc-2-8">
                {t(`dropDownContent.${index + 1}`)}{" "}
                {index + 1 === 5 ? (
                  <span className="font-family-lb">
                    {t(`dropDownContent.5bis`)}
                  </span>
                ) : null}
                {index + 1 === 5 ? t(`dropDownContent.5ter`) : null}
              </p>
              <p className="m-b-48 meta light gc-1-9 js-e">
                {t(`dropDownEnd.${index + 1}`)}
              </p>
              <button className=" gc-1-9 js-e underline-hover-left-right">
                <a
                  href={t(`links.${index + 1}`)}
                  className="semi-bold flex col-g-16 p-8-16 aic"
                >
                  {t(`dropDownCTA.${index + 1}`)}
                  <img
                    className="rotate--135 mix-blend-diff"
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
