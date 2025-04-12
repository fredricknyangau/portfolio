import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "../styles/Home.css";
import profileImage from "../assets/images/profile.jpg";
import linkedinIcon from "../assets/images/linkedin-icon.png";
import githubIcon from "../assets/images/github-icon.png";

const Home = () => {
  const linkedInUrl = process.env.REACT_APP_LINKEDIN_URL;
  const githubUrl = process.env.REACT_APP_GITHUB_URL;
  const cvPath = process.env.REACT_APP_CV_PATH;

  //State for dark and light mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then(() => {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setStatus("Failed to send message.");
      });
  };

  return (
    <div className={`home ${darkMode ? "dark" : "light"}`}>
      {/* Dark Mode Toggle Button */}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      
      {/* Hero Section */}
      <motion.section
        id="hero"
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <h1>
            Hello, <span className="highlight">I'm FREDRICK NYANG'AU</span>, a{" "}
            <span className="highlight">Software Developer</span>
          </h1>
          <p>
            with a passion for building{" "}
            <em>functional, modern, responsive, and user-friendly</em> web applications.
            My focus is <span className="highlight-link">React.js</span>.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="contact-button">Contact me here</a>
            <a href={cvPath} className="download-cv" download>
              Download CV <span className="download-icon">⬇</span>
            </a>
          </div>
          <div className="social-links">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <img src={githubIcon} alt="GitHub" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="about"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>About Me</h2>
        <p>
          I am a <strong>Full-Stack Developer, Algorithmic Trading Specialist, and SaaS Engineer</strong>, passionate about building 
          <strong> scalable, secure, and user-friendly applications</strong>. My expertise spans <strong>MERN stack (MongoDB, Express.js, React.js, Node.js)</strong> along with <strong>MySQL, PostgreSQL, and Flask</strong>, 
          allowing me to develop <strong>high-performance web, mobile, and algorithmic trading solutions</strong>.
        </p>
        <p>
          Currently, I am doing my <strong>attachment at Huduma Kenya Nakuru</strong>, where I am gaining hands-on experience in 
          <strong>IT system administration, process automation, and software troubleshooting</strong> to enhance public service delivery.
        </p>
        <p>
          I prioritize <strong>performance, security, and user experience</strong>, ensuring that my solutions are <strong>tailored to client needs and scalable for future growth</strong>. Currently, I am expanding into <strong>mobile app development using Flutter</strong> and exploring new ways to integrate <strong>cloud computing and AI-driven analytics</strong> into my projects.
        </p>

        <p>🚀 Whether you're looking for <strong>a robust web application, a custom trading indicator, or an innovative SaaS solution</strong>, let's connect and bring your vision to life!</p>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="skills"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>My Skills</h2>
        <div className="skills-container">
          <div className="skill">HTML</div>
          <div className="skill">CSS</div>
          <div className="skill">JavaScript</div>
          <div className="skill">React.js</div>
          <div className="skill">Node.js</div>
          <div className="skill">Express.js</div>
          <div className="skill">MongoDB</div>
          <div className="skill">MySQL</div>
          <div className="skill">PostgreSQL</div>
          <div className="skill">Flask</div>
          <div className="skill">Git</div>
          <div className="skill">RESTful APIs</div>
          <div className="skill">UI/UX Design</div>
          <div className="skill">Flutter</div>
          <div className="skill">Dart</div>
          <div className="skill">Firebase</div>
          <div className="skill">Linux</div>
          <div className="skill">Docker</div>
          <div className="skill">Kubernetes</div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>My Projects</h2>
        <div className="project-cards">
          <motion.div
            className="project-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="path/to/hotel-booking-image.jpg"
              alt="Hotel Booking System"
              className="project-image"
            />
            <div className="project-content">
              <h3>Hotel Booking System</h3>
              <p>
                A comprehensive hotel booking system built with React, Node.js, and PostgreSQL.
              </p>
              <div className="project-buttons">
                <a
                  href="https://github.com/your-repo/hotel-booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-code-button"
                >
                  Source Code
                </a>
                <a
                  href="https://hotel-booking-demo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-demo-button"
                >
                  Preview Demo
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="project-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="path/to/market-structure-image.jpg"
              alt="Market Structure Indicator"
              className="project-image"
            />
            <div className="project-content">
              <h3>Market Structure Indicator</h3>
              <p>
                An advanced market structure indicator built with Pine Script for TradingView.
              </p>
              <div className="project-buttons">
                <a
                  href="https://github.com/your-repo/market-structure-indicator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-code-button"
                >
                  Source Code
                </a>
                <a
                  href="https://market-structure-demo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-demo-button"
                >
                  Preview Demo
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="project-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="path/to/african-instruments-image.jpg"
              alt="African Musical Instrument System"
              className="project-image"
            />
            <div className="project-content">
              <h3>African Musical Instrument System</h3>
              <p>
                A digital archive for African musical instruments built with the MERN stack.
              </p>
              <div className="project-buttons">
                <a
                  href="https://github.com/your-repo/african-instruments"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-code-button"
                >
                  Source Code
                </a>
                <a
                  href="https://african-instruments-demo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-demo-button"
                >
                  Preview Demo
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="contact"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2>Contact Me</h2>
          <p>Please contact me directly at <a href="https://wa.me/message/HC3E6I4WF6QVC1" target="_blank" rel="noreferrer">Whatsapp</a> or use the form below:</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>
          {status && <p className="status-message">{status}</p>}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
