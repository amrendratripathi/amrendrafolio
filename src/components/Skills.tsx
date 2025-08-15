import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Brain, Trophy, Zap } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: ["C", "C++", "Java", "Python"],
      color: "text-primary"
    },
    {
      icon: Brain,
      title: "Core Interests",
      skills: ["Artificial Intelligence", "Machine Learning", "Data Structures", "Algorithms"],
      color: "text-accent"
    },
    {
      icon: Trophy,
      title: "Competitive Programming",
      skills: ["Problem Solving", "Algorithm Design", "Time Complexity", "Space Optimization"],
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Mathematics",
      skills: ["Discrete Mathematics", "Statistics", "Linear Algebra", "Calculus"],
      color: "text-accent"
    }
  ];

  const techStack = [
    "C++", "Java", "Python", "Data Structures", "Algorithms", 
    "AI/ML", "Mathematics", "Problem Solving", "Competitive Programming"
  ];

  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="secondary" className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-4">
              Skills & Expertise
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Technical <span className="gradient-primary bg-clip-text text-transparent">Competencies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive skill set built through competitive programming, academic pursuits, and hands-on projects.
            </p>
          </div>

          {/* Skills Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card key={index} className="gradient-card border-border/50 hover:shadow-elegant transition-smooth group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-3 rounded-lg bg-background/50 ${category.color} group-hover:scale-110 transition-transform`}>
                      <category.icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-background/30 rounded-lg p-3 text-center hover:bg-background/50 transition-colors"
                      >
                        <span className="text-sm font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <Card className="gradient-card border-border/50 shadow-elegant">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold">Technology Stack</h3>
                <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                  {techStack.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Continuously expanding my knowledge base through competitive programming challenges, 
                  academic projects, and self-directed learning in emerging technologies.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;