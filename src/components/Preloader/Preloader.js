"use client";

import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";
import { PROJECTS } from "../ProjectsSection/ProjectsData";

const STATIC_IMAGES = [
  "/images/avatar.png",
  "/images/stacks-bg-transparent.png",
  "/images/stacks-bg.png",
  "/images/logo.png"
];

function getAllImagesToPreload() {
  const allImages = [...STATIC_IMAGES];
  
  // Collect all project images and stack icons
  PROJECTS.forEach(project => {
    if (project.images) {
      allImages.push(...project.images);
    }
    if (project.stacks) {
      project.stacks.forEach(stack => {
        allImages.push(`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${stack.iconPath}`);
      });
    }
  });

  return allImages;
}

export default function Preloader() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Lock scroll immediately on mount
    document.body.style.overflow = "hidden";
    
    // Slight delay to ensure DOM is ready and locking takes effect
    const imageURLs = getAllImagesToPreload();
    let loadedCount = 0;
    
    // Create a min timer so the loader isn't a mere glitch if cached
    const startTime = Date.now();
    const MIN_LOADING_TIME = 1500;

    const handleProgress = () => {
      loadedCount++;
      const progress = Math.min(100, Math.floor((loadedCount / imageURLs.length) * 100));
      setLoadingProgress(progress);

      if (loadedCount === imageURLs.length) {
        finishLoading();
      }
    };

    const finishLoading = () => {
      const timeElapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - timeElapsed);

      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsPreloaderVisible(false);
          document.body.style.overflow = "";
        }, 800); // 0.8s for fadeOut animation
      }, remainingTime);
    };

    if (imageURLs.length === 0) {
      finishLoading();
      return;
    }

    // Begin preload chain
    imageURLs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      if (img.complete) {
        handleProgress();
      } else {
        img.onload = handleProgress;
        img.onerror = handleProgress; // Treat error as loaded to keep progress moving
      }
    });

    // Cleanup in case unmounted early
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!isPreloaderVisible) return null;

  return (
    <div className={`${styles.preloaderContainer} ${isFadingOut ? styles.fadeOut : ""}`}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div className={styles.loaderRing}></div>
          <div className={styles.loaderRing}></div>
          <div className={styles.loaderRing}></div>
          <p className={styles.brand}>AR</p>
        </div>
        
        <div className={styles.progressSection}>
          <div className={styles.progressBarWrapper}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${loadingProgress}%` }}
            >
              <div className={styles.progressGlow}></div>
            </div>
          </div>
          
          <div className={styles.progressTextWrapper}>
            <span className={styles.progressText} data-text="INITIALIZING SYS">
              INITIALIZING SYS
            </span>
            <span className={styles.percentageText}>{loadingProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
