import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FaCertificate, FaCalendarAlt } from 'react-icons/fa';
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

  return (
    <Layout>
      <Head>
        <title>Sertifikat & Legalitas - Seltronik</title>
        <meta name="description" content="Sertifikat dan legalitas PT. Sinyal Elektro Mekanik" />
      </Head>
      
      {/* Hero Section */}
      <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20 laptop:py-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl laptop:text-3xl font-bold font-heading mb-4 laptop:mb-2">Sertifikat & Legalitas</h1>
            <p className="text-lg md:text-xl laptop:text-base text-gray-300 max-w-3xl mx-auto">
              Komitmen kami terhadap kualitas dan standar tertinggi dibuktikan dengan berbagai sertifikasi resmi
            </p>
          </div>
        </div>
      </section>



      {/* Certificates Grid */}
      <section className="gsap-fade-up py-12 md:py-16 laptop:py-8 bg-white dark:bg-gray-800">
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
                  className="gsap-card h-full bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer p-6 md:p-8 laptop:p-4"
                  style={{ willChange: 'transform' }}
                >
                  {/* Certificate Icon */}
                  <div className="flex justify-center mb-6">
                    <FaCertificate className="text-5xl md:text-6xl laptop:text-4xl text-seltronik-red group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Certificate Name */}
                  <h3 className="text-xl md:text-2xl laptop:text-base font-bold text-seltronik-dark dark:text-white mb-3 text-center">
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



      {/* CTA Section */}
      <section className="gsap-fade-up py-12 md:py-16 laptop:py-8 bg-gradient-to-r from-seltronik-red to-seltronik-red-hover">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl laptop:text-2xl font-bold font-heading mb-4 laptop:mb-2">
            Butuh Dokumen Lengkap?
          </h2>
          <p className="text-lg md:text-xl laptop:text-base mb-6 md:mb-8 laptop:mb-2 max-w-3xl mx-auto">
            Dapatkan akses ke semua dokumen sertifikasi dan legalitas perusahaan kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontak"
              className="bg-white text-seltronik-dark px-6 md:px-8 laptop:px-5 py-3 md:py-4 laptop:py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl laptop:text-sm"
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