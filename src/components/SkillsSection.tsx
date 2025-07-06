
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Palette, Server, Wrench } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend Excellence',
      icon: <Palette />,
      color: 'from-blue-500 to-purple-600',
      skills: [
        { name: 'React.js', level: 95, category: 'Library' },
        { name: 'TypeScript', level: 90, category: 'Language' },
        { name: 'Tailwind CSS', level: 88, category: 'Styling' },
        { name: 'Shadcn UI', level: 82, category: 'UI Library' }
      ]
    },
    {
      title: 'Backend Mastery',
      icon: <Server />,
      color: 'from-green-500 to-emerald-600',
      skills: [
        { name: 'Node.js', level: 92, category: 'Runtime' },
        { name: 'Django', level: 85, category: 'Framework' },
        { name: 'MySQL & MongoDB', level: 80, category: 'Databases' },
        { name: 'REST API', level: 78, category: 'API' }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: <Wrench />,
      color: 'from-orange-500 to-red-600',
      skills: [
        { name: 'Git/GitHub', level: 95, category: 'Version Control' },
        { name: 'Docker', level: 70, category: 'Container' },
        { name: 'AWS', level: 78, category: 'Cloud' },
      ]
    }
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <span className="text-primary font-semibold text-lg mb-4 block">Technical Skills</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Expertise & Tools
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit refined through years of hands-on experience, 
            continuous learning, and real-world project challenges
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.title} className="glass-effect border-0 hover-lift group overflow-hidden">
              <CardHeader className="text-center pb-8">
                <div className="relative">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-lg">{skill.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                      <span className="text-sm font-bold text-primary">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={skill.level} 
                        className="h-3 bg-muted/50"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-sm"></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'JavaScript', 'HTML5', 'CSS3', 
              'Express.js', 'Firebase',
              'Vercel', 'Render', 'Vite'
            ].map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
