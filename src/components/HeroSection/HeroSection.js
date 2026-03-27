import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section id="home" className={styles.hero}>
      {/* Background Watermark Text */}
      <div className={styles.watermark} aria-hidden="true">
        <span className={styles.watermarkText}>Akbar</span>
        <span className={styles.watermarkText}>Riski.</span>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Avatar */}
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing}>
            <div className={styles.avatarInner}>
              <Image
                src="/images/avatar.png"
                alt="Akbar Riski - Full-Stack Developer"
                width={160}
                height={160}
                priority
                className={styles.avatarImage}
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={styles.location}>
          <Image
            src="/images/location-icon.png"
            alt="Location"
            width={18}
            height={22}
            className={styles.locationIcon}
          />
          <span className={styles.locationText}>Jakarta, Indonesia</span>
        </div>

        {/* Tagline */}
        <h1 className={styles.tagline}>
          <span className={styles.taglineBold}>Tagline </span>
          <span className={styles.taglineAccent}>Tagline</span>
        </h1>

        {/* Description */}
        <p className={styles.description}>
          I&apos;m Akbar, a Full-Stack Developer with over 8 years of experience
          crafting end-to-end web solutions. From intuitive front-end interfaces
          to powerful back-end systems, I build scalable, efficient, and reliable
          web applications.
        </p>
      </div>
    </section>
  );
}
