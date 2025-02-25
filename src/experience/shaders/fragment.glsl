   precision mediump float;

    uniform sampler2D uTexture;    
    uniform vec2 uMouse;
    uniform vec2 uPrevMouse;
    uniform float uAberrationIntensity;
    uniform float uDisplacementIntensity;

    varying vec2 vUv;

    void main() {
        vec2 gridUV = floor(vUv * vec2(200.0, 200.0)) / vec2(200.0, 200.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/200.0, 1.0/200.0);
        
        vec2 mouseDirection = (uMouse - uPrevMouse) * uDisplacementIntensity;
        
        vec2 pixelToMouseDirection = centerOfPixel - uMouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
 
        vec2 uvOffset = strength * - mouseDirection * 0.1;
        vec2 uv = (vUv - uvOffset);

        vec4 colorR = texture2D(uTexture, uv + vec2(strength * uAberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(uTexture, uv);
        vec4 colorB = texture2D(uTexture, uv - vec2(strength * uAberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }