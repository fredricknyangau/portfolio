import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Freelance Backend Developer",
      company: "Self-Employed",
      period: "2021 - Present",
      location: "Remote",
      type: "Freelance",
      achievements: [
        "Built 10+ REST APIs serving 5,000+ daily users across fintech and education platforms",
        "Designed MongoDB schemas reducing query times by 40% through proper indexing and aggregation",
        "Implemented JWT authentication and role-based access control for 3 production systems",
        "Optimized Django ORM queries cutting database load by 60% and improving response times",
        "Developed file upload systems with Cloudinary integration handling 500+ media files"
      ],
      tech: ["Node.js", "Express", "Django", "MongoDB", "PostgreSQL", "REST APIs", "JWT", "Docker"]
    },
    {
      title: "Student Developer",
      company: "Kabarak University",
      period: "2021 - 2025",
      location: "Nakuru, Kenya",
      type: "Education",
      achievements: [
        "Built university lost and found system reducing item recovery time by 60% for 2,000+ students",
        "Created digital archive for African musical instruments with 150+ documented entries",
        "Developed mobile farming app for Kenyan farmers with offline-first architecture",
        "Collaborated on team projects using Git, code reviews, and agile methodologies"
      ],
      tech: ["React", "Node.js", "MongoDB", "Flutter", "Express", "Cloudinary"]
    }
  ];

  return (
    <section
      id="experience"
      className="section-padding bg-gradient-to-b from-secondary/20 to-background"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <span className="text-primary font-semibold text-lg mb-4 block">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            4+ years of hands-on backend development experience building scalable APIs,
            optimizing databases, and architecting robust server-side systems
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="glass-effect border-0 hover-lift group overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary text-white">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                          {exp.title}
                        </CardTitle>
                        <p className="text-lg font-semibold text-muted-foreground mt-1">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        {exp.location}
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {exp.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-primary">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                      >
                        <span className="text-primary mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-3xl p-8 border max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Interested in my professional background?
            </p>
            <a
              href="/Fredrick_Nyang'au_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 font-medium"
            >
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
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Full Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
