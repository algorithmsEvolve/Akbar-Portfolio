import Link from 'next/link';
import Image from 'next/image';
import { MORE_PROJECTS } from '@/components/ProjectsSection/ProjectsData';
import styles from './MoreProjects.module.css';

export const metadata = {
  title: 'More Projects | Akbar',
  description: 'More product builds by Akbar',
};

export default function MoreProjects() {
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
              {/* Similar image grid to the homepage */}
              <div className={styles.imageGrid}>
                <div className={`${styles.imgBox} ${styles.imgTopLeft}`} />
                <div className={`${styles.imgBox} ${styles.imgBottomLeft}`} />
                <div className={`${styles.imgBox} ${styles.imgMain}`} />
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
                  
                  <button className={styles.linkArrowBtn}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 16 16 12 12 8"></polyline>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
