"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class SceneErrorBoundary extends Component<
  Props,
  State
> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error) {
    console.error("3D scene failed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-64 items-center justify-center bg-neutral-100 p-8 text-center">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Architectural preview unavailable
            </h2>

            <p className="mt-2 text-sm text-neutral-600">
              You can still explore the rest of our website.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}