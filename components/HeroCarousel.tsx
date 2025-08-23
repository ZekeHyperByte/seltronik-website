import React from 'react';
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
  if (!projects || projects.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-seltronik-red via-seltronik-yellow to-seltronik-green rounded-full flex items-center justify-center">
        <div className="text-white text-4xl md:text-6xl lg:text-8xl font-bold">
          S
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
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
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