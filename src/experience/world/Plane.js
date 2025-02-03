import * as THREE from "three";
import VideoTexture from "../textures/VideoTexture";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

export default class Plane {
  constructor(scene) {
    this.scene = scene;

    this.videoTexture = new VideoTexture(
      "/img/gallery-element/sword-in-stone.mp4"
    );

    const geometry = new THREE.PlaneGeometry(16, 9);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uVideoTexture: { value: this.videoTexture.texture },
        uTime: { value: 0.0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  update() {
    this.mesh.material.uniforms.uTime.value += 0.02;
  }
}
