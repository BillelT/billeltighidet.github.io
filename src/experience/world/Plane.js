import * as THREE from "three";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

export default function Planes(htmlElements, projectsGroup, scene, manager) {
  const textureLoader = new THREE.TextureLoader(manager);
  const planeGeometry = new THREE.PlaneGeometry(1.6, 0.9);

  const planes = htmlElements.map((htmlElement, index) => {
    const texture = textureLoader.load(`/img/mockups/${index + 1}.webp`);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const link = htmlElement.dataset.url;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(999, 999) },
        uDisplacementIntensity: { value: 0.0 },
        uPrevMouse: { value: new THREE.Vector2(999, 999) },
        uAberrationIntensity: { value: null },
      },
      vertexShader,
      fragmentShader,
    });

    const plane = new THREE.Mesh(planeGeometry, material);
    projectsGroup.current.add(plane);

    return { plane, htmlElement, index, link };
  });

  scene.add(projectsGroup.current);
  return planes;
}
