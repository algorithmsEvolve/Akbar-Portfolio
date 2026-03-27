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
              <a href="mailto:email@gmail.com" className={styles.infoValue}>email@gmail.com</a>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Location :</span>
              <span className={styles.infoValue}>Jakarta, Indonesia</span>
            </div>
          </div>
        </div>

        <div className={styles.socialsContainer}>
          <a href="#" className={styles.socialLink}>
            <img src="/icon-gitlab-final.png" className={styles.socialIcon} alt="Gitlab" />
            <span className={styles.socialText}>Gitlab</span>
          </a>
          <a href="#" className={styles.socialLink}>
            <img src="/icon-github-final.png" className={styles.socialIcon} alt="Github" />
            <span className={styles.socialText}>Github</span>
          </a>
          <a href="#" className={styles.socialLink}>
            <img src="/icon-linkedin-final.png" className={styles.socialIcon} alt="Linkedin" />
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
