import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import SearchInput from '../components/SearchInput';
import OptimizedImage from '../components/OptimizedImage';
import { GridSkeleton, ErrorState, EmptyState } from '../components/Loading';
import { useSearch } from '../hooks/useSearch';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useAuth } from '../hooks/useAuth';
import { imageSizes, imageQuality, generateBlurDataURL } from '../lib/imageOptimization';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaDownload, FaWhatsapp, FaEye, FaCheckCircle, 
  FaBolt, FaLock, FaTimes, FaTh, FaList, FaArrowRight, FaArrowLeft,
  FaUserPlus, FaSignInAlt, FaLightbulb, FaExclamationTriangle,
  FaRoad, FaTrafficLight, FaWalking, FaSun
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { productService, categoryService, Product, Category } from '../lib/supabase';
import useGSAPAnimations from '../hooks/useGSAP';
import ProductCard from '../components/products/ProductCard';

// Category icon mapping
const categoryIcons: { [key: string]: React.ReactNode } = {
  pedestrian: <FaWalking className="text-4xl md:text-5xl" />,
  warning: <FaExclamationTriangle className="text-4xl md:text-5xl" />,
  traffic: <FaTrafficLight className="text-4xl md:text-5xl" />,
  street: <FaRoad className="text-4xl md:text-5xl" />,
};

// Fallback categories if database is not available
const fallbackCategories: Category[] = [
  {
    id: 'pedestrian',
    name: 'Lampu Penyebrangan',
    description: 'Sistem lampu penyebrangan pejalan kaki dengan teknologi terkini. Dilengkapi dengan countdown timer, audio warning, dan touchless button untuk keselamatan maksimal.',
    thumbnail_image: '/images/categories/PEDESTRIAN CROSSING SXC.jpg',
    display_order: 1,
    is_active: true,
  },
  {
    id: 'traffic',
    name: 'Traffic Light',
    description: 'Lampu lalu lintas LED dengan kualitas terbaik. Tersedia dalam berbagai konfigurasi dan ukuran.',
    thumbnail_image: '/images/categories/TRAFFIC LIGHT.jpg',
    display_order: 2,
    is_active: true,
  },
  {
    id: 'street',
    name: 'Alat Penerangan Jalan',
    description: 'Lampu jalan LED hemat energi dengan berbagai wattage. Desain modern, tahan cuaca, dan mudah perawatan.',
    thumbnail_image: '/images/categories/ALAT PENERANGAN JALAN.jpg',
    display_order: 3,
    is_active: true,
  },
  {
    id: 'warning',
    name: 'Warning Light',
    description: 'Lampu peringatan tenaga surya dan listrik untuk berbagai aplikasi. Ideal untuk area konstruksi dan titik rawan kecelakaan.',
    thumbnail_image: '/images/categories/WARNING LIGHT.jpg',
    display_order: 4,
    is_active: true,
  },
];

const ProductsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [activeCategoryDetails, setActiveCategoryDetails] = useState<Category | null>(null);

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
    items: products,
    searchFields: ['name', 'description'],
    debounceMs: 300,
    maxSuggestions: 5
  });

  // Apply GSAP animations
  useGSAPAnimations();

  // Error handling
  const { handleApiError, withErrorHandling } = useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch categories
        const categoriesData = await categoryService.getAll();
        // If no categories returned, use fallback
        if (!categoriesData || categoriesData.length === 0) {
          setCategories(fallbackCategories);
        } else {
          setCategories(categoriesData);
        }
        
        // Fetch products if authenticated
        if (isAuthenticated) {
          const productsData = await productService.getProductsForUser(user?.id);
          setProducts(productsData || []);
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        // Use fallback categories on error
        setCategories(fallbackCategories);
        // Only show error if authenticated (for products)
        if (isAuthenticated) {
          setError('Gagal memuat data produk. Silakan coba lagi.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, isAuthenticated]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleCategoryClick = (category: Category) => {
    if (isAuthenticated) {
      // If authenticated, filter products by category
      setSelectedCategory(category.id);
    } else {
      // If not authenticated, show category details modal
      setActiveCategoryDetails(category);
      setShowCategoryModal(true);
    }
  };

  // Apply category filter to search results
  const filteredProducts = searchResults.filter(product => {
    return selectedCategory === 'all' || product.category === selectedCategory;
  });

  // Category view for non-authenticated users
  const CategoryView = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-16 md:py-24 lg:py-32 laptop:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl laptop:text-4xl font-bold font-heading mb-6 laptop:mb-4">
                Produk Kami
              </h1>
              <p className="text-lg md:text-xl laptop:text-base text-gray-300 max-w-2xl mx-auto mb-8 laptop:mb-3">
                Solusi lengkap untuk kebutuhan infrastruktur lalu lintas dengan teknologi terkini dan kualitas terjamin
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="gsap-fade-up py-12 md:py-20 laptop:py-8 bg-gray-50 dark:bg-seltronik-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 laptop:mb-3">
            <h2 className="text-2xl md:text-3xl laptop:text-2xl font-bold text-seltronik-dark dark:text-white mb-4 laptop:mb-3">
              Jelajahi Kategori Produk
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Pilih kategori untuk melihat deskripsi produk kami. 
              <span className="text-seltronik-red font-semibold"> Daftar sebagai customer </span> 
              untuk melihat detail lengkap dan spesifikasi produk.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="relative h-96 laptop:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Maroon Theme Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-seltronik-red via-seltronik-red-hover to-seltronik-dark">
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:20px_20px]" />
                      {/* Gradient Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-500" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="mb-4 text-seltronik-yellow">
                          {categoryIcons[category.id] || <FaLightbulb className="text-4xl md:text-5xl" />}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-300 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {category.description.substring(0, 100)}...
                        </p>
                        <div className="flex items-center text-seltronik-yellow font-semibold">
                          <span className="text-sm">Lihat Detail</span>
                          <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Lock Badge */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <FaLock className="text-white text-sm" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="gsap-fade-up py-16 md:py-20 laptop:py-8 bg-gradient-to-r from-seltronik-red to-seltronik-red-hover">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl lg:text-4xl laptop:text-2xl font-bold font-heading mb-4 laptop:mb-3">
              Ingin Melihat Detail Produk Lengkap?
            </h2>
            <p className="text-lg md:text-xl laptop:text-base mb-8 laptop:mb-3 opacity-90">
              Daftar gratis sebagai customer untuk mendapatkan akses penuh ke katalog produk, spesifikasi teknis, dan penawaran harga.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-seltronik-red px-8 laptop:px-5 py-4 laptop:py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl laptop:text-sm"
              >
                <FaUserPlus /> Daftar sebagai Customer
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur text-white px-8 laptop:px-5 py-4 laptop:py-2 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/50 laptop:text-sm"
              >
                <FaSignInAlt /> Sudah Punya Akun?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="gsap-fade-up py-16 md:py-20 laptop:py-8 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 laptop:mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-seltronik-dark dark:text-white mb-4">
              Keuntungan Menjadi Customer
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <FaEye className="text-3xl" />,
                title: 'Lihat Produk Lengkap',
                description: 'Akses gambar produk asli, spesifikasi detail, dan fitur lengkap'
              },
              {
                icon: <FaDownload className="text-3xl" />,
                title: 'Download Katalog',
                description: 'Unduh katalog produk dalam format PDF untuk referensi offline'
              },
              {
                icon: <FaWhatsapp className="text-3xl" />,
                title: 'Kontak Langsung',
                description: 'Hubungi tim sales kami untuk konsultasi dan penawaran harga'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-seltronik-red/10 rounded-full flex items-center justify-center text-seltronik-red mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Detail Modal */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title={activeCategoryDetails?.name || ''}
        subtitle="Daftar sebagai customer untuk melihat produk lengkap"
        enableAnimation={true}
      >
        {activeCategoryDetails && (
          <div className="space-y-6">
            {/* Category Header with Maroon Theme */}
            <div className="relative h-48 md:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-seltronik-red via-seltronik-red-hover to-seltronik-dark">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:20px_20px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-seltronik-yellow mb-2">
                  {categoryIcons[activeCategoryDetails.id] || <FaLightbulb className="text-3xl" />}
                </div>
                <h3 className="text-2xl font-bold">{activeCategoryDetails.name}</h3>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-bold text-seltronik-dark dark:text-white mb-3">Deskripsi</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {activeCategoryDetails.description}
              </p>
            </div>

            {/* Locked Content Notice */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FaLock className="text-amber-500 mt-1" />
                <div>
                  <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1">
                    Konten Terkunci
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Daftar sebagai customer untuk melihat daftar produk lengkap, spesifikasi teknis, 
                    dan mengunduh katalog produk.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/auth/register"
                className="flex-1 bg-seltronik-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-seltronik-red-hover transition-colors text-center flex items-center justify-center gap-2"
              >
                <FaUserPlus /> Daftar Sekarang
              </Link>
              <Link
                href="/auth/login"
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center flex items-center justify-center gap-2"
              >
                <FaSignInAlt /> Login
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );

  // Full product view for authenticated users
  const ProductView = () => (
    <div>
      {/* Hero Section */}
      <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20 laptop:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl laptop:text-3xl font-bold font-heading mb-4 laptop:mb-3">Produk Kami</h1>
            <p className="text-lg md:text-xl laptop:text-base text-gray-300 max-w-3xl mx-auto">
              Solusi lengkap untuk kebutuhan infrastruktur lalu lintas dengan teknologi terkini dan kualitas terjamin
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="gsap-fade-up bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-14 md:top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            {/* Search Bar and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Enhanced Search Bar */}
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={clearSearch}
                suggestions={suggestions}
                isSearching={isSearching}
                placeholder="Cari produk..."
                className="flex-1"
                showSuggestions={true}
              />

              {/* View Mode Toggle - Hidden on mobile */}
              <div className="hidden sm:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-600 text-seltronik-red shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  aria-label="Grid view"
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-600 text-seltronik-red shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  aria-label="List view"
                >
                  <FaList />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex gap-2 min-w-max">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 text-sm ${
                    selectedCategory === 'all'
                      ? 'bg-seltronik-red text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Semua Produk
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 text-sm ${
                      selectedCategory === category.id
                        ? 'bg-seltronik-red text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="gsap-fade-up py-8 md:py-12 laptop:py-8 bg-gray-50 dark:bg-seltronik-dark">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {isLoading && (
            <GridSkeleton 
              count={8} 
              viewMode={viewMode}
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm + viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className={
                  viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                    : "space-y-4 md:space-y-6"
                }
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onClick={() => setSelectedProduct(product)}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredProducts.length === 0 && (
            <EmptyState
              title="Tidak ada produk ditemukan"
              message="Produk yang Anda cari tidak ditemukan. Coba ubah filter atau kata kunci pencarian."
              onReset={() => {
                setSelectedCategory('all');
                clearSearch();
              }}
              resetLabel="Reset Filter"
              icon="🔍"
            />
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name || ''}
        subtitle="Klik di luar area ini, tekan ESC, atau klik X untuk menutup"
        enableAnimation={true}
      >
        {selectedProduct && (
          <div className="space-y-6">
            {/* Top Section: Image + Features */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Image - Left */}
              <div className="h-64 md:h-80 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden relative group cursor-pointer">
                {selectedProduct.image && (
                  <OptimizedImage 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
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
                  onClick={() => setSelectedProduct(null)}
                >
                  <div className="bg-black/50 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm">
                    Klik untuk menutup
                  </div>
                </div>
              </div>

              {/* Features - Right */}
              <div className="flex flex-col justify-between">
                {/* Description */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">{selectedProduct.description}</p>
                </div>

                {/* Features */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-4 flex items-center gap-2">
                    <FaCheckCircle className="text-seltronik-green" />
                    Fitur Unggulan
                  </h3>
                  <div className="space-y-3">
                    {selectedProduct.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-seltronik-green">
                        <FaCheckCircle className="text-seltronik-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Specifications - Full Width */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-4 flex items-center gap-2">
                <FaBolt className="text-seltronik-red" />
                Spesifikasi Teknis
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-600">
                      <dt className="text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-wide mb-1">
                        {key.replace('_', ' ')}
                      </dt>
                      <dd className="text-gray-900 dark:text-white text-sm md:text-base font-semibold">
                        {value}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href={`https://wa.me/628112345678?text=Saya tertarik dengan produk ${selectedProduct.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 text-white px-4 md:px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaWhatsapp className="text-lg" /> Konsultasi via WhatsApp
              </a>
              {selectedProduct.catalog_url && (
                <a
                  href={selectedProduct.catalog_url}
                  className="flex-1 bg-seltronik-red text-white px-4 md:px-6 py-3 rounded-lg hover:bg-seltronik-red-hover transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaDownload className="text-lg" /> Download Katalog
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* CTA Section */}
      <section className="gsap-scale py-12 md:py-16 laptop:py-8 bg-gradient-to-r from-seltronik-red via-seltronik-red-hover to-seltronik-red">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl laptop:text-base font-bold font-heading mb-4 laptop:mb-3">
            Butuh Konsultasi Produk?
          </h2>
          <p className="text-lg md:text-xl laptop:text-base mb-6 md:mb-8 laptop:mb-3 max-w-2xl mx-auto">
            Tim ahli kami siap membantu Anda memilih produk yang tepat untuk kebutuhan proyek Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontak"
              className="bg-white text-seltronik-dark px-6 md:px-8 laptop:px-5 py-3 md:py-4 laptop:py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl laptop:text-sm"
            >
              Hubungi Tim Sales
            </Link>
            <a
              href="/catalogs/seltronik-catalog-2024.pdf"
              className="bg-white/20 backdrop-blur text-white px-6 md:px-8 laptop:px-5 py-3 md:py-4 laptop:py-2 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/50 laptop:text-sm"
            >
              Download Katalog Lengkap
            </a>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <Layout>
      {isAuthenticated ? <ProductView /> : <CategoryView />}
    </Layout>
  );
};

export default ProductsPage;
