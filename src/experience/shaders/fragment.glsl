uniform sampler2D uVideoTexture;
uniform float uTime;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    uv.y += sin(uv.x * 10.0 + uTime * 2.0) * 0.02;
    uv.x += cos(uv.y * 10.0 + uTime * 2.0) * 0.02;
    gl_FragColor = texture2D(uVideoTexture, uv);
}
