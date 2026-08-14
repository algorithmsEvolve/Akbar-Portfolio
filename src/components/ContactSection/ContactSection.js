"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ContactSection.module.css";
import { GitlabIcon, GithubIcon, LinkedinIcon } from "../Icons";

const QUOTES = [
  ["I know, it's hard to leave.", "Let's build yours next."],
  ["I don't promise magic.", "The results usually look like it."],
  ["You bring the impossible.", "I'll bring the commit history."],
];

const CARD_HALF_WIDTH = 130;

export default function ContactSection() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % QUOTES.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const avatar = sectionRef.current?.querySelector(`.${styles.avatarWrap}`);
    const cursor = cursorRef.current;
    if (!avatar || !cursor) return;

    const finePointer = window.matchMedia("(pointer: fine)");

    const onMove = (event) => {
      if (!finePointer.matches) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = Math.min(
        Math.max(event.clientX - rect.left, CARD_HALF_WIDTH),
        rect.width - CARD_HALF_WIDTH
      );
      const y = event.clientY - rect.top;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onEnter = () => cursor.classList.add(styles.quoteCursorVisible);
    const onLeave = () => cursor.classList.remove(styles.quoteCursorVisible);

    avatar.addEventListener("mousemove", onMove, { passive: true });
    avatar.addEventListener("mouseenter", onEnter);
    avatar.addEventListener("mouseleave", onLeave);

    return () => {
      avatar.removeEventListener("mousemove", onMove);
      avatar.removeEventListener("mouseenter", onEnter);
      avatar.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.akbarAnchor}>
        <div className={styles.verticalAkbar}>AKBAR</div>
      </div>

      <div className={styles.quoteCursor} ref={cursorRef} aria-hidden="true">
        <div className={styles.quoteAnchor}>
          {QUOTES.map(([firstLine, secondLine], index) => (
            <div
              key={firstLine}
              className={`${styles.quoteCard} ${index === quoteIndex ? styles.quoteCardActive : ""}`}
            >
              <strong>{firstLine}</strong>
              <br />
              {secondLine}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.leftContent}>
        <p className={styles.subtitle}>Ready to Collaborate?</p>
        <h2 className={styles.titleGetIn}>GET IN</h2>
        <h2 className={styles.titleTouch}>TOUCH</h2>

        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email :</span>
            <a href="mailto:akbarriski9404@gmail.com" className={styles.infoValue}>
              akbarriski9404@gmail.com
            </a>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Location :</span>
            <span className={styles.infoValue}>Jakarta, Indonesia</span>
          </div>
        </div>

        <div className={styles.socialsRow}>
          <a href="https://www.linkedin.com/in/akbar-riski/" target="_blank" rel="noopener noreferrer" aria-label="Linkedin" className={styles.socialLink}>
            <LinkedinIcon className={styles.socialIcon} />
          </a>
          <a href="https://gitlab.com/algorithmsEvolve" target="_blank" rel="noopener noreferrer" aria-label="Gitlab" className={styles.socialLink}>
            <GitlabIcon className={styles.socialIcon} />
          </a>
          <a href="https://github.com/algorithmsEvolve" target="_blank" rel="noopener noreferrer" aria-label="Github" className={styles.socialLink}>
            <GithubIcon className={styles.socialIcon} />
          </a>
        </div>
      </div>

      <div className={styles.avatarWrap}>
        <Image
          src="/images/contact-avatar-framer.png"
          alt="Akbar Riski"
          width={642}
          height={642}
          className={styles.avatarImg}
          priority
        />
      </div>
    </section>
  );
}
