"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./ProjectsSection.module.css";
import { INITIAL_PROJECTS as PROJECTS } from "./ProjectsData";

// Scroll distance (in px) allocated per project transition
const STEP_HEIGHT = 500;
// Extra scroll space after the last project appears, so it isn't immediately gone
const TRAILING_HEIGHT = 500;

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotProgress, setDotProgress] = useState(0);
  const [scrollDir, setScrollDir] = useState("down");

  const activeIndexRef = useRef(0);
  const outerRef = useRef(null);
  
  // High-performance refs for direct DOM manipulation
  const projectsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const timelineLineRef = useRef(null);
  const timelineDotRef = useRef(null);
  const timelineGlowRef = useRef(null);

  // Smooth scroll interpolation refs
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let animationFrameId;

    const updateStyles = (clamped, totalRange) => {
      // 1. Update Right Panel Container
      if (projectsContainerRef.current) {
        projectsContainerRef.current.style.transform = `translateY(${-clamped}px)`;
      }

      // 2. Update Each Card (Scaling & Opacity)
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const projectStart = idx * STEP_HEIGHT;
        const distance = clamped - projectStart;
        const normalizedDistance = Math.abs(distance) / STEP_HEIGHT;
        
        const scale = Math.max(0.8, 1 - normalizedDistance * 0.2);
        const opacity = Math.max(0, 1 - Math.pow(normalizedDistance, 1.5));
        
        card.style.transform = `scale(${scale})`;
        card.style.opacity = opacity;
      });

      // 3. Update Timeline (Directly)
      const progress = totalRange > 0 ? clamped / totalRange : 0;
      const progressPercent = `${progress * 100}%`;
      
      if (timelineLineRef.current) timelineLineRef.current.style.height = progressPercent;
      if (timelineDotRef.current) timelineDotRef.current.style.top = progressPercent;
      if (timelineGlowRef.current) timelineGlowRef.current.style.top = progressPercent;

      return progress;
    };

    const renderLoop = () => {
      const lerp = (start, end, factor) => start + (end - start) * factor;
      
      // Interpolate position - 0.1 is very smooth/slow, 0.2 is faster
      currentScrollRef.current = lerp(currentScrollRef.current, targetScrollRef.current, 0.1);
      
      const totalRange = STEP_HEIGHT * (PROJECTS.length - 1);
      
      // Update visual styles
      const newProgress = updateStyles(currentScrollRef.current, totalRange);

      // Handle activeIndex changes (re-render only when project changes)
      // Use currentScrollRef to sync text change with visual position
      const newActiveIndex = Math.min(
        PROJECTS.length - 1,
        Math.floor((currentScrollRef.current + STEP_HEIGHT / 2) / STEP_HEIGHT)
      );

      if (newActiveIndex !== activeIndexRef.current) {
        setScrollDir(newActiveIndex > activeIndexRef.current ? "down" : "up");
        setActiveIndex(newActiveIndex);
        setDotProgress(newProgress);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const handleScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const currentScrolledIn = -rect.top;
      const totalRange = STEP_HEIGHT * (PROJECTS.length - 1);
      
      // We only update the TARGET here. The renderLoop handles the movement.
      targetScrollRef.current = Math.max(0, Math.min(totalRange, currentScrolledIn));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Start continuous animation loop
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeProject = PROJECTS[activeIndex];

  return (
    <div
      ref={outerRef}
      id="projects"
      className={styles.sectionOuter}
      style={{ height: `calc(${(PROJECTS.length - 1) * STEP_HEIGHT + TRAILING_HEIGHT}px + 100vh)` }}
    >
      <section className={styles.sectionSticky}>

        <div className={styles.header}>
          <p className={styles.subtitle}>Where Ideas Become Systems</p>
          <h2 className={styles.title}>PRODUCT <span className={styles.titleHighlight}>BUILDS</span></h2>
        </div>

        <div className={styles.contentWrapper}>

          {/* Left Sticky Column */}
          <div className={styles.leftPanel}>
            <div className={styles.projectInfo}>
              <div key={activeProject.id} className={`${styles.fadeContent} ${scrollDir === "down" ? styles.fadeLeftUp : styles.fadeLeftDown}`}>
                <div className={styles.projectInfoTitleWrapper}>
                  <svg 
                    className={`${styles.atomicIcon} ${styles.bubbleFadeRight}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ animationDelay: "0s" }}
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"></ellipse>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"></ellipse>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"></ellipse>
                  </svg>
                  <h3 
                    className={`${styles.projectTitle} ${styles.bubbleFadeLeft}`}
                    style={{ animationDelay: "0.1s" }}
                  >
                    {activeProject.title}
                  </h3>
                </div>

                <div className={styles.projectContentBody}>
                  <p 
                    className={`${styles.projectDesc} ${styles.staggerFadeIn}`}
                    style={{ animationDelay: "0.4s" }}
                  >
                    {activeProject.description}
                  </p>
                  <div className={styles.highlights}>
                    {activeProject.highlights.map((highlight, idx) => (
                      <div 
                        key={`${activeProject.id}-${idx}`} 
                        className={`${styles.highlightItem} ${styles.staggerFadeIn}`}
                        style={{ animationDelay: `${0.8 + idx * 0.15}s` }}
                      >
                        <span className={styles.highlightIcon}>🛸</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.stacksContainer}>
                    {activeProject.stacks.map((stack, sIdx) => {
                      const baseDelay = 0.8 + activeProject.highlights.length * 0.15 + 0.2;
                      return (
                        <div 
                          key={stack.id} 
                          className={`${styles.stackBadge} ${styles.bubbleZoom}`}
                          style={{ animationDelay: `${baseDelay + sIdx * 0.1}s` }}
                        >
                          <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${stack.iconPath}`}
                            alt={stack.name}
                            className={styles.stackIcon}
                          />
                          <span className={styles.stackName}>{stack.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.timeline}>
              <div ref={timelineLineRef} className={styles.timelineLine}></div>
              <div ref={timelineDotRef} className={styles.timelineDot}></div>
              <div ref={timelineGlowRef} className={styles.timelineGlow}></div>
            </div>
          </div>

          {/* Right Panel */}
          <div className={`${styles.rightPanel} hide-cursor-hover`}>
            <div ref={projectsContainerRef} className={styles.projectsContainer}>
              {PROJECTS.map((project, idx) => (
                <div 
                  key={project.id} 
                  ref={el => cardRefs.current[idx] = el}
                  className={styles.projectCardWrapper}
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className={styles.imageGrid}>
                    <div className={`${styles.imgBox} ${styles.imgTopLeft}`} />
                    <div className={`${styles.imgBox} ${styles.imgBottomLeft}`} />
                    <div className={`${styles.imgBox} ${styles.imgMain}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className={`${styles.seeMoreContainer} ${activeIndex === PROJECTS.length - 1 ? styles.showButton : styles.hideButton}`}>
              <Link href="/more-projects" className={styles.seeMoreBtn}>
                See More Project
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="seeMoreGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#d4efff" />
                      <stop offset="100%" stopColor="#084d7a" />
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="10" stroke="url(#seeMoreGrad)"></circle>
                  <polyline points="12 16 16 12 12 8" stroke="url(#seeMoreGrad)"></polyline>
                  <line x1="8" y1="12" x2="16" y2="12" stroke="url(#seeMoreGrad)"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

