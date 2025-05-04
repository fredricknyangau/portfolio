import React from "react";
import profileImage from "../assets/images/profile.jpg";
import linkedinIcon from "../assets/images/linkedin-icon.png";
import githubIcon from "../assets/images/github-icon.png";
import { motion } from "framer-motion";

const HeroSection = () => {
  const linkedInUrl = process.env.REACT_APP_LINKEDIN_URL || "#";
  const githubUrl = process.env.REACT_APP_GITHUB_URL || "#";
  const cvPath = process.env.REACT_APP_CV_PATH || "/cv.pdf";

  return (
    <motion.section
      id="hero"
      className="hero"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-content">
        <img
          src={profileImage}
          alt="Profile"
          className="profile-image"
          loading="lazy"
        />
        <h1>
          Hello, <span className="highlight">I'm FREDRICK NYANG'AU</span>, a{" "}
          <span className="highlight">Software Developer</span>
        </h1>
        <p>
          with a passion for building{" "}
          <em>functional, modern, responsive, and user-friendly</em> web
          applications. My focus is{" "}
          <span className="highlight-link">React.js</span>.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="contact-button">
            Contact me here
          </a>
          <a href={cvPath} className="download-cv" download>
            Download CV <span className="download-icon">⬇</span>
          </a>
        </div>
        <div className="social-links">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
