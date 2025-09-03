import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAPAnimations = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Global GSAP configuration
      gsap.config({ nullTargetWarn: false });

      // Page sections fade-in animation
      const sections = gsap.utils.toArray('.gsap-fade-up');
      sections.forEach((section: any) => {
        gsap.fromTo(section, 
          { 
            y: 60, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Hero sections animation
      const heroSections = gsap.utils.toArray('.gsap-hero');
      heroSections.forEach((hero: any) => {
        gsap.fromTo(hero, 
          { 
            y: 30, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.2
          }
        );
      });

      // Card animations
      const cards = gsap.utils.toArray('.gsap-card');
      cards.forEach((card: any, index: number) => {
        gsap.fromTo(card, 
          { 
            y: 40, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Scale animation for special elements
      const scaleElements = gsap.utils.toArray('.gsap-scale');
      scaleElements.forEach((element: any) => {
        gsap.fromTo(element, 
          { 
            scale: 0.8, 
            opacity: 0 
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Floating elements animation
      const floatingElements = gsap.utils.toArray('.gsap-floating');
      floatingElements.forEach((element: any, index: number) => {
        gsap.to(element, {
          y: -15,
          duration: 2 + (index * 0.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
};

export default useGSAPAnimations;