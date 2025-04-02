import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "../model";
import "./styles.scss";

interface Props {
  waterLevel: number[];
}

const ModelLoader = ({ waterLevel }: Props) => {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <Model
        waterLevel={waterLevel}
      />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelLoader;
