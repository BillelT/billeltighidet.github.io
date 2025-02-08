uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;

  void main() {
    vec2 newUV = vUv;

    // float dist = distance(uMouse, vUv);
    // newUV.x += sin(uTime * 2.0 + dist * 10.0) * 0.02;
    // newUV.y += cos(uTime * 2.0 + dist * 10.0) * 0.02;

    vec4 videoColor = texture2D(uTexture, newUV);
    gl_FragColor = videoColor;
  }