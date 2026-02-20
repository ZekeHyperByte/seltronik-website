import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Autoplay, Pagination, Navigation, Controller } from 'swiper/modules';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaCheckCircle, FaShieldAlt, FaTruck, FaHeadset, FaAward, FaLightbulb, FaRoad, FaTrafficLight, FaExclamationTriangle, FaSolarPanel, FaMicrochip, FaArrowRight, FaWalking } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedLogo from '../components/AnimatedLogo';
import HeroCarousel from '../components/HeroCarousel';
import { categoryService, Category, productService, Product } from '../lib/supabase';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Category icon mapping
const categoryIcons: { [key: string]: React.ReactNode } = {
  pedestrian: <FaWalking className="text-4xl md:text-5xl" />,
  warning: <FaExclamationTriangle className="text-4xl md:text-5xl" />,
  traffic: <FaTrafficLight className="text-4xl md:text-5xl" />,
  street: <FaRoad className="text-4xl md:text-5xl" />,
};

// Fallback categories if database is not available
const fallbackCategories: Category[] = [
  {
    id: 'pedestrian',
    name: 'Lampu Penyebrangan',
    description: 'Sistem lampu penyebrangan pejalan kaki dengan teknologi terkini. Dilengkapi dengan countdown timer, audio warning, dan touchless button untuk keselamatan maksimal.',
    thumbnail_image: '/images/categories/PEDESTRIAN CROSSING SXC.jpg',
    display_order: 1,
    is_active: true,
  },
  {
    id: 'traffic',
    name: 'Traffic Light',
    description: 'Lampu lalu lintas LED dengan kualitas terbaik. Tersedia dalam berbagai konfigurasi dan ukuran.',
    thumbnail_image: '/images/categories/TRAFFIC LIGHT.jpg',
    display_order: 2,
    is_active: true,
  },
  {
    id: 'street',
    name: 'Alat Penerangan Jalan',
    description: 'Lampu jalan LED hemat energi dengan berbagai wattage. Desain modern, tahan cuaca, dan mudah perawatan.',
    thumbnail_image: '/images/categories/ALAT PENERANGAN JALAN.jpg',
    display_order: 3,
    is_active: true,
  },
  {
    id: 'warning',
    name: 'Warning Light',
    description: 'Lampu peringatan tenaga surya dan listrik untuk berbagai aplikasi. Ideal untuk area konstruksi dan titik rawan kecelakaan.',
    thumbnail_image: '/images/categories/WARNING LIGHT.jpg',
    display_order: 4,
    is_active: true,
  },
];

const HomePage = () => {
  const [backgroundSwiper, setBackgroundSwiper] = useState<SwiperClass | null>(null);
  const [textSwiper, setTextSwiper] = useState<SwiperClass | null>(null);
  const [statsInView, setStatsInView] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSwapped, setIsSwapped] = useState(false);
  const [isCycleActive, setIsCycleActive] = useState(false);

  // Refs for GSAP animations
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const clientsRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // GSAP Smooth Scroll Animations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Smooth scroll setup
      gsap.config({ nullTargetWarn: false });

      // Section reveal animations
      const sections = [".products-section", ".stats-section", ".clients-section"];
      
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { 
            y: 100, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Stats counter animation
      gsap.fromTo(".stats-container", 
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 80%",
            onEnter: () => setStatsInView(true),
            onLeave: () => setStatsInView(false),
            onEnterBack: () => setStatsInView(true),
            onLeaveBack: () => setStatsInView(false)
          }
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Categories
        const categoriesData = await categoryService.getAll();
        // If no categories returned, use fallback
        if (!categoriesData || categoriesData.length === 0) {
          setCategories(fallbackCategories);
        } else {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use fallback categories on error
        setCategories(fallbackCategories);
      }
    };

    fetchData();
  }, []);

  // Handle hover to start the cycle
  const handleHoverStart = () => {
    if (!isCycleActive) {
      setIsCycleActive(true);
      setIsSwapped(true);
      // Start background video from beginning
      if (heroVideoRef.current) {
        heroVideoRef.current.currentTime = 0;
        heroVideoRef.current.play();
      }
    }
  };

  // Handle video end to swap back
  const handleVideoEnd = () => {
    setIsSwapped(false);
    setIsCycleActive(false);
  };

  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Kualitas Terjamin',
      description: 'Produk bersertifikat standar nasional dan internasional',
      image: '/images/features/quality_ensured.jpg'
    },
    {
      icon: <FaTruck />,
      title: 'Pengiriman Cepat',
      description: 'Layanan pengiriman ke seluruh Indonesia dengan armada sendiri',
      image: '/images/features/fast_delivery.jpg'
    },
    {
      icon: <FaHeadset />,
      title: 'Support 24/7',
      description: 'Tim teknis siap membantu instalasi dan maintenance',
      image: '/images/features/247_support.jpg'
    },
    {
      icon: <FaAward />,
      title: 'Berpengalaman',
      description: 'Lebih dari 20 tahun melayani proyek pemerintah dan swasta',
      image: '/images/features/experience.jpg'
    }
  ];

  const clients = [
    { name: 'Kementerian PUPR', logo: '/images/trusted_by_logo/PUPR.svg' },
    { name: 'Dishub DKI Jakarta', logo: '/images/trusted_by_logo/Dishub_DKI_Jakarta.png' },
    { name: 'Jasa Marga', logo: '/images/trusted_by_logo/Jasa_Marga.svg' },
    { name: 'Hutama Karya', logo: '/images/trusted_by_logo/Hutama_Karya.svg' },
    { name: 'Waskita Karya', logo: '/images/trusted_by_logo/Waskita_Karya.svg' },
    { name: 'Adhi Karya', logo: '/images/trusted_by_logo/Adhi_Karya.svg' }
  ];

  return (
    <Layout>
      {/* Hero Section - Clean & Focused */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background Layer - Initially solid, becomes video on swap */}
        <div className="absolute inset-0">
          {/* Solid background */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isSwapped ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backgroundColor: '#6f1520' }}
          />

          {/* Video background (shown when swapped) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isSwapped ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              ref={heroVideoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              onEnded={handleVideoEnd}
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Subtle Seltronik Background Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h1 className="text-[200px] md:text-[300px] lg:text-[400px] font-bold font-heading text-white/5 blur-sm select-none">
            SELTRONIK
          </h1>
        </div>


        <div className="container mx-auto px-4 relative z-20 pt-24 md:pt-32 lg:pt-40 laptop:pt-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white text-center lg:text-left"
            >
              <h1 className="text-responsive-3xl md:text-responsive-4xl lg:text-5xl laptop:text-4xl font-bold font-heading mb-6 md:mb-8 lg:mb-10 laptop:mb-6 leading-tight">
                Membangun <span className="italic font-light">Negeri</span> dengan{' '}
                <span className="text-white">Inovasi</span> Elektronik
              </h1>
              <Link
                href="/produk"
                className="inline-block bg-white text-seltronik-red px-6 md:px-8 laptop:px-6 py-3 md:py-4 laptop:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl text-base md:text-lg laptop:text-base mb-6 md:mb-8 lg:mb-10 laptop:mb-6"
              >
                Jelajahi Produk Kami
              </Link>
              <p className="text-base md:text-lg laptop:text-base text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                PT. Sinyal Elektro Mekanik - Produsen terpercaya perlengkapan lalu lintas dan rambu jalan di Indonesia sejak tahun 2000
              </p>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] laptop:w-72 laptop:h-72">
                <HeroCarousel
                  isSwapped={isSwapped}
                  onHoverStart={handleHoverStart}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved from Hero */}
      <section className="relative py-8 md:py-12 lg:py-16 laptop:py-10 bg-white dark:bg-gray-800 -mt-12 md:-mt-16 lg:-mt-20 laptop:-mt-14">
        {/* Right Trapezoid Shape Extending to Hero - Attached to Stats Rectangle */}
        <div className="absolute -top-12 md:-top-16 lg:-top-20 laptop:-top-14 left-0 w-1/2 h-12 md:h-16 lg:h-20 laptop:h-14 pointer-events-none">
          <div 
            className="w-full h-full bg-white dark:bg-gray-800"
            style={{
              clipPath: 'polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-12 md:pt-16 lg:pt-20 laptop:pt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl laptop:text-3xl font-bold text-black dark:text-white mb-2">
                <CountUp end={23} duration={2} />+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Tahun Pengalaman</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-3xl md:text-4xl laptop:text-3xl font-bold text-black dark:text-white mb-2">
                <CountUp end={100} duration={2} />+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Klien Puas</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-seltronik-dark h-[40vh] sm:h-[50vh] lg:h-[60vh] laptop:h-[45vh] min-h-[350px] md:min-h-[500px] laptop:min-h-[400px]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-50"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                  <div className="text-4xl text-seltronik-red mb-4">{feature.icon}</div>
                  <h3 className="text-xl md:text-3xl laptop:text-2xl font-bold font-heading mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base laptop:text-sm max-w-md">{feature.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Products Showcase */}
      <section ref={productsRef} className="products-section py-10 md:py-14 lg:py-18 laptop:py-12 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl laptop:text-2xl font-bold font-heading text-seltronik-dark dark:text-white mb-3 laptop:mb-2">
              Produk Unggulan Kami
            </h2>
            <p className="text-base md:text-lg laptop:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Inovasi dalam bidang elektronika untuk membangun negeri dan memberikan produk terbaik
            </p>
          </motion.div>

          {/* Desktop/Tablet Grid - Maroon Gallery Style */}
          <div className="hidden md:flex w-full md:h-[450px] lg:h-[550px] laptop:h-[400px] gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href="/produk"
                className="group relative flex-1 hover:flex-[5] transition-all duration-700 ease-in-out rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
              >
                {/* Maroon Theme Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-seltronik-red via-seltronik-red-hover to-seltronik-dark">
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:20px_20px]" />
                  {/* Gradient Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 text-white">
                  <div className="transform transition-all duration-500 ease-in-out opacity-100 group-hover:translate-y-0">
                    {/* Icon */}
                    <div className="mb-4 text-seltronik-yellow transition-all duration-500 group-hover:scale-110">
                      {categoryIcons[category.id] || <FaLightbulb className="text-4xl md:text-5xl" />}
                    </div>
                    {/* Title - Always visible */}
                    <h3 className="text-lg lg:text-xl laptop:text-lg font-bold font-heading mb-2 transition-all duration-500">
                      {category.name}
                    </h3>
                    {/* Description - Appears on hover */}
                    <p className="text-xs laptop:text-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                      {category.description.substring(0, 100)}...
                    </p>
                    {/* Link - Appears on hover */}
                    <div className="flex items-center text-seltronik-yellow font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      <span className="text-sm">Lihat Detail</span>
                      <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Grid - Maroon Card Style */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <Link href="/produk">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Maroon Theme Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-seltronik-red via-seltronik-red-hover to-seltronik-dark">
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:20px_20px]" />
                      {/* Gradient Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-500" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="mb-4 text-seltronik-yellow">
                          {categoryIcons[category.id] || <FaLightbulb className="text-4xl md:text-5xl" />}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-300 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {category.description.substring(0, 100)}...
                        </p>
                        <div className="flex items-center text-seltronik-yellow font-semibold">
                          <span className="text-sm">Lihat Detail</span>
                          <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6 lg:mt-10 laptop:mt-8">
            <Link
              href="/produk"
              className="inline-block bg-seltronik-red text-white px-5 md:px-8 laptop:px-6 py-2.5 md:py-4 laptop:py-3 rounded-full font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-105 shadow-xl text-sm md:text-base laptop:text-sm"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="stats-section py-10 md:py-14 lg:py-18 laptop:py-12 bg-gradient-to-r from-seltronik-red via-seltronik-red-hover to-seltronik-red">
        <div className="container mx-auto px-4 stats-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-white text-center">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl laptop:text-3xl font-bold mb-2">
                {statsInView ? <CountUp end={2000} duration={2.5} /> : '2000'}+
              </h3>
              <p className="text-sm sm:text-base md:text-lg laptop:text-sm">Unit Terpasang</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl laptop:text-3xl font-bold mb-2">
                {statsInView ? <CountUp end={34} duration={2.5} /> : '34'}
              </h3>
              <p className="text-sm sm:text-base md:text-lg laptop:text-sm">Provinsi</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl laptop:text-3xl font-bold mb-2">
                {statsInView ? <CountUp end={150} duration={2.5} /> : '150'}+
              </h3>
              <p className="text-sm sm:text-base md:text-lg laptop:text-sm">Kota/Kabupaten</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl laptop:text-3xl font-bold mb-2">
                {statsInView ? <CountUp end={98} duration={2.5} /> : '98'}%
              </h3>
              <p className="text-sm sm:text-base md:text-lg laptop:text-sm">Kepuasan Klien</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section ref={clientsRef} className="clients-section py-10 md:py-14 lg:py-18 laptop:py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl laptop:text-2xl font-bold font-heading text-seltronik-dark dark:text-white mb-3 laptop:mb-2">
              Dipercaya Oleh
            </h2>
            <p className="text-base md:text-lg laptop:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Berbagai instansi pemerintah dan perusahaan ternama
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1
                }}
                whileHover={{ scale: 1.05 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="h-24 md:h-28 lg:h-32 laptop:h-26 flex items-center justify-center p-4">
                  <div className={`relative w-full h-full ${
                    client.name === 'Dishub DKI Jakarta' ? 'scale-[2]' : ''
                  }`}>
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-14 lg:py-18 laptop:py-12 bg-gradient-to-br from-seltronik-dark to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center text-white"
          >
            <h2 className="text-2xl sm:text-3xl laptop:text-2xl font-bold font-heading mb-3 laptop:mb-2">
              Siap Untuk Berkolaborasi?
            </h2>
            <p className="text-base md:text-lg laptop:text-base text-gray-300 max-w-3xl mx-auto mb-5 lg:mb-6 laptop:mb-5">
              Konsultasikan kebutuhan infrastruktur lalu lintas Anda dengan tim ahli kami. Dapatkan solusi terbaik dengan harga kompetitif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontak"
                className="bg-seltronik-red text-white px-5 md:px-8 laptop:px-6 py-2.5 md:py-4 laptop:py-3 rounded-full font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-105 shadow-xl text-sm md:text-base laptop:text-sm"
              >
                Hubungi Kami Sekarang
              </Link>
              <Link
                href="/produk"
                className="bg-white/10 backdrop-blur text-white px-5 md:px-8 laptop:px-6 py-2.5 md:py-4 laptop:py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 text-sm md:text-base laptop:text-sm"
              >
                Download Katalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
