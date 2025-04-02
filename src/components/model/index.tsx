import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import WaterTanks from "../shaders/water";

interface IModelProps {
  waterLevel: number[]
}

const Model = ({ waterLevel } : IModelProps) => {
  const modelPath = "/assets/diagrama_tanque.glb";
  const gltf = useGLTF(modelPath);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

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
      <primitive object={scene} scale={0.7} />
      <WaterTanks waterLevels={waterLevel} />
    </group>
  );
};

useGLTF.preload("/assets/diagrama_tanque.glb");

export default Model;
