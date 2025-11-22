import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn, FaChevronUp, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    console.log('Menu state changed:', isMenuOpen);
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActiveRoute = (href: string) => {
    return router.pathname === href;
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
    <div className="min-h-screen">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-seltronik-dark/90 backdrop-blur-md shadow-lg py-2' : 'bg-white/95 dark:bg-seltronik-dark/95 backdrop-blur-sm py-3 md:py-4'
      }`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/images/seltroniklogo.svg"
                  alt="Seltronik Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-2xl font-bold font-heading text-black dark:text-white leading-tight">
                  Seltronik
                </h1>
                <p className="text-xs text-seltronik-gray dark:text-gray-400 leading-tight">
                  PT. Sinyal Elektro Mekanik
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <div className="flex items-center space-x-6 xl:space-x-8 relative">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative py-2 text-sm xl:text-base font-medium transition-colors duration-300 ${
                      isActiveRoute(item.href)
                        ? 'text-seltronik-red dark:text-white'
                        : 'text-seltronik-dark dark:text-white hover:text-seltronik-red dark:hover:text-seltronik-red-hover'
                    }`}
                  >
                    {item.name}
                    {isActiveRoute(item.href) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-seltronik-red rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    )}
                  </Link>
                ))}
              </div>
              <Link
                href="/kontak"
                className="bg-seltronik-red text-white px-4 xl:px-6 py-2 xl:py-3 rounded-full hover:bg-seltronik-red-hover transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm xl:text-base"
              >
                Hubungi Kami
              </Link>
              <button 
                onClick={toggleTheme} 
                className="ml-2 xl:ml-4 p-2 text-seltronik-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              <button 
                onClick={toggleTheme} 
                className="p-2 text-seltronik-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
              </button>
              <button
                onClick={() => {
                  console.log('Menu button clicked, current state:', isMenuOpen);
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="p-2 text-seltronik-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </motion.div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 md:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-seltronik-dark text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/seltroniklogo.svg"
                    alt="Seltronik Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Seltronik</h3>
              </div>
              <p className="text-gray-400 mb-4 text-sm md:text-base leading-relaxed">
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
              <h3 className="text-lg md:text-xl font-bold font-heading mb-4">Menu Cepat</h3>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg md:text-xl font-bold font-heading mb-4">Produk Kami</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link href="/produk" className="hover:text-white transition-colors duration-300">Lampu Penyebrangan</Link></li>
                <li><Link href="/produk" className="hover:text-white transition-colors duration-300">Warning Light</Link></li>
                <li><Link href="/produk" className="hover:text-white transition-colors duration-300">Traffic Light</Link></li>
                <li><Link href="/produk" className="hover:text-white transition-colors duration-300">Lampu Jalan LED</Link></li>
                <li><Link href="/produk" className="hover:text-white transition-colors duration-300">Controller System</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg md:text-xl font-bold font-heading mb-4">Kontak</h3>
              <div className="space-y-3 text-gray-400 text-sm md:text-base">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <p className="leading-relaxed">Jl. PHH. Mustofa No.39 Kompleks Ruko Surapati Core Blok M 30, Bandung, Jawa Barat</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="flex-shrink-0" />
                  <a href="tel:+622287241364" className="hover:text-white transition-colors duration-300">022-87241364</a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="flex-shrink-0" />
                  <a href="mailto:sinyalektronik@outlook.com" className="hover:text-white transition-colors duration-300 break-all">sinyalektronik@outlook.com</a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaWhatsapp className="flex-shrink-0" />
                  <a href="https://wa.me/628112345678" className="hover:text-white transition-colors duration-300">+62 811-2345-678</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-8 pt-6 md:pt-8 text-center text-gray-400">
            <p className="text-sm md:text-base">&copy; 2024 PT. Sinyal Elektro Mekanik. All rights reserved.</p>
            <p className="text-xs md:text-sm mt-2">NIB: 2103230046762 | NPWP: 40.313.195.6-423.000</p>
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
            className="fixed bottom-4 md:bottom-8 right-4 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-seltronik-red text-white rounded-full flex items-center justify-center shadow-lg hover:bg-seltronik-red-hover transition-colors duration-300 z-40"
            aria-label="Scroll to top"
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
        className="fixed bottom-4 md:bottom-8 left-4 md:left-8 w-12 h-12 md:w-14 md:h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 z-40 animate-float"
        aria-label="Chat WhatsApp"
      >
        <FaWhatsapp size={24} className="md:text-2xl" />
      </a>

      {/* Mobile Menu - Rendered at root level */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-[10000]"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <div
              id="mobile-menu"
              className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-seltronik-dark shadow-2xl z-[10001] overflow-y-auto"
              role="navigation"
              aria-label="Mobile menu"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src="/images/seltroniklogo.svg"
                        alt="Seltronik Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h2 className="text-xl font-bold text-black dark:text-white">
                      Seltronik
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white rounded-lg"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2 mb-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block py-3 px-4 rounded-lg transition-colors duration-300 font-medium ${
                        isActiveRoute(item.href)
                          ? 'bg-seltronik-red/10 text-seltronik-red dark:bg-seltronik-red/20 dark:text-white border-l-4 border-seltronik-red'
                          : 'text-seltronik-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* CTA Button */}
                <Link
                  href="/kontak"
                  className="block w-full text-center bg-seltronik-red text-white py-3 px-4 rounded-lg hover:bg-seltronik-red-hover transition-colors duration-300 font-medium mb-8"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hubungi Kami
                </Link>

                {/* Contact Info */}
                <div className="border-t dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-seltronik-dark dark:text-white mb-4">
                    Kontak Cepat
                  </h3>
                  <div className="space-y-3 text-sm">
                    <a
                      href="tel:+622287241364"
                      className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-seltronik-red dark:hover:text-seltronik-red-hover transition-colors"
                    >
                      <FaPhone className="flex-shrink-0" />
                      <span>022-87241364</span>
                    </a>
                    <a
                      href="mailto:sinyalektronik@outlook.com"
                      className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-seltronik-red dark:hover:text-seltronik-red-hover transition-colors"
                    >
                      <FaEnvelope className="flex-shrink-0" />
                      <span>sinyalektronik@outlook.com</span>
                    </a>
                    <a
                      href="https://wa.me/628112345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
                    >
                      <FaWhatsapp className="flex-shrink-0" />
                      <span>+62 811-2345-678</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;