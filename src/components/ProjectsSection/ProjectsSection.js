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

  // Ref to avoid stale closure in scroll handler
  const activeIndexRef = useRef(0);
  // Ref to the outer tall wrapper — scroll position is read from this
  const outerRef = useRef(null);

  // Keep ref in sync with state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (!outerRef.current) return;

        const rect = outerRef.current.getBoundingClientRect();
        // How far the user has scrolled into this section (negative rect.top means scrolled in)
        const scrolledIn = -rect.top;

        // Total scrollable range: from first project to last project
        const totalRange = STEP_HEIGHT * (PROJECTS.length - 1);

        // Clamp to [0, totalRange]
        const clamped = Math.max(0, Math.min(totalRange, scrolledIn));

        // Active index: which "step" we're on
        const newActiveIndex = Math.min(
          PROJECTS.length - 1,
          Math.floor(clamped / STEP_HEIGHT)
        );

        // Dot progress: 0 at first project, 1 at last
        const newDotProgress = totalRange > 0 ? clamped / totalRange : 0;

        if (newActiveIndex !== activeIndexRef.current) {
          setScrollDir(newActiveIndex > activeIndexRef.current ? "down" : "up");
          setActiveIndex(newActiveIndex);
        }
        setDotProgress(newDotProgress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial call to set correct state

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeProject = PROJECTS[activeIndex];

  return (
    // Outer wrapper: tall enough to give scroll distance for all project transitions
    // +100vh so the sticky panel is fully in view before/after transitions
    <div
      ref={outerRef}
      id="projects"
      className={styles.sectionOuter}
      style={{ height: `calc(${(PROJECTS.length - 1) * STEP_HEIGHT + TRAILING_HEIGHT}px + 100vh)` }}
    >
      {/* Inner sticky panel — stays fixed while user scrolls through outerRef */}
      <section className={styles.sectionSticky}>

        <div className={styles.header}>
          <p className={styles.subtitle}>Where Ideas Become Systems</p>
          <h2 className={styles.title}>PRODUCT <span className={styles.titleHighlight}>BUILDS</span></h2>
        </div>

        <div className={styles.contentWrapper}>

          {/* Left Sticky Column — project info */}
          <div className={styles.leftPanel}>
            <div className={styles.projectInfo}>
              <div key={activeProject.id} className={`${styles.fadeContent} ${scrollDir === "down" ? styles.fadeLeftUp : styles.fadeLeftDown}`}>
                <div className={styles.projectInfoTitleWrapper}>
                  {/* Atomic icon */}
                  <svg className={styles.atomicIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"></ellipse>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"></ellipse>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"></ellipse>
                  </svg>
                  <h3 className={styles.projectTitle}>{activeProject.title}</h3>
                </div>

                <div className={styles.projectContentBody}>
                  <p className={styles.projectDesc}>{activeProject.description}</p>

                  <div className={styles.highlights}>
                    {activeProject.highlights.map((highlight, idx) => (
                      <div key={idx} className={styles.highlightItem}>
                        <span className={styles.highlightIcon}>🛸</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.stacksContainer}>
                    {activeProject.stacks.map((stack) => (
                      <div key={stack.id} className={styles.stackBadge}>
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${stack.iconPath}`}
                          alt={stack.name}
                          className={styles.stackIcon}
                        />
                        <span className={styles.stackName}>{stack.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineLine} style={{ height: `${dotProgress * 100}%` }}></div>
              <div className={styles.timelineDot} style={{ top: `${dotProgress * 100}%` }}></div>
              <div className={styles.timelineGlow} style={{ top: `${dotProgress * 100}%` }}></div>
            </div>
          </div>

          {/* Right Panel — image grid, switches with activeIndex like left side */}
          <div className={`${styles.rightPanel} hide-cursor-hover`}>
            {/* Previous Grid Shadow */}
            {activeIndex > 0 && (
              <div className={`${styles.shadowGrid} ${styles.shadowPrev}`}>
                <div key={`prev-${PROJECTS[activeIndex - 1].id}`} className={`${scrollDir === "down" ? styles.fadeGridUp : styles.fadeGridDown}`}>
                  <div className={styles.imageGrid}>
                    <div className={`${styles.imgBox} ${styles.imgTopLeft}`} />
                    <div className={`${styles.imgBox} ${styles.imgBottomLeft}`} />
                    <div className={`${styles.imgBox} ${styles.imgMain}`} />
                  </div>
                </div>
              </div>
            )}

            {/* Active Grid */}
            <div key={activeProject.id} className={`${scrollDir === "down" ? styles.fadeGridUp : styles.fadeGridDown}`}>
              <div className={styles.imageGrid}>
                <div className={`${styles.imgBox} ${styles.imgTopLeft}`} />
                <div className={`${styles.imgBox} ${styles.imgBottomLeft}`} />
                <div className={`${styles.imgBox} ${styles.imgMain}`} />
              </div>
            </div>

            {/* Next Grid Shadow */}
            {activeIndex < PROJECTS.length - 1 && (
              <div className={`${styles.shadowGrid} ${styles.shadowNext}`}>
                <div key={`next-${PROJECTS[activeIndex + 1].id}`} className={`${scrollDir === "down" ? styles.fadeGridUp : styles.fadeGridDown}`}>
                  <div className={styles.imageGrid}>
                    <div className={`${styles.imgBox} ${styles.imgTopLeft}`} />
                    <div className={`${styles.imgBox} ${styles.imgBottomLeft}`} />
                    <div className={`${styles.imgBox} ${styles.imgMain}`} />
                  </div>
                </div>
              </div>
            )}

            {/* See More button — shows only at the last project smoothly */}
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
