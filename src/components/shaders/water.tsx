  import React, { useEffect, useRef, useState } from "react";
  import { useFrame } from "@react-three/fiber";
  import * as THREE from "three";

  const alertSound = new Audio("/src/assets/sounds/halo_alarm.mp3");

  interface IWaterTankProps {
    position: number[],
    tankNumber: number,
    waterLevel: number
  }

  const WaterTank = ({ position, waterLevel, tankNumber } : IWaterTankProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [alertPlayed, setAlertPlayed] = useState(false);

    const waterMaterial = useRef(
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color("#4a90e2") },
          opacity: { value: 0.7 },
        },
        vertexShader: `
          uniform float time;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normal;
            vPosition = position;
            vec3 pos = position;
            if (pos.y > 0.0) {
              float wave1 = sin(pos.x * 3.0 + time * 2.0) * 0.05;
              float wave2 = cos(pos.z * 3.0 + time * 2.5) * 0.05;
              float wave3 = sin((pos.x + pos.z) * 2.0 + time * 3.0) * 0.03;
              pos.y += (wave1 + wave2 + wave3);
            }
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float opacity;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float intensity = dot(normalize(vNormal), vec3(0.0, 1.0, 0.0));
            vec3 waterColor = mix(color, vec3(1.0), intensity * 0.3);
            gl_FragColor = vec4(waterColor, opacity);
          }
        `,
        transparent: true,
      })
    ).current;

    useFrame(({ clock }) => {
      if (meshRef.current) {
        waterMaterial.uniforms.time.value = clock.getElapsedTime();
      }
    });

    useEffect(() => {
      if (waterLevel < 20 && tankNumber ) {
        waterMaterial.uniforms.color.value.set("#ee444d");
      } else if (waterLevel > 80 && tankNumber) {
        waterMaterial.uniforms.color.value.set("#fffc38");
      } else {
        waterMaterial.uniforms.color.value.set("#4a90e2");
      }

      if ((waterLevel < 20 || waterLevel > 80) && !alertPlayed) {
        alertSound.play();
        setAlertPlayed(true);
      } else if (waterLevel >= 20 && waterLevel <= 80) {
        setAlertPlayed(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waterLevel, alertPlayed]);

    return (
      <mesh 
        ref={meshRef} 
        position={[position[0], position[1] + waterLevel/265, position[2]]} 
        scale={[1, waterLevel / 100, 1]} 
        material={waterMaterial}
      >
        <boxGeometry args={[0.75, 0.75, 0.75]} />
      </mesh>
    );
  };

  const WaterTanks: React.FC<{ waterLevels?: number[] }> = ({ waterLevels = [100,100,100,100] }) => {
    const tanks = [
      { id: 1, position: [2.55, -1.48, 0] },
      { id: 2, position: [1.28, 0.15, 0] },
      { id: 3, position: [1.28, 2.61, 0] },
      { id: 4, position: [-3.46, 0.15, 0] },
    ];

    return (
      <>
        <WaterTank tankNumber={0} position={[1.245, -2.65, 0]} waterLevel={100} />
        <WaterTank tankNumber={0} position={[-3.44, 2.18, 0]} waterLevel={100} />
        {tanks.map((tank, index) => (
          <WaterTank
            key={index}
            tankNumber={tank.id}
            position={tank.position}
            waterLevel={waterLevels[index] || 0}
          />
        ))}
      </>
    );
  };

  export default WaterTanks;
