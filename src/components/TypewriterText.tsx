import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  delay?: number;
  className?: string;
  loop?: boolean;
  pauseTime?: number;
  lineDelay?: number;
  backspaceSpeed?: number;
}

const TypewriterText = ({ 
  texts, 
  speed = 1000, 
  delay = 100, 
  className = "",
  loop = true,
  pauseTime = 30000,
  lineDelay = 500,
  backspaceSpeed = 50
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setCurrentTextIndex(0);
        setCurrentIndex(0);
        setIsTyping(true);
        setIsDeleting(false);
        setIsComplete(false);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      setCurrentTextIndex(0);
      setCurrentIndex(0);
      setIsTyping(true);
      setIsDeleting(false);
      setIsComplete(false);
    }
  }, [delay]);

  useEffect(() => {
    // If animation is complete, don't do anything else
    if (isComplete) {
      return;
    }

    if (isTyping && !isDeleting && currentIndex < texts[currentTextIndex].length) {
      // Typing forward
      const timer = setTimeout(() => {
        setDisplayText(texts[currentTextIndex].slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } 
    
    if (isTyping && !isDeleting && currentIndex >= texts[currentTextIndex].length) {
      // Finished typing, start deleting after pause
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
        setCurrentIndex(texts[currentTextIndex].length);
      }, lineDelay);
      return () => clearTimeout(pauseTimer);
    } 
    
    if (isDeleting && currentIndex > 0) {
      // Deleting backward
      const timer = setTimeout(() => {
        setDisplayText(texts[currentTextIndex].slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, backspaceSpeed);
      return () => clearTimeout(timer);
    } 
    
    if (isDeleting && currentIndex === 0) {
      // Finished deleting, move to next text or complete
      setIsDeleting(false);
      
      if (currentTextIndex < texts.length - 1) {
        // Move to next text
        setCurrentTextIndex(currentTextIndex + 1);
        setCurrentIndex(0);
        setDisplayText('');
      } else {
        // All texts completed, show final text and stop
        const finalTextTimer = setTimeout(() => {
          setDisplayText("Amrendra Tripathi");
          setIsComplete(true);
        }, 500);
        return () => clearTimeout(finalTextTimer);
      }
    }
  }, [currentIndex, currentTextIndex, texts, speed, isTyping, isDeleting, lineDelay, backspaceSpeed, isComplete]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse text-primary">|</span>}
      {isComplete && <span className="text-primary">|</span>}
    </span>
  );
};

export default TypewriterText; 