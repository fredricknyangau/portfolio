import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, MapPin, Briefcase, Code2, Server, Database, Rocket, Users, ChevronRight } from 'lucide-react';

const WhatImLookingForSection = () => {
  const preferences = [
    {
      icon: Briefcase,
      title: "Role Type",
      items: ["Backend Developer", "API Engineer", "Node.js Developer", "Django Developer"]
    },
    {
      icon: Code2,
      title: "Tech Stack",
      items: ["Node.js & Express", "Django & FastAPI", "MongoDB & PostgreSQL", "Redis & Docker"]
    },
    {
      icon: MapPin,
      title: "Work Model",
      items: ["Remote-First (Global)", "Hybrid (Nairobi, Kenya)", "Open to Relocation"]
    },
    {
      icon: Server,
      title: "Focus Areas",
      items: ["Scalable APIs", "Microservices", "Database Optimization", "System Design"]
    }
  ];

  const industries = [
    { name: "Fintech", color: "bg-primary/10 text-primary border-primary/20" },
    { name: "EdTech", color: "bg-secondary/10 text-secondary border-secondary/20" },
    { name: "B2B SaaS", color: "bg-accent/10 text-accent border-accent/20" },
    { name: "E-commerce", color: "bg-mpesa-green-500/10 text-mpesa-green-700 border-mpesa-green-200" },
    { name: "Healthcare", color: "bg-flutterwave-500/10 text-flutterwave-700 border-flutterwave-200" }
  ];

  return (
    <section
      id="looking-for"
      className="section-padding bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <span className="text-primary font-semibold text-lg mb-4 block">
            Career Goals
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            What I'm Looking For
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm seeking opportunities to build impactful backend systems with companies
            that value clean code, scalability, and continuous learning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {preferences.map(({ icon: Icon, title, items }) => (
            <Card key={title} className="glass-effect border-0 hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                    <Icon size={24} />
                  </div>
                  <CardTitle className="text-2xl">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="text-primary">▸</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industries of Interest */}
        <Card className="glass-effect border-0">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                <Database size={24} />
              </div>
              <CardTitle className="text-2xl">Industries of Interest</CardTitle>
            </div>
            <p className="text-muted-foreground">
              Passionate about building backend systems in these domains
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {industries.map(({ name, color }) => (
                <Badge
                  key={name}
                  variant="outline"
                  className={`${color} border px-4 py-2 text-sm font-medium hover:scale-105 transition-transform duration-300`}
                >
                  {name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why Work With Me */}
        <div className="mt-12 glass-effect rounded-3xl p-8 border">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Work With Me?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h4 className="font-semibold mb-2">Fast Learner</h4>
              <p className="text-sm text-muted-foreground">
                Quick to adapt to new technologies and frameworks
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Target className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h4 className="font-semibold mb-2">Results-Driven</h4>
              <p className="text-sm text-muted-foreground">
                Focus on measurable outcomes and performance optimization
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-accent/10">
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h4 className="font-semibold mb-2">Team Player</h4>
              <p className="text-sm text-muted-foreground">
                Experienced in collaboration, code reviews, and mentoring
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Think I'd be a good fit for your team?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              <Target size={20} />
              Let's Talk
            </a>
            <a
              href="/Fredrick_Nyang'au_Resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-medium"
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
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatImLookingForSection;
