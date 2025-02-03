import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.css";

export default function Loader() {
  const loadText = useRef();
  useEffect(() => {
    gsap.to;
  }, []);

  return (
    <>
      <section className="loader">
        <p className="loading-text">index</p>
        <p ref={loadText} className="loading-text load">
          index
        </p>
      </section>
    </>
  );
}
