import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaDownload, FaEye, FaCheckCircle, FaAward, FaShieldAlt, FaFileAlt, FaGlobeAsia, FaBuilding, FaCalendarAlt, FaQrcode, FaTimes, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';
import { certificateService, Certificate } from '../lib/supabase';
import useGSAPAnimations from '../hooks/useGSAP';

const CertificatesPage = () => {
  // Apply GSAP animations
  useGSAPAnimations();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await certificateService.getAll();
        setCertificates(data || []);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, []);

  const categories = [
    { id: 'all', name: 'Semua Dokumen', count: certificates.length },
    { id: 'business', name: 'Legalitas Usaha', count: certificates.filter(c => c.category === 'business').length },
    { id: 'quality', name: 'Sertifikat Mutu', count: certificates.filter(c => c.category === 'quality').length },
    { id: 'product', name: 'Sertifikat Produk', count: certificates.filter(c => c.category === 'product').length },
    { id: 'award', name: 'Penghargaan', count: certificates.filter(c => c.category === 'award').length }
  ];

  const filteredCertificates = selectedCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const stats = [
    { label: 'Sertifikat Aktif', value: '15+', color: 'text-seltronik-green' },
    { label: 'Standar Internasional', value: '5', color: 'text-seltronik-yellow' },
    { label: 'Penghargaan', value: '8', color: 'text-seltronik-red' },
    { label: 'Tahun Bersertifikat', value: '23', color: 'text-blue-500' }
  ];

  return (
    <Layout>
      <Head>
        <title>Sertifikat & Legalitas - Seltronik</title>
        <meta name="description" content="Sertifikat dan legalitas PT. Sinyal Elektro Mekanik" />
      </Head>
      
      {/* Hero Section */}
      <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">Sertifikat & Legalitas</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Komitmen kami terhadap kualitas dan standar tertinggi dibuktikan dengan berbagai sertifikasi resmi
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 -mt-6 md:-mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="gsap-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 text-center"
              >
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 md:py-8 bg-gray-50 dark:bg-seltronik-dark sticky top-16 md:top-20 z-30">
        <div className="container mx-auto px-4">
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
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-seltronik-red text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-700 dark:text-white text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {category.name} ({category.count})
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
                    <span>{category.name}</span>
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

      {/* Certificates Grid */}
      <section className="gsap-fade-up py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredCertificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className="gsap-card bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:scale-105 hover:-translate-y-1"
                >
                  {/* Certificate Image */}
                  <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 relative overflow-hidden">
                    {cert.image_url ? (
                      <Image 
                        src={cert.image_url} 
                        alt={cert.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        fill
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaCertificate className="text-4xl text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-4 md:p-5">
                    <h3 className="text-sm md:text-lg font-bold text-seltronik-dark dark:text-white mb-2 line-clamp-2 min-h-[2.5rem]">
                      {cert.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">{cert.issuer}</p>
                    
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-seltronik-green flex-shrink-0" />
                        <span className="line-clamp-1">Terbit: {cert.issue_date}</span>
                      </div>
                      {cert.expiry_date && (
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-seltronik-yellow flex-shrink-0" />
                          <span className="line-clamp-1">Berlaku: {cert.expiry_date}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => setSelectedCertificate(cert)}
                        className="flex-1 bg-seltronik-red text-white py-2 px-2 md:px-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-1 text-xs md:text-sm"
                      >
                        <FaEye className="flex-shrink-0" /> 
                        <span className="hidden sm:inline">Lihat</span>
                      </button>
                      {cert.certificate_url && (
                        <a
                          href={cert.certificate_url}
                          className="flex-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white py-2 px-2 md:px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300 flex items-center justify-center gap-1 text-xs md:text-sm"
                        >
                          <FaDownload className="flex-shrink-0" /> 
                          <span className="hidden sm:inline">Unduh</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatePresence>

          {filteredCertificates.length === 0 && (
            <div className="gsap-fade-up text-center py-12">
              <p className="text-xl md:text-2xl text-gray-400">Tidak ada sertifikat yang ditemukan</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 text-seltronik-red hover:underline"
              >
                Lihat Semua Sertifikat
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="gsap-scale fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 md:p-6 flex justify-between items-start">
                <div className="flex items-center gap-3 flex-1 pr-4">
                  <FaCertificate className="text-seltronik-red text-xl md:text-2xl flex-shrink-0" />
                  <h2 className="text-lg md:text-2xl font-bold text-seltronik-dark dark:text-white line-clamp-2">{selectedCertificate.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white p-2"
                  aria-label="Close modal"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-6">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Certificate Preview */}
                  <div>
                    <div className="h-64 sm:h-80 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center overflow-hidden">
                      {selectedCertificate.image_url ? (
                        <Image 
                          src={selectedCertificate.image_url} 
                          alt={selectedCertificate.name} 
                          className="w-full h-full object-contain" 
                          fill
                        />
                      ) : (
                        <FaCertificate className="text-6xl md:text-8xl text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div>
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Penerbit</h3>
                        <p className="text-base md:text-lg font-medium text-gray-800 dark:text-white flex items-center gap-2">
                          <FaBuilding className="text-seltronik-red flex-shrink-0" />
                          {selectedCertificate.issuer}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tanggal Terbit</h3>
                          <p className="text-base md:text-lg font-medium text-gray-800 dark:text-white">
                            {selectedCertificate.issue_date}
                          </p>
                        </div>
                        {selectedCertificate.expiry_date && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Berlaku Hingga</h3>
                            <p className="text-base md:text-lg font-medium text-gray-800 dark:text-white">
                              {selectedCertificate.expiry_date}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t dark:border-gray-700 space-y-3">
                        {selectedCertificate.certificate_url && (
                          <a
                            href={selectedCertificate.certificate_url}
                            className="w-full bg-seltronik-red text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                          >
                            <FaDownload /> Download PDF
                          </a>
                        )}
                        <button
                          onClick={() => window.print()}
                          className="w-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <FaFileAlt /> Cetak Dokumen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Badges Section */}
      <section className="gsap-fade-up py-12 md:py-16 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="gsap-fade-up text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Standar Kualitas Kami
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Produk kami telah memenuhi berbagai standar nasional dan internasional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="gsap-scale bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 md:p-8 text-center">
              <FaShieldAlt className="text-4xl md:text-6xl text-seltronik-red mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-seltronik-dark dark:text-white mb-2">Quality Assurance</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Sistem manajemen mutu tersertifikasi ISO 9001:2015 untuk menjamin kualitas produk
              </p>
            </div>

            <div className="gsap-scale bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 md:p-8 text-center">
              <FaGlobeAsia className="text-4xl md:text-6xl text-seltronik-yellow mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-seltronik-dark dark:text-white mb-2">Standar Internasional</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Produk memenuhi standar CE Marking dan RoHS untuk pasar global
              </p>
            </div>

            <div className="gsap-scale bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 md:p-8 text-center">
              <FaAward className="text-4xl md:text-6xl text-seltronik-green mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-seltronik-dark dark:text-white mb-2">Penghargaan</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Berbagai penghargaan dari klien dan institusi atas kualitas dan inovasi produk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gsap-fade-up py-12 md:py-16 bg-gradient-to-r from-seltronik-red to-red-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Butuh Dokumen Lengkap?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            Dapatkan akses ke semua dokumen sertifikasi dan legalitas perusahaan kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontak"
              className="bg-white text-seltronik-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Hubungi Kami
            </Link>
            <a
              href="/certificates/company-profile.pdf"
              className="bg-white/20 backdrop-blur text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/50"
            >
              Download Company Profile
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CertificatesPage;