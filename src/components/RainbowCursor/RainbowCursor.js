"use client";

import { useEffect, useRef } from "react";
import styles from "./RainbowCursor.module.css";

const BLUE_HUE = 0.59; // #607baa ≈ hue 218° (0.606) — light theme primary

export default function RainbowCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Lock all hues to primary blue (HSV hue 0.59), vary only value slightly
    const originalRandom = Math.random;
    Math.random = () => BLUE_HUE + originalRandom.call(Math) * 0.02;

    // Monkey-patch canvas to redirect event listeners to the window.
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

    import("webgl-fluid")
      .then((mod) => {
        if (!isMounted) return;
        const webGLFluidSimulation = mod.default || mod;

        webGLFluidSimulation(canvas, {
          IMMEDIATE: false,
          TRIGGER: "hover",
          SIM_RESOLUTION: 64,
          DYE_RESOLUTION: 256,
          CAPTURE_RESOLUTION: 256,
          DENSITY_DISSIPATION: 2.5,
          VELOCITY_DISSIPATION: 0.98,
          PRESSURE: 0.1,
          PRESSURE_ITERATIONS: 10,
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
          BLOOM_ITERATIONS: 4,
          BLOOM_RESOLUTION: 128,
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
      Math.random = originalRandom;
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
