import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {
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

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar">
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
    </nav>
  );
}

export default Navbar;
