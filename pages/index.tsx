import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Autoplay, Pagination, Navigation, Controller } from 'swiper/modules';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaCheckCircle, FaShieldAlt, FaTruck, FaHeadset, FaAward, FaLightbulb, FaRoad, FaTrafficLight, FaExclamationTriangle, FaSolarPanel, FaMicrochip, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedLogo from '../components/AnimatedLogo';
import HeroCarousel from '../components/HeroCarousel';
import { projectService, Project, productService, Product } from '../lib/supabase';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const [backgroundSwiper, setBackgroundSwiper] = useState<SwiperClass | null>(null);
  const [textSwiper, setTextSwiper] = useState<SwiperClass | null>(null);
  const [statsInView, setStatsInView] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Refs for GSAP animations
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const clientsRef = useRef<HTMLElement>(null);

  // GSAP Smooth Scroll Animations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Smooth scroll setup
      gsap.config({ nullTargetWarn: false });

      // Section reveal animations
      const sections = [".products-section", ".projects-section", ".stats-section", ".clients-section"];
      
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
        // Fetch Projects
        const projectData = await projectService.getAll();
        const sortedProjects = (projectData || []).sort((a, b) => parseInt(b.year) - parseInt(a.year));
        setProjects(sortedProjects.slice(0, 3));

        // Fetch Products
        const productData = await productService.getFeatured();
        setProducts(productData || []);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
    { name: 'Kementerian PUPR', logo: '/images/clients/pupr.png' },
    { name: 'Dishub DKI Jakarta', logo: '/images/clients/dishub.png' },
    { name: 'Jasa Marga', logo: '/images/clients/jasamarga.png' },
    { name: 'Hutama Karya', logo: '/images/clients/hutama.png' },
    { name: 'Waskita Karya', logo: '/images/clients/waskita.png' },
    { name: 'Adhi Karya', logo: '/images/clients/adhi.png' }
  ];

  return (
    <Layout>
      {/* Hero Section - Clean & Focused */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#6f1520' }}>
        {/* Subtle Seltronik Background Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[200px] md:text-[300px] lg:text-[400px] font-bold font-heading text-white/5 blur-sm select-none">
            SELTRONIK
          </h1>
        </div>


        <div className="container mx-auto px-4 relative z-10 pt-32 md:pt-40 lg:pt-48">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 md:mb-7 leading-tight">
                Membangun <span className="italic font-light">Negeri</span> dengan{' '}
                <span className="text-white">Inovasi</span> Elektronik
              </h1>
              <Link
                href="/produk"
                className="inline-block bg-white text-seltronik-red px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg mb-5 md:mb-6"
              >
                Jelajahi Produk Kami
              </Link>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
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
              <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                <HeroCarousel projects={projects} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved from Hero */}
      <section className="relative py-12 md:py-16 bg-white dark:bg-gray-800 -mt-16 md:-mt-20 lg:-mt-24">
        {/* Right Trapezoid Shape Extending to Hero - Attached to Stats Rectangle */}
        <div className="absolute -top-16 md:-top-20 lg:-top-24 left-0 w-1/2 h-16 md:h-20 lg:h-24 pointer-events-none">
          <div 
            className="w-full h-full bg-white dark:bg-gray-800"
            style={{
              clipPath: 'polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-20 lg:pt-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
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
              <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
                <CountUp end={500} duration={2} />+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Proyek Selesai</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
                <CountUp end={100} duration={2} />+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Klien Puas</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-seltronik-dark h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] md:min-h-[600px]">
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
                  <h3 className="text-2xl md:text-4xl font-bold font-heading mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-lg max-w-md">{feature.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Products Showcase */}
      <section ref={productsRef} className="products-section py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Produk Unggulan Kami
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Inovasi dalam bidang elektronika untuk membangun negeri dan memberikan produk terbaik
            </p>
          </motion.div>

          {/* Desktop/Tablet Grid */}
          <div className="hidden md:flex w-full md:h-[500px] lg:h-[600px] gap-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex-1 hover:flex-[5] transition-all duration-700 ease-in-out bg-gray-500 bg-center bg-cover rounded-2xl overflow-hidden"
                style={{ backgroundImage: product.image ? `url(${product.image})` : 'none' }}
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-700 ease-in-out"></div>
                <div className="relative h-full flex flex-col justify-end p-6 lg:p-8 text-white">
                  <div className="transform transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-12">
                    <h3 className="text-xl lg:text-2xl font-bold font-heading mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs lg:text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">{product.description}</p>
                    <Link
                      href="/produk"
                      className="inline-flex items-center text-seltronik-yellow font-semibold hover:text-yellow-300 transition-colors duration-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 text-sm lg:text-base"
                    >
                      Lihat Detail <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
                  {product.image && (
                    <Image src={product.image} alt={product.name} className="w-full h-full object-cover" fill />
                  )}
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold font-heading text-seltronik-dark dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <Link
                    href="/produk"
                    className="inline-flex items-center text-seltronik-red font-semibold hover:text-seltronik-red-hover transition-colors duration-300 text-sm"
                  >
                    Lihat Detail <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <Link
              href="/produk"
              className="inline-block bg-seltronik-red text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="projects-section py-12 md:py-16 lg:py-20 bg-seltronik-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
              Proyek Terbaru Kami
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Dipercaya oleh berbagai instansi pemerintah dan perusahaan besar di Indonesia
            </p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { 
                slidesPerView: 1.5,
                spaceBetween: 20
              },
              768: { 
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: { 
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
            className="pb-12"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <Link href="/project">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer h-64 md:h-80"
                  >
                    <Image src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" fill />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-end p-4 md:p-6">
                      <div className="transform transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-lg md:text-2xl font-bold font-heading text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-300 mt-1">
                          {project.client} - {project.year}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-8">
            <Link
              href="/project"
              className="inline-block bg-white text-seltronik-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Lihat Semua Proyek
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="stats-section py-12 md:py-16 lg:py-20 bg-gradient-to-r from-seltronik-red via-seltronik-red-hover to-seltronik-red">
        <div className="container mx-auto px-4 stats-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-white text-center">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {statsInView ? <CountUp end={2000} duration={2.5} /> : '2000'}+
              </h3>
              <p className="text-sm sm:text-base md:text-xl">Unit Terpasang</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {statsInView ? <CountUp end={34} duration={2.5} /> : '34'}
              </h3>
              <p className="text-sm sm:text-base md:text-xl">Provinsi</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {statsInView ? <CountUp end={150} duration={2.5} /> : '150'}+
              </h3>
              <p className="text-sm sm:text-base md:text-xl">Kota/Kabupaten</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {statsInView ? <CountUp end={98} duration={2.5} /> : '98'}%
              </h3>
              <p className="text-sm sm:text-base md:text-xl">Kepuasan Klien</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section ref={clientsRef} className="clients-section py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Dipercaya Oleh
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                <div className="h-16 md:h-20 flex items-center justify-center p-2">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400 hover:text-seltronik-red transition-colors duration-300 text-center">
                    {client.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-seltronik-dark to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 lg:mb-8">
              Konsultasikan kebutuhan infrastruktur lalu lintas Anda dengan tim ahli kami. Dapatkan solusi terbaik dengan harga kompetitif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontak"
                className="bg-seltronik-red text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Hubungi Kami Sekarang
              </Link>
              <Link
                href="/produk"
                className="bg-white/10 backdrop-blur text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
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
