import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, Instagram } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Particles from "@/components/Particles";

// Split Text Animation Component
const SplitTextAnimation = ({ text, fontSize = 'text-3xl', onComplete }: { text: string; fontSize?: string; onComplete?: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const chars = text.split('');

  useEffect(() => {
    // Trigger animation after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-wrap items-center justify-center gap-1 sm:gap-2 ${fontSize}`}>
      {chars.map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: `${index * 50}ms`,
            fontFamily: "'Satisfy', cursive",
            fontWeight: 400
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'hey-there' | 'photo' | 'names' | 'complete'>('hey-there');
  const [showHeyThere, setShowHeyThere] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);

  const profileImages = [
    "/lovable-uploads/7a686bb6-aad2-4682-beee-897a4806c503.png",
    "/lovable-uploads/pic1.png"
  ];

  const handleImageError = () => {
    setCurrentImageIndex(0);
  };

  // Animation sequence
  useEffect(() => {
    // Phase 1: Show "Hey There I'm" with split text animation for 3 seconds
    const heyThereTimer = setTimeout(() => {
      setShowHeyThere(false);
      // Photo appears immediately after "Hey There I'm" disappears
      setAnimationPhase('photo');
      setShowPhoto(true);
    }, 3000); // 3 seconds

    return () => {
      clearTimeout(heyThereTimer);
    };
  }, []);

  // Phase 2: After photo appears, wait 2 seconds then show names simultaneously with focus animation
  useEffect(() => {
    if (showPhoto) {
      const photoTimer = setTimeout(() => {
        setAnimationPhase('names');
        setShowNames(true);
        
        // Trigger focus animation on both name elements
        setTimeout(() => {
          if (nameRef.current) {
            nameRef.current.classList.add('focus-animation');
            // Also add to the last name (TRIPATHI) - find it via sibling
            const lastNameElement = nameRef.current.parentElement?.querySelector('.order-3');
            if (lastNameElement) {
              lastNameElement.classList.add('focus-animation');
            }
          }
        }, 100);
      }, 2000); // 2 seconds after photo appears
      return () => clearTimeout(photoTimer);
    }
  }, [showPhoto]);

  // Phase 3: After names appear, show all content
  useEffect(() => {
    if (showNames) {
      const namesTimer = setTimeout(() => {
        setAnimationPhase('complete');
        setShowContent(true);
        // Trigger navbar and other content to appear
        if (window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('hero-animation-complete'));
        }
      }, 1000);
      return () => clearTimeout(namesTimer);
    }
  }, [showNames]);

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

      {/* "Hey There I'm" Overlay with Split Text Animation */}
      {showHeyThere && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 transition-none">
          <div className="text-white text-center">
            <div className="mb-2">
              <SplitTextAnimation text="Hey There" fontSize="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
            </div>
            <div>
              <SplitTextAnimation text="I'm" fontSize="text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen py-20">
          {/* Name and Image Layout - Photo in center between names */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-2 lg:gap-3 xl:gap-4 mb-12 w-full max-w-full px-2">
            {/* AMRENDRA - Left Side */}
            <div 
              ref={nameRef}
              className={`order-2 md:order-1 flex-shrink-0 mt-2 md:mt-0 transition-all duration-1000 ${
                showNames ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h1 
                className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7.5rem] text-white uppercase tracking-wide leading-tight whitespace-nowrap"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                AMRENDRA
              </h1>
            </div>

            {/* Profile Image with Glowing Ring - Center (appears independently) */}
            <div className={`order-1 md:order-2 relative flex items-center justify-center flex-shrink-0 transition-none ${
              showPhoto ? 'opacity-100 scale-100' : 'opacity-0 scale-100'
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
            <div 
              className={`order-3 flex-shrink-0 mt-2 md:mt-0 transition-all duration-1000 ${
                showNames ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h1 
                className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7.5rem] text-white uppercase tracking-wide leading-tight whitespace-nowrap"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                TRIPATHI
              </h1>
            </div>
          </div>

          {/* Buttons */}
          <div className={`flex flex-wrap gap-3 justify-center mb-8 transition-all duration-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Get In Touch Button */}
            <a
              href="mailto:rajjubabu06@gmail.com"
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
              <a href="mailto:rajjubabu06@gmail.com" target="_blank" rel="noopener noreferrer">
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
