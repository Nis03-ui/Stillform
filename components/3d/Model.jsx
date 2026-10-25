"use client";

import { useEffect } from "react";
import { useGLTF, Clone } from "@react-three/drei";

export default function Model() {
  const { scene } = useGLTF("/models/building.glb");

  useEffect(() => {
    scene.traverse((object) => {
      if (!object.isMesh) return;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      for (const material of materials) {
        if (material.name === "Original warm white outdoor paint") {
          material.roughness = 0.75;
        }
      }
    });
  }, [scene]);

  return <Clone object={scene} />;
}

useGLTF.preload("/models/building.glb");