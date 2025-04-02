import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./styles.scss";
// components
import Model from "../model";
import TankController from "../TankController";

interface ITooltipProps {
  visible: boolean;
  x: number;
  y: number;
  tankNumber: number,
  text: string
}

const ModelLoader = () => {
  const [waterLevel, setWaterLevel] = useState([0,0,0,0]);
  const [tooltip, setTooltip] = useState<ITooltipProps>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
    tankNumber: 0
  });

  const objectIdentifier = (objectName : string)=> {
    switch (objectName) {
      case "Cylinder033":
        return {
          name: "Pozo Natural",
          tankNumber: 0,
        }
      case "Cylinder033_3":
        return {
          name: "Tanque de agua 1",
          tankNumber: 1,
        }
      case "Cylinder033_11":
        return {
          name: "Tanque de agua 2",
          tankNumber: 2,
        }
      case "Cylinder033_10":
        return {
          name: "Tanque de agua 3",
          tankNumber: 3,
        }
      case "Cylinder033_8":
        return {
          name: "Pique",
          tankNumber: 0,
        }
      case "Cylinder033_9":
        return {
          name: "Tanque de agua 4",
          tankNumber: 4,
        }
      default:
        return {name: "", tankNumber: 0};
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    const { clientX, clientY } = event.nativeEvent;
    const intersectedObject = event.object;

    if (intersectedObject) {
      setTooltip({
        visible: true,
        tankNumber: objectIdentifier(intersectedObject.name).tankNumber,
        x: clientX,
        y: clientY,
        text: `${objectIdentifier(intersectedObject.name).name || "Desconocida"}`,
      });
    }
  };

  const handleCloseTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas style={{ width: "100%", height: "100%" }} onPointerMissed={handleCloseTooltip}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Model waterLevel={waterLevel} onPointerDown={handlePointerDown} />
        <OrbitControls />
      </Canvas>

      {tooltip.visible && (
        <div
          className="tooltip--container"
          style={{
            position: "absolute",
            top: tooltip.y,
            left: tooltip.x,
          }}
        >
          {tooltip.tankNumber !== 0 ? (
            <TankController
              title={tooltip.text}
              tankNumber={tooltip.tankNumber}
              currentLevels={waterLevel}
              setTankWaterLevel={setWaterLevel}
            />
          ):<div>{tooltip.text}</div>}
        </div>
      )}
    </div>
  );
};

export default ModelLoader;
