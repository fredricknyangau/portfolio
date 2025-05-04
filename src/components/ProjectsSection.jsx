import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import userDashboardImg from "../assets/images/user-dashboard.png";
import adminDashboardImg from "../assets/images/admin-dashboard.png";
import authSystemImg from "../assets/images/user-login.png"; // Add this if you have it

const projects = [
  {
    title: "African Music Instruments Archive",
    description:
      "A web app that catalogs traditional African instruments with search, filters, and multimedia content. Built with React, Tailwind CSS, and Node.js.",
    image: userDashboardImg,
    github: "https://github.com/fredricknyangau/MusicEdu",
    demo: "https://music-edu.vercel.app",
  },
  {
    title: "Admin Dashboard - Music Archive",
    description:
      "An admin dashboard for managing instruments, categories, user feedback, and security logs. Features role-based access and responsive UI. Request for Admin privileges to access the dashboard.",
    image: adminDashboardImg,
    github: "https://github.com/fredricknyangau/MusicEdu",
    demo: "https://music-edu.vercel.app/admin",
  },
  {
    title: "Authentication System",
    description:
      "A secure login and registration system with JWT, protected routes, and form validation for a React-based app.",
    image: authSystemImg,
    github: "https://github.com/fredricknyangau/MusicEdu",
    demo: "https://music-edu.vercel.app/login",
  },
];

const ProjectsSection = () => (
  <motion.section
    id="projects"
    className="projects"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <h2>My Projects</h2>
    <div className="project-cards">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  </motion.section>
);

export default ProjectsSection;
