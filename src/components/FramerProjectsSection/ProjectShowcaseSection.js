"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./ProjectShowcaseSection.module.css";
import { PROJECT_SHOWCASE_ITEMS } from "./ProjectShowcaseData";

const STACK_ICONS = {
  NuxtJS: "nuxtjs/nuxtjs-original.svg",
  VueJS: "vuejs/vuejs-original.svg",
  PHP: "php/php-original.svg",
  Laravel: "laravel/laravel-original.svg",
  MySQL: "mysql/mysql-original.svg",
  React: "react/react-original.svg",
  "Socket.io": "socketio/socketio-original.svg",
  NextJS: "nextjs/nextjs-original.svg",
  PostgreSQL: "postgresql/postgresql-original.svg",
  Leaflet: "/images/leaflet.png",
};

const isLocalIcon = (path) => path?.startsWith("/");

const getStackIconPath = (stackName) => STACK_ICONS[stackName] || null;

const StackIconFallback = ({ name }) => {
  if (name === "Leaflet") {
    return <span className={styles.stackFallback}>L</span>;
  }
  return <span className={styles.stackFallback}>{name?.[0] || "?"}</span>;
};

const TRAILING_HEIGHT = 400;

export default function ProjectShowcaseSection() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [lightbox, setLightbox] = useState({ isOpen: false, project: null, imageIndex: 0 });
  const [zoom, setZoom] = useState(1);

  const requestCloseModal = useCallback(() => {
    setIsModalClosing(true);
    window.setTimeout(() => {
      setSelectedProject(null);
      setActiveTab("overview");
      setIsModalClosing(false);
    }, 240);
  }, []);

  const openModal = (project) => {
    setIsModalClosing(false);
    setActiveTab("overview");
    setSelectedProject(project);
  };

  const closeModal = requestCloseModal;

  const openLightbox = (project, index) => {
    setLightbox({ isOpen: true, project, imageIndex: index });
    setZoom(1);
  };

  const closeLightbox = () => {
    setLightbox((previous) => ({ ...previous, isOpen: false }));
  };

  const nextImage = (event) => {
    event.stopPropagation();
    setLightbox((previous) => ({
      ...previous,
      imageIndex: (previous.imageIndex + 1) % previous.project.images.length,
    }));
    setZoom(1);
  };

  const prevImage = (event) => {
    event.stopPropagation();
    setLightbox((previous) => ({
      ...previous,
      imageIndex: (previous.imageIndex - 1 + previous.project.images.length) % previous.project.images.length,
    }));
    setZoom(1);
  };

  const zoomIn = (event) => {
    event.stopPropagation();
    setZoom((previous) => Math.min(previous + 0.25, 3));
  };

  const zoomOut = (event) => {
    event.stopPropagation();
    setZoom((previous) => Math.max(previous - 0.25, 1));
  };

  const measure = useCallback(() => {
    if (!trackRef.current || !outerRef.current) return;
    const viewportW = outerRef.current.clientWidth;
    const contentW = trackRef.current.scrollWidth;
    const startX = trackRef.current.offsetLeft;
    setScrollDistance(Math.max(0, contentW - (viewportW - startX)));
  }, []);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth <= 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        if (lightbox.isOpen) {
          closeLightbox();
        } else {
          closeModal();
        }
      }
    };
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("showcase-modal-open");
    document.documentElement.classList.add("showcase-modal-open");

    const previousScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${previousScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("showcase-modal-open");
      document.documentElement.classList.remove("showcase-modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, previousScrollY);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject, lightbox.isOpen, closeModal]);

  useEffect(() => {
    if (!isMobile && scrollDistance <= 0) return undefined;
    let animationFrameId;
    let current = 0;
    let target = 0;

    const renderLoop = () => {
      current += (target - current) * 0.1;
      if (!isMobile && trackRef.current) trackRef.current.style.transform = `translateX(${-current}px)`;
      if (isMobile) {
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const next = cardRefs.current[idx + 1];
          let dim = 0;
          if (next) {
            const rect = card.getBoundingClientRect();
            const nextRect = next.getBoundingClientRect();
            dim = Math.min(1, Math.max(0, (rect.bottom - nextRect.top) / Math.max(1, rect.height)));
          }
          card.style.setProperty("--stack-dim", dim.toFixed(3));
          card.style.setProperty("--stack-scale", (1 - dim * 0.03).toFixed(3));
        });
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const handleScroll = () => {
      if (!outerRef.current) return;
      const scrolledIn = -outerRef.current.getBoundingClientRect().top;
      target = Math.max(0, Math.min(scrollDistance, scrolledIn));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animationFrameId = requestAnimationFrame(renderLoop);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollDistance, isMobile]);

  return (
    <div
      ref={outerRef}
      id="project-showcase"
      className={styles.sectionOuter}
      style={{ height: isMobile ? "auto" : `calc(100vh + ${scrollDistance + TRAILING_HEIGHT}px)` }}
    >
      <section className={styles.sectionSticky}>
        <div className={styles.header}>
          <p className={styles.subtitle}>More Projects, More Possibilities</p>
          <h2 className={styles.title}>
            PROJECT <span className={styles.titleHighlight}>SHOWCASE</span>
          </h2>
        </div>

        <div ref={trackRef} className={styles.track}>
          {PROJECT_SHOWCASE_ITEMS.map((project, idx) => (
            <button
              type="button"
              key={project.id}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className={`${styles.card} ${styles.cardLink}`}
              onClick={() => openModal(project)}
            >
              <div className={styles.cardMedia}>
                <img src={project.image} alt={project.title} loading="lazy" className={styles.cardImage} />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardTitle}>{project.title}</p>
                <p className={styles.cardCompany}>{project.company}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedProject && (
        <div className={`${styles.modalOverlay} ${isModalClosing ? styles.modalOverlayClosing : ""}`} onClick={closeModal}>
          <article className={`${styles.modal} ${isModalClosing ? styles.modalClosing : ""}`} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHero}>
              <div className={styles.modalHeroImageWrap}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className={styles.modalHeroImage}
                />
                <div className={styles.modalHeroGradient} />
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={closeModal}
                  aria-label="Close project details"
                >
                  ×
                </button>
                <div className={styles.modalHeroContent}>
                  <p className={styles.modalEyebrow}>PROJECT SHOWCASE</p>
                  <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                  <p className={styles.modalCompany}>{selectedProject.company}</p>
                </div>
              </div>

            </div>

            <div className={styles.modalBody}>
              <nav className={styles.modalTabs} role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "overview"}
                  className={`${styles.modalTab} ${activeTab === "overview" ? styles.modalTabActive : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                type="button"
                role="tab"
                aria-selected={activeTab === "screenshots"}
                className={`${styles.modalTab} ${activeTab === "screenshots" ? styles.modalTabActive : ""}`}
                onClick={() => setActiveTab("screenshots")}
                >
                Screenshots
                {selectedProject.images && (
                  <span
                    className={`${styles.modalTabCount} ${activeTab === "screenshots" ? styles.modalTabCountActive : styles.modalTabCountInactive}`}
                  >
                    {selectedProject.images.length}
                  </span>
                )}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "stack"}
                  className={`${styles.modalTab} ${activeTab === "stack" ? styles.modalTabActive : ""}`}
                  onClick={() => setActiveTab("stack")}
                >
                  Tech Stack
                </button>
              </nav>

              <div className={styles.modalTabPanels} key={activeTab}>
                {activeTab === "overview" && (
                  <div className={styles.modalTabPanel}>
                    <p className={styles.modalDescription}>{selectedProject.description}</p>
                    <h4 className={styles.modalSectionTitle}>Key Features</h4>
                    <ul className={styles.modalHighlights}>
                      {selectedProject.highlights.map((highlight, index) => (
                        <li key={highlight} className={styles.modalHighlight} style={{ animationDelay: `${0.05 * (index + 1)}s` }}>
                          <span className={styles.modalHighlightIcon}>✦</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "screenshots" && selectedProject.images && (
                  <div className={styles.modalTabPanel}>
                    <div className={styles.modalImages}>
                      {selectedProject.images.map((image, index) => (
                        <button
                          type="button"
                          key={index}
                          className={styles.modalImageButton}
                          onClick={() => openLightbox(selectedProject, index)}
                          style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                          aria-label={`View screenshot ${index + 1}`}
                        >
                          <img
                            src={image}
                            alt={`${selectedProject.title} screenshot ${index + 1}`}
                            className={styles.modalImage}
                            loading="lazy"
                          />
                          <span className={styles.modalImageBadge}>{index + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className={styles.modalTabPanel}>
                    <div className={styles.modalStacks}>
                      {selectedProject.stacks.map((stack, index) => {
                        const iconPath = getStackIconPath(stack);
                        return (
                          <span
                            key={stack}
                            className={styles.modalStack}
                            style={{ animationDelay: `${0.04 * (index + 1)}s` }}
                          >
                            {iconPath ? (
                              <img
                                src={isLocalIcon(iconPath) ? iconPath : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconPath}`}
                                alt=""
                                className={styles.modalStackIcon}
                              />
                            ) : (
                              <StackIconFallback name={stack} />
                            )}
                            <span>{stack}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedProject.link && (
              <div className={styles.modalFooter}>
                <a className={styles.visitButton} href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                  Open Website <span aria-hidden="true" className={styles.visitArrow}>↗</span>
                </a>
              </div>
            )}
          </article>
        </div>
      )}

      {lightbox.isOpen && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
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