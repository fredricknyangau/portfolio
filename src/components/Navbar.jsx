import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import "../styles/Navbar.css";

function Navbar() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-content">
        <div className="logo">
          <a href="#hero" onClick={closeMenu}>
            Portfolio
          </a>
        </div>
        <button
          className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li className={activeSection === "hero" ? "active" : ""}>
            <a href="#hero" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li className={activeSection === "about" ? "active" : ""}>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li className={activeSection === "skills" ? "active" : ""}>
            <a href="#skills" onClick={closeMenu}>
              Skills
            </a>
          </li>
          <li className={activeSection === "projects" ? "active" : ""}>
            <a href="#projects" onClick={closeMenu}>
              Projects
            </a>
          </li>
          <li className={activeSection === "contact" ? "active" : ""}>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
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
