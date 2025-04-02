import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import Model from "../model";
import "./styles.scss";

interface Props {
  waterLevel: number;
}

const ModelLoader = ({ waterLevel }: Props) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ visible: boolean; text: string; x: number; y: number }>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };

  const RaycastOnClick = () => {
    const { camera, scene } = useThree();

    useEffect(() => {
      const onClick = (event: MouseEvent) => {
        pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.current.setFromCamera(pointer.current, camera);
        const intersects = raycaster.current.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          const clickedObject = intersects[0].object;
          setTooltip({
            visible: true,
            text: `Objeto: ${clickedObject.name || "Sin nombre"}`,
            x: event.clientX,
            y: event.clientY,
          });
        } else {
          setTooltip({ visible: false, text: "", x: 0, y: 0 });
        }
      };

      window.addEventListener("click", onClick);
      return () => {
        window.removeEventListener("click", onClick);
      };
    }, [camera, scene]);

    return null;
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <input type="file" accept=".glb,.gltf" onChange={handleFileUpload} />

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            top: tooltip.y + 10,
            left: tooltip.x + 10,
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            pointerEvents: "none",
          }}
        >
          {tooltip.text}
        </div>
      )}

      <Canvas style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />

        <Suspense fallback={<Html><p>Cargando modelo...</p></Html>}>
          {modelUrl ? <Model url={modelUrl} waterLevel={waterLevel} /> : null}
        </Suspense>

        <RaycastOnClick />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelLoader;
