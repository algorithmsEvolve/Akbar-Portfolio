"use client";

import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.contentWrapper}>
        <div className={styles.contactInfoBlock}>
          <p className={styles.subtitle}>Ready To Collaborate?</p>
          <h2 className={styles.title}>
            GET IN <span className={styles.titleHighlight}>TOUCH</span>
          </h2>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Email :</span>
              <a href="mailto:akbarriski9404@gmail.com" className={styles.infoValue}>akbarriski9404@gmail.com</a>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Location :</span>
              <span className={styles.infoValue}>Jakarta, Indonesia</span>
            </div>
          </div>
        </div>

        <div className={styles.socialsContainer}>
          <a href="https://gitlab.com/algorithmsEvolve" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <img src="/images/gitlab-icon.png" className={styles.socialIcon} alt="Gitlab" />
            <span className={styles.socialText}>Gitlab</span>
          </a>
          <a href="https://github.com/algorithmsEvolve" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <img src="/images/github-icon.png" className={styles.socialIcon} alt="Github" />
            <span className={styles.socialText}>Github</span>
          </a>
          <a href="https://www.linkedin.com/in/akbar-riski/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <img src="/images/linkedin-icon.png" className={styles.socialIcon} alt="Linkedin" />
            <span className={styles.socialText}>Linkedin</span>
          </a>
        </div>
      </div>

      <div className={styles.giantTextContainer}>
        <div className={styles.giantText}>Akbar Riski.</div>
      </div>
    </section>
  );
}
