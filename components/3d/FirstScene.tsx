"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls,Enivornment } from "@react-three/drei";

function Ground() {
  return (
    <mesh position={[0, -0.1, 0]} receiveShadow>
      <boxGeometry args={[5, 0.2, 4]} />
      <meshStandardMaterial
        color="#a8a29e"
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}

function BuildingBody() {
  return (
    <mesh position={[0, 1, 0]} castShadow>
      <boxGeometry args={[3, 2, 2.5]} />
      <meshStandardMaterial
        color="#e7e5e4"
        roughness={0.7}
        metalness={0}
      />
    </mesh>
  );
}

function Roof() {
  return (
    <mesh position={[0, 2.15, 0]} castShadow>
      <boxGeometry args={[3.4, 0.3, 2.9]} />
      <meshStandardMaterial
        color="#57534e"
        roughness={0.35}
        metalness={0.8}
      />
    </mesh>
  );
}

function Architecture() {
  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <group position={[2, 0, 0]}>
        <Ground />
        <BuildingBody />
        <Roof />
      </group>

      <OrbitControls makeDefault />
    </>
  );
}

export default function ArchitecturePractice() {
  return (
    <div className="h-[500px] w-full">
      <Canvas
        shadows
        camera={{ position: [7, 5, 8], fov: 45 }}
      >
        <color attach="background" args={["#e7e5e4"]} />
        <Architecture />
      </Canvas>
    </div>
  );
}