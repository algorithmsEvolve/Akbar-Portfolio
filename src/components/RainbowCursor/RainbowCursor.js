"use client";

import { useEffect, useRef } from "react";
import styles from "./RainbowCursor.module.css";

export default function RainbowCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let simulationInstance = null;
    
    // Monkey-patch canvas to redirect event listeners to the window.
    // This allows webgl-fluid to capture all native mouse/touch events perfectly 
    // across the entire page, even while the canvas is 'pointer-events: none'.
    // Fixes the critical Safari crash caused by fake synthetic TouchEvents.
    canvas._windowListeners = [];
    canvas.addEventListener = (type, listener, options) => {
      const wrappedListener = (e) => {
        const proxiedEvent = new Proxy(e, {
          get(target, prop) {
            if (prop === "offsetX" || prop === "layerX") return target.clientX;
            if (prop === "offsetY" || prop === "layerY") return target.clientY;
            if (prop === "target") return canvas;
            const value = target[prop];
            return typeof value === "function" ? value.bind(target) : value;
          },
        });
        listener(proxiedEvent);
      };
      window.addEventListener(type, wrappedListener, options);
      canvas._windowListeners.push({ type, originalListener: listener, wrappedListener, options });
    };
    canvas.removeEventListener = (type, listener, options) => {
      const found = canvas._windowListeners.find((l) => l.originalListener === listener);
      if (found) {
        window.removeEventListener(type, found.wrappedListener, options);
        canvas._windowListeners = canvas._windowListeners.filter(
          (l) => l.originalListener !== listener
        );
      } else {
        window.removeEventListener(type, listener, options);
      }
    };

    // Dynamically import webgl-fluid to bypass SSR
    import("webgl-fluid")
      .then((mod) => {
        if (!isMounted) return;
        const webGLFluidSimulation = mod.default || mod;

        // Initialize WebGL Fluid Simulation
        simulationInstance = webGLFluidSimulation(canvas, {
          IMMEDIATE: false,
          TRIGGER: "hover",
          SIM_RESOLUTION: 64,        // Reduced from 128 — halves simulation grid
          DYE_RESOLUTION: 256,       // Reduced from 512 — biggest GPU load reduction
          CAPTURE_RESOLUTION: 256,   // Reduced from 512
          DENSITY_DISSIPATION: 2.5,
          VELOCITY_DISSIPATION: 0.98,
          PRESSURE: 0.1,
          PRESSURE_ITERATIONS: 10,   // Reduced from 20 — halves physics solver iterations
          CURL: 3,
          SPLAT_RADIUS: 0.12,
          SPLAT_FORCE: 4000,
          SHADING: true,
          COLORFUL: true,
          COLOR_UPDATE_SPEED: 10,
          PAUSED: false,
          BACK_COLOR: { r: 0, g: 0, b: 0 },
          TRANSPARENT: true,
          BLOOM: true,
          BLOOM_ITERATIONS: 4,       // Reduced from 8 — halves bloom blur passes
          BLOOM_RESOLUTION: 128,     // Reduced from 256
          BLOOM_INTENSITY: 0.18,
          BLOOM_THRESHOLD: 0.7,
          BLOOM_SOFT_KNEE: 0.7,
          SUNRAYS: false,
          SUNRAYS_RESOLUTION: 196,
          SUNRAYS_WEIGHT: 1.0,
        });
      })
      .catch((err) => {
        console.warn("Failed to load webgl-fluid", err);
      });

    return () => {
      isMounted = false;
      // Clean up all the hijacked window listeners
      if (canvas && canvas._windowListeners) {
        canvas._windowListeners.forEach(({ type, wrappedListener, options }) => {
          window.removeEventListener(type, wrappedListener, options);
        });
      }
    };
  }, []);

  return (
    <div id="rainbow-cursor-container" className={styles.cursorContainer} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} style={{ width: '100%', height: '100vh', display: 'block' }} />
    </div>
  );
}
