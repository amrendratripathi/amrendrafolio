import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

const Projects = () => {
  const projects = [
    {
      title: "SRKSS Trust Website",
      description: "A comprehensive website developed for SRKSS Trust, a non-profit organization dedicated to social welfare and community development. The platform serves as a digital presence for the trust, showcasing their mission, initiatives, and impact on the community.",
      features: [
        "Responsive design for all devices",
        "Trust information and mission display",
        "Event and activity showcase",
        "Contact and donation integration",
        "Modern UI with smooth animations"
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      link: "https://srkss.app",
      github: null,
      image: "/lovable-uploads/srkks.png"
    },
    {
      title: "Brimstone Orpin",
      description: "An elegant e-commerce website designed for Brimstone Orpin, a premium beauty brand. The platform provides a seamless shopping experience with product catalogs, detailed product information, and an intuitive checkout process tailored for beauty enthusiasts.",
      features: [
        "Product catalog and filtering",
        "Shopping cart functionality",
        "Product detail pages",
        "Responsive mobile design",
        "Brand-focused aesthetic"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://brimstone-orpin.vercel.app",
      github: null,
      image: "/lovable-uploads/brimstone.png"
    },
    {
      title: "Civic Seva Admin Dashboard",
      description: "A powerful admin dashboard system built to monitor and manage civic problems within communities. Administrators can track, prioritize, and resolve civic issues efficiently, ensuring better governance and citizen satisfaction through streamlined problem resolution workflows.",
      features: [
        "Real-time issue tracking",
        "Admin authentication and authorization",
        "Issue categorization and prioritization",
        "Resolution status management",
        "Analytics and reporting dashboard"
      ],
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Express"],
      link: "https://civic-seva.vercel.app",
      github: null,
      image: "/lovable-uploads/civic-seva.png"
    },
    {
      title: "TeamPulse",
      description: "A comprehensive employee monitoring and team management platform designed for team leads and managers. TeamPulse enables real-time tracking of team activities, productivity metrics, task assignments, and performance analytics to optimize team collaboration and efficiency.",
      features: [
        "Real-time employee activity monitoring",
        "Task assignment and tracking",
        "Performance analytics dashboard",
        "Team collaboration tools",
        "Time tracking and reporting"
      ],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "WebSockets"],
      link: "https://teampulse-chi.vercel.app",
      github: null,
      image: "/lovable-uploads/teampulse.png"
    }
  ];

  return (
    <section id="projects" className="pt-8 md:pt-12 pb-0 gradient-hero relative overflow-hidden" style={{ marginBottom: '0' }}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16 animate-slide-up">
            <Badge variant="secondary" className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 text-primary border-primary/20 mb-3 md:mb-4">
              Featured Projects
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              My <span className="gradient-primary bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              A collection of real-world applications showcasing my expertise in web development, 
              from e-commerce platforms to administrative dashboards.
            </p>
          </div>

          {/* ScrollStack Container */}
          <div className="relative w-full">
            <ScrollStack useWindowScroll={true}>
              {projects.map((project, index) => (
                <ScrollStackItem
                  key={index}
                  itemClassName="bg-card border border-border/50 shadow-elegant overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-full">
                    {/* Project Image */}
                    <div className="lg:w-[55%] xl:w-[60%] flex-shrink-0 flex items-center justify-center">
                      <div className="relative w-full h-full min-h-[250px] md:min-h-[350px] lg:min-h-[400px] max-h-[600px] rounded-xl md:rounded-2xl overflow-hidden border border-border/30 group bg-background/50 flex items-center justify-center p-2 md:p-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/1200x600/1a1a1a/06b6d4?text=" + encodeURIComponent(project.title);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute top-2 md:top-4 right-2 md:right-4">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex"
                            >
                              <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10 bg-background/80 backdrop-blur-sm hover:bg-primary/20 hover:text-primary border border-border/50">
                                <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="lg:w-[45%] xl:w-[40%] flex flex-col justify-between min-h-0">
                      <div className="flex-1 overflow-y-auto">
                        <div className="mb-3 md:mb-4">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-1 md:mb-2">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-muted-foreground mb-4 md:mb-5 text-xs md:text-sm lg:text-base leading-relaxed">
                          {project.description}
                        </p>

                        <div className="mb-4 md:mb-5">
                          <h4 className="text-xs md:text-sm lg:text-base font-semibold mb-2 md:mb-2.5 text-foreground">Key Features</h4>
                          <ul className="space-y-1 md:space-y-1.5">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start text-xs md:text-sm text-muted-foreground">
                                <span className="text-primary mr-1.5 md:mr-2 mt-0.5 flex-shrink-0">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-auto pt-3 md:pt-4 border-t border-border/30">
                        <h4 className="text-xs md:text-sm lg:text-base font-semibold mb-2 md:mb-2.5 text-foreground">Technologies</h4>
                        <div className="flex flex-wrap gap-1 md:gap-1.5">
                          {project.technologies.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 bg-primary/10 text-primary border-primary/20"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
          
          {/* Spacer to ensure last project is fully visible before achievements */}
          <div className="h-[60vh] md:h-[50vh] w-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

