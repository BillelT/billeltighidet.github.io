// Depedencies
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { log } from "three/src/nodes/TSL.js";
// import vertexShader from "./shaders/vertex.glsl";
// import fragmentShader from "./shaders/fragment.glsl";

export default function Experience({ isProjectPage }) {
  const [isScreenLarger960, handleIsScreenLarger960] = useState(
    window.innerWidth > 960
  );
  const canvas = useRef(null);
  const renderer = useRef(null);
  const camera = useRef(null);
  const projectsGroup = useRef(new THREE.Group());
  const sizes = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: window.innerWidth / window.innerHeight,
  });
  const planes = useRef([]);

  const textureLoader = new THREE.TextureLoader();

  const updatePlanesSizeAndPosition = () => {
    handleIsScreenLarger960(window.innerWidth > 960);

    sizes.current.width = window.innerWidth;
    sizes.current.height = window.innerHeight;
    sizes.current.aspect = sizes.current.width / sizes.current.height;

    // Met à jour l'orthographic camera
    camera.current.aspect = sizes.current.aspect;
    camera.current.updateProjectionMatrix();

    planes.current.forEach(({ plane, htmlElement, index }) => {
      if (!htmlElement) return;

      const distance = 6 - 0; // Position du plan
      const height = 2 * Math.tan((35 * Math.PI) / 360) * distance;
      const width = height * sizes.current.aspect;

      // Adapter la taille du Plane pour qu'il ne dépasse pas

      if (isScreenLarger960) plane.scale.setScalar(width * 0.325);

      if (!isScreenLarger960) plane.scale.setScalar(width * 0.5);

      if (isScreenLarger960)
        plane.position.x =
          index % 2 === 0
            ? -width / 2 + plane.scale.x * 1
            : width / 2 - plane.scale.x * 0.95;

      // Handle position depending on isScreenLarger960 state because of the media queries
      if (!isScreenLarger960) plane.position.x = 0;
    });

    renderer.current.setSize(sizes.current.width, sizes.current.height);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  useEffect(() => {
    if (!isScreenLarger960 === null) return;
    window.addEventListener("resize", updatePlanesSizeAndPosition);
    return () =>
      window.removeEventListener("resize", updatePlanesSizeAndPosition);
  }, [isScreenLarger960]);

  useEffect(() => {
    const scene = new THREE.Scene();

    projectsGroup.current.clear();
    planes.current.forEach(({ plane }) => {
      plane.geometry.dispose();
      plane.material.dispose();
    });
    planes.current = [];

    const htmlElements = [
      document.querySelector("#project1"),
      document.querySelector("#project2"),
      isProjectPage ? document.querySelector("#project3") : null,
    ].filter(Boolean);

    // World
    const planeGeometry = new THREE.PlaneGeometry(1.6, 0.9);

    htmlElements.forEach((htmlElement, index) => {
      const texture = textureLoader.load(`/img/mockups/${index + 1}.png`);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;

      const planeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);

      if (isScreenLarger960) plane.position.y = index % 2 === 0 ? -3.75 : -6.8;
      if (!isScreenLarger960) plane.position.y = index % 2 === 0 ? -4.15 : -7.9;

      projectsGroup.current.add(plane);
      planes.current[index] = { plane, htmlElement, index };
    });

    scene.add(projectsGroup.current);

    // Camera
    camera.current = new THREE.PerspectiveCamera(
      35,
      sizes.current.aspect,
      0.01,
      10
    );

    camera.current.position.z = 6;
    scene.add(camera.current);

    // Renderer
    renderer.current = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
      alpha: true,
    });

    renderer.current.setSize(sizes.current.width, sizes.current.height);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    gsap.to(camera.current, {
      scrollTrigger: {
        trigger: "#projects",
        start: isProjectPage ? "-10% bottom" : "top 85%",
        end: isProjectPage ? "200% top" : "150% top",
        // markers: true,
        toggleActions: "play none reverse none",
        onUpdate: (self) => {
          camera.current.position.y = -self.progress * 15;
        },
      },
    });

    /**
     * Animate
     */
    const tick = () => {
      // Render
      renderer.current.render(scene, camera.current);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    updatePlanesSizeAndPosition();

    return () => {
      // Traverse the whole scene
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();

          for (const key in child.material) {
            const value = child.material[key];

            if (value && typeof value.dispose === "function") {
              value.dispose();
            }
          }
        }
      });

      renderer.current.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvas} className="webgl" />
    </>
  );
}
