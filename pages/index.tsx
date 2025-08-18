import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaCheckCircle, FaShieldAlt, FaTruck, FaHeadset, FaAward, FaLightbulb, FaRoad, FaTrafficLight, FaExclamationTriangle, FaSolarPanel, FaMicrochip, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedLogo from '../components/AnimatedLogo';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HomePage = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const products = [
    {
      id: 1,
      name: 'Lampu Penyebrangan Orang',
      description: 'Sistem lampu penyebrangan modern dengan teknologi LED dan tombol touchless',
      image: '/images/pedestrian-light.jpg',
      icon: <FaTrafficLight className="text-4xl" />,
      color: 'bg-seltronik-red',
      link: '/produk/lampu-penyebrangan'
    },
    {
      id: 2,
      name: 'Warning Light Solar',
      description: 'Lampu peringatan dengan tenaga surya, hemat energi dan ramah lingkungan',
      image: '/images/warning-light.jpg',
      icon: <FaExclamationTriangle className="text-4xl" />,
      color: 'bg-seltronik-yellow',
      link: '/produk/warning-light'
    },
    {
      id: 3,
      name: 'Traffic Light Controller',
      description: 'Sistem pengatur lalu lintas dengan teknologi terkini dan monitoring real-time',
      image: '/images/traffic-controller.jpg',
      icon: <FaMicrochip className="text-4xl" />,
      color: 'bg-seltronik-green',
      link: '/produk/traffic-light'
    },
    {
      id: 4,
      name: 'Lampu Jalan LED',
      description: 'Penerangan jalan umum dengan LED berkualitas tinggi, hemat hingga 70% energi',
      image: '/images/street-light.jpg',
      icon: <FaLightbulb className="text-4xl" />,
      color: 'bg-blue-500',
      link: '/produk/lampu-jalan'
    },
    {
      id: 5,
      name: 'Solar Cell System',
      description: 'Sistem tenaga surya untuk berbagai aplikasi penerangan jalan',
      image: '/images/solar-system.jpg',
      icon: <FaSolarPanel className="text-4xl" />,
      color: 'bg-orange-500',
      link: '/produk/solar-system'
    }
  ];

  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Kualitas Terjamin',
      description: 'Produk bersertifikat standar nasional dan internasional'
    },
    {
      icon: <FaTruck />,
      title: 'Pengiriman Cepat',
      description: 'Layanan pengiriman ke seluruh Indonesia dengan armada sendiri'
    },
    {
      icon: <FaHeadset />,
      title: 'Support 24/7',
      description: 'Tim teknis siap membantu instalasi dan maintenance'
    },
    {
      icon: <FaAward />,
      title: 'Berpengalaman',
      description: 'Lebih dari 20 tahun melayani proyek pemerintah dan swasta'
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

  const projects = [
    {
      title: 'Tol Trans Jawa',
      description: 'Pemasangan 500+ unit lampu jalan LED',
      image: '/images/projects/tol-trans-jawa.jpg',
      year: '2023'
    },
    {
      title: 'Smart City Bandung',
      description: 'Implementasi traffic light system terintegrasi',
      image: '/images/projects/smart-city.jpg',
      year: '2023'
    },
    {
      title: 'MRT Jakarta Phase 2',
      description: 'Sistem penyebrangan dan warning light',
      image: '/images/projects/mrt.jpg',
      year: '2024'
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Traffic Light Animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-seltronik-dark via-gray-900 to-black">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-seltronik-red/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-seltronik-yellow/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-seltronik-green/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="text-white"
            >
              <h1 className="text-5xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
                Membangun <span className="text-seltronik-red">Negeri</span> dengan{' '}
                <span className="text-seltronik-yellow">Inovasi</span> Elektronik
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                PT. Sinyal Elektro Mekanik - Produsen terpercaya perlengkapan lalu lintas dan rambu jalan di Indonesia sejak tahun 2000
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/produk" className="bg-seltronik-red text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Lihat Produk Kami
                </Link>
                <Link href="/kontak" className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30">
                  Konsultasi Gratis
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <h3 className="text-3xl font-bold text-seltronik-yellow">
                    <CountUp end={23} duration={2} />+
                  </h3>
                  <p className="text-gray-400">Tahun Pengalaman</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-seltronik-green">
                    <CountUp end={500} duration={2} />+
                  </h3>
                  <p className="text-gray-400">Proyek Selesai</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-seltronik-red">
                    <CountUp end={100} duration={2} />+
                  </h3>
                  <p className="text-gray-400">Klien Puas</p>
                </div>
              </div>
            </motion.div>

            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <AnimatedLogo />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Mengapa Memilih Seltronik?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Kami berkomitmen memberikan solusi terbaik untuk kebutuhan infrastruktur lalu lintas Anda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-seltronik-red text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold font-heading text-seltronik-dark dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Produk Unggulan Kami
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Inovasi dalam bidang elektronika untuk membangun negeri dan memberikan produk terbaik
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`${product.color} h-48 flex items-center justify-center text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    {product.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-seltronik-dark dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{product.description}</p>
                  <Link
                    href={product.link}
                    className="inline-flex items-center text-seltronik-red font-semibold hover:text-red-600 dark:hover:text-seltronik-yellow transition-colors duration-300"
                  >
                    Lihat Detail <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/produk"
              className="inline-block bg-seltronik-red text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-seltronik-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-heading text-white mb-4">
              Proyek Terbaru Kami
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dipercaya oleh berbagai instansi pemerintah dan perusahaan besar di Indonesia
            </p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
                >
                  <div className="h-64 bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    <div className="absolute bottom-4 left-4 text-white z-20">
                      <span className="bg-seltronik-red px-3 py-1 rounded-full text-sm font-semibold">
                        {project.year}
                      </span>
                    </div>
                    <div className="w-full h-full bg-gray-300 group-hover:scale-110 transition-transform duration-500"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-heading text-seltronik-dark mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-8">
            <Link
              href="/proyek"
              className="inline-block bg-white text-seltronik-dark px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Lihat Semua Proyek
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={ref} className="py-20 bg-gradient-to-r from-seltronik-red via-seltronik-yellow to-seltronik-green">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <h3 className="text-5xl font-bold mb-2">
                {inView && <CountUp end={2000} duration={2.5} />}+
              </h3>
              <p className="text-xl">Unit Terpasang</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            >
              <h3 className="text-5xl font-bold mb-2">
                {inView && <CountUp end={34} duration={2.5} />}
              </h3>
              <p className="text-xl">Provinsi</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <h3 className="text-5xl font-bold mb-2">
                {inView && <CountUp end={150} duration={2.5} />}+
              </h3>
              <p className="text-xl">Kota/Kabupaten</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
            >
              <h3 className="text-5xl font-bold mb-2">
                {inView && <CountUp end={98} duration={2.5} />}%
              </h3>
              <p className="text-xl">Kepuasan Klien</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Dipercaya Oleh
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Berbagai instansi pemerintah dan perusahaan ternama
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="h-20 flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-400 hover:text-seltronik-red transition-colors duration-300">
                    {client.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-seltronik-dark to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold font-heading mb-4">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Konsultasikan kebutuhan infrastruktur lalu lintas Anda dengan tim ahli kami. Dapatkan solusi terbaik dengan harga kompetitif.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/kontak"
                className="bg-seltronik-red text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Hubungi Kami Sekarang
              </Link>
              <Link
                href="/produk"
                className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
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
