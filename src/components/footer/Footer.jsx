import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation("footer");

  useEffect(() => {}, []);

  return (
    <>
      <footer className="container m-t-256-512 r-g-128">
        <article className=" padding-container container gc-1-13 r-g-64 aic">
          <h2 className="h2 font-family-zodiak gc-f-1-6 thin">
            {t(`h2.1`)} <br /> {t(`h2.2`)}
          </h2>
          <nav className="gc-f-9-13 js-s-e">
            <ul>
              <li>
                <a
                  href="https://www.behance.net/billeltighidet"
                  className="flex sb p-8-16 underline-hover-left-right w-280-315 larger-cursor"
                  target="_blank"
                >
                  Behance
                  <img
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône flèche diagonale"
                    className="rotate--135 mix-blend-diff"
                    width={18}
                    height={18}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/BillelT"
                  className="flex sb p-8-16 underline-hover-left-right  w-280-315 larger-cursor"
                  target="_blank"
                >
                  Github
                  <img
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône flèche diagonale"
                    className="rotate--135 mix-blend-diff"
                    width={18}
                    height={18}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/billel-tighidet/"
                  className="flex sb p-8-16 underline-hover-left-right  w-280-315 larger-cursor"
                  target="_blank"
                >
                  Linkedin
                  <img
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône flèche diagonale"
                    className="rotate--135 mix-blend-diff"
                    width={18}
                    height={18}
                  />
                </a>
              </li>
            </ul>
          </nav>
        </article>
        <article className=" padding-container container gc-1-13 r-g-64 aic internship">
          <div className="gc-f-1-6 m">
            <p className="h5 m-b-32">{t(`apprenticeship.1`)}</p>
            <p className="h5 m-b-4">{t(`apprenticeship.2`)}</p>
            <a
              href="mailto:billel.tighidet@mmibordeaux.com"
              className="h4 underline-hover-left-right larger-cursor magnet-element"
              target="_blank"
            >
              <p>billel.tighidet@mmibordeaux.com</p>
            </a>
          </div>
          <a href="#" className="ls-db">
            <img
              src="/img/thin-arrow-up-white.png"
              alt="icône flèche vers le haut - go top"
              className="go-top mix-blend-diff"
              width={18}
              height={18}
            />
          </a>
        </article>
        <article className="padding-container p-t-b-16 container gc-1-13 r-g-32 aic border-top g-flex">
          <nav
            className="gc-f-9-13 jse flex
          sb aife ls-ord-2"
          >
            <ul className="flex f-d-c r-g-16 fdc-dr">
              <li className="underline-hover-left-right infinite larger-cursor">
                <a
                  href="/resume-billel-tighidet.pdf"
                  className="nav-link light flex aic col-g-8 "
                  download={true}
                >
                  {t(`resumeCTA`)}
                  <img
                    src="/img/thin-arrow-white-down.svg"
                    alt="icône flèche vers le bas"
                    className="mix-blend-diff"
                    width={18}
                    height={18}
                  />
                </a>
              </li>
              <li>
                <a href="/projects" className="nav-link hover-underline">
                  {t(`nav.1`)}
                </a>
              </li>
              <li>
                <a href="/gallery" className="nav-link hover-underline ">
                  {t(`nav.2`)}
                </a>
              </li>
              <li>
                <a href="/about" className="nav-link hover-underline ">
                  {t(`nav.3`)}
                </a>
              </li>
            </ul>
            <a href="#" className="ss-db">
              <img
                src="/img/thin-arrow-up-white.png"
                alt="icône flèche vers le haut - go top"
                className="go-top mix-blend-diff"
              />
            </a>
          </nav>
          <div className="legal meta light gc-1-13">
            <p>{t(`legal.copyright`)}</p>
            <p>
              {t(`legal.host`)}
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
