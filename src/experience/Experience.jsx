// Depedencies
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

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

  const displacement = {};

  displacement.raycaster = new THREE.Raycaster();
  displacement.screenCursor = new THREE.Vector2(9999, 9999);
  displacement.mousePosition = new THREE.Vector2(9999, 9999);
  displacement.prevMousePosition = new THREE.Vector2(0.5, 0.5);
  displacement.targetMousePosition = new THREE.Vector2(9999, 9999);
  displacement.currentIntersect = null;
  displacement.lastPlane = null;
  displacement.aberrationIntensity = 0.0;
  displacement.aberrationIntensity2 = 0.0;
  displacement.aberrationIntensity3 = 0.0;
  displacement.easeFactor = 0.0;
  displacement.displacementIntensity = 0.0;
  displacement.displacementIntensity2 = 0.0;
  displacement.displacementIntensity3 = 0.0;

  window.addEventListener("pointermove", (event) => {
    displacement.screenCursor.set(
      (event.clientX / sizes.current.width) * 2 - 1,
      -(event.clientY / sizes.current.height) * 2 + 1
    );

    if (displacement.currentIntersect) {
      displacement.aberrationIntensity = Math.min(
        1.0,
        displacement.aberrationIntensity + 0.2
      );
      displacement.aberrationIntensity2 = Math.min(
        1.0,
        displacement.aberrationIntensity2 + 0.2
      );
      displacement.aberrationIntensity3 = Math.min(
        1.0,
        displacement.aberrationIntensity3 + 0.2
      );
    }
  });

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

      if (!isScreenLarger960) {
        plane.scale.setScalar(width * 0.5);

        plane.position.x = 0;

        plane.position.y = index === 0 ? -4.75 : index === 1 ? -8.25 : -11.75;
      }

      if (isScreenLarger960) {
        plane.scale.setScalar(width * 0.325);

        plane.position.x =
          index % 2 === 0
            ? -width / 2 + plane.scale.x * 1
            : width / 2 - plane.scale.x * 0.95;

        plane.position.y = index === 0 ? -3.75 : index === 1 ? -6.8 : -10.5;
      }
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

    const materials = [
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { type: "float", value: 0 },
          uTexture: { type: "sampler2D", value: null },
          uMouse: { type: "vec2", value: new THREE.Vector2(999, 999) },
          uDisplacementIntensity: { type: "float", value: 0.0 },
          uPrevMouse: { type: "vec2", value: new THREE.Vector2(999, 999) },
          uAberrationIntensity: {
            type: "float",
            value: null,
          },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      }),
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { type: "float", value: 0 },
          uTexture: { type: "sampler2D", value: null },
          uMouse: { type: "vec2", value: new THREE.Vector2(999, 999) },
          uDisplacementIntensity: { type: "float", value: 0.0 },
          uPrevMouse: { type: "vec2", value: new THREE.Vector2(999, 999) },
          uAberrationIntensity: {
            type: "float",
            value: null,
          },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      }),
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { type: "float", value: 0 },
          uTexture: { type: "sampler2D", value: null },
          uMouse: { type: "vec2", value: new THREE.Vector2(999, 999) },
          uDisplacementIntensity: { type: "float", value: 0.0 },
          uPrevMouse: { type: "vec2", value: new THREE.Vector2(999, 999) },
          uAberrationIntensity: {
            type: "float",
            value: null,
          },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      }),
    ];

    htmlElements.forEach((htmlElement, index) => {
      const texture = textureLoader.load(`/img/mockups/${index + 1}.webp`);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      materials[index].uniforms.uTexture.value = texture;

      const plane = new THREE.Mesh(planeGeometry, materials[index]);

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
      /**
       * Raycaster
       **/

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
          displacement.prevMousePosition.set(
            displacement.targetMousePosition.x,
            displacement.targetMousePosition.y
          );

          displacement.targetMousePosition.set(uv.x, uv.y);

          displacement.mousePosition.x +=
            (displacement.targetMousePosition.x -
              displacement.mousePosition.x) *
            displacement.easeFactor;
          displacement.mousePosition.y +=
            (displacement.targetMousePosition.y -
              displacement.mousePosition.y) *
            displacement.easeFactor;

          intersections[0].object.material.uniforms.uMouse.value.set(
            displacement.mousePosition.x,
            displacement.mousePosition.y
          );

          if (intersections[0].object === planes.current[0].plane) {
            displacement.displacementIntensity = Math.min(
              10.0,
              displacement.displacementIntensity + 0.5
            );

            planes.current[0].plane.material.uniforms.uDisplacementIntensity.value =
              displacement.displacementIntensity;

            planes.current[0].plane.material.uniforms.uAberrationIntensity.value =
              displacement.aberrationIntensity;
          }

          if (intersections[0].object === planes.current[1].plane) {
            displacement.displacementIntensity2 = Math.min(
              10.0,
              displacement.displacementIntensity2 + 0.5
            );

            planes.current[1].plane.material.uniforms.uDisplacementIntensity.value =
              displacement.displacementIntensity2;

            planes.current[1].plane.material.uniforms.uAberrationIntensity.value =
              displacement.aberrationIntensity2;
          }

          if (
            planes.current.length === 3 &&
            intersections[0].object === planes.current[2].plane
          ) {
            displacement.displacementIntensity3 = Math.min(
              10.0,
              displacement.displacementIntensity3 + 0.5
            );

            planes.current[2].plane.material.uniforms.uDisplacementIntensity.value =
              displacement.displacementIntensity3;

            planes.current[2].plane.material.uniforms.uAberrationIntensity.value =
              displacement.aberrationIntensity3;
          }

          intersections[0].object.material.uniforms.uPrevMouse.value.set(
            displacement.prevMousePosition.x,
            displacement.prevMousePosition.y
          );
        }

        if (!displacement.currentIntersect) {
          // console.log("mouseenter");
          displacement.easeFactor = Math.max(
            0.02,
            displacement.easeFactor - 0.005
          );

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

        displacement.displacementIntensity = Math.max(
          0.0,
          displacement.displacementIntensity - 0.05
        );

        displacement.displacementIntensity2 = Math.max(
          0.0,
          displacement.displacementIntensity2 - 0.05
        );

        displacement.displacementIntensity3 = Math.max(
          0.0,
          displacement.displacementIntensity3 - 0.05
        );

        displacement.aberrationIntensity = Math.max(
          0.0,
          displacement.aberrationIntensity - 0.005
        );
        displacement.aberrationIntensity2 = Math.max(
          0.0,
          displacement.aberrationIntensity2 - 0.005
        );
        displacement.aberrationIntensity3 = Math.max(
          0.0,
          displacement.aberrationIntensity3 - 0.005
        );

        displacement.currentIntersect = intersections[0];
      } else {
        if (displacement.currentIntersect) {
          // console.log("mouseleave");
          displacement.targetMousePosition.set(
            displacement.prevMousePosition.x,
            displacement.prevMousePosition.y
          );

          displacement.easeFactor = 0.05;
        }

        // Intensité du displacement décroissante
        displacement.displacementIntensity = Math.max(
          0.0,
          displacement.displacementIntensity - 0.15
        );
        displacement.displacementIntensity2 = Math.max(
          0.0,
          displacement.displacementIntensity2 - 0.15
        );
        displacement.displacementIntensity3 = Math.max(
          0.0,
          displacement.displacementIntensity3 - 0.15
        );

        // Intensité de l'aberration décroissante
        displacement.aberrationIntensity = Math.max(
          0.0,
          displacement.aberrationIntensity - 0.005
        );
        displacement.aberrationIntensity2 = Math.max(
          0.0,
          displacement.aberrationIntensity2 - 0.005
        );
        displacement.aberrationIntensity3 = Math.max(
          0.0,
          displacement.aberrationIntensity3 - 0.005
        );

        displacement.currentIntersect = null;
      }

      planes.current[0].plane.material.uniforms.uDisplacementIntensity.value =
        displacement.displacementIntensity;
      planes.current[0].plane.material.uniforms.uAberrationIntensity.value =
        displacement.aberrationIntensity;

      planes.current[1].plane.material.uniforms.uDisplacementIntensity.value =
        displacement.displacementIntensity2;
      planes.current[1].plane.material.uniforms.uAberrationIntensity.value =
        displacement.aberrationIntensity2;

      if (planes.current.length === 3) {
        planes.current[2].plane.material.uniforms.uDisplacementIntensity.value =
          displacement.displacementIntensity3;
        planes.current[2].plane.material.uniforms.uAberrationIntensity.value =
          displacement.aberrationIntensity3;
      }

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
