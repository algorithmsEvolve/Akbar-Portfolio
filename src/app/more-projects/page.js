"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MORE_PROJECTS } from '@/components/ProjectsSection/ProjectsData';
import styles from './MoreProjects.module.css';

export default function MoreProjects() {
  const [lightbox, setLightbox] = useState({ isOpen: false, project: null, imageIndex: 0 });
  const [zoom, setZoom] = useState(1);

  const openLightbox = (project, index) => {
    if (!project.images || project.images.length === 0) return;
    setLightbox({ isOpen: true, project, imageIndex: index });
    setZoom(1);
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    document.body.style.overflow = "auto";
    document.body.classList.remove("lightbox-open");
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
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo.png"
            alt="AR Logo"
            width={80}
            height={50}
            className={styles.logoImage}
            priority
          />
        </div>
        <Link href="/#projects" className={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="backHomeGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#d4efff" />
                <stop offset="100%" stopColor="#084d7a" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" stroke="url(#backHomeGrad)"></circle>
            <polyline points="12 8 8 12 12 16" stroke="url(#backHomeGrad)"></polyline>
            <line x1="16" y1="12" x2="8" y2="12" stroke="url(#backHomeGrad)"></line>
          </svg>
          Back to Home
        </Link>
        <div className={styles.headerSpacer}></div>
      </header>

      {/* Grid Content */}
      <div className={styles.content}>
        <div className={styles.projectsGrid}>
          {MORE_PROJECTS.map((project) => (
            <div key={project.id} className={`${styles.projectCard} hide-cursor-hover`}>
              {/* Image Grid */}
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

              {/* Project Info details */}
              <div className={styles.projectInfo}>
                <div className={styles.projectTitleWrapper}>
                  {/* Atomic icon */}
                  <svg className={styles.atomicIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"></ellipse>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"></ellipse>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"></ellipse>
                  </svg>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>

                <p className={styles.projectDesc}>
                  {project.description}
                </p>

                <div className={styles.highlights}>
                  {project.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className={styles.highlightItem}>
                      <span className={styles.highlightIcon}>🛸</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <div className={styles.bottomSection}>
                  <div className={styles.stacksContainer}>
                    {project.stacks.map((stack) => (
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
          ))}
        </div>
      </div>

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
    </main>
  );
}
