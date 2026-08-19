'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./HeroSection.module.css";

const STORY_STEPS = [
  {
    id: "intro",
    eyebrow: "Hello, I’m",
    title: "Akbar Riski",
    start: 0,
    end: 0.18,
  },
  {
    id: "role",
    title: "Fullstack Developer",
    start: 0.18,
    end: 0.38,
  },
  {
    id: "experience",
    title: "8+ years of experience",
    start: 0.38,
    end: 0.56,
  },
  {
    id: "scope",
    title: "Front-end to back-end",
    description: "End-to-end web solutions",
    start: 0.56,
    end: 0.78,
  },
  {
    id: "values",
    title: "Scalable. Efficient. Reliable.",
    start: 0.78,
    end: 1,
  },
];

export default function HeroSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const targetProgressRef = useRef(0);
  const renderedProgressRef = useRef(0);
  const frameRef = useRef(null);
  const seekingRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };
    updateReducedMotion();
    mediaQuery.addEventListener?.("change", updateReducedMotion);

    const getProgress = () => {
      const container = containerRef.current;
      if (!container) return 0;
      const rect = container.getBoundingClientRect();
      const totalDistance = rect.height - window.innerHeight;
      if (totalDistance <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / totalDistance));
    };

    const renderFrame = () => {
      const video = videoRef.current;
      const target = targetProgressRef.current;
      const current = renderedProgressRef.current;

      // Smooth interpolation
      const next = reducedMotionRef.current ? target : current + (target - current) * 0.2;
      renderedProgressRef.current = Math.abs(target - next) < 0.0005 ? target : next;

      // Update active steps from smoothed progress
      let newActiveIndex = 0;
      for (let i = 0; i < STORY_STEPS.length; i++) {
        if (renderedProgressRef.current >= STORY_STEPS[i].start) newActiveIndex = i;
      }
      setActiveStep((prev) => (prev === newActiveIndex ? prev : newActiveIndex));

      // Video scrub — Firefox decoder stall prevention:
      //   • Never set more than one seek per frame
      //   • Wait for previous seek to settle (via onSeeked callback)
      //   • Skip tiny diffs (< 0.02s) to avoid decoder jitter
      //   • Only proceed if decoder isn't busy seeking
      if (
        !reducedMotionRef.current &&
        video &&
        Number.isFinite(video.duration) &&
        video.readyState >= 2 &&
        !seekingRef.current
      ) {
        const targetTime = renderedProgressRef.current * video.duration;
        if (Math.abs(targetTime - video.currentTime) > 0.015) {
          seekingRef.current = true;
          video.currentTime = targetTime;
        }
      }

      frameRef.current = requestAnimationFrame(renderFrame);
    };

    const handleScroll = () => {
      targetProgressRef.current = getProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    frameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      mediaQuery.removeEventListener?.("change", updateReducedMotion);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section id="home" className={styles.hero}>
      {/* Background Watermark Text (clipped by wrapper so `.hero` itself
          doesn't need overflow:hidden — that breaks position:sticky stage) */}
      <div className={styles.watermarkClip} aria-hidden="true">
        <div className={styles.watermark}>
          <span className={styles.watermarkText}>Akbar</span>
          <span className={styles.watermarkText}>Riski.</span>
        </div>
      </div>

      {/* ─── [DISABLED] Previous static Hero content (avatar/location/tagline/description were
          directly inside `.content`) — replaced by scroll-driven story below ─── */}

      <div className={styles.scrollScene} ref={containerRef}>
        <div className={styles.stickyStage}>
          <div className={styles.stageInner}>
            <div className={styles.videoFrame}>
              <video
                ref={videoRef}
                className={styles.video}
                src="/animated_me_firefox.mp4"
                muted
                playsInline
                preload="auto"
                onSeeked={() => { seekingRef.current = false; }}
              />
            </div>

            <div className={styles.story}>
              <div className={styles.content}>
                {STORY_STEPS.map((step, index) => {
                  const isActive = index === activeStep;
                  return (
                    <div
                      key={step.id}
                      className={`${styles.storyStep} ${
                        isActive ? styles.storyStepActive : ""
                      }`}
                    >
                      {step.eyebrow && (
                        <p className={styles.storyEyebrow}>{step.eyebrow}</p>
                      )}
                      {step.title && (
                        <h2 className={styles.storyTitle}>{step.title}</h2>
                      )}
                      {step.description && (
                        <p className={styles.storyDesc}>{step.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
