import React, { useRef } from 'react';

interface HeroCarouselProps {
  isSwapped: boolean;
  onHoverStart: () => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ isSwapped, onHoverStart }) => {
  const logoVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full h-full">
      {/* Transparent hover container - larger than the logo for easier triggering */}
      <div
        className="absolute inset-0 cursor-pointer z-20"
        onMouseEnter={onHoverStart}
        style={{
          transform: 'scale(1.2)', // Make it 20% larger than the logo
        }}
      />

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