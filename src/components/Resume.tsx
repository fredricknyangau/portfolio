import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Mail, Github, Linkedin, MapPin, Globe } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

interface ResumeProps {
  hideExport?: boolean;
  onPrint?: () => void;
}

const Resume = forwardRef<HTMLDivElement, ResumeProps>(
  ({ hideExport, onPrint }, ref) => {
    const resumeRef = useRef<HTMLDivElement>(null);

    // Forward internal ref to parent
    useImperativeHandle(ref, () => resumeRef.current as HTMLDivElement);

    const handlePrint = useReactToPrint({
      content: () => resumeRef.current,
      documentTitle: "Fredrick_Nyangau_Resume",
    });

    const exportToWord = () => {
      const target = resumeRef.current;
      if (!target) return;
      const htmlContent = target.innerHTML;
      const wordHtml = `<!DOCTYPE html><html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charSet='utf-8'><title>Resume</title></head><body>${htmlContent}</body></html>`;
      const blob = new Blob([wordHtml], {
        type: "application/msword;charset=utf-8",
      });
      saveAs(blob, "Fredrick_Nyangau_Resume.doc");
    };

    return (
      <>
        {!hideExport && (
          <div className="flex justify-end mb-4 gap-2 print:hidden">
            <Button
              onClick={onPrint || handlePrint}
              className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Print / Save as PDF
            </Button>
            <Button
              onClick={exportToWord}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Download as Word
            </Button>
          </div>
        )}
        <section
          ref={resumeRef}
          className="max-w-5xl mx-auto p-8 glass-effect rounded-3xl border shadow-2xl print:shadow-none print:bg-white"
        >
          {/* Header */}
          <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-border/50 pb-8 mb-8">
            <div className="flex-1">
              <h1 className="text-5xl print:text-3xl font-bold gradient-text mb-3">
                Fredrick Nyang'au
              </h1>
              <p className="text-xl print:text-lg text-muted-foreground mb-4 font-light">
                Software Developer | React | Flutter | Tailwind CSS | SMC Trader
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                {[
                  {
                    icon: MapPin,
                    text: "Nairobi, Kenya",
                  },
                  {
                    icon: Mail,
                    text: "nyangaufredrick443@gmail.com",
                    href: "mailto:nyangaufredrick443@gmail.com",
                  },
                  {
                    icon: Globe,
                    text: "fredricknyangau.vercel.app",
                    href: "https://fredricknyangau.vercel.app",
                  },
                  {
                    icon: Github,
                    text: "fredricknyangau",
                    href: "https://github.com/fredricknyangau",
                  },
                  {
                    icon: Linkedin,
                    text: "LinkedIn",
                    href: "https://linkedin.com/in/fredrick-nyang-au-857b75233",
                  },
                ].map(({ icon: Icon, text, href }, index) => {
                  const Tag = href ? "a" : "div";
                  return (
                    <Tag
                      key={index}
                      {...(href && {
                        href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="flex items-center gap-2 px-3 py-2 glass-effect rounded-full border hover:border-primary/50 transition-all duration-300 hover-lift"
                    >
                      <Icon size={16} className="text-primary" />
                      <span className="text-foreground">{text}</span>
                    </Tag>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                <img
                  src="/profile.jpg"
                  alt="Fredrick Nyang'au Profile"
                  loading="lazy"
                  className="relative w-32 h-32 rounded-full object-cover glass-effect border-4 border-primary/20 hover-lift"
                />
              </div>
            </div>
          </header>

           {/* About Me */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-full mr-3"></span>
              About Me
            </h2>
            <div className="glass-effect rounded-2xl p-6 border hover:border-primary/20 transition-all duration-300">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Passionate developer with experience in building full-stack
                applications using React, Flutter, and Node.js. I enjoy turning
                complex problems into elegant digital solutions and contributing
                to community-driven projects.
              </p>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-full mr-3"></span>
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Languages",
                  skills: "JavaScript, TypeScript, Dart, Python",
                },
                {
                  title: "Frameworks",
                  skills: "React, Flutter, Node.js, Express",
                },
                {
                  title: "Tools",
                  skills: "Git, MongoDB, Cloudinary, Vite, Firebase",
                },
                {
                  title: "Other",
                  skills: "SMC Trading, REST APIs, Responsive Design",
                },
              ].map(({ title, skills }, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-2xl p-6 border hover:border-primary/20 transition-all duration-300 hover-lift group"
                >
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-muted-foreground">{skills}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-full mr-3"></span>
              Experience
            </h2>
            <div className="glass-effect rounded-2xl p-6 border hover:border-primary/20 transition-all duration-300">
              <h3 className="text-xl font-semibold text-primary mb-1">
                Freelance Developer
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                2023 – Present
              </p>
              <ul className="space-y-2">
                {[
                  "Built full-stack applications with React, Node.js, and MongoDB.",
                  "Developed a music instrument archive with educational tools and user dashboards.",
                  "Implemented secure authentication and media uploads with Multer and Cloudinary.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-full mr-3"></span>
              Projects
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "African Music Instruments Archive",
                  description:
                    "Educational platform with cultural tools and contributor system.",
                },
                {
                  title: "Ukulima App",
                  description:
                    "Flutter app for managing livestock and farming data.",
                },
                {
                  title: "Notion Trading Journal",
                  description:
                    "Custom journal to track SMC trades across timeframes.",
                },
              ].map(({ title, description }, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-2xl p-6 border hover:border-primary/20 transition-all duration-300 hover-lift group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-full mr-3"></span>
              Education
            </h2>
            <div className="glass-effect rounded-2xl p-6 border hover:border-primary/20 transition-all duration-300">
              <p className="text-muted-foreground text-lg">
                Bachelor of Science in Information Technology – [Kabarak
                University], [2021 - 2025]
              </p>
            </div>
          </section>
        </section>
      </>
    );
  }
);

Resume.displayName = "Resume";
export default Resume;
