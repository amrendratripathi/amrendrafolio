import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import Particles from "@/components/Particles";

// Simple Typewriter component for single text
const SimpleTypewriter = ({ text, speed = 100, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse text-primary">|</span>}
    </span>
  );
};

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'hey-there' | 'first-name' | 'photo' | 'last-name' | 'complete'>('hey-there');
  const [showHeyThere, setShowHeyThere] = useState(true);
  const [heyThereFadeIn, setHeyThereFadeIn] = useState(false);
  const [showFirstName, setShowFirstName] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showLastName, setShowLastName] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const profileImages = [
    "/lovable-uploads/7a686bb6-aad2-4682-beee-897a4806c503.png",
    "/lovable-uploads/pic1.png"
  ];

  const handleImageError = () => {
    setCurrentImageIndex(0);
  };

  // Animation sequence
  useEffect(() => {
    // Phase 0: Fade in "Hey There"
    const fadeInTimer = setTimeout(() => {
      setHeyThereFadeIn(true);
    }, 100);

    // Phase 1: Show "Hey There" for 3 seconds then fade out
    const heyThereTimer = setTimeout(() => {
      setShowHeyThere(false);
      setTimeout(() => {
        setAnimationPhase('first-name');
        setShowFirstName(true);
      }, 1000); // Fade out duration
    }, 3000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(heyThereTimer);
    };
  }, []);

  // Phase 2: After first name completes, show photo
  const handleFirstNameComplete = () => {
    setTimeout(() => {
      setAnimationPhase('photo');
      setShowPhoto(true);
    }, 300);
  };

  // Phase 3: After photo appears, show last name
  useEffect(() => {
    if (showPhoto) {
      const photoTimer = setTimeout(() => {
        setAnimationPhase('last-name');
        setShowLastName(true);
      }, 500);
      return () => clearTimeout(photoTimer);
    }
  }, [showPhoto]);

  // Phase 4: After last name completes, show all content
  const handleLastNameComplete = () => {
    setTimeout(() => {
      setAnimationPhase('complete');
      setShowContent(true);
      // Trigger navbar and other content to appear (via callback to parent)
      if (window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('hero-animation-complete'));
      }
    }, 500);
  };

  // Rotate images every 5 seconds (only after animation completes)
  useEffect(() => {
    if (!showContent) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [profileImages.length, showContent]);

  return (
    <section className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={['#ffffff', '#06b6d4']}
          particleCount={450}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* "Hey There" Overlay */}
      {showHeyThere && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-1000 ${
          showHeyThere && heyThereFadeIn ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <h2 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white"
            style={{ 
              fontFamily: "'Great Vibes', 'Dancing Script', cursive",
              fontWeight: 400,
              letterSpacing: '0.05em'
            }}
          >
            Hey There
          </h2>
          <h2 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-white mt-4"
            style={{ 
              fontFamily: "'Great Vibes', 'Dancing Script', cursive",
              fontWeight: 400,
              letterSpacing: '0.05em'
            }}
          >
            I'm
          </h2>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen py-20">
          {/* Name and Image Layout */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 lg:gap-3 xl:gap-4 mb-12 w-full max-w-full px-2">
            {/* AMRENDRA - Left Side */}
            <div className={`order-2 md:order-1 flex-shrink-0 transition-opacity duration-500 mt-8 md:mt-0 ${
              showFirstName ? 'opacity-100' : 'opacity-0'
            }`}>
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white uppercase tracking-wide leading-tight whitespace-nowrap">
                {showFirstName && (animationPhase === 'first-name' || animationPhase === 'photo' || animationPhase === 'last-name' || animationPhase === 'complete') ? (
                  animationPhase === 'first-name' ? (
                    <SimpleTypewriter text="AMRENDRA" speed={150} onComplete={handleFirstNameComplete} />
                  ) : (
                    'AMRENDRA'
                  )
                ) : (
                  ''
                )}
              </h1>
            </div>

            {/* Profile Image with Glowing Ring - Center */}
            <div className={`order-1 md:order-2 relative flex items-center justify-center flex-shrink-0 transition-all duration-700 ${
              showPhoto ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="relative">
                {/* Outer Glowing Ring Effect */}
                <div className="absolute -inset-8 rounded-full bg-primary/40 blur-3xl animate-pulse"></div>
                <div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl"></div>
                
                {/* Main Glowing Ring */}
                <div className="absolute -inset-2 rounded-full border-4 border-primary animate-pulse shadow-[0_0_60px_rgba(6,182,212,0.8)]"></div>
                <div className="absolute -inset-1 rounded-full border-2 border-primary/60"></div>
                
                {/* Profile Image */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.6)] transform-gpu transition-all duration-300 hover:scale-105">
                  <img
                    src={profileImages[currentImageIndex]}
                    alt="Amrendra Ram Tripathi"
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>
            </div>

            {/* TRIPATHI - Right Side */}
            <div className={`order-3 flex-shrink-0 transition-opacity duration-500 mt-8 md:mt-0 ${
              showLastName ? 'opacity-100' : 'opacity-0'
            }`}>
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white uppercase tracking-wide leading-tight whitespace-nowrap">
                {showLastName && (animationPhase === 'last-name' || animationPhase === 'complete') ? (
                  animationPhase === 'last-name' ? (
                    <SimpleTypewriter text="TRIPATHI" speed={150} onComplete={handleLastNameComplete} />
                  ) : (
                    'TRIPATHI'
                  )
                ) : (
                  ''
                )}
              </h1>
            </div>
          </div>

          {/* Buttons */}
          <div className={`flex flex-wrap gap-3 justify-center mb-8 transition-all duration-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
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

          {/* Social Links */}
          <div className={`flex gap-4 justify-center transition-all duration-500 delay-200 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
              <a href="https://github.com/amrendratripathi" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors scale-110">
                  <Github />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/amrendra-tripathi-67b906279" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors scale-110">
                  <Linkedin />
                </Button>
              </a>
              <a href="mailto:your-amrendraramtripathibtech23-27@liet.in" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors scale-110">
                  <Mail />
                </Button>
              </a>
              <a href="https://www.codechef.com/users/amrendra_tr06" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative group scale-110">
                  <img src="/icons/codechef.svg" alt="CodeChef" className="w-5 h-5" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Div 2, ⭐⭐⭐⭐
                  </div>
                </Button>
              </a>
              <a href="https://leetcode.com/amrendra06" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative group scale-110">
                  <img src="/icons/leetcode.svg" alt="LeetCode" className="w-5 h-5" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    270+ questions
                  </div>
                </Button>
              </a>
              <a href="https://www.hackerrank.com/amrendra_tr06" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative group scale-110">
                  <img src="/icons/hackerrank.svg" alt="HackerRank" className="w-5 h-5" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    5⭐ Problem Solving
                  </div>
                </Button>
              </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
