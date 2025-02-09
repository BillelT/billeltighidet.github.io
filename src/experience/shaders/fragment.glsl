uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;

  void main() {

    vec2 uv = vUv;

    vec4 baseState = texture2D(uTexture, vUv);

    float wave = sin(uv.x * 10.0  + uTime * 0.5);

    gl_FragColor = baseState;
  }