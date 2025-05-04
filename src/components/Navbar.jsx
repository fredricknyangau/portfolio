import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import "../styles/Navbar.css";

function Navbar() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-content">
        <div className="logo">
          <a href="#hero">Portfolio</a>
        </div>
        <ul className="nav-links">
          <li className={activeSection === "hero" ? "active" : ""}>
            <a href="#hero">Home</a>
          </li>
          <li className={activeSection === "about" ? "active" : ""}>
            <a href="#about">About</a>
          </li>
          <li className={activeSection === "skills" ? "active" : ""}>
            <a href="#skills">Skills</a>
          </li>
          <li className={activeSection === "projects" ? "active" : ""}>
            <a href="#projects">Projects</a>
          </li>
          <li className={activeSection === "contact" ? "active" : ""}>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
