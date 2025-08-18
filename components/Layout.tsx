import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn, FaChevronUp, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Produk', href: '/produk' },
    { name: 'Proyek', href: '/project' },
    { name: 'Sertifikat', href: '/sertifikat' },
    { name: 'Kontak', href: '/kontak' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-seltronik-dark">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-seltronik-dark/80 backdrop-blur-sm shadow-lg py-2' : 'bg-white/95 dark:bg-seltronik-dark/95 backdrop-blur-sm py-4'
      }`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/seltroniklogo.svg"
                alt="Seltronik Logo"
                width={48}
                height={48}
              />
              <div>
                <h1 className="text-2xl font-bold font-heading text-seltronik-dark dark:text-white">Seltronik</h1>
                <p className="text-xs text-seltronik-gray dark:text-gray-400">PT. Sinyal Elektro Mekanik</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-seltronik-dark dark:text-white hover:text-seltronik-red dark:hover:text-seltronik-yellow transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/kontak"
                className="bg-seltronik-red text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Hubungi Kami
              </Link>
              <button onClick={toggleTheme} className="ml-4 text-seltronik-dark dark:text-white">
                {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-seltronik-dark dark:text-white p-2"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-seltronik-dark border-t dark:border-gray-700"
            >
              <div className="container mx-auto px-4 py-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-3 text-seltronik-dark dark:text-white hover:text-seltronik-red dark:hover:text-seltronik-yellow transition-colors duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/kontak"
                  className="inline-block mt-4 bg-seltronik-red text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hubungi Kami
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-seltronik-dark text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/seltroniklogo.svg"
                  alt="Seltronik Logo"
                  width={40}
                  height={40}
                />
                <h3 className="text-xl font-bold font-heading">Seltronik</h3>
              </div>
              <p className="text-gray-400 mb-4">
                PT. Sinyal Elektro Mekanik - Produsen perlengkapan dan rambu-rambu jalan terpercaya di Indonesia.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-seltronik-red transition-colors duration-300">
                  <FaFacebookF />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-seltronik-red transition-colors duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-seltronik-red transition-colors duration-300">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Menu Cepat</h3>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Produk Kami</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/produk/lampu-penyebrangan" className="hover:text-white transition-colors duration-300">Lampu Penyebrangan</Link></li>
                <li><Link href="/produk/warning-light" className="hover:text-white transition-colors duration-300">Warning Light</Link></li>
                <li><Link href="/produk/traffic-light" className="hover:text-white transition-colors duration-300">Traffic Light</Link></li>
                <li><Link href="/produk/lampu-jalan" className="hover:text-white transition-colors duration-300">Lampu Jalan LED</Link></li>
                <li><Link href="/produk/controller" className="hover:text-white transition-colors duration-300">Controller System</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Kontak</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <p>Jl. PHH. Mustofa No.39 Kompleks Ruko Surapati Core Blok M 30, Bandung, Jawa Barat</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone />
                  <a href="tel:+622187241364" className="hover:text-white transition-colors duration-300">022-87241364</a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope />
                  <a href="mailto:sinyalektronik@outlook.com" className="hover:text-white transition-colors duration-300">sinyalektronik@outlook.com</a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaWhatsapp />
                  <a href="https://wa.me/628112345678" className="hover:text-white transition-colors duration-300">+62 811-2345-678</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PT. Sinyal Elektro Mekanik. All rights reserved.</p>
            <p className="text-sm mt-2">NIB: 2103230046762 | NPWP: 40.313.195.6-423.000</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-seltronik-red text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors duration-300 z-40"
          >
            <FaChevronUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/628112345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 z-40 animate-float"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
};

export default Layout;
