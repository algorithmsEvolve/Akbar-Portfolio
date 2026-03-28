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

  const [lightbox, setLightbox] = useState({ isOpen: false, project: null, imageIndex: 0 });
  const [zoom, setZoom] = useState(1);

  const activeProject = PROJECTS[activeIndex];

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    document.body.style.overflow = "auto";
    document.body.classList.remove("hide-rainbow-cursor");
    document.body.classList.remove("lightbox-open");
  };

  const openLightbox = (project, index) => {
    if (!project.images || project.images.length === 0) return;
    setLightbox({ isOpen: true, project, imageIndex: index });
    setZoom(1);
    document.body.style.overflow = "hidden";
    document.body.classList.add("hide-rainbow-cursor");
    document.body.classList.add("lightbox-open");
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % prev.project.images.length
    }));
    setZoom(1);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex - 1 + prev.project.images.length) % prev.project.images.length
    }));
    setZoom(1);
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setZoom(prev => Math.max(prev - 0.25, 1));
  };

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
                    <div className={`${styles.imgBox} ${styles.imgTopLeft}`} onClick={() => openLightbox(project, 1)}>
                      {project.images?.[1] && <img src={project.images[1]} alt={project.title} className={styles.projectImage} />}
                    </div>
                    <div className={`${styles.imgBox} ${styles.imgBottomLeft}`} onClick={() => openLightbox(project, 2)}>
                      {project.images?.[2] && <img src={project.images[2]} alt={project.title} className={styles.projectImage} />}
                    </div>
                    <div className={`${styles.imgBox} ${styles.imgMain}`} onClick={() => openLightbox(project, 0)}>
                      {project.images?.[0] && <img src={project.images[0]} alt={project.title} className={styles.projectImage} />}
                    </div>
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

      {/* Lightbox Overlay */}
      {lightbox.isOpen && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <div className={styles.lightboxImageWrapper}>
              <img 
                src={lightbox.project.images[lightbox.imageIndex]} 
                alt="Enlarged project view" 
                className={styles.lightboxImage}
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <div className={styles.lightboxFooter}>
              <div className={styles.thumbnailStrip}>
                {lightbox.project.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.thumbnailItem} ${lightbox.imageIndex === idx ? styles.activeThumbnail : ""}`}
                    onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, imageIndex: idx }); setZoom(1); }}
                  >
                    <img src={img} alt={`thumbnail ${idx}`} />
                  </div>
                ))}
              </div>

              <div className={styles.zoomControls}>
                <button className={styles.zoomBtn} onClick={zoomOut} disabled={zoom <= 1} title="Zoom Out">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
                <button className={styles.zoomBtn} onClick={zoomIn} disabled={zoom >= 3}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

