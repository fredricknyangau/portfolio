import React, { useRef, useState, memo, useCallback } from "react";
import { ArrowDown, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import Resume from "@/components/Resume";
import { useReactToPrint } from "react-to-print";

// Types
interface SocialLink {
  src: string;
  href: string;
  label: string;
  color: string;
}

interface HeroContentProps {
  onResumeOpen: () => void;
  scrollToSection: (sectionId: string) => void;
}

interface ScrollDownButtonProps {
  onClick: () => void;
}

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeRef: React.RefObject<HTMLDivElement>;
  onPrint: () => void;
}

// Constants
const SOCIAL_LINKS: SocialLink[] = [
  {
    src: "/github.png",
    href: "https://github.com/fredricknyangau",
    label: "GitHub",
    color: "hover:bg-gray-900 hover:text-white",
  },
  {
    src: "/linkedin.png",
    href: "https://linkedin.com/in/fredrick-nyang-au-857b75233",
    label: "LinkedIn",
    color: "hover:bg-accent hover:text-white",
  },
  {
    src: "/mail.jpg",
    href: "mailto:nyangaufredrick443@gmail.com",
    label: "Email",
    color: "hover:bg-red-500 hover:text-white",
  },
];

// Custom Hooks
const useScrollToSection = () => {
  return useCallback((sectionId: string) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Section with id "${sectionId}" not found`);
      }
    } catch (error) {
      console.error("Error scrolling to section:", error);
    }
  }, []);
};

const usePrintResume = (resumeRef: React.RefObject<HTMLDivElement>) => {
  return useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "Fredrick_Nyangau_Resume",
    onPrintError: (error) => {
      console.error("Error printing resume:", error);
    },
  });
};

// Components
const SocialLink = memo(({ src, href, label, color }: SocialLink) => (
  <a
    href={href}
    className={`w-16 h-16 p-4 rounded-xl glass-effect border hover:scale-110 transition-all duration-300 ${color} group flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
    aria-label={`Visit my ${label} profile`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={src}
      alt={`${label} icon`}
      className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
      draggable={false}
      loading="lazy"
      width="32"
      height="32"
    />
  </a>
));

SocialLink.displayName = "SocialLink";

const ProfileImage = memo(() => (
  <div className="flex justify-center">
    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-88 md:h-88 lg:w-96 lg:h-96 rounded-full glass-effect border-4 border-primary/20 flex items-center justify-center hover-lift">
        <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-88 lg:h-88 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <img
            src="/profile.png"
            alt="Professional headshot of Fredrick Nyang'au, Junior FullStack Developer and Freelancer"
            className="w-full h-full object-cover rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105"
            style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
            loading="lazy"
            draggable={false}
            width="384"
            height="384"
          />
        </div>
      </div>
    </div>
  </div>
));

ProfileImage.displayName = "ProfileImage";

const BackgroundElements = memo(() => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float delay-2s"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float delay-4s"></div>
    </div>
  </>
));

BackgroundElements.displayName = "BackgroundElements";

const HeroContent = memo(
  ({ onResumeOpen, scrollToSection }: HeroContentProps) => (
    <div className="text-left lg:text-left">
      <div className="space-y-6">
        <header className="animate-fade-in-up">
          <p className="text-lg font-medium text-primary mb-2">Hello, I'm</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text leading-tight">
            Fredrick Nyang'au
          </h1>
          <div className="inline-block px-4 py-1 bg-secondary/20 border border-secondary rounded-full text-sm font-medium text-secondary mb-4 flex items-center gap-2">
            <Circle className="w-3 h-3 fill-secondary" />
            Open to Backend Developer Roles
          </div>
        </header>

        <div className="animate-fade-in-up delay-200">
          <div className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            <span className="block font-semibold text-foreground">Backend Developer</span>
            <span className="block text-xl md:text-2xl mt-2 text-primary">
              Node.js, Django & Scalable API Architecture
            </span>
          </div>
        </div>

        <p className="text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed animate-fade-in-up delay-400">
          I craft exceptional digital experiences through the perfect blend of
          <span className="text-primary font-medium">
            {" "}
            innovative design
          </span>{" "}
          and
          <span className="text-primary font-medium"> clean code</span>. Let's
          build something extraordinary together.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-12 animate-fade-in-up delay-600">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => scrollToSection("projects")}
            aria-label="Navigate to projects section"
          >
            <span>View Backend Projects</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            asChild
          >
            <a href="/Fredrick_Nyang'au_Resume.pdf" download>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </Button>
        </div>

        <nav
          className="flex gap-4 animate-fade-in-up delay-800"
          aria-label="Social media links"
        >
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} {...link} />
          ))}
        </nav>
      </div>
    </div>
  )
);

HeroContent.displayName = "HeroContent";

const ScrollDownButton = memo(({ onClick }: ScrollDownButtonProps) => (
  <button
    onClick={onClick}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 rounded-full glass-effect border hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    aria-label="Scroll down to About section"
  >
    <ArrowDown
      size={24}
      className="text-primary group-hover:translate-y-1 transition-transform duration-300"
    />
  </button>
));

ScrollDownButton.displayName = "ScrollDownButton";

const ResumeModal = memo(
  ({ isOpen, onClose, resumeRef, onPrint }: ResumeModalProps) => (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      aria-labelledby="resume-modal-title"
    >
      <div ref={resumeRef} className="print:bg-white">
        <Resume />
      </div>
      <div className="flex justify-end mt-4 gap-2 print:hidden">
        <Button
          variant="secondary"
          onClick={onClose}
          className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Close resume modal"
        >
          Close
        </Button>
      </div>
    </Modal>
  )
);

ResumeModal.displayName = "ResumeModal";

const HeroSection = memo(() => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useScrollToSection();
  const handlePrint = usePrintResume(resumeRef);

  const handleResumeOpen = useCallback(() => {
    setResumeOpen(true);
  }, []);

  const handleResumeClose = useCallback(() => {
    setResumeOpen(false);
  }, []);

  const handleScrollToAbout = useCallback(() => {
    scrollToSection("about");
  }, [scrollToSection]);

  return (
    <main
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24"
      role="main"
    >
      <BackgroundElements />

      <div className="container mx-auto px-6 text-center z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <HeroContent
            onResumeOpen={handleResumeOpen}
            scrollToSection={scrollToSection}
          />
          <ProfileImage />
        </div>

        <ScrollDownButton onClick={handleScrollToAbout} />
      </div>

      <ResumeModal
        isOpen={resumeOpen}
        onClose={handleResumeClose}
        resumeRef={resumeRef}
        onPrint={handlePrint}
      />
    </main>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
