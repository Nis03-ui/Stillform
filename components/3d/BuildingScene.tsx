"use client";

import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
} from "@react-three/drei";

import Model from "./Model";
import ModelLoader from "./ModelLoader";

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const isMobile = size.width < 640;

    camera.position.set(
      isMobile ? 9 : 4,
      isMobile ? 5 : 4,
      isMobile ? 12 : 9
    );

    camera.fov = isMobile ? 42 : 45;
    camera.lookAt(0, 2, 0);
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

      <Suspense fallback={<ModelLoader />}>
        <Model
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1}
        />
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
        position: [4, 4, 9],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
    >
      <color attach="background" args={["#e9e6df"]} />

      <SceneContents />
    </Canvas>
  );
}