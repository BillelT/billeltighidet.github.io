import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./footer.css";

export default function Footer() {
  const { t } = useTranslation("footer");

  useEffect(() => {}, []);

  return (
    <>
      <footer className="container m-t-256-512 r-g-128-192">
        <article className=" padding-container container gc-1-13 r-g-64 aic">
          <h2 className="h2 font-family-lb gc-f-1-6 ">
            un projet <br /> en tête
          </h2>
          <nav className="gc-f-9-13 js-s-e">
            <ul>
              <li>
                <a
                  href="#"
                  className="flex sb p-8-16 underline-hover-left-right w-280-315 "
                >
                  Behance
                  <img
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône flèche diagonale"
                    className="rotate--135"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex sb p-8-16 underline-hover-left-right  w-280-315"
                >
                  Github
                  <img
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône flèche diagonale"
                    className="rotate--135"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex sb p-8-16 underline-hover-left-right  w-280-315"
                >
                  Linkedin
                  <img
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône flèche diagonale"
                    className="rotate--135"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </article>
        <article className=" padding-container container gc-1-13 r-g-64 aic internship">
          <div className="gc-f-1-6 m">
            <p className="h5 m-b-32">
              En recherche d'une alternance de 2 ans, à partir de septembre
              2024, sur Paris.
            </p>
            <p className="h5 m-b-4">Mon profil vous intéresse ?</p>
            <a
              href="mailto:billel.tighidet@mmibordeaux.com"
              className="h4 underline-hover-left-right"
            >
              <p>billel.tighidet@mmibordeaux.com</p>
            </a>
          </div>
          <a href="#" className="ls-db">
            <img
              src="/img/thin-arrow-up-white.png"
              alt="icône flèche vers le haut - go top"
              className="go-top"
            />
          </a>
        </article>
        <article className="padding-container p-t-b-16 container gc-1-13 r-g-32 aic border-top g-flex">
          <nav
            className="gc-f-9-13 jse flex
          sb aife ls-ord-2"
          >
            <ul className="flex f-d-c r-g-16 fdc-dr">
              <li className="underline-hover-left-right infinite">
                <a
                  href="/resume-billel-tighidet.pdf"
                  className="nav-link light flex aic col-g-8 "
                  download={true}
                >
                  Téléchargez mon CV
                  <img
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône flèche vers le bas"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Behance
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Github
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Linkedin
                </a>
              </li>
            </ul>
            <a href="#" className="ss-db">
              <img
                src="/img/thin-arrow-up-white.png"
                alt="icône flèche vers le haut - go top"
                className="go-top"
              />
            </a>
          </nav>
          <div className="legal meta light gc-1-13">
            <p>© 2024 Billel Tighidet Tous droits réservés</p>
            <p>
              Hosted on{" "}
              <a
                href="https://www.netlify.com/"
                className="underline"
                target="_blank"
              >
                Netlify
              </a>
            </p>
          </div>
        </article>
      </footer>
    </>
  );
}
