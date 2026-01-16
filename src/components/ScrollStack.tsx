import React, { useLayoutEffect, useRef, useCallback, useEffect } from 'react';

import type { ReactNode } from 'react';
import Lenis from 'lenis';
import { useIsMobile } from '@/hooks/use-mobile';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => {
  const isMobile = useIsMobile();
  
  return (
    <div
      className={`scroll-stack-card relative w-full min-h-[500px] md:min-h-[600px] my-6 md:my-8 p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        willChange: isMobile ? 'transform' : 'transform, filter',
        WebkitBackfaceVisibility: 'hidden',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        WebkitPerspective: '1000px',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  );
};

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.04,
  itemStackDistance = 50,
  stackPosition = '25%',
  scaleEndPosition = '15%',
  baseScale = 0.88,
  scaleDuration = 0.6,
  rotationAmount = 0,
  blurAmount = 0.8,
  useWindowScroll = false,
  onStackComplete
}) => {
  const isMobile = useIsMobile();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);
  const lastScrollTopRef = useRef(0);
  const scrollDirectionRef = useRef<'up' | 'down'>('down');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    const { scrollTop, containerHeight, scrollContainer } = getScrollData();
    
    // Determine scroll direction for smoother upward scrolling
    const scrollDelta = scrollTop - lastScrollTopRef.current;
    if (Math.abs(scrollDelta) > 1) {
      scrollDirectionRef.current = scrollDelta < 0 ? 'up' : 'down';
    }
    lastScrollTopRef.current = scrollTop;

    isUpdatingRef.current = true;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    // Calculate pinEnd based on last card's position to keep it static
    const lastCardIndex = cardsRef.current.length - 1;
    let calculatedPinEnd = endElementTop;
    
    if (cardsRef.current.length > 0 && cardsRef.current[lastCardIndex]) {
      const lastCard = cardsRef.current[lastCardIndex];
      const lastCardTop = getElementOffset(lastCard);
      const lastCardHeight = lastCard.offsetHeight;
      const lastCardStackOffset = stackPositionPx + itemStackDistance * lastCardIndex;
      
      // Calculate where the last card's bottom will be when fully pinned
      // This is: cardTop + stackOffset + cardHeight
      const lastCardBottomWhenPinned = lastCardTop + lastCardStackOffset + lastCardHeight;
      
      // PinEnd should be when we've scrolled enough that the last card's bottom
      // reaches the top of the viewport - this ensures the card is fully visible
      // before achievements section appears. No buffer needed as we want it to stay visible.
      calculatedPinEnd = lastCardBottomWhenPinned - containerHeight;
      
      // Ensure pinEnd is at least as far as the endElement to prevent premature release
      if (calculatedPinEnd < endElementTop - containerHeight) {
        calculatedPinEnd = endElementTop - containerHeight * 0.2;
      }
    } else {
      // Fallback to original calculation if no cards
      const pinEndOffset = isMobile ? containerHeight * 0.2 : containerHeight * 0.3;
      calculatedPinEnd = endElementTop - pinEndOffset;
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;

      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      // Use calculated pinEnd to ensure last card stays static
      const pinEnd = calculatedPinEnd;

      const scaleProgress = Math.max(0, Math.min(1, calculateProgress(scrollTop, triggerStart, triggerEnd)));

      const targetScale = baseScale + i * itemScale;

      const scale = Math.max(targetScale, Math.min(1, 1 - scaleProgress * (1 - targetScale)));

      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;

      if (blurAmount) {
        let topCardIndex = 0;

        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);

          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;

          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          // Reduce blur on mobile for better performance
          const maxBlur = isMobile ? 5 : 10;
          blur = Math.max(0, Math.min(maxBlur, depthInStack * blurAmount * (isMobile ? 0.6 : 1)));
        }
      }

      let translateY = 0;

      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        // Keep cards at their final pinned position when scrolled past pinEnd
        // This makes them static
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop < pinStart) {
        // Ensure cards are visible before pinning starts
        translateY = 0;
      }

      // Ensure last card stays fully visible for both mobile and desktop
      if (i === cardsRef.current.length - 1) {
        const cardHeight = card.offsetHeight;
        const cardStackOffset = stackPositionPx + itemStackDistance * i;
        const cardBottom = cardTop + translateY + cardHeight;
        const viewportBottom = scrollTop + containerHeight;
        
        // When scrolled past pinEnd, ensure the last card's bottom stays visible
        // This prevents achievements from hiding the last project
        if (scrollTop > pinEnd) {
          // Calculate the final static position
          const finalTranslateY = pinEnd - cardTop + cardStackOffset;
          const finalCardBottom = cardTop + finalTranslateY + cardHeight;
          
          // Ensure card bottom is at least at viewport bottom minus padding
          const minVisibleBottom = viewportBottom - 60; // 60px padding to keep it visible
          if (finalCardBottom < minVisibleBottom) {
            // Adjust translateY to keep card visible
            const adjustment = minVisibleBottom - finalCardBottom;
            translateY = finalTranslateY + adjustment;
          } else {
            translateY = finalTranslateY;
          }
        }
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);

      // More lenient change detection on mobile to reduce unnecessary updates
      const threshold = isMobile ? {
        translateY: 0.5,
        scale: 0.002,
        rotation: 0.2,
        blur: 0.2
      } : {
        translateY: 0.1,
        scale: 0.001,
        rotation: 0.1,
        blur: 0.1
      };

      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > threshold.translateY ||
        Math.abs(lastTransform.scale - newTransform.scale) > threshold.scale ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > threshold.rotation ||
        Math.abs(lastTransform.blur - newTransform.blur) > threshold.blur;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale3d(${newTransform.scale}, ${newTransform.scale}, 1) rotate(${newTransform.rotation}deg)`;

        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        // Use smooth transitions for better animation
        const isScrollingUp = scrollDirectionRef.current === 'up';
        const scrollSpeed = Math.abs(scrollDelta);
        
        // Mobile-optimized transitions: shorter duration, simpler easing
        if (isMobile) {
          // On mobile, use shorter transitions and disable for fast scrolling
          if (isScrollingRef.current && scrollSpeed > 30) {
            card.style.transition = 'none';
          } else {
            const transitionDuration = isScrollingUp ? '0.2s' : '0.15s';
            card.style.transition = `transform ${transitionDuration} ease-out, filter ${transitionDuration} ease-out`;
          }
        } else {
          // Desktop: smoother, longer transitions
          if (isScrollingRef.current && scrollSpeed > 50) {
            card.style.transition = 'none';
          } else {
            const transitionDuration = isScrollingUp ? '0.4s' : '0.3s';
            const transitionEasing = isScrollingUp 
              ? 'cubic-bezier(0.25, 0.1, 0.25, 1)' 
              : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            card.style.transition = `transform ${transitionDuration} ${transitionEasing}, filter ${transitionDuration} ${transitionEasing}`;
          }
        }
        
        card.style.willChange = 'transform, filter';
        card.style.transform = transform;
        card.style.filter = filter;
        card.style.backfaceVisibility = 'hidden';
        card.style.perspective = '1000px';
        card.style.transformStyle = 'preserve-3d';

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;

          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
    isMobile
  ]);

  const handleScroll = useCallback(() => {
    // Mark as actively scrolling
    isScrollingRef.current = true;
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Update transforms
    updateCardTransforms();
    
    // Mark scrolling as stopped after a delay (longer on mobile for smoother feel)
    const delay = isMobile ? 200 : 150;
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      // Force one more update with transitions enabled
      updateCardTransforms();
    }, delay);
  }, [updateCardTransforms, isMobile]);

  const setupLenis = useCallback(() => {
    // Disable Lenis on mobile devices for stable native scrolling
    if (isMobile) {
      // Use native scroll events on mobile with optimized throttling
      let rafId: number | null = null;
      let lastUpdateTime = 0;
      const throttleDelay = 16; // ~60fps max update rate
      
      const scrollHandler = () => {
        const now = performance.now();
        
        // Throttle updates to prevent excessive calculations
        if (now - lastUpdateTime < throttleDelay) {
          if (rafId) {
            cancelAnimationFrame(rafId);
          }
          rafId = requestAnimationFrame(() => {
            lastUpdateTime = performance.now();
            handleScroll();
            rafId = null;
          });
        } else {
          lastUpdateTime = now;
          if (rafId) {
            cancelAnimationFrame(rafId);
          }
          rafId = requestAnimationFrame(() => {
            handleScroll();
            rafId = null;
          });
        }
      };
      
      if (useWindowScroll) {
        window.addEventListener('scroll', scrollHandler, { passive: true });
      } else {
        const scroller = scrollerRef.current;
        if (scroller) {
          scroller.addEventListener('scroll', scrollHandler, { passive: true });
        }
      }
      
      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        if (useWindowScroll) {
          window.removeEventListener('scroll', scrollHandler);
        } else {
          const scroller = scrollerRef.current;
          if (scroller) {
            scroller.removeEventListener('scroll', scrollHandler);
          }
        }
      };
    }

    // Use Lenis smooth scroll only on desktop
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.0,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
        infinite: false,
        wheelMultiplier: 0.6,
        lerp: 0.12,
        syncTouch: false,
        syncTouchLerp: 0.1
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };

      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;

      return lenis;
    } else {
      const scroller = scrollerRef.current;

      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.0,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 0.6,
        lerp: 0.12,
        syncTouch: false,
        syncTouchLerp: 0.1
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };

      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;

      return lenis;
    }
  }, [handleScroll, useWindowScroll, isMobile]);

  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])
    ) as HTMLElement[];

    cardsRef.current = cards;

    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }

      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
      card.style.transformStyle = 'preserve-3d';
    });

    const cleanup = setupLenis();

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Call cleanup function if it exists (for mobile native scroll)
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }

      stackCompletedRef.current = false;

      cardsRef.current = [];

      transformsCache.clear();

      isUpdatingRef.current = false;
      isScrollingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);

  return (
    <div
      className={`scroll-stack-container relative w-full overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: isMobile ? 'auto' : 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: isMobile ? 'auto' : 'scroll-position',
        height: useWindowScroll ? 'auto' : '100%',
        touchAction: 'pan-y',
        // Mobile optimizations
        ...(isMobile && {
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          WebkitPerspective: '1000px'
        })
      }}
    >
        <div className="scroll-stack-inner pt-[5vh] md:pt-[10vh] px-4 md:px-8 lg:px-20 pb-0 min-h-[250vh] md:min-h-[200vh]">
          {children}
          {/* Spacer so the last pin can release cleanly - increased on mobile */}
          <div className="scroll-stack-end w-full h-px" />
        </div>
      </div>
  );
};

export default ScrollStack;

