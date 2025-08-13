import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Trophy, Calculator } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Education",
      description: "BTech 3rd Year at LLOYD Institute of Engineering and Technology",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Technology & Artificial Intelligence enthusiast",
      color: "text-accent"
    },
    {
      icon: Trophy,
      title: "Achievement",
      description: "National Level Hackathon Winner - ₹50k Prize",
      color: "text-primary"
    },
    {
      icon: Calculator,
      title: "Interest",
      description: "Mathematics enthusiast and problem solver",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="secondary" className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-4">
              About Me
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Driven by <span className="gradient-primary bg-clip-text text-transparent">Innovation</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I'm a third-year BTech student with an insatiable curiosity for technology and artificial intelligence. 
              My journey in competitive programming has shaped my problem-solving mindset and analytical thinking.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {highlights.map((item, index) => (
              <Card key={index} className="gradient-card border-border/50 hover:shadow-elegant transition-smooth group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-background/50 ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Personal Statement */}
          <Card className="gradient-card border-border/50 shadow-elegant">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  My passion for technology began early, leading me to explore various programming languages including 
                  C, C++, Java, and Python. Through competitive programming, I've honed my algorithmic thinking and 
                  problem-solving skills. The highlight of my journey so far has been winning the national level hackathon 
                  at Galgotia University, where our innovative solution earned us the first prize of ₹50,000.
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  As a mathematics enthusiast, I find beauty in logical structures and patterns, which translates 
                  perfectly into my programming approach. I'm constantly exploring the frontiers of AI and machine 
                  learning, driven by the desire to create solutions that can make a meaningful impact.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;