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

  let aberrationIntensity = 0;
  let easeFactor = 0;

  const displacement = {};

  displacement.raycaster = new THREE.Raycaster();
  displacement.screenCursor = new THREE.Vector2(9999, 9999);

  window.addEventListener("pointermove", (event) => {
    easeFactor = 0.5;
    displacement.screenCursor.x = (event.clientX / sizes.current.width) * 2 - 1;
    displacement.screenCursor.y =
      -(event.clientY / sizes.current.height) * 2 + 1;

    aberrationIntensity = 1;
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

        plane.position.y = index === 0 ? -4.15 : index === 1 ? -7.9 : -11.65;

        if (isProjectPage)
          plane.position.y = index === 0 ? -4.75 : index === 1 ? -7.75 : -10.75;
      }

      if (isScreenLarger960) {
        plane.scale.setScalar(width * 0.325);

        plane.position.x =
          index % 2 === 0
            ? -width / 2 + plane.scale.x * 1
            : width / 2 - plane.scale.x * 0.95;

        plane.position.y = index === 0 ? -3.75 : index === 1 ? -6.8 : -9.85;
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
          uTime: { value: 0 },
          uTexture: { type: "sampler2D", value: null },
          uMouse: { type: "vec2", value: new THREE.Vector2() },
          uPrevMouse: { type: "vec2", value: new THREE.Vector2() },
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
          uTime: { value: 0 },
          uTexture: { type: "sampler2D", value: null },
          uMouse: { type: "vec2", value: new THREE.Vector2() },
          uPrevMouse: { type: "vec2", value: new THREE.Vector2() },
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
          uMouse: { type: "vec2", value: new THREE.Vector2() },
          uPrevMouse: { type: "vec2", value: new THREE.Vector2() },
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
      const texture = textureLoader.load(`/img/mockups/${index + 1}.png`);
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
        const intersection = intersections[0]; // Premier élément touché
        const uv = intersection.uv; // Coordonnées UV du point touché

        if (uv) {
          // Mise à jour de l'uniform uMouse du shader de l'objet touché
          intersection.object.material.uniforms.uMouse.value.set(uv.x, uv.y);
          // intersection.object.material.uniforms.uPrevMouse.value.set(
          //   prevPosition.x,
          //   1.0 - prevPosition.y
          // );

          // Intensité décroissante
          aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
          intersection.object.material.uniforms.uAberrationIntensity.value =
            aberrationIntensity;
        }
      } else {
        planes.current[0].plane.material.uniforms.uMouse.value.set(0, 0);
        planes.current[1].plane.material.uniforms.uMouse.value.set(0, 0);
        if (planes.current.length === 3)
          planes.current[2].plane.material.uniforms.uMouse.value.set(0, 0);
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

// const handleMouseMove = (event) => {
//   easeFactor = 0.02;
//   let rect = imageContainer.getBoundingClientRect();
//   prevPosition = { ...targetMousePosition };

//   targetMousePosition.x = (event.clientX - rect.left) / rect.width;
//   targetMousePosition.y = (event.clientY - rect.top) / rect.height;

//   aberrationIntensity = 1;
// };

// const handleMouseEnter = (event) => {
//   easeFactor = 0.02;
//   let rect = imageContainer.getBoundingClientRect();

//   mousePosition.x = targetMousePosition.x =
//     (event.clientX - rect.left) / rect.width;
//   mousePosition.y = targetMousePosition.y =
//     (event.clientY - rect.top) / rect.height;
// };

// const handleMouseLeave = () => {
//   easeFactor = 0.05;
//   targetMousePosition = { ...prevPosition };
// };
