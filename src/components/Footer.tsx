import React from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Heart, Circle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/fredricknyangau",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/fredrick-nyang-au-857b75233",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:nyangaufredrick443@gmail.com",
      label: "Email"
    },
    {
      icon: Phone,
      href: "https://wa.me/254746730585",
      label: "WhatsApp"
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Fredrick Nyangau
            </h3>
            <p className="text-muted-foreground mb-4">
              Backend Developer specializing in Node.js, Django, and scalable API architecture
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              <span>Nakuru, Kenya</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 border border-secondary rounded-full text-xs font-medium text-secondary">
              <Circle className="w-2.5 h-2.5 fill-secondary" />
              Available for Remote Opportunities
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/Fredrick_Nyang'au_Resume.pdf"
                  download
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect With Me</h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg glass-effect border hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Feel free to reach out for backend development opportunities or collaborations
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Fredrick Nyangau. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart size={14} className="text-primary fill-primary" /> using React, TypeScript & African Fintech Colors
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
