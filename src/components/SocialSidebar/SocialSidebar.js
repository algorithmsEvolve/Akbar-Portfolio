"use client";

import styles from "./SocialSidebar.module.css";

import { GitlabIcon, GithubIcon, LinkedinIcon } from "../Icons";

const SOCIAL_LINKS = [
  {
    id: "gitlab",
    label: "GitLab",
    href: "https://gitlab.com/algorithmsEvolve",
    Icon: GitlabIcon,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/algorithmsEvolve",
    Icon: GithubIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akbar-riski/",
    Icon: LinkedinIcon,
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
                <social.Icon className={styles.socialImage} aria-label={social.label} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
