import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import SearchInput from '../components/SearchInput';
import OptimizedImage from '../components/OptimizedImage';
import { GridSkeleton, ErrorState, EmptyState } from '../components/Loading';
import { useSearch } from '../hooks/useSearch';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { imageSizes, imageQuality, generateBlurDataURL } from '../lib/imageOptimization';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaDownload, FaWhatsapp, FaEye, FaCheckCircle, FaBolt, FaSun, FaShieldAlt, FaWifi, FaTimes, FaTh, FaList } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { productService, Product } from '../lib/supabase';
import useGSAPAnimations from '../hooks/useGSAP';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
    items: products,
    searchFields: ['name', 'description'],
    debounceMs: 300,
    maxSuggestions: 5
  });

  // Apply GSAP animations
  useGSAPAnimations();

  // Error handling
  const { handleApiError, withErrorHandling } = useErrorHandler();

  // ESC key handling is now handled by the Modal component

  useEffect(() => {
    const fetchProducts = withErrorHandling(
      async () => {
        setIsLoading(true);
        setError(null);
        const data = await productService.getAll();
        setProducts(data || []);
      },
      {
        errorMessage: 'Gagal memuat data produk. Silakan coba lagi.',
      }
    );

    fetchProducts().finally(() => setIsLoading(false));
  }, [withErrorHandling]);

  const handleRetry = () => {
    const fetchProducts = withErrorHandling(
      async () => {
        setIsLoading(true);
        setError(null);
        const data = await productService.getAll();
        setProducts(data || []);
      },
      {
        errorMessage: 'Gagal memuat data produk. Silakan coba lagi.',
      }
    );
    
    fetchProducts().finally(() => setIsLoading(false));
  };

  const categories = [
    { id: 'all', name: 'Semua Produk', count: products.length },
    { id: 'pedestrian', name: 'Lampu Penyebrangan', count: products.filter(p => p.category === 'pedestrian').length },
    { id: 'warning', name: 'Warning Light', count: products.filter(p => p.category === 'warning').length },
    { id: 'traffic', name: 'Traffic Light', count: products.filter(p => p.category === 'traffic').length },
    { id: 'street', name: 'Lampu Jalan', count: products.filter(p => p.category === 'street').length },
    { id: 'controller', name: 'Controller System', count: products.filter(p => p.category === 'controller').length }
  ];

  // Apply category filter to search results
  const filteredProducts = searchResults.filter(product => {
    return selectedCategory === 'all' || product.category === selectedCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">Produk Kami</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
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

            {/* Category Filter - Show on all screen sizes with horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex gap-2 min-w-max">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 md:px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 text-xs sm:text-sm md:text-base flex-shrink-0 ${
                      selectedCategory === category.id
                        ? 'bg-seltronik-red text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="gsap-fade-up py-8 md:py-12 bg-gray-50 dark:bg-seltronik-dark">
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
                <motion.div
                  key={product.id}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`gsap-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
                  style={{ willChange: 'transform' }}
                >
                  {/* Product Image */}
                  <div className={`bg-gray-200 dark:bg-gray-700 relative overflow-hidden ${
                    viewMode === 'grid' 
                      ? 'h-40 sm:h-48 md:h-56' 
                      : 'h-48 md:h-32 md:w-48 flex-shrink-0'
                  }`}>
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-seltronik-red text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                    </div>
                    {product.image && (
                      <OptimizedImage 
                        src={product.image} 
                        alt={product.name} 
                        fill
                        sizes={imageSizes.card}
                        quality={imageQuality.card}
                        className="transition-transform duration-300 group-hover:scale-105" 
                        objectFit="cover"
                        blurDataURL={generateBlurDataURL()}
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`p-4 md:p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div>
                      <h3 className={`font-bold font-heading text-seltronik-dark dark:text-white mb-2 ${
                        viewMode === 'grid' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
                      }`}>
                        {product.name}
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-300 mb-4 ${
                        viewMode === 'grid' ? 'line-clamp-2 text-sm md:text-base' : 'text-base md:text-lg'
                      }`}>
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {product.features.slice(0, viewMode === 'grid' ? 2 : 4).map((feature: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {product.features.length > (viewMode === 'grid' ? 2 : 4) && (
                            <span className="text-xs text-gray-400">+{product.features.length - (viewMode === 'grid' ? 2 : 4)} lainnya</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={`flex gap-2 ${viewMode === 'list' ? 'md:flex-row' : 'flex-col sm:flex-row'}`}>
                      <button
                        onClick={() => setSelectedProduct(product as Product)}
                        className="flex-1 bg-seltronik-red text-white px-3 md:px-4 py-2 rounded-lg hover:bg-seltronik-red-hover transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <FaEye /> Detail
                      </button>
                      {product.catalog_url && (
                        <a
                          href={product.catalog_url}
                          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <FaDownload /> Katalog
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
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
      <section className="gsap-scale py-12 md:py-16 bg-gradient-to-r from-seltronik-red via-seltronik-yellow to-seltronik-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            Butuh Konsultasi Produk?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Tim ahli kami siap membantu Anda memilih produk yang tepat untuk kebutuhan proyek Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontak"
              className="bg-white text-seltronik-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Hubungi Tim Sales
            </Link>
            <a
              href="/catalogs/seltronik-catalog-2024.pdf"
              className="bg-white/20 backdrop-blur text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/50"
            >
              Download Katalog Lengkap
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
