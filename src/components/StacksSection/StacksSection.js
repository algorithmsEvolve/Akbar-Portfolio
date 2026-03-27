"use client";

import { useState, useEffect } from "react";
import styles from "./StacksSection.module.css";
import { STACK_ROWS } from "./StacksData";

export default function StacksSection() {
  const [activeItem, setActiveItem] = useState("html");

  // Cleanup body class if component unmounts while hovered
  useEffect(() => {
    return () => {
      document.body.classList.remove("hide-rainbow-cursor");
    };
  }, []);

  const handleMouseEnter = () => {
    document.body.classList.add("hide-rainbow-cursor");
  };

  const handleMouseLeave = () => {
    document.body.classList.remove("hide-rainbow-cursor");
  };

  const renderIcon = (stack) => {
    if (stack.isCustom) {
      if (stack.customIcon === "api") {
        return (
          <svg className={styles.customSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
        );
      }
      if (stack.customIcon === "database") {
        return (
          <svg className={styles.customSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        );
      }
      return null;
    }

    return (
      <img 
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${stack.iconPath}`} 
        alt={stack.name}
        className={styles.cardIcon}
        loading="lazy"
      />
    );
  };

  return (
    <section 
      id="stacks" 
      className={styles.section}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background network effects */}
      <div className={styles.bgEffects}>
        <div className={styles.glowBlob} />
        
        <div className={styles.cloudWrapper}>
          {/* Dim base layer (static relative position to give wrapper height) */}
          <img 
            src="/images/stacks-bg-transparent.png" 
            alt="" 
            className={styles.cloudBg} 
          />
          
          {/* Spreading electric highlight layer (absolute positioned on top) */}
          <img 
            src="/images/stacks-bg-transparent.png" 
            alt="Network Connections" 
            className={`${styles.cloudBg} ${styles.cloudBgHighlight}`} 
          />
        </div>
      </div>

      <div className={styles.header}>
        <p className={styles.subtitle}>Built With Precision</p>
        <h2 className={styles.title}>STACK <span className={styles.titleHighlight}>MASTERY</span></h2>
      </div>

      <div className={styles.gridContainer}>
        {STACK_ROWS.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.row}>
            {row.map((stack) => {
              const isActive = activeItem === stack.id;
              return (
                <div 
                  key={stack.id} 
                  className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                  onMouseEnter={() => setActiveItem(stack.id)}
                >
                  {renderIcon(stack)}
                  <span className={styles.cardName}>{stack.name}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
