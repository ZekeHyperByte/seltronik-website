import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaDownload, FaEye, FaCheckCircle, FaAward, FaShieldAlt, FaFileAlt, FaGlobeAsia, FaBuilding, FaCalendarAlt, FaQrcode } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

interface Certificate {
  id: number;
  name: string;
  category: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  documentNumber: string;
  description: string;
  image: string;
  pdfUrl: string;
  verified: boolean;
  qrCode?: string;
}

const CertificatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const categories = [
    { id: 'all', name: 'Semua Dokumen' },
    { id: 'business', name: 'Legalitas Usaha' },
    { id: 'quality', name: 'Sertifikat Mutu' },
    { id: 'product', name: 'Sertifikat Produk' },
    { id: 'award', name: 'Penghargaan' }
  ];

  const certificates: Certificate[] = [
    {
      id: 1,
      name: 'NIB (Nomor Induk Berusaha)',
      category: 'business',
      issuer: 'Pemerintah Republik Indonesia',
      issuedDate: '21 Maret 2023',
      documentNumber: '2103230046762',
      description: 'Nomor Induk Berusaha sebagai identitas pelaku usaha yang terintegrasi dengan sistem OSS.',
      image: '/images/certificates/nib.jpg',
      pdfUrl: '/certificates/nib.pdf',
      verified: true
    },
    {
      id: 2,
      name: 'NPWP Perusahaan',
      category: 'business',
      issuer: 'Direktorat Jenderal Pajak',
      issuedDate: '15 Oktober 2000',
      documentNumber: '40.313.195.6-423.000',
      description: 'Nomor Pokok Wajib Pajak PT. Sinyal Elektro Mekanik.',
      image: '/images/certificates/npwp.jpg',
      pdfUrl: '/certificates/npwp.pdf',
      verified: true
    },
    {
      id: 3,
      name: 'ISO 9001:2015',
      category: 'quality',
      issuer: 'International Organization for Standardization',
      issuedDate: '10 Januari 2023',
      expiryDate: '10 Januari 2026',
      documentNumber: 'QMS-2023-001234',
      description: 'Sertifikat Sistem Manajemen Mutu untuk produksi perlengkapan lalu lintas.',
      image: '/images/certificates/iso9001.jpg',
      pdfUrl: '/certificates/iso9001.pdf',
      verified: true
    },
    {
      id: 4,
      name: 'Sertifikat SNI Lampu Jalan LED',
      category: 'product',
      issuer: 'Badan Standardisasi Nasional',
      issuedDate: '27 Maret 2023',
      expiryDate: '27 Maret 2025',
      documentNumber: 'SNI-LED-2023-0456',
      description: 'Sertifikat SNI untuk produk lampu jalan LED seri SL-48A.',
      image: '/images/certificates/sni-led.jpg',
      pdfUrl: '/certificates/sni-led.pdf',
      verified: true
    },
    {
      id: 5,
      name: 'Sertifikat SNI Traffic Light',
      category: 'product',
      issuer: 'Badan Standardisasi Nasional',
      issuedDate: '15 April 2023',
      expiryDate: '15 April 2025',
      documentNumber: 'SNI-TL-2023-0789',
      description: 'Sertifikat SNI untuk produk traffic light 3 aspek LED.',
      image: '/images/certificates/sni-traffic.jpg',
      pdfUrl: '/certificates/sni-traffic.pdf',
      verified: true
    },
    {
      id: 6,
      name: 'CE Marking',
      category: 'quality',
      issuer: 'European Union',
      issuedDate: '5 Februari 2023',
      expiryDate: '5 Februari 2025',
      documentNumber: 'CE-2023-ID-5678',
      description: 'Conformité Européenne marking untuk produk elektronik.',
      image: '/images/certificates/ce-marking.jpg',
      pdfUrl: '/certificates/ce-marking.pdf',
      verified: true
    },
    {
      id: 7,
      name: 'RoHS Compliance',
      category: 'quality',
      issuer: 'TÜV Rheinland',
      issuedDate: '20 Januari 2023',
      expiryDate: '20 Januari 2024',
      documentNumber: 'RoHS-2023-9012',
      description: 'Restriction of Hazardous Substances compliance certificate.',
      image: '/images/certificates/rohs.jpg',
      pdfUrl: '/certificates/rohs.pdf',
      verified: true
    },
    {
      id: 8,
      name: 'Sertifikat Merek Seltronik',
      category: 'business',
      issuer: 'Kementerian Hukum dan HAM',
      issuedDate: '06 April 2023',
      expiryDate: '06 April 2033',
      documentNumber: 'IDM001147825',
      description: 'Sertifikat merek dagang Seltronik Kelas 9 dan 11.',
      image: '/images/certificates/trademark.jpg',
      pdfUrl: '/certificates/trademark.pdf',
      verified: true
    },
    {
      id: 9,
      name: 'Penghargaan Best Vendor 2023',
      category: 'award',
      issuer: 'PT. Jasa Marga (Persero) Tbk',
      issuedDate: '15 Desember 2023',
      documentNumber: 'JM-Award-2023-015',
      description: 'Penghargaan sebagai vendor terbaik kategori perlengkapan jalan.',
      image: '/images/certificates/award-jasamarga.jpg',
      pdfUrl: '/certificates/award-jasamarga.pdf',
      verified: true
    },
    {
      id: 10,
      name: 'Surat Keterangan Domisili',
      category: 'business',
      issuer: 'Pemerintah Kota Bandung',
      issuedDate: '10 Januari 2024',
      expiryDate: '10 Januari 2025',
      documentNumber: 'SKD-2024-00123',
      description: 'Surat keterangan domisili perusahaan di Kota Bandung.',
      image: '/images/certificates/skd.jpg',
      pdfUrl: '/certificates/skd.pdf',
      verified: true
    },
    {
      id: 11,
      name: 'Top Innovation Award 2023',
      category: 'award',
      issuer: 'Kementerian PUPR',
      issuedDate: '28 November 2023',
      documentNumber: 'PUPR-INN-2023-088',
      description: 'Penghargaan inovasi produk smart traffic light system.',
      image: '/images/certificates/innovation-award.jpg',
      pdfUrl: '/certificates/innovation-award.pdf',
      verified: true
    },
    {
      id: 12,
      name: 'Akta Pendirian Perusahaan',
      category: 'business',
      issuer: 'Notaris Drs. Yudi Priadi, S.H.',
      issuedDate: '20 Maret 2023',
      documentNumber: 'No. 06',
      description: 'Akta pendirian PT. Sinyal Elektro Mekanik dan perubahannya.',
      image: '/images/certificates/akta.jpg',
      pdfUrl: '/certificates/akta.pdf',
      verified: true
    }
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
      <section className="bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold font-heading mb-4">Sertifikat & Legalitas</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Komitmen kami terhadap kualitas dan standar tertinggi dibuktikan dengan berbagai sertifikasi resmi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
              >
                <h3 className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
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
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-seltronik-red text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-700 dark:text-white text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
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
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Certificate Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaCertificate className="text-6xl text-gray-300 dark:text-gray-500" />
                    </div>
                    {cert.verified && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                        <FaCheckCircle />
                      </div>
                    )}
                  </div>

                  {/* Certificate Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-2 line-clamp-1">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{cert.issuer}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">No: {cert.documentNumber}</p>
                    
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-seltronik-green" />
                        <span>Terbit: {cert.issuedDate}</span>
                      </div>
                      {cert.expiryDate && (
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-seltronik-yellow" />
                          <span>Berlaku: {cert.expiryDate}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedCertificate(cert)}
                        className="flex-1 bg-seltronik-red text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-1 text-sm"
                      >
                        <FaEye /> Lihat
                      </button>
                      <a
                        href={cert.pdfUrl}
                        className="flex-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300 flex items-center justify-center gap-1 text-sm"
                      >
                        <FaDownload /> Unduh
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
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
                <div className="flex items-center gap-3">
                  <FaCertificate className="text-seltronik-red text-2xl" />
                  <h2 className="text-2xl font-bold text-seltronik-dark dark:text-white">{selectedCertificate.name}</h2>
                  {selectedCertificate.verified && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <FaCheckCircle /> Terverifikasi
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Certificate Preview */}
                  <div>
                    <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                      <FaCertificate className="text-8xl text-gray-300 dark:text-gray-500" />
                    </div>
                    {selectedCertificate.qrCode && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center gap-3">
                        <FaQrcode className="text-3xl text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-white">Verifikasi Online</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Scan QR code untuk verifikasi</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Certificate Details */}
                  <div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Penerbit</h3>
                        <p className="text-lg font-medium text-gray-800 dark:text-white flex items-center gap-2">
                          <FaBuilding className="text-seltronik-red" />
                          {selectedCertificate.issuer}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nomor Dokumen</h3>
                        <p className="text-lg font-medium text-gray-800 dark:text-white flex items-center gap-2">
                          <FaFileAlt className="text-seltronik-yellow" />
                          {selectedCertificate.documentNumber}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tanggal Terbit</h3>
                          <p className="text-lg font-medium text-gray-800 dark:text-white">
                            {selectedCertificate.issuedDate}
                          </p>
                        </div>
                        {selectedCertificate.expiryDate && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Berlaku Hingga</h3>
                            <p className="text-lg font-medium text-gray-800 dark:text-white">
                              {selectedCertificate.expiryDate}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Deskripsi</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {selectedCertificate.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t dark:border-gray-700 space-y-3">
                        <a
                          href={selectedCertificate.pdfUrl}
                          className="w-full bg-seltronik-red text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <FaDownload /> Download PDF
                        </a>
                        <button
                          onClick={() => window.print()}
                          className="w-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <FaFileAlt /> Cetak Dokumen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Badges Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Standar Kualitas Kami
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Produk kami telah memenuhi berbagai standar nasional dan internasional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 text-center"
            >
              <FaShieldAlt className="text-6xl text-seltronik-red mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-seltronik-dark dark:text-white mb-2">Quality Assurance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sistem manajemen mutu tersertifikasi ISO 9001:2015 untuk menjamin kualitas produk
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 text-center"
            >
              <FaGlobeAsia className="text-6xl text-seltronik-yellow mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-seltronik-dark dark:text-white mb-2">Standar Internasional</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Produk memenuhi standar CE Marking dan RoHS untuk pasar global
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 text-center"
            >
              <FaAward className="text-6xl text-seltronik-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-seltronik-dark dark:text-white mb-2">Penghargaan</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Berbagai penghargaan dari klien dan institusi atas kualitas dan inovasi produk
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-seltronik-red to-red-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold font-heading mb-4">
            Butuh Dokumen Lengkap?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Dapatkan akses ke semua dokumen sertifikasi dan legalitas perusahaan kami
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontak"
              className="bg-white text-seltronik-dark px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Hubungi Kami
            </Link>
            <a
              href="/certificates/company-profile.pdf"
              className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/50"
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
