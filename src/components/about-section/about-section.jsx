import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./About-section.css";

export default function AboutSection({ cta }) {
  const { t } = useTranslation("about");

  useEffect(() => {}, []);

  return (
    <>
      <section className="about container padding-container m-t-256-512">
        <div className=" grid gc-1-13 about-text  r-g-64">
          <p className="me gc-1-13 ">{t(`content`)}</p>
          {cta && (
            <>
              <button className="gc-1-13 underline-hover-left-right js-e p-12-24 larger-cursor magnet-element">
                <a href="/about" className=" button medium flex col-g-16 aic">
                  <p className="ws-no-w">{t(`CTA`)}</p>
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
        </div>
      </section>
    </>
  );
}
