import React from "react";
import { useTheme } from "../context/ThemeContext";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import "../styles/Home.css";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`home ${theme}`}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Home;
