import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => (
  <motion.section
    id="about"
    className="about"
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2>About Me</h2>
    <p>
      I am a{" "}
      <strong>
        Full-Stack Developer, Algorithmic Trading Specialist, and SaaS Engineer
      </strong>
      , passionate about building
      <strong> scalable, secure, and user-friendly applications</strong>. My
      expertise spans{" "}
      <strong>MERN stack (MongoDB, Express.js, React.js, Node.js)</strong> along
      with <strong>MySQL, PostgreSQL, and Flask</strong>, allowing me to develop{" "}
      <strong>
        high-performance web, mobile, and algorithmic trading solutions
      </strong>
      .
    </p>
    <p>
      I prioritize <strong>performance, security, and user experience</strong>,
      ensuring that my solutions are{" "}
      <strong>tailored to client needs and scalable for future growth</strong>.
      Currently, I am expanding into{" "}
      <strong>mobile app development using Flutter</strong> and exploring new
      ways to integrate <strong>cloud computing and AI-driven analytics</strong>{" "}
      into my projects.
    </p>
    <p>
      🚀 Whether you're looking for{" "}
      <strong>
        a robust web application, a custom trading indicator, or an innovative
        SaaS solution
      </strong>
      , let's connect and bring your vision to life!
    </p>
  </motion.section>
);

export default AboutSection;
