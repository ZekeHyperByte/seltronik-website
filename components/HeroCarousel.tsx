import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Project } from '../lib/supabase';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

interface HeroCarouselProps {
  projects: Project[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ projects }) => {
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
        <div className="w-full h-full bg-gradient-to-br from-seltronik-red via-seltronik-yellow to-seltronik-green flex items-center justify-center">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="text-white text-2xl md:text-4xl lg:text-6xl font-bold opacity-50">
            SELTRONIK
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full rounded-full overflow-hidden"
      style={{
        maskImage: 'url(/images/seltroniklogo.svg)', // Fallback for Firefox
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: 'url(/images/seltroniklogo.svg)', // Webkit browsers (Chrome, Safari)
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="w-full h-full relative">
              <Image
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
                fill
              />
              {/* Optional overlay for better visibility */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;