import * as THREE from "three";
import Plane from "./Plane";

export default class World {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .querySelector(".webgl")
      .appendChild(this.renderer.domElement);

    this.plane = new Plane(this.scene);

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.plane.update(); // Animation du shader
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    this.renderer.domElement.remove();
  }
}
