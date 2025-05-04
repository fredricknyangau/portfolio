import React from "react";
import { motion } from "framer-motion";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Flask",
  "Git",
  "RESTful APIs",
  "UI/UX Design",
  "Technical Writing",
  "Flutter",
  "Dart",
  "Firebase",
  "Linux",
  "Docker",
  "Kubernetes",
];

const SkillsSection = () => (
  <motion.section
    id="skills"
    className="skills"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h2>My Skills</h2>
    <div className="skills-container">
      {skills.map((skill, index) => (
        <div key={index} className="skill">
          {skill}
        </div>
      ))}
    </div>
  </motion.section>
);

export default SkillsSection;
