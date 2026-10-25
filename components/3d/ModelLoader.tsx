"use client";

import { Html, useProgress } from "@react-three/drei";

export default function ModelLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex min-w-40 flex-col items-center gap-3 rounded-xl bg-white/90 px-6 py-5 text-neutral-900 shadow-lg">
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-neutral-900 transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm font-medium">
          Preparing architectural model…
        </p>

        <p className="text-xs text-neutral-500">
          {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}