import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Model from "../model";
import "./styles.scss"

interface Props {
  waterLevel: number
}

const ModelLoader = ({ waterLevel } : Props) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  // const [lightColor, setLightColor] = useState<string>("#0000ff");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };

  // const updateLightColor = (level: number) => {
  //   if (level > 80) setLightColor("#0000ff"); // 🔵 Azul (Alto)
  //   else if (level > 50) setLightColor("#00ff00"); // 🟢 Verde (Medio)
  //   else if (level > 30) setLightColor("#ffaa00"); // 🟠 Naranja (Bajo)
  //   else setLightColor("#ff0000"); // 🔴 Rojo (Crítico)
  // };

  // useEffect(() => {
  //   updateLightColor(waterLevel)
  // },[waterLevel])

  return (
    <div style={{ textAlign: "center" }}>
      <input type="file" accept=".glb,.gltf" onChange={handleFileUpload} />
      
      <Canvas style={{ width: "50vw", height: "80vh"}}>
        <ambientLight intensity={0.5}/>
        {/* <pointLight position={[0, 3, 0]} intensity={2} color={lightColor} /> */}
        <directionalLight position={[2, 5, 2]} intensity={1} />

        <Suspense fallback={<Html><p>Cargando modelo...</p></Html>}>
          {modelUrl ? <Model url={modelUrl} waterLevel={waterLevel} /> : null}
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelLoader;