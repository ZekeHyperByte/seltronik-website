import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Project } from '../lib/supabase';
import LogoMask from './LogoMask';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

interface HeroCarouselProps {
  projects: Project[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return null; // Don't render anything if there are no projects
  }

  return (
    <div
      className="relative w-[400px] h-[400px]"
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
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
