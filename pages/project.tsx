import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import SearchInput from '../components/SearchInput';
import OptimizedImage from '../components/OptimizedImage';
import { GridSkeleton, ErrorState, EmptyState } from '../components/Loading';
import { useSearch } from '../hooks/useSearch';
import { imageSizes, imageQuality, generateBlurDataURL } from '../lib/imageOptimization';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaRoad, FaCity, FaTools, FaTrafficLight, FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaEye, FaTimes, FaFilter, FaSearch } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { projectService, Project } from '../lib/supabase';
import useGSAPAnimations from '../hooks/useGSAP';

// Import Swiper styles
import 'swiper/css';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Enhanced search with debouncing
  const {
    searchTerm,
    searchResults,
    suggestions,
    isSearching,
    setSearchTerm,
    clearSearch,
    hasSearch
  } = useSearch({ 
    items: projects,
    searchFields: ['title', 'description', 'client', 'location'],
    debounceMs: 300,
    maxSuggestions: 5
  });

  // Apply GSAP animations
  useGSAPAnimations();

  // ESC key handling is now handled by the Modal component

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await projectService.getAll();
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Gagal memuat data proyek. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleRetry = () => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await projectService.getAll();
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Gagal memuat data proyek. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  };

  const categories = [
    { id: 'all', name: 'Semua Proyek', icon: FaRoad, count: projects.length },
    { id: 'highway', name: 'Jalan Tol', icon: FaRoad, count: projects.filter(p => p.category === 'highway').length },
    { id: 'city', name: 'Jalan Kota', icon: FaCity, count: projects.filter(p => p.category === 'city').length },
    { id: 'smartcity', name: 'Smart City', icon: FaTrafficLight, count: projects.filter(p => p.category === 'smartcity').length },
    { id: 'government', name: 'Pemerintah', icon: FaBuilding, count: projects.filter(p => p.category === 'government').length }
  ];

  // Apply category filter to search results
  const filteredProjects = selectedCategory === 'all' 
    ? searchResults 
    : searchResults.filter(project => project.category === selectedCategory);

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
      <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">Proyek Kami</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Kepercayaan klien adalah kebanggaan kami. Lihat berbagai proyek infrastruktur yang telah kami selesaikan
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8 md:py-12 -mt-6 md:-mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="gsap-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-seltronik-red mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">Proyek Selesai</p>
            </div>
            <div className="gsap-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-seltronik-yellow mb-2">34</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">Provinsi</p>
            </div>
            <div className="gsap-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-seltronik-green mb-2">100+</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">Klien Puas</p>
            </div>
            <div className="gsap-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-2">2000+</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">Km Jalan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Category Filter */}
      <section className="py-6 md:py-8 bg-gray-50 dark:bg-seltronik-dark sticky top-14 md:top-16 z-30">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={clearSearch}
              suggestions={suggestions}
              isSearching={isSearching}
              placeholder="Cari proyek berdasarkan nama, lokasi, atau klien..."
              className="max-w-md mx-auto"
              showSuggestions={true}
            />
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-full px-4 py-3 bg-seltronik-red text-white rounded-lg font-medium"
            >
              <FaFilter className="mr-2" />
              Filter Kategori ({categories.find(c => c.id === selectedCategory)?.name})
            </button>
          </div>

          {/* Desktop Filter */}
          <div className="hidden md:flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-seltronik-red text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-700 dark:text-white text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <category.icon className="text-sm md:text-base" />
                <span className="text-sm md:text-base">{category.name}</span>
                <span className="text-xs bg-black/20 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <div className="gsap-fade-up md:hidden grid grid-cols-1 gap-2 mt-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowFilters(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-seltronik-red text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon />
                      <span>{category.name}</span>
                    </div>
                    <span className="text-sm bg-black/20 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="gsap-fade-up py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {isLoading && (
            <GridSkeleton 
              count={6} 
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            />
          )}

          {/* Error State */}
          {error && (
            <ErrorState 
              message={error}
              onRetry={handleRetry}
            />
          )}

          {/* Content */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="gsap-card bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  style={{ willChange: 'transform' }}
                >
                  {/* Project Image */}
                  <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 relative overflow-hidden">
                    {project.images && project.images[0] && (
                      <OptimizedImage 
                        src={project.images[0]} 
                        alt={project.title} 
                        fill
                        sizes={imageSizes.card}
                        quality={imageQuality.card}
                        className="transition-transform duration-300 group-hover:scale-105" 
                        objectFit="cover"
                        blurDataURL={generateBlurDataURL()}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-3 md:top-4 left-3 md:left-4 z-10">
                      <span className="bg-seltronik-red text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                        {project.year}
                      </span>
                    </div>
                    {project.stats && (
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white z-10">
                        <p className="text-lg md:text-2xl font-bold">{project.stats.units}+ Unit</p>
                        <p className="text-xs md:text-sm opacity-90">{project.stats.duration}</p>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-seltronik-dark dark:text-white mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <FaBuilding className="text-seltronik-red flex-shrink-0" />
                        <span className="line-clamp-1">{project.client}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-seltronik-yellow flex-shrink-0" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm md:text-base">
                      {project.description}
                    </p>
                    <button
                      onClick={() => setSelectedProject(project as Project)}
                      className="w-full bg-seltronik-red text-white py-2 md:py-3 rounded-lg hover:bg-seltronik-red-hover transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <FaEye /> Lihat Detail
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredProjects.length === 0 && (
            <EmptyState
              title="Tidak ada proyek ditemukan"
              message="Proyek yang Anda cari tidak ditemukan. Coba ubah filter kategori."
              onReset={() => setSelectedCategory('all')}
              resetLabel="Lihat Semua Proyek"
              icon="🏗️"
            />
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="gsap-fade-up py-12 md:py-16 bg-gradient-to-br from-seltronik-dark to-gray-900">
          <div className="container mx-auto px-4">
            <div className="gsap-fade-up text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
                Apa Kata Klien Kami
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Kepuasan klien adalah prioritas utama kami
              </p>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { 
                  slidesPerView: 1,
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
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 h-full">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-seltronik-yellow text-sm md:text-base" />
                      ))}
                    </div>
                    <FaQuoteLeft className="text-2xl md:text-4xl text-gray-200 dark:text-gray-600 mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-sm md:text-base">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t dark:border-gray-700 pt-4">
                      <p className="font-bold text-seltronik-dark dark:text-white text-sm md:text-base">{testimonial.author}</p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
        subtitle="Klik di luar area ini, tekan ESC, atau klik X untuk menutup"
        enableAnimation={false}
      >
        {selectedProject && (
          <>
            {/* Client and Year Info */}
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-6">
              <span className="flex items-center gap-1">
                <FaBuilding className="text-seltronik-red" />
                {selectedProject.client}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-seltronik-yellow" />
                {selectedProject.year}
              </span>
            </div>
                {/* Image Gallery */}
                <div className="h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl mb-6 overflow-hidden relative group cursor-pointer">
                  {selectedProject.images && selectedProject.images[0] && (
                    <OptimizedImage 
                      src={selectedProject.images[0]} 
                      alt={selectedProject.title} 
                      fill
                      sizes={imageSizes.modal}
                      quality={imageQuality.modal}
                      className="" 
                      objectFit="cover"
                      priority
                      blurDataURL={generateBlurDataURL()}
                    />
                  )}
                  {/* Click anywhere on image to close modal */}
                  <div 
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center"
                    onClick={() => setSelectedProject(null)}
                  >
                    <div className="bg-black/50 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm">
                      Klik untuk menutup
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-4">Informasi Proyek</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <FaBuilding className="text-seltronik-red mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Klien</p>
                          <p className="font-medium dark:text-white text-sm md:text-base">{selectedProject.client}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-seltronik-yellow mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Lokasi</p>
                          <p className="font-medium dark:text-white text-sm md:text-base">{selectedProject.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaCalendarAlt className="text-seltronik-green mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Tahun</p>
                          <p className="font-medium dark:text-white text-sm md:text-base">{selectedProject.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-4">Lingkup Pekerjaan</h3>
                    <ul className="space-y-2">
                      {selectedProject.scope.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-seltronik-green mt-1 flex-shrink-0">✓</span>
                          <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6 lg:mt-8">
                  <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-4">Deskripsi Proyek</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">{selectedProject.description}</p>
                </div>

                {/* Stats */}
                {selectedProject.stats && (
                  <div className="mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-xl md:text-2xl font-bold text-seltronik-red">{selectedProject.stats.units}+</p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Unit Terpasang</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-xl md:text-2xl font-bold text-seltronik-yellow">{selectedProject.stats.duration}</p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Durasi</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-xl md:text-2xl font-bold text-seltronik-green">{selectedProject.stats.value}</p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Nilai Proyek</p>
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {selectedProject.testimonial && (
                  <div className="mt-6 lg:mt-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-4 md:p-6">
                    <FaQuoteLeft className="text-2xl md:text-3xl text-gray-300 dark:text-gray-500 mb-3" />
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4 text-sm md:text-base">"{selectedProject.testimonial.text}"</p>
                    <div>
                      <p className="font-bold text-seltronik-dark dark:text-white text-sm md:text-base">{selectedProject.testimonial.author}</p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{selectedProject.testimonial.position}</p>
                    </div>
                  </div>
                )}
          </>
        )}
      </Modal>

      {/* CTA Section */}
      <section className="gsap-fade-up py-12 md:py-16 bg-gradient-to-r from-seltronik-red via-seltronik-yellow to-seltronik-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Siap Menjadi Bagian dari Kesuksesan Anda?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            Mari diskusikan bagaimana kami dapat membantu mewujudkan proyek infrastruktur Anda
          </p>
          <Link
            href="/kontak"
            className="inline-block bg-white text-seltronik-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Mulai Konsultasi Proyek
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;