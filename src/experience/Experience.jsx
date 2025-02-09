// Depedencies
import * as THREE from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";
// import vertexShader from "./shaders/vertex.glsl";
// import fragmentShader from "./shaders/fragment.glsl";

export default function Experience({ isProjectPage }) {
  const canvas = useRef(null);
  const renderer = useRef(null);
  const camera = useRef(null);
  const projectsGroup = useRef(new THREE.Group());
  const sizes = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: window.innerWidth / window.innerHeight,
  });
  const planes = useRef([]); // Stocker les plans pour les mettre à jour plus facilement

  const textureLoader = new THREE.TextureLoader();

  const updatePlanesSizeAndPosition = () => {
    sizes.current.width = window.innerWidth;
    sizes.current.height = window.innerHeight;
    sizes.current.aspect = sizes.current.width / sizes.current.height;

    // Met à jour l'orthographic camera
    camera.current.left = -2 * sizes.current.aspect;
    camera.current.right = 2 * sizes.current.aspect;
    camera.current.updateProjectionMatrix();

    renderer.current.setSize(sizes.current.width, sizes.current.height);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Met à jour le scale et la position des plans pour qu'ils s'ajustent au viewport
    planes.current.forEach(({ plane, htmlElement, index }) => {
      if (!htmlElement) return;

      const boundingBox = htmlElement.getBoundingClientRect();

      // Position normalisée (-1 à 1)
      const normalizedX =
        index % 2 === 0
          ? ((boundingBox.left + boundingBox.right) / 2 / window.innerWidth) *
              2 -
            2.7
          : ((boundingBox.left + boundingBox.right) / 2 / window.innerWidth) *
              2 +
            0.8;

      const normalizedY =
        index % 2 === 0
          ? (-(boundingBox.top + boundingBox.bottom) / 2 / window.innerHeight) *
              2 +
            0.5
          : (-(boundingBox.top + boundingBox.bottom) / 2 / window.innerHeight) *
              2 +
            2 -
            2.75;

      // Convertir en coordonnées 3D
      const vector = new THREE.Vector3(normalizedX, normalizedY, 0);
      vector.unproject(camera.current);

      // Mettre à jour la position du plane
      plane.position.set(normalizedX, normalizedY, 0);

      // Mettre à jour la taille du plane en fonction du HTML
      const planeWidth =
        (boundingBox.width / sizes.current.width) * 130 * sizes.current.aspect;

      console.log(boundingBox.width);

      plane.scale.setScalar(planeWidth);
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updatePlanesSizeAndPosition);
    return () =>
      window.removeEventListener("resize", updatePlanesSizeAndPosition);
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();

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

      projectsGroup.current.add(plane);
      planes.current[index] = { plane, htmlElement, index };
    });

    // Mockups Texture
    // const mockup1 = textureLoader.load("/img/mockups/1.png");
    // mockup1.minFilter = THREE.LinearFilter;
    // mockup1.magFilter = THREE.LinearFilter;
    // mockup1.colorSpace = THREE.SRGBColorSpace;

    // const mockup2 = textureLoader.load("/img/mockups/2.png");
    // mockup2.minFilter = THREE.LinearFilter;
    // mockup2.magFilter = THREE.LinearFilter;
    // mockup2.colorSpace = THREE.SRGBColorSpace;

    // const planeMaterial = new THREE.MeshBasicMaterial({ map: mockup1 });
    // const planeMaterial2 = new THREE.MeshBasicMaterial({ map: mockup2 });

    // const plane = new THREE.Mesh(planeGeometryPaysage, planeMaterial);

    // const plane2 = new THREE.Mesh(planeGeometryPaysage, planeMaterial2);

    // plane.position.x = -1.45;
    // plane.position.y = isProjectPage ? -2 : -2;
    // plane.name = "plane 1";
    // plane2.position.x = 1.45;
    // plane2.position.y = isProjectPage ? -15.85 : -5.5;
    // plane2.name = "plane 2";

    // plane.scale.setScalar(sizes.current.width / 7000);
    // plane2.scale.setScalar(sizes.current.width / 7000);
    // projectsGroup.current.position.y = -1.1 / (sizes.current.width / 7000);

    // projectsGroup.current.add(plane, plane2);

    scene.add(projectsGroup.current);

    // Camera
    camera.current = new THREE.OrthographicCamera(
      -2 * sizes.current.aspect,
      2 * sizes.current.aspect,
      2,
      -2,
      0.01,
      10
    );

    camera.current.position.z = 3;
    scene.add(camera.current);

    // Renderer
    renderer.current = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
      alpha: true,
    });

    renderer.current.setSize(sizes.current.width, sizes.current.height);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    gsap.to(projectsGroup.current.position, {
      y: isProjectPage ? 13 : 13,
      scrollTrigger: {
        trigger: "#projects",
        start: isProjectPage ? "-10% bottom" : "top 85%",
        end: isProjectPage ? "200% top" : "150% top",
        scrub: true,
        markers: true,
        toggleActions: "play none reverse none",
      },
    });

    /**
     * Animate
     */
    const tick = () => {
      // Update controls
      // controls.update();

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

{
  /* <button
style={{
  position: "fixed",
  bottom: "64px",
  right: "64px",
  zIndex: 100,
  background: "darkgrey",
  color: "white",
  cursor: "pointer",
}}
onClick={() => {
  camera.current.position.y--;
  console.log(camera.current.position.y);
}}
>
Descend
</button> */
}
