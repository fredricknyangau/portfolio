import React, { useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import Resume from "@/components/Resume";
import { useReactToPrint } from "react-to-print";

const HeroSection = () => {
  const [resumeOpen, setResumeOpen] = React.useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "Fredrick_Nyangau_Resume",
  });

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24"
    >
      {/* Enhanced Background with geometric patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 text-center z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Content */}
          <div className="text-left lg:text-left">
            <div className="space-y-6">
              <div className="animate-fade-in-up">
                <p className="text-lg font-medium text-primary mb-2">
                  Hello, I'm
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text leading-tight">
                  Fredrick Nyang'au
                </h1>
              </div>

              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
                  <span className="block">FullStack Developer</span>
                  <span className="block text-xl md:text-2xl mt-2 text-primary">
                    & Freelancer
                  </span>
                </div>
              </div>

              <p
                className="text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                I craft exceptional digital experiences through the perfect
                blend of
                <span className="text-primary font-medium">
                  {" "}
                  innovative design
                </span>{" "}
                and
                <span className="text-primary font-medium"> clean code</span>.
                Let's build something extraordinary together.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-6 mb-12 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>Explore My Work</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 hover-lift"
                  onClick={() => setResumeOpen(true)}
                >
                  View Resume
                </Button>
              </div>

              <div
                className="flex gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                {[
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
                    color: "hover:bg-blue-600 hover:text-white",
                  },
                  {
                    src: "/mail.jpg",
                    href: "mailto:nyangaufredrick443@gmail.com",
                    label: "Email",
                    color: "hover:bg-red-500 hover:text-white",
                  },
                ].map(({ src, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`p-4 rounded-xl glass-effect border hover:scale-110 transition-all duration-300 ${color} group flex items-center justify-center`}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 65,
                      height: 65,
                      minWidth: 65,
                      minHeight: 65,
                    }}
                  >
                    <img
                      src={src}
                      alt={label}
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                      draggable={false}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Profile Section - Moved to the right */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full glass-effect border-4 border-primary/20 flex items-center justify-center hover-lift">
                <div className="w-72 h-72 md:w-88 md:h-88 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <img
                    src="/profile.jpg"
                    alt="Fredrick Nyang'au"
                    className="w-full h-full object-cover rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105"
                    style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 rounded-full glass-effect border hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none group"
        >
          <ArrowDown
            size={24}
            className="text-primary group-hover:translate-y-1 transition-transform duration-300"
          />
        </button>
      </div>

      <Modal isOpen={resumeOpen} onClose={() => setResumeOpen(false)}>
        <div ref={resumeRef} className="print:bg-white">
          <Resume onPrint={handlePrint} ref={resumeRef} />
        </div>
        <div className="flex justify-end mt-4 gap-2 print:hidden">
          <Button variant="secondary" onClick={() => setResumeOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default HeroSection;
