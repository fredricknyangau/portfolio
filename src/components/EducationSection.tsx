import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const EducationSection = () => {
  return (
    <section
      id="education"
      className="section-padding"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <span className="text-primary font-semibold text-lg mb-4 block">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <Card className="glass-effect border-0 hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                  <GraduationCap size={24} />
                </div>
                <CardTitle className="text-2xl">University Education</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Kabarak University</h3>
                <p className="text-lg text-primary font-semibold mb-2">
                  Bachelor of Science in Computer Science
                </p>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <span>2021 - 2025</span>
                  <span>•</span>
                  <span>Nakuru, Kenya</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Relevant Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Data Structures & Algorithms',
                      'Database Systems',
                      'Web Development',
                      'Software Engineering',
                      'Computer Networks',
                      'Operating Systems'
                    ].map((course) => (
                      <Badge key={course} variant="outline">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="glass-effect border-0 hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                  <Award size={24} />
                </div>
                <CardTitle className="text-2xl">Certifications & Learning</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <BookOpen size={18} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Node.js Development</h4>
                    <p className="text-sm text-muted-foreground">Self-taught through documentation & projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen size={18} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Django Web Framework</h4>
                    <p className="text-sm text-muted-foreground">Official tutorials & production experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen size={18} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">MongoDB Database Design</h4>
                    <p className="text-sm text-muted-foreground">Hands-on learning with real-world applications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen size={18} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">RESTful API Design</h4>
                    <p className="text-sm text-muted-foreground">Industry best practices & implementation</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t mt-6">
                <h4 className="font-semibold mb-3">Continuous Learning</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Committed to staying current with backend technologies through documentation,
                  technical blogs, open source contributions, and hands-on project work.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
