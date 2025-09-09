import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";
import TypewriterText from "@/components/TypewriterText";

const Hero = () => {
  const [bgColor, setBgColor] = useState("bg-primary/10");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    }, 10000);

    return () => clearInterval(interval);
  }, [profileImages.length]);

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnter = () => {
    setBgColor("bg-accent/10"); // Change to your desired hover color
  };

  const handleMouseLeave = () => {
    setBgColor("bg-primary/10"); // Reset to the original color
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden ${bgColor}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>

      {/* Static Galaxy Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-40 left-3/4 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-80 left-1/6 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-100 left-5/6 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-120 left-2/3 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: "2.5s" }}></div>
        <div className="absolute top-140 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: "0.8s" }}></div>
        <div className="absolute top-160 left-4/5 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: "1.8s" }}></div>
        
        {/* Colored Stars */}
        <div className="absolute top-30 left-1/8 w-2 h-2 bg-blue-300 rounded-full animate-twinkle" style={{ animationDelay: "0.3s" }}></div>
        <div className="absolute top-50 left-7/8 w-2 h-2 bg-purple-300 rounded-full animate-twinkle" style={{ animationDelay: "1.3s" }}></div>
        <div className="absolute top-70 left-1/5 w-2 h-2 bg-pink-300 rounded-full animate-twinkle" style={{ animationDelay: "0.7s" }}></div>
        <div className="absolute top-90 left-4/5 w-2 h-2 bg-cyan-300 rounded-full animate-twinkle" style={{ animationDelay: "1.7s" }}></div>
        
        {/* Large Stars */}
        <div className="absolute top-110 left-1/3 w-3 h-3 bg-yellow-300 rounded-full animate-twinkle" style={{ animationDelay: "0.2s" }}></div>
        <div className="absolute top-130 left-2/3 w-3 h-3 bg-orange-300 rounded-full animate-twinkle" style={{ animationDelay: "1.2s" }}></div>
        
        {/* Falling Stars with Angle */}
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-falling-star" style={{ animationDelay: "0s", animationDuration: "8s" }}></div>
        <div className="absolute top-0 left-3/4 w-1 h-1 bg-white rounded-full animate-falling-star" style={{ animationDelay: "2s", animationDuration: "6s" }}></div>
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full animate-falling-star" style={{ animationDelay: "4s", animationDuration: "10s" }}></div>
        <div className="absolute top-0 left-1/6 w-1 h-1 bg-white rounded-full animate-falling-star" style={{ animationDelay: "1s", animationDuration: "7s" }}></div>
        <div className="absolute top-0 left-5/6 w-1 h-1 bg-white rounded-full animate-falling-star" style={{ animationDelay: "3s", animationDuration: "9s" }}></div>
        <div className="absolute top-0 left-2/3 w-1 h-1 bg-white rounded-full animate-falling-star" style={{ animationDelay: "5s", animationDuration: "11s" }}></div>
        <div className="absolute top-0 left-1/3 w-1 h-1 bg-white rounded-full animate-falling-star" style={{ animationDelay: "6s", animationDuration: "8.5s" }}></div>
        <div className="absolute top-0 left-4/5 w-1 h-1 bg-white rounded-full animate-falling-star" style={{ animationDelay: "7s", animationDuration: "7.5s" }}></div>
        
        {/* Colored Falling Stars */}
        <div className="absolute top-0 left-1/8 w-2 h-2 bg-blue-300 rounded-full animate-falling-star" style={{ animationDelay: "0.5s", animationDuration: "12s" }}></div>
        <div className="absolute top-0 left-7/8 w-2 h-2 bg-purple-300 rounded-full animate-falling-star" style={{ animationDelay: "3.5s", animationDuration: "9.5s" }}></div>
        <div className="absolute top-0 left-1/5 w-2 h-2 bg-pink-300 rounded-full animate-falling-star" style={{ animationDelay: "1.5s", animationDuration: "10.5s" }}></div>
        <div className="absolute top-0 left-4/5 w-2 h-2 bg-cyan-300 rounded-full animate-falling-star" style={{ animationDelay: "4.5s", animationDuration: "8s" }}></div>
        
        {/* Planets (positioned away from name area) */}
        <div 
          className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full shadow-lg"
          style={{ 
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-gradient-to-br from-green-400/30 to-blue-500/30 rounded-full shadow-lg"
          style={{ 
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/2 right-1/6 w-10 h-10 bg-gradient-to-br from-red-400/30 to-orange-500/30 rounded-full shadow-lg"
          style={{ 
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        
        {/* Galaxies */}
        <div 
          className="absolute top-1/6 left-1/6 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-sm"
          style={{ 
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px) rotate(${mousePosition.x * 2}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-sm"
          style={{ 
            transform: `translate(${mousePosition.x * 0.25}px, ${mousePosition.y * 0.25}px) rotate(${mousePosition.y * 2}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        
        {/* Nebula Clouds */}
        <div 
          className="absolute top-1/3 left-1/2 w-32 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-md"
          style={{ 
            transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-28 h-12 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-md"
          style={{ 
            transform: `translate(${mousePosition.x * 0.18}px, ${mousePosition.y * 0.18}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 rounded-full gradient-card shadow-elegant p-2">
                <img
                  src={profileImages[currentImageIndex]}
                  alt="Amrendra Ram Tripathi"
                  onError={handleImageError}
                  className="w-full h-full object-cover rounded-full transition-all duration-1000 ease-in-out transform hover:scale-105"
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
                <span className="gradient-primary bg-clip-text text-transparent">
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