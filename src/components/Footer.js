import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      <p><strong>About this website:</strong> built with React.js, CSS, Framer Motion, EmailJS, Vercel hosting.</p>
    </footer>
  );
}

export default Footer;
