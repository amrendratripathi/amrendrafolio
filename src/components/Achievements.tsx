import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Target, Star, Users } from "lucide-react";
//import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const HackathonSlideshow = () => {
  const images = [
    "/lovable-uploads/hackathon1.jpg",
    "/lovable-uploads/hackathon2.jpg",
    "/lovable-uploads/hackathon3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full lg:w-1/2 h-64 rounded-lg overflow-hidden shadow-lg">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Hackathon Picture ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

const Achievements = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "National Level Hackathon Winner",
      organization: "Galgotia University",
      description: "First prize winner with ₹50,000 cash reward for innovative tech solution",
      year: "2024",
      highlight: true,
    },
    {
      icon: Users,
      title: "Organized HackIndia Hackathon",
      organization: "Hexclan Coding Club",
      description: "Successfully organized a national-level hackathon at my college with over 200 participants.",
      year: "2025",
      highlight: true,
    },
    {
      icon: Award,
      title: "Competitive Programming",
      organization: "Various Platforms",
      description: "Active participant in coding competitions and algorithmic challenges",
      year: "2022-2024",
      highlight: false,
    },
    {
      icon: Target,
      title: "Academic Excellence",
      organization: "LLOYD Institute of Engineering",
      description: "Consistent academic performance in BTech Computer Science program",
      year: "2022-Present",
      highlight: false,
    },
    {
      icon: Star,
      title: "Mathematics Olympiad",
      organization: "School Level",
      description: "Recognition for mathematical problem-solving abilities",
      year: "2020-2021",
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <Badge
              variant="secondary"
              className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-4"
            >
              Achievements
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Milestones & <span className="gradient-primary bg-clip-text text-transparent">Recognition</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Celebrating key achievements that mark my journey in technology and competitive programming.
            </p>
          </div>

          {/* Featured Achievement */}
          <div className="mb-12">
            <Card className="gradient-card border-border/50 shadow-elegant relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="default" className="bg-accent text-accent-foreground">
                  Latest Achievement
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Achievement Image */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-32 rounded-lg overflow-hidden shadow-elegant">
                      <img
                        src="/lovable-uploads/c2aa145c-f8f7-4302-8dbb-84845ee5f998.png"
                        alt="Hackathon Achievement"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Achievement Details */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                      <div className="p-3 rounded-lg gradient-primary text-primary-foreground">
                        <Trophy size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">National Level Hackathon Winner</h3>
                        <p className="text-muted-foreground">Galgotia University • 2024</p>
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      Achieved first place in a highly competitive national level hackathon at Galgotia University.
                      Our innovative technology solution impressed the judges and earned us the top prize of ₹50,000.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        First Prize
                      </Badge>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        ₹50,000 Reward
                      </Badge>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        National Level
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* HackIndia Achievement with Slideshow */}
          <div className="mb-12">
            <Card className="gradient-card border-border/50 shadow-elegant relative overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Custom Slideshow */}
                  <HackathonSlideshow />

                  {/* Achievement Details */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                      <div className="p-3 rounded-lg gradient-primary text-primary-foreground">
                        <Users size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Organized HackIndia Hackathon</h3>
                        <p className="text-muted-foreground">Hexclan Coding Club • 2025</p>
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      Successfully organized a national-level hackathon named <strong>HackIndia</strong> at my college
                      with the help of our coding club <strong>Hexclan</strong>. The event saw participation from over
                      200 teams across the country.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Organizer
                      </Badge>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        National Level
                      </Badge>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        200+ teams
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Achievements */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.slice(2).map((achievement, index) => (
              <Card
                key={index}
                className="gradient-card border-border/50 hover:shadow-elegant transition-smooth group"
              >
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-background/50 text-primary group-hover:scale-110 transition-transform">
                        <achievement.icon size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                      <p className="text-sm text-accent font-medium mb-2">{achievement.organization}</p>
                      <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {achievement.year}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
