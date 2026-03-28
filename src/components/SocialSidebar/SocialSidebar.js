"use client";

import styles from "./SocialSidebar.module.css";

import Image from "next/image";

const SOCIAL_LINKS = [
  {
    id: "gitlab",
    label: "GitLab",
    href: "https://gitlab.com/algorithmsEvolve",
    icon: "/images/gitlab-icon.png",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/algorithmsEvolve",
    icon: "/images/github-icon.png",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akbar-riski/",
    icon: "/images/linkedin-icon.png",
  },
];

export default function SocialSidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Social media links">
      <ul className={styles.socialList}>
        {SOCIAL_LINKS.map((social) => (
          <li key={social.id}>
            <a
              href={social.href}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${social.label} profile`}
              title={social.label}
            >
              <span className={styles.socialIcon}>
                <Image src={social.icon} alt={social.label} width={32} height={32} className={styles.socialImage} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
