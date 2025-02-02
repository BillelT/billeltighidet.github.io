import * as THREE from "three";

export default class VideoTexture {
  constructor(src) {
    this.video = document.createElement("video");
    this.video.src = src;
    this.video.loop = true;
    this.video.muted = true;
    this.video.autoplay = true;
    this.video.play();

    this.texture = new THREE.VideoTexture(this.video);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.format = THREE.RGBAFormat;
  }
}
