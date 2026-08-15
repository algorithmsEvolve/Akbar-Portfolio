"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import StacksSection from "@/components/StacksSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProjectShowcaseSection from "@/components/FramerProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialSidebar from "@/components/SocialSidebar";
import styles from "./page.module.css";

export default function Home() {
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return undefined;

    let raf = 0;
    let current = 0;
    let target = 0;
    let rate = 0.5;
    let rateTarget = 0.5;
    let scrollTimer = null;

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      target = max > 0 ? window.scrollY / max : 0;
      rateTarget = 5;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { rateTarget = 0.5; }, 350);
    };

    const loop = () => {
      current += (target - current) * 0.06;
      rate += (rateTarget - rate) * 0.08;
      bg.style.setProperty("--scroll", current.toFixed(4));

      const anims = bg.getAnimations({ subtree: true });
      for (const a of anims) {
        if (a.playState !== "running") a.play();
        a.playbackRate = rate;
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div ref={bgRef} className={styles.ambientBg} aria-hidden="true">
        <svg className={`${styles.ambientShape} ${styles.shapeOrbit}`} viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="58" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 9" />
          <circle cx="90" cy="90" r="25" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        </svg>
        <svg className={`${styles.ambientShape} ${styles.shapeSquiggle}`} viewBox="0 0 180 120" fill="none">
          <path d="M4 65C27 9 49 111 76 55S126 7 176 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 82C27 26 49 128 76 72S126 24 176 71" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        </svg>
        <svg className={`${styles.ambientShape} ${styles.shapeTriangle}`} viewBox="0 0 160 160" fill="none">
          <path d="M80 8 151 143H9L80 8Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="m80 36 43 81H37l43-81Z" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        </svg>
        <div className={`${styles.ambientShape} ${styles.shapeDots}`}>
          <i /><i /><i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className={`${styles.ambientShape} ${styles.shapeCross}`}>
          <span /><span />
        </div>
      </div>
      <Navbar />
      <SocialSidebar />

      <main className={styles.main}>
        <HeroSection />
        
        <ExperienceSection />

        <StacksSection />

        <ProjectsSection />

        <ProjectShowcaseSection />

        <ContactSection />
      </main>
    </div>
  );
}
