// Depedencies
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Components
import Plane from "./world/Plane.js";
import { updatePlanesSizeAndPosition } from "./utils/updatePlanesSizeAndPosition.js";
import { handleDisplacement } from "./utils/handleDisplacement.js";

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

  const displacement = {
    raycaster: new THREE.Raycaster(),
    screenCursor: new THREE.Vector2(9999, 9999),
    mousePosition: new THREE.Vector2(9999, 9999),
    prevMousePosition: new THREE.Vector2(0.5, 0.5),
    targetMousePosition: new THREE.Vector2(9999, 9999),
    currentIntersect: null,
    lastPlane: null,
    easeFactor: 1.0,
    aberrationIntensity: [0.0, 0.0, 0.0],
    displacementIntensity: [0.0, 0.0, 0.0],
  };

  useEffect(() => {
    window.addEventListener("pointermove", (event) =>
      handleDisplacement(event, displacement, sizes, planes, isProjectPage)
    );
    return () =>
      window.removeEventListener("pointermove", (event) =>
        handleDisplacement(event, displacement, sizes, planes, isProjectPage)
      );
  }, [isScreenLarger960]);

  useEffect(() => {
    if (!isScreenLarger960 === null) return;
    window.addEventListener("resize", () =>
      updatePlanesSizeAndPosition({
        handleIsScreenLarger960,
        isScreenLarger960,
        sizes,
        camera,
        planes,
        renderer,
        isProjectPage,
      })
    );
    return () =>
      window.removeEventListener("resize", () =>
        updatePlanesSizeAndPosition({
          handleIsScreenLarger960,
          isScreenLarger960,
          sizes,
          camera,
          planes,
          renderer,
          isProjectPage,
        })
      );
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

    planes.current = new Plane(htmlElements, projectsGroup, scene);

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
        start: isProjectPage ? "-15% bottom" : "top 85%",
        end: isProjectPage ? "115% top" : "150% top",
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
      displacement.raycaster.setFromCamera(
        displacement.screenCursor,
        camera.current
      );
      const intersections = displacement.raycaster.intersectObjects(
        planes.current.map(({ plane }) => plane)
      );

      if (intersections.length) {
        const uv = intersections[0].uv;
        displacement.lastPlane = intersections[0];

        if (uv) {
          displacement.prevMousePosition.copy(displacement.targetMousePosition);
          displacement.targetMousePosition.set(uv.x, uv.y);

          displacement.mousePosition.lerp(
            displacement.targetMousePosition,
            displacement.easeFactor
          );

          intersections[0].object.material.uniforms.uMouse.value.copy(
            displacement.mousePosition
          );
          intersections[0].object.material.uniforms.uPrevMouse.value.copy(
            displacement.prevMousePosition
          );

          const planeIndex = planes.current.findIndex(
            ({ plane }) => plane === intersections[0].object
          );
          if (planeIndex !== -1) {
            displacement.displacementIntensity[planeIndex] = Math.min(
              10.0,
              displacement.displacementIntensity[planeIndex] + 0.5
            );
            displacement.aberrationIntensity[planeIndex] = Math.min(
              1.0,
              displacement.aberrationIntensity[planeIndex] + 0.05
            );
            intersections[0].object.material.uniforms.uDisplacementIntensity.value =
              displacement.displacementIntensity[planeIndex];
            intersections[0].object.material.uniforms.uAberrationIntensity.value =
              displacement.aberrationIntensity[planeIndex];
          }
        }

        if (!displacement.currentIntersect) {
          // console.log("mouseenter");

          displacement.easeFactor = 0.02;

          displacement.targetMousePosition.set(uv.x, uv.y);

          displacement.mousePosition.x =
            uv.x +
            (displacement.targetMousePosition.x - uv.x) *
              displacement.easeFactor;

          displacement.mousePosition.y =
            uv.y +
            (displacement.targetMousePosition.y - uv.y) *
              displacement.easeFactor;
        }

        displacement.displacementIntensity.forEach(
          (_, i) =>
            (displacement.displacementIntensity[i] = Math.max(
              0.0,
              displacement.displacementIntensity[i] - 0.05
            ))
        );
        displacement.aberrationIntensity.forEach(
          (_, i) =>
            (displacement.aberrationIntensity[i] = Math.max(
              0.0,
              displacement.aberrationIntensity[i] - 0.005
            ))
        );
        displacement.currentIntersect = intersections[0];
      } else {
        if (displacement.currentIntersect) {
          // console.log("mouseleave");

          displacement.targetMousePosition.copy(displacement.prevMousePosition);
          displacement.easeFactor = 0.05;
        }

        displacement.displacementIntensity.forEach(
          (_, i) =>
            (displacement.displacementIntensity[i] = Math.max(
              0.0,
              displacement.displacementIntensity[i] - 0.15
            ))
        );
        displacement.aberrationIntensity.forEach(
          (_, i) =>
            (displacement.aberrationIntensity[i] = Math.max(
              0.0,
              displacement.aberrationIntensity[i] - 0.005
            ))
        );
        displacement.currentIntersect = null;
      }

      planes.current.forEach(({ plane }, i) => {
        plane.material.uniforms.uDisplacementIntensity.value =
          displacement.displacementIntensity[i];
        plane.material.uniforms.uAberrationIntensity.value =
          displacement.aberrationIntensity[i];
      });

      renderer.current.render(scene, camera.current);
      window.requestAnimationFrame(tick);
    };

    tick();

    updatePlanesSizeAndPosition({
      handleIsScreenLarger960,
      isScreenLarger960,
      sizes,
      camera,
      planes,
      renderer,
      isProjectPage,
    });

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
