import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FaCertificate, FaCheckCircle, FaAward, FaShieldAlt, FaGlobeAsia, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';
import useGSAPAnimations from '../hooks/useGSAP';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date: string;
  certificate_url: string;
  description: string;
}

const CertificatesPage = () => {
  // Apply GSAP animations
  useGSAPAnimations();

  // Hardcoded certification data
  const certificates: Certificate[] = [
    {
      id: 1,
      name: 'ISO 9001:2015',
      issuer: 'International Organization for Standardization',
      issue_date: '2023-01-15',
      expiry_date: '2026-01-15',
      certificate_url: '/certificates/iso.pdf',
      description: 'Sistem Manajemen Mutu'
    },
    {
      id: 2,
      name: 'SNI',
      issuer: 'Badan Standardisasi Nasional',
      issue_date: '2023-06-20',
      expiry_date: '2026-06-20',
      certificate_url: '/certificates/sni.pdf',
      description: 'Standar Nasional Indonesia'
    },
    {
      id: 3,
      name: 'TKDN',
      issuer: 'Kementerian Perindustrian RI',
      issue_date: '2023-09-10',
      expiry_date: '2025-09-10',
      certificate_url: '/certificates/tkdn.pdf',
      description: 'Tingkat Komponen Dalam Negeri'
    }
  ];

  const stats = [
    { label: 'Sertifikat Aktif', value: '3', color: 'text-seltronik-green' },
    { label: 'Standar Internasional', value: '1', color: 'text-seltronik-yellow' },
    { label: 'Standar Nasional', value: '2', color: 'text-seltronik-red' },
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


      {/* Certificates Grid */}
      <section className="gsap-fade-up py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {certificates.map((cert) => (
              <a
                key={cert.id}
                href={cert.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="gsap-card h-full bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer p-6 md:p-8"
                  style={{ willChange: 'transform' }}
                >
                  {/* Certificate Icon */}
                  <div className="flex justify-center mb-6">
                    <FaCertificate className="text-5xl md:text-6xl text-seltronik-red group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Certificate Name */}
                  <h3 className="text-xl md:text-2xl font-bold text-seltronik-dark dark:text-white mb-3 text-center">
                    {cert.name}
                  </h3>

                  {/* Issuer */}
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 text-center line-clamp-2">
                    {cert.issuer}
                  </p>

                  {/* Dates */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex items-center justify-center gap-2">
                      <FaCalendarAlt className="text-seltronik-green flex-shrink-0" />
                      <span>Terbit: {cert.issue_date}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FaCalendarAlt className="text-seltronik-yellow flex-shrink-0" />
                      <span>Berlaku: {cert.expiry_date}</span>
                    </div>
                  </div>

                  {/* Click Hint */}
                  <div className="text-center text-xs md:text-sm text-seltronik-red font-semibold group-hover:underline">
                    Klik untuk membuka PDF
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </section>


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
      <section className="gsap-fade-up py-12 md:py-16 bg-gradient-to-r from-seltronik-red to-seltronik-red-hover">
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