import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const alertSound = new Audio("/src/assets/sounds/halo_alarm.mp3");

const WaterShaderMaterial = new THREE.ShaderMaterial({
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

      // SOLO MOVER LA PARTE SUPERIOR
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
});

const Water: React.FC<{ waterLevel: number }> = ({ waterLevel }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [alertPlayed, setAlertPlayed] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      WaterShaderMaterial.uniforms.time.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    // CAMBIAR COLOR SEGÚN EL NIVEL DEL AGUA
    if (waterLevel < 20) {
      WaterShaderMaterial.uniforms.color.value.set("#ee444d"); // Azul claro
    } else if (waterLevel >= 80) {
      WaterShaderMaterial.uniforms.color.value.set("#fffc38"); // Azul oscuro
    } else {
      WaterShaderMaterial.uniforms.color.value.set("#4a90e2"); // Rojo (alerta)
    }

    // REPRODUCIR ALERTA SI EL NIVEL ES MENOR AL 50%
    if (waterLevel < 20 && !alertPlayed) {
      alertSound.play();
      setAlertPlayed(true);
    } else if (waterLevel >= 80) {
      alertSound.play();
      setAlertPlayed(true);
    } else {
      setAlertPlayed(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waterLevel]);

  return (
    <mesh ref={meshRef} position={[0, waterLevel/100, 0]} material={WaterShaderMaterial}>
      <boxGeometry args={[1.5, waterLevel/50, 1.5]} />
    </mesh>
  );
};

export default Water