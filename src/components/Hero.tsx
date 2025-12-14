import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";
import TypewriterText from "@/components/TypewriterText";
import Particles from "@/components/Particles";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const profileImages = [
    "/lovable-uploads/7a686bb6-aad2-4682-beee-897a4806c503.png",
    "/lovable-uploads/pic1.png"
  ];

  const handleImageError = () => {
    setCurrentImageIndex(0);
  };

  // Rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [profileImages.length]);

  return (
    <section className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={['#ffffff', '#06b6d4']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl gradient-card shadow-elegant p-2 transform-gpu transition-bounce hover:-translate-y-1 hover:rotate-1 hover:shadow-primary hover:scale-[1.02] hover-shake">
                <img
                  src={profileImages[currentImageIndex]}
                  alt="Amrendra Ram Tripathi"
                  onError={handleImageError}
                  className="w-full h-full object-cover rounded-xl transition-all duration-700 ease-in-out"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 gradient-primary rounded-full flex items-center justify-center shadow-primary">
                <span className="text-2xl animate-glow">👨‍💻</span>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-6 animate-slide-up">
            <div className="space-y-2">
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
                BTech 3rd Year • Competitive Programmer
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <div>Hi, I'm</div>
                <span className="gradient-primary bg-clip-text text-transparent text-4xl sm:text-5xl md:text-5xl lg:text-6xl whitespace-nowrap">
                  <TypewriterText 
                    texts={[
                      "Amrendra Tripathi",
                      "a Developer",
                      "a Problem Solver",
                      "a Tech Enthusiast",
                      "Amrendra Tripathi"
                    ]} 
                    speed={150} 
                    delay={500}
                    lineDelay={1000}
                    pauseTime={2000}
                    backspaceSpeed={100}
                    loop={false}
                  />
                </span>
              </h1>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Passionate about <span className="text-primary font-semibold">Technology & AI</span>. 
              A competitive programmer and math enthusiast studying at LLOYD Institute of Engineering and Technology. 
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {/* Get In Touch Button */}
              <a
                href="mailto:amrendraramtripathibtech23-27@liet.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero" size="lg" className="group">
                  <Mail className="group-hover:rotate-12 transition-transform" />
                  Get In Touch
                </Button>
              </a>

              {/* Download CV Button */}
              <a
                href="/lovable-uploads/Amrendra_CV.pdf"
                download="Amrendra_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="group">
                  <Download className="group-hover:translate-y-1 transition-transform" />
                  Download CV
                </Button>
              </a>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <a href="https://github.com/amrendratripathi" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                  <Github />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/amrendra-tripathi-67b906279" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                  <Linkedin />
                </Button>
              </a>
              <a href="mailto:your-amrendraramtripathibtech23-27@liet.in" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                  <Mail />
                </Button>
              </a>
              <a href="https://www.codechef.com/users/amrendra_tr06" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative group">
                  <img src="/icons/codechef.svg" alt="CodeChef" className="w-5 h-5" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Div 2, ⭐⭐⭐⭐
                  </div>
                </Button>
              </a>
              <a href="https://leetcode.com/amrendra06" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative group">
                  <img src="/icons/leetcode.svg" alt="LeetCode" className="w-5 h-5" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    270+ questions
                  </div>
                </Button>
              </a>
              <a href="https://www.hackerrank.com/amrendra_tr06" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative group">
                  <img src="/icons/hackerrank.svg" alt="HackerRank" className="w-5 h-5" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    5⭐ Problem Solving
                  </div>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;