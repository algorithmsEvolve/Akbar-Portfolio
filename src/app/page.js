import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import StacksSection from "@/components/StacksSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialSidebar from "@/components/SocialSidebar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <SocialSidebar />

      <main className={styles.main}>
        <HeroSection />
        
        <ExperienceSection />

        <StacksSection />

        <ProjectsSection />

        <ContactSection />
      </main>
    </div>
  );
}
