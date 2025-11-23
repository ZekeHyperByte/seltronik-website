import React, { useState, useRef } from 'react';
import { Project } from '../lib/supabase';

interface HeroCarouselProps {
  projects: Project[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ projects }) => {
  const [isSwapped, setIsSwapped] = useState(false);
  const [isCycleActive, setIsCycleActive] = useState(false);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const logoVideoRef = useRef<HTMLVideoElement>(null);

  // Handle hover to start the cycle
  const handleHoverStart = () => {
    if (!isCycleActive) {
      setIsCycleActive(true);
      setIsSwapped(true);
      // Start background video from beginning
      if (backgroundVideoRef.current) {
        backgroundVideoRef.current.currentTime = 0;
        backgroundVideoRef.current.play();
      }
    }
  };

  // Handle video end to swap back
  const handleVideoEnd = () => {
    setIsSwapped(false);
    setIsCycleActive(false);
  };

  // Show the proper masked container even when no projects
  if (!projects || projects.length === 0) {
    return (
      <div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          maskImage: 'url(/images/seltroniklogo.svg)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskImage: 'url(/images/seltroniklogo.svg)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      >
        {/* Placeholder background with company branding */}
        <div className="w-full h-full bg-gradient-to-br from-seltronik-red via-seltronik-red-hover to-seltronik-red flex items-center justify-center">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="text-white text-2xl md:text-4xl lg:text-6xl font-bold opacity-50">
            <span className="text-white">SELTRONIK</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      onMouseEnter={handleHoverStart}
    >
      {/* Background Layer - Initially solid, becomes video on swap */}
      <div className="absolute inset-0 transition-opacity duration-700">
        {/* Solid background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-seltronik-red via-seltronik-red-hover to-seltronik-red transition-opacity duration-700 ${
            isSwapped ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video background (shown when swapped) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isSwapped ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            ref={backgroundVideoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Logo-Masked Layer - Initially video, becomes solid on swap */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          maskImage: 'url(/images/seltroniklogo.svg)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskImage: 'url(/images/seltroniklogo.svg)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
      >
        {/* Video in logo (shown initially, loops continuously) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isSwapped ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <video
            ref={logoVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Solid color in logo (shown when swapped) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-seltronik-red via-seltronik-red-hover to-seltronik-red transition-opacity duration-700 ${
            isSwapped ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;