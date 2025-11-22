import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FaHistory, FaEye, FaBullseye, FaAward, FaUsers, FaHandshake, FaCertificate, FaCheckCircle, FaGlobeAsia, FaIndustry, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import AnimatedLogo from '../components/AnimatedLogo';
import useGSAPAnimations from '../hooks/useGSAP';

const AboutPage = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  // Apply GSAP animations
  useGSAPAnimations();

  const timeline = [
    {
      year: '2000',
      title: 'Pendirian Perusahaan',
      description: 'PT. Sinyal Elektro Mekanik didirikan dengan fokus pada produksi perlengkapan lalu lintas'
    },
    {
      year: '2005',
      title: 'Ekspansi Produk',
      description: 'Mulai memproduksi lampu jalan LED dan sistem kontrol traffic light'
    },
    {
      year: '2010',
      title: 'Sertifikasi ISO',
      description: 'Mendapatkan sertifikasi ISO 9001:2008 untuk sistem manajemen kualitas'
    },
    {
      year: '2015',
      title: 'Teknologi Solar',
      description: 'Mengembangkan produk dengan teknologi solar cell untuk efisiensi energi'
    },
    {
      year: '2020',
      title: 'Smart City Solution',
      description: 'Meluncurkan solusi terintegrasi untuk mendukung program Smart City'
    },
    {
      year: '2023',
      title: 'Inovasi IoT',
      description: 'Implementasi teknologi IoT untuk monitoring dan kontrol jarak jauh'
    }
  ];

  const values = [
    {
      icon: <FaShieldAlt />,
      title: 'Integritas',
      description: 'Berkomitmen pada kejujuran dan etika bisnis tertinggi'
    },
    {
      icon: <FaChartLine />,
      title: 'Inovasi',
      description: 'Terus berinovasi untuk memberikan solusi terbaik'
    },
    {
      icon: <FaUsers />,
      title: 'Kolaborasi',
      description: 'Bekerja sama dengan semua stakeholder untuk kesuksesan bersama'
    },
    {
      icon: <FaAward />,
      title: 'Kualitas',
      description: 'Mengutamakan kualitas dalam setiap produk dan layanan'
    }
  ];

  const certifications = [
    {
      name: 'ISO 9001:2015',
      description: 'Sistem Manajemen Mutu',
      icon: <FaCertificate />
    },
    {
      name: 'SNI',
      description: 'Standar Nasional Indonesia',
      icon: <FaCertificate />
    },
    {
      name: 'CE Marking',
      description: 'Conformité Européenne',
      icon: <FaCertificate />
    },
    {
      name: 'RoHS',
      description: 'Restriction of Hazardous Substances',
      icon: <FaCertificate />
    }
  ];

  const team = [
    {
      name: 'Ir. Ahmad Suryadi',
      position: 'Direktur Utama',
      experience: '25+ tahun'
    },
    {
      name: 'Dr. Budi Santoso',
      position: 'Direktur Teknis',
      experience: '20+ tahun'
    },
    {
      name: 'Siti Nurjanah, MBA',
      position: 'Direktur Operasional',
      experience: '18+ tahun'
    },
    {
      name: 'Drs. Hendra Wijaya',
      position: 'Direktur Keuangan',
      experience: '22+ tahun'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">Tentang Seltronik</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Lebih dari 23 tahun berkontribusi dalam pembangunan infrastruktur lalu lintas Indonesia
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="gsap-fade-up py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="gsap-fade-up order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4 md:mb-6">
                PT. Sinyal Elektro Mekanik
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base lg:text-lg leading-relaxed">
                PT. Sinyal Elektro Mekanik (Seltronik) merupakan perusahaan yang bergerak di bidang elektronik 
                mekanikal yang berkaitan dengan perlengkapan dan rambu-rambu jalan. Didirikan pada tahun 2000, 
                kami telah menjadi mitra terpercaya pemerintah dan swasta dalam menyediakan solusi infrastruktur 
                lalu lintas berkualitas tinggi.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base lg:text-lg leading-relaxed">
                Dengan dukungan tim ahli berpengalaman dan teknologi modern, kami berkomitmen untuk terus 
                berinovasi dalam menghadirkan produk-produk yang tidak hanya memenuhi standar nasional, 
                tetapi juga standar internasional.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-1">
                    <CountUp end={23} duration={2} />+
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Tahun Pengalaman</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-1">
                    <CountUp end={50} duration={2} />+
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Tim Profesional</p>
                </div>
              </div>
            </div>

            <div className="gsap-scale relative flex items-center justify-center order-1 lg:order-2">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                <AnimatedLogo interactive={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="gsap-fade-up py-12 md:py-16 bg-gray-50 dark:bg-seltronik-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="gsap-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-seltronik-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEye className="text-seltronik-red text-xl md:text-2xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-seltronik-dark dark:text-white">Visi</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                Membangun negeri dengan berinovasi dibidang elektronik perlengkapan & rambu-rambu jalan 
                yang siap bersaing di skala nasional & internasional.
              </p>
            </div>

            <div className="gsap-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-seltronik-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaBullseye className="text-seltronik-yellow text-xl md:text-2xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-seltronik-dark dark:text-white">Misi</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-seltronik-green mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Memberikan produk inovasi tinggi di bidangnya</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-seltronik-green mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Memprioritaskan kualitas guna meningkatkan penjualan produk</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-seltronik-green mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Menyediakan alat produksi teknologi tinggi untuk menjaga kepercayaan mitra perusahaan</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-seltronik-green mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Menjalin kerjasama dengan pihak terkait baik instansi pemerintah maupun swasta</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="gsap-fade-up py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="gsap-fade-up text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Nilai-Nilai Perusahaan
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Prinsip yang menjadi fondasi dalam setiap langkah kami
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="gsap-scale text-center"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-seltronik-red to-seltronik-yellow rounded-full flex items-center justify-center text-white text-2xl md:text-3xl mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-seltronik-dark dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="gsap-fade-up py-12 md:py-16 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="gsap-fade-up text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Perjalanan Kami
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Milestone penting dalam sejarah PT. Sinyal Elektro Mekanik
            </p>
          </div>

          <div className="relative">
            {/* Vertical line for desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300 dark:bg-gray-700"></div>
            
            {timeline.map((item, index) => (
              <div
                key={index}
                className="gsap-card relative mb-8 md:mb-12"
              >
                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 md:p-6 ml-8 relative">
                    <div className="absolute -left-4 top-6 w-6 h-6 bg-seltronik-red rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                    <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2">{item.year}</h3>
                    <h4 className="text-lg md:text-xl font-semibold text-seltronik-dark dark:text-white mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{item.description}</p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className={`hidden lg:flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  <div className="w-full lg:w-5/12">
                    <div className={`bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 ${
                      index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                    }`}>
                      <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{item.year}</h3>
                      <h4 className="text-xl font-semibold text-seltronik-dark dark:text-white mb-2">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex w-2/12 justify-center">
                    <div className="w-6 h-6 bg-seltronik-red rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="gsap-fade-up py-12 md:py-16 bg-seltronik-dark">
        <div className="container mx-auto px-4">
          <div className="gsap-fade-up text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
              Sertifikasi & Penghargaan
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Komitmen kami terhadap kualitas dan standar internasional
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="gsap-scale bg-white/10 backdrop-blur rounded-xl p-4 md:p-6 text-center hover:bg-white/20 transition-colors duration-300 hover:scale-105"
              >
                <div className="text-seltronik-yellow text-3xl md:text-4xl mb-4 flex justify-center">
                  {cert.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-gray-300 text-xs md:text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="gsap-fade-up py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="gsap-fade-up text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
              Tim Kepemimpinan
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dipimpin oleh profesional berpengalaman di bidangnya
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="gsap-card text-center"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg md:text-xl font-bold text-seltronik-dark dark:text-white">{member.name}</h3>
                <p className="text-seltronik-red font-medium text-sm md:text-base">{member.position}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section ref={ref} className="gsap-fade-up py-12 md:py-16 bg-gradient-to-r from-seltronik-red via-seltronik-red-hover to-seltronik-red">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-white text-center">
            <div className="gsap-scale">
              <FaIndustry className="text-3xl md:text-5xl mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {inView && <CountUp end={3} duration={2.5} />}
              </h3>
              <p className="text-sm sm:text-base md:text-xl">Pabrik Produksi</p>
            </div>
            <div className="gsap-scale">
              <FaUsers className="text-3xl md:text-5xl mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {inView && <CountUp end={150} duration={2.5} />}+
              </h3>
              <p className="text-sm sm:text-base md:text-xl">Karyawan</p>
            </div>
            <div className="gsap-scale">
              <FaGlobeAsia className="text-3xl md:text-5xl mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {inView && <CountUp end={34} duration={2.5} />}
              </h3>
              <p className="text-sm sm:text-base md:text-xl">Provinsi Terjangkau</p>
            </div>
            <div className="gsap-scale">
              <FaHandshake className="text-3xl md:text-5xl mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {inView && <CountUp end={500} duration={2.5} />}+
              </h3>
              <p className="text-sm sm:text-base md:text-xl">Mitra Bisnis</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gsap-fade-up py-12 md:py-16 bg-gradient-to-br from-seltronik-dark to-gray-900">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Mari Berkolaborasi Bersama Kami
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8">
            Wujudkan infrastruktur lalu lintas yang modern, aman, dan efisien untuk Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/produk"
              className="bg-seltronik-red text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Lihat Produk Kami
            </Link>
            <Link
              href="/kontak"
              className="bg-white/10 backdrop-blur text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;