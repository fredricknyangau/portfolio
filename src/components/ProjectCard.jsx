import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ image, title, description, github, demo }) => (
  <motion.div
    className="project-card"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <img src={image} alt={title} className="project-image" loading="lazy" />
    <div className="project-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-buttons">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="source-code-button"
        >
          Source Code
        </a>
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="preview-demo-button"
        >
          Preview Demo
        </a>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;
