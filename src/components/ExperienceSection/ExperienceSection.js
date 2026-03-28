"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ExperienceSection.module.css";

const EXPERIENCES = [
  {
    id: 1,
    year: "2021 - Present",
    role: "Full Stack Developer",
    company: "ATT Group · Full-time",
    description: "I've been a key part of the engineering team at ATT Group since early 2021, diving deep into the world of logistics and supply chain. It's been an incredible journey of building massive enterprise systems from the ground up and making sure every piece of the puzzle integrates perfectly to keep things moving smoothly.",
  },
  {
    id: 3,
    year: "2021 - Present",
    role: "Founder & Creative Lead",
    company: "Momento Project · Founder",
    description: "Momento Project is where my love for tech meets my artistic side. Since 2021, I've been obsessing over creating wedding invitations that aren't just digital—they're flawless experiences with an aesthetic edge. We also craft handcrafted gifts (seserahan & mahar), because I believe the best products always blend high-tech with a high-touch, human feel.",
  },
  {
    id: 2,
    year: "2022 - Present",
    role: "Fullstack Developer",
    company: "PT. Inovasi Digital Sadadjiwa (IDS) · Freelance",
    description: "Since 2022, I've been geeking out with the crew at IDS as a freelance dev. I'm all about pushing the limits with the latest tech stacks and AI-driven optimizations. From startups to government projects, I take pride in providing tailored, high-performance solutions that actually solve real-world headaches for my clients.",
  },
];

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotPosition, setDotPosition] = useState(0);
  const itemRefs = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      // Use requestAnimationFrame to optimize scroll performance
      animationFrameId = requestAnimationFrame(() => {
        if (!timelineRef.current || !itemRefs.current.length) return;

        // Parallax effect: the dot follows a targeted point on the screen (40% down from viewport top)
        const triggerPoint = window.innerHeight * 0.4;
        const rect = timelineRef.current.getBoundingClientRect();
        
        // Calculate where the trigger point intersects the timeline container
        let currentDotPos = triggerPoint - rect.top;

        // Clamp the dot position between the first item's visual center and the last item's visual center
        const firstItemPos = itemRefs.current[0] ? itemRefs.current[0].offsetTop + 16 : 0;
        const lastItemPos = itemRefs.current[EXPERIENCES.length - 1] ? itemRefs.current[EXPERIENCES.length - 1].offsetTop + 16 : 0;
        
        currentDotPos = Math.max(firstItemPos, Math.min(currentDotPos, lastItemPos));

        setDotPosition(currentDotPos);

        // Find which item is closest to the dot's current position to set as active
        let newActiveIndex = 0;
        let minDistance = Infinity;

        itemRefs.current.forEach((el, index) => {
          if (!el) return;
          // Target the visual center of each item
          const itemCenter = el.offsetTop + 16;
          const distance = Math.abs(currentDotPos - itemCenter);
          if (distance < minDistance) {
            minDistance = distance;
            newActiveIndex = index;
          }
        });

        setActiveIndex(newActiveIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Trigger immediately to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.subtitle}>Where It All Started</p>
        <h2 className={styles.title}>ENGINEERED <span className={styles.titleHighlight}>GROWTH</span></h2>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.timelineContainer} ref={timelineRef}>
          <div 
            className={styles.timelineLine} 
            style={{ height: `${dotPosition}px` }} 
          />
          <div 
            className={styles.timelineDot} 
            style={{ transform: `translateY(${dotPosition - 5}px)` }} 
          />
          <div 
            className={styles.timelineGlow} 
            style={{ transform: `translateY(${dotPosition - 50}px)` }} 
          />
        </div>

        <div className={styles.itemsContainer}>
          {EXPERIENCES.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`${styles.item} ${activeIndex === index ? styles.itemActive : ""}`}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className={styles.itemLeft}>
                <h3 className={styles.year}>{exp.year}</h3>
                <h4 className={styles.role}>{exp.role}</h4>
                <p className={styles.company}>{exp.company}</p>
              </div>
              <div className={styles.itemRight}>
                <p className={styles.description}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
