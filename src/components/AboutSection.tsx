
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Palette, Zap, Award, Users, Coffee } from 'lucide-react';

const AboutSection = () => {
  const highlights = [
    {
      icon: Code2,
      title: 'Clean Architecture',
      description: 'Building scalable solutions with maintainable, well-documented code that stands the test of time'
    },
    {
      icon: Palette,
      title: 'Design Excellence',
      description: 'Creating beautiful, intuitive interfaces that delight users and drive engagement'
    },
    {
      icon: Zap,
      title: 'Performance First',
      description: 'Optimizing every interaction for speed, accessibility, and seamless user experiences'
    }
  ];

  const stats = [
    { number: '4+', label: 'Years Experience' },
    { number: '10+', label: 'Projects Completed' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <section
      id="about"
      className="section-padding bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <div className="inline-block">
            <span className="text-primary font-semibold text-lg mb-4 block">
              About Me
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Passionate Developer
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                I'm a passionate full-stack developer who believes that
                <span className="text-primary font-semibold">
                  {" "}
                  great code tells a story
                </span>
                . With over 4 years of crafting digital experiences, I've
                learned that the best solutions come from understanding both the
                technical challenges and human needs.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                My journey began in 2021 at Kabarak University in Nakuru, Kenya,
                where I was first introduced to the world of technology through
                foundational computer skills and MS Office applications. From
                these humble beginnings, I took my first steps into programming
                by crafting simple "Hello World" pages using HTML, CSS, and
                JavaScript. That spark of curiosity quickly grew into a deep
                passion for building intuitive and impactful digital
                experiences. Over the years, I've developed a strong command of
                modern web technologies and frameworks, with a focus on creating
                seamless, performant, and user-centric applications that not
                only function flawlessly but also inspire and engage users at
                every touchpoint.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map(({ number, label }) => (
                <div key={label} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    {number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {["React", "TypeScript", "TailwindCSS", "Node.js", "Django"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 glass-effect rounded-full text-sm font-medium border hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="grid gap-6">
            {highlights.map(({ icon: Icon, title, description }, index) => (
              <Card
                key={title}
                className="glass-effect border-0 hover-lift group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                      <Icon size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center glass-effect rounded-3xl p-12 border">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to bring your ideas to life?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Let's collaborate and create something extraordinary together. I'm
              always excited to tackle new challenges and push creative
              boundaries.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Coffee className="text-primary" size={24} />
              <span className="text-muted-foreground">
                Let's grab a coffee and chat!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
