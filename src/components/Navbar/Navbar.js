"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "stacks", label: "Stacks" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ transform: 'translateX(0px)', width: '0px', opacity: 0 });
  const navContainerRef = useRef(null);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isClickScrolling.current) {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 100);
        return;
      }

      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Update scroll locking for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("no_scroll");
      document.body.classList.add("lightbox-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("no_scroll");
      document.body.classList.remove("lightbox-open");
    }
    
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("no_scroll");
      document.body.classList.remove("lightbox-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeElement = document.getElementById(`nav-item-${activeSection}`);
      const container = navContainerRef.current;
      if (activeElement && container) {
        setIndicatorStyle({
          transform: `translateX(${activeElement.offsetLeft}px)`,
          width: `${activeElement.offsetWidth}px`,
          opacity: 1,
        });
      }
    };

    const timeoutId = setTimeout(updateIndicator, 10);
    window.addEventListener("resize", updateIndicator);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection, isScrolled]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    isClickScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setActiveSection(sectionId);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isMobileMenuOpen ? styles.mobileHeaderOpen : ""}`}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <a href="#home" className={styles.logo} onClick={(e) => handleNavClick(e, "home")}>
            <Image
              src="/images/logo.png"
              alt="AR Logo"
              width={80}
              height={50}
              className={styles.logoImage}
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className={`${styles.nav} ${activeSection !== "home" ? styles.navCentered : ""}`}>
            <ul className={styles.navList} ref={navContainerRef}>
              <div className={styles.navIndicator} style={indicatorStyle} />
              {NAV_ITEMS.map((item) => (
                <li key={item.id} id={`nav-item-${item.id}`} className={styles.navItem}>
                  <a
                    href={`#${item.id}`}
                    className={`${styles.navLink} ${
                      activeSection === item.id ? styles.navLinkActive : ""
                    }`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Button - Isolated Top-Level Sibling */}
      <button
        className={`${styles.mobileMenuBtn} ${
          isMobileMenuOpen ? styles.mobileMenuBtnOpen : ""
        }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      {/* Mobile Navigation Overlay */}
      <div
        className={`${styles.mobileNav} ${
          isMobileMenuOpen ? styles.mobileNavOpen : ""
        }`}
      >
        <nav>
          <ul className={styles.mobileNavList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`${styles.mobileNavLink} ${
                    activeSection === item.id ? styles.mobileNavLinkActive : ""
                  }`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
