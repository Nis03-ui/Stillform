"use client";

import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Bounds,
  Environment,
  OrbitControls,
} from "@react-three/drei";

import Model from "./Model";

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const isMobile = size.width < 768;

    camera.position.set(
      isMobile ? 7 : 4,
      isMobile ? 4 : 3,
      isMobile ? 9 : 6
    );

    camera.fov = isMobile ? 45 : 50;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return (
    <OrbitControls
      makeDefault
      target={[0, 2, 0]}
      enableDamping
      dampingFactor={0.05}
      enablePan={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.05}
    />
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.7} />

      <directionalLight
        position={[8, 12, 6]}
        intensity={2}
        castShadow
      />

      <Environment preset="studio" />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#d8d4cc"
          roughness={0.9}
        />
      </mesh>

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.3}>
          <Model />
        </Bounds>
      </Suspense>

      <ResponsiveCamera />
    </>
  );
}

export default function BuildingScene() {
  return (
    <Canvas
      shadows
      camera={{
        position: [4, 3, 6],
        fov: 50,
        near: 0.1,
        far: 100,
      }}
    >
      <color attach="background" args={["#e9e6df"]} />
      <SceneContents />
    </Canvas>
  );
}