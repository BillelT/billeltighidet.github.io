// Depedencies
import * as THREE from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

export default function Experience() {
  const canvas = useRef(null);
  const renderer = useRef(null);
  const camera = useRef(null);
  const sizes = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: window.innerWidth / window.innerHeight,
  });
  const galleryGroup = useRef(new THREE.Group());

  const handleResize = () => {
    sizes.current.width = window.innerWidth;
    sizes.current.height = window.innerHeight;
    sizes.current.aspect = window.innerWidth / window.innerHeight;

    galleryGroup.current.scale.setScalar(sizes.current.width / 5300);

    camera.current.left = -2 * sizes.current.aspect;
    camera.current.right = 2 * sizes.current.aspect;
    camera.current.updateProjectionMatrix();

    renderer.current.setSize(sizes.current.width, sizes.current.height);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();

    // Videos
    const video = document.createElement("video");
    video.src = "/img/gallery-element/Anto Animation.mp4";
    video.loop = true;
    video.muted = true;
    video.autoplay = true;

    // Videos Texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;

    // Objects
    const planeGeometryPaysage = new THREE.PlaneGeometry(16, 9);
    const planeGeometryPortrait = new THREE.PlaneGeometry(9, 16);

    const planeMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uVideoTexture: { value: videoTexture },
        // uMouse: { value: new THREE.Vector2(0, 0) },
      },
    });

    // const planeMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });

    const plane = new THREE.Mesh(planeGeometryPaysage, planeMaterial);

    const plane2 = new THREE.Mesh(planeGeometryPortrait, planeMaterial);

    plane.position.x = -5.75;
    plane2.position.x = 2.25;
    plane2.position.y = -19;

    galleryGroup.current.scale.setScalar(sizes.current.width / 5300);
    galleryGroup.current.position.y = -1 / (sizes.current.width / 5300);
    galleryGroup.current.add(plane, plane2);

    scene.add(galleryGroup.current);

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

    gsap.to(camera.current.position, {
      scrollTrigger: {
        trigger: "#gallery",
        start: "10% top",
        end: "bottom bottom",
        // markers: true,
        scrub: 0.001,
        toggleActions: "play none reverse none",
        onUpdate: (self) => {
          camera.current.position.y = -self.progress * 20;
        },
      },
    });
    gsap.to(galleryGroup.current.position, {
      y: 0,
      scrollTrigger: {
        trigger: "#gallery",
        start: "15% 85%",
        end: "30% 90%",
        scrub: true,
        markers: true,
        toggleActions: "play none reverse none",
      },
    });

    // Renderer
    renderer.current = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
      alpha: true,
    });

    renderer.current.setSize(sizes.current.width, sizes.current.height);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

    return () => {
      renderer.current.dispose(); // Nettoyage lors du démontage du composant
    };
  }, []);

  return <canvas ref={canvas} className="webgl" />;
}
