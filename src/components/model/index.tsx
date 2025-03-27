import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Water from "../shaders/water";

const Model: React.FC<{ url: string; waterLevel: number }> = ({ url, waterLevel }) => {
  const { scene } = useGLTF(url);
  
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            transparent: true,
            opacity: 0.5,
            transmission: 0,
            roughness: 1,
            metalness: 0,
            depthWrite: false,
          });
        }
      }
    });
  }, [scene]);

  return (
    <group>
      <primitive object={scene} scale={1.5} />
      <Water waterLevel={waterLevel} />
    </group>
  );
};

export default Model
