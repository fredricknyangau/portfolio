
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Eye, Star } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: "AfriSound",
      description:
        "AfriSound is an interactive digital archive dedicated to preserving and exploring traditional African musical instruments. Built with modern web technologies, it features a searchable database, region-based filtering, media-rich entries with Cloudinary-hosted images, audio, and video, as well as educational tools like quizzes, timelines, and multilingual glossaries. Users can contribute via a secure contributor dashboard, powered by TanStack Query v5 for seamless data handling.",
      image: "/afrisound.png",
      tags: [
        "React",
        "Node.js",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "MongoDB",
        "TanStack Query",
        "Cloudinary",
      ],
      githubUrl:
        "https://github.com/fredricknyangau/African-Music-Instruments-Archive",
      liveUrl: "https://afrisound.vercel.app",
      featured: true,
      status: "Live",
      metrics: { stars: 247, forks: 89 },
    },
    //{
    //title: 'DevConnect',
    //description: 'A community-driven platform for developers to connect, share knowledge, and collaborate on projects. Features include user profiles, project showcases, discussion forums, and event calendars.',
    //image: '/placeholder.svg',
    //   tags: ['Next.js', 'GraphQL', 'Apollo', 'TailwindCSS'],
    //   githubUrl: '#',
    //   liveUrl: '#',
    //   featured: true,
    //   status: 'Beta',
    //   metrics: { stars: 320, forks: 75 }
    // },
    // {
    //   title: 'AI Task Management',
    //   description: 'Intelligent project management platform with AI-powered task prioritization, collaborative workspaces, real-time team chat, automated reporting, and predictive analytics for project success.',
    //   image: '/placeholder.svg',
    //   tags: ['Next.js', 'FastAPI', 'OpenAI', 'Socket.io', 'TailwindCSS'],
    //   githubUrl: '#',
    //   liveUrl: '#',
    //   featured: true,
    //   status: 'Beta',
    //   metrics: { stars: 156, forks: 43 }
    // },
    // {
    //   title: 'Real-time Analytics Dashboard',
    //   description: 'Interactive data visualization platform with real-time metrics, customizable widgets, and advanced filtering capabilities for business intelligence.',
    //   image: '/placeholder.svg',
    //   tags: ['Vue.js', 'D3.js', 'WebSocket', 'Express'],
    //   githubUrl: '#',
    //   liveUrl: '#',
    //   featured: false,
    //   status: 'Live'
    // },
    // {
    //   title: 'Social Media Automation',
    //   description: 'Multi-platform social media management tool with AI content generation, scheduled posting, and comprehensive analytics tracking.',
    //   image: '/placeholder.svg',
    //   tags: ['React', 'Python', 'MongoDB', 'Redis'],
    //   githubUrl: '#',
    //   liveUrl: '#',
    //   featured: false,
    //   status: 'Development'
    // }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-500/20 text-green-700 border-green-200';
      case 'Beta': return 'bg-blue-500/20 text-blue-700 border-blue-200';
      case 'Development': return 'bg-orange-500/20 text-orange-700 border-orange-200';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-200';
    }
  };

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <span className="text-primary font-semibold text-lg mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A curated selection of projects that demonstrate my expertise in creating 
            innovative solutions for complex challenges
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {featuredProjects.map((project) => (
            <Card key={project.title} className="glass-effect border-0 overflow-hidden hover-lift group">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                    <Eye className="text-gray-900" size={32} />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={`${getStatusColor(project.status)} border`}>
                    {project.status}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Featured
                  </Badge>
                </div>
                {project.metrics && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" />
                      {project.metrics.stars}
                    </div>
                    <div>
                      {project.metrics.forks} forks
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" size="sm" asChild className="hover-lift">
                    <a href={project.githubUrl} className="flex items-center gap-2">
                      <Github size={16} />
                      Source Code
                    </a>
                  </Button>
                  <Button size="sm" asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                    <a href={project.liveUrl} className="flex items-center gap-2">
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-3xl font-bold mb-12 text-center">More Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {otherProjects.map((project) => (
              <Card key={project.title} className="glass-effect border-0 hover-lift group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl}>
                        <Github size={14} />
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.liveUrl}>
                        <ExternalLink size={14} />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="glass-effect rounded-3xl p-12 border">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Want to see more of my work?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
              Check out my GitHub for additional projects, contributions, and code samples.
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
              <a href="#" className="flex items-center gap-2">
                <Github size={20} />
                View All Repositories
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
