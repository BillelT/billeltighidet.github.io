import { useEffect } from "react";
// import * as THREE from "three";
import World from "./world/World";

export default function Experience() {
  useEffect(() => {
    const world = new World();
    return () => world.dispose(); // Nettoyage
  }, []);

  return <div id="three-container" />;
}
