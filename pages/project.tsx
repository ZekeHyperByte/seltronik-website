import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaRoad, FaCity, FaTools, FaTrafficLight, FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaEye } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Head from 'next/head';
import { projectService, Project } from '../lib/supabase';

// Import Swiper styles
import 'swiper/css';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const categories = [
    { id: 'all', name: 'Semua Proyek', icon: FaRoad },
    { id: 'highway', name: 'Jalan Tol', icon: FaRoad },
    { id: 'city', name: 'Jalan Kota', icon: FaCity },
    { id: 'smartcity', name: 'Smart City', icon: FaTrafficLight },
    { id: 'government', name: 'Pemerintah', icon: FaBuilding }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const testimonials = projects
    .filter(p => p.testimonial)
    .map(p => p.testimonial!);

  return (
    <Layout>
      <Head>
        <title>Proyek - Seltronik</title>
        <meta name="description" content="Proyek-proyek yang telah kami kerjakan" />
      </Head>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Proyek Kami</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kepercayaan klien adalah kebanggaan kami. Lihat berbagai proyek infrastruktur yang telah kami selesaikan
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            >
              <h3 className="text-4xl font-bold text-seltronik-red mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-300">Proyek Selesai</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            >
              <h3 className="text-4xl font-bold text-seltronik-yellow mb-2">34</h3>
              <p className="text-gray-600 dark:text-gray-300">Provinsi</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            >
              <h3 className="text-4xl font-bold text-seltronik-green mb-2">100+</h3>
              <p className="text-gray-600 dark:text-gray-300">Klien Puas</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            >
              <h3 className="text-4xl font-bold text-blue-500 mb-2">2000+</h3>
              <p className="text-gray-600 dark:text-gray-300">Km Jalan</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 dark:bg-seltronik-dark sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-seltronik-red text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-700 dark:text-white text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <category.icon />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Project Image */}
                  <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 relative overflow-hidden">
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-seltronik-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {project.year}
                      </span>
                    </div>
                    {project.stats && (
                      <div className="absolute bottom-4 left-4 text-white z-10">
                        <p className="text-2xl font-bold">{project.stats.units}+ Unit</p>
                        <p className="text-sm opacity-90">{project.stats.duration}</p>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-seltronik-dark dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <FaBuilding className="text-seltronik-red" />
                        <span>{project.client}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-seltronik-yellow" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full bg-seltronik-red text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <FaEye /> Lihat Detail
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-seltronik-dark to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-heading text-white mb-4">
              Apa Kata Klien Kami
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kepuasan klien adalah prioritas utama kami
            </p>
          </motion.div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-seltronik-yellow" />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-4xl text-gray-200 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t dark:border-gray-700 pt-4">
                    <p className="font-bold text-seltronik-dark dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-seltronik-dark dark:text-white">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Image Gallery */}
                <div className="h-64 md:h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl mb-6">
                  <img src={selectedProject.images[0]} alt={selectedProject.title} className="w-full h-full object-cover rounded-xl" />
                </div>

                {/* Project Details */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-4">Informasi Proyek</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <FaBuilding className="text-seltronik-red mt-1" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Klien</p>
                          <p className="font-medium dark:text-white">{selectedProject.client}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-seltronik-yellow mt-1" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Lokasi</p>
                          <p className="font-medium dark:text-white">{selectedProject.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaCalendarAlt className="text-seltronik-green mt-1" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Tahun</p>
                          <p className="font-medium dark:text-white">{selectedProject.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-4">Lingkup Pekerjaan</h3>
                    <ul className="space-y-2">
                      {selectedProject.scope.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-seltronik-green mt-1">✓</span>
                          <span className="text-gray-600 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-4">Deskripsi Proyek</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Stats */}
                {selectedProject.stats && (
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-seltronik-red">{selectedProject.stats.units}+</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Unit Terpasang</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-seltronik-yellow">{selectedProject.stats.duration}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Durasi</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-seltronik-green">{selectedProject.stats.value}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Nilai Proyek</p>
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {selectedProject.testimonial && (
                  <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <FaQuoteLeft className="text-3xl text-gray-300 dark:text-gray-500 mb-3" />
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{selectedProject.testimonial.text}"</p>
                    <div>
                      <p className="font-bold text-seltronik-dark dark:text-white">{selectedProject.testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedProject.testimonial.position}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-seltronik-red via-seltronik-yellow to-seltronik-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold font-heading mb-4">
            Siap Menjadi Bagian dari Kesuksesan Anda?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Mari diskusikan bagaimana kami dapat membantu mewujudkan proyek infrastruktur Anda
          </p>
          <Link
            href="/kontak"
            className="inline-block bg-white text-seltronik-dark px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Mulai Konsultasi Proyek
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;
