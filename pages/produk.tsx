import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaDownload, FaWhatsapp, FaEye, FaCheckCircle, FaBolt, FaSun, FaShieldAlt, FaWifi, FaTimes, FaTh, FaList } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { productService, Product } from '../lib/supabase';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { id: 'all', name: 'Semua Produk', count: products.length },
    { id: 'pedestrian', name: 'Lampu Penyebrangan', count: products.filter(p => p.category === 'pedestrian').length },
    { id: 'warning', name: 'Warning Light', count: products.filter(p => p.category === 'warning').length },
    { id: 'traffic', name: 'Traffic Light', count: products.filter(p => p.category === 'traffic').length },
    { id: 'street', name: 'Lampu Jalan', count: products.filter(p => p.category === 'street').length },
    { id: 'controller', name: 'Controller System', count: products.filter(p => p.category === 'controller').length }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">Produk Kami</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Solusi lengkap untuk kebutuhan infrastruktur lalu lintas dengan teknologi terkini dan kualitas terjamin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-16 md:top-20 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            {/* Search Bar and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white text-sm md:text-base"
                />
              </div>

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

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center justify-center px-4 py-2 bg-seltronik-red text-white rounded-lg"
              >
                <FaFilter className="mr-2" />
                Filter
              </button>
            </div>

            {/* Desktop Category Filter */}
            <div className="hidden sm:flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 md:px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 text-sm md:text-base ${
                    selectedCategory === category.id
                      ? 'bg-seltronik-red text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Mobile Category Filter */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="sm:hidden grid grid-cols-1 gap-2"
                >
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowFilters(false);
                      }}
                      className={`px-4 py-3 rounded-lg font-medium text-left transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-seltronik-red text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-seltronik-dark">
        <div className="container mx-auto px-4">
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
                  whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.01, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
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
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105" 
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
                          {product.features.slice(0, viewMode === 'grid' ? 2 : 4).map((feature, idx) => (
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
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 bg-seltronik-red text-white px-3 md:px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
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

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl md:text-2xl text-gray-400">Tidak ada produk yang ditemukan</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="mt-4 text-seltronik-red hover:underline"
              >
                Reset Filter
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 md:p-6 flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold font-heading text-seltronik-dark dark:text-white">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white p-2"
                  aria-label="Close modal"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6">
                {/* Product Image */}
                <div className="h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden">
                  {selectedProduct.image && (
                    <Image 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover" 
                      priority
                    />
                  )}
                </div>

                {/* Product Details */}
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base">{selectedProduct.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-3">Fitur Unggulan</h3>
                    <div className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <FaCheckCircle className="text-seltronik-green mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-3">Spesifikasi Teknis</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="grid grid-cols-1 gap-2">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
                            <span className="text-gray-600 dark:text-gray-300 capitalize text-sm md:text-base">{key.replace('_', ' ')}</span>
                            <span className="text-gray-800 dark:text-white font-medium text-sm md:text-base text-right">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/628112345678?text=Saya tertarik dengan produk ${selectedProduct.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 text-white px-4 md:px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <FaWhatsapp /> Konsultasi via WhatsApp
                    </a>
                    {selectedProduct.catalog_url && (
                      <a
                        href={selectedProduct.catalog_url}
                        className="flex-1 bg-seltronik-red text-white px-4 md:px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <FaDownload /> Download Katalog
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-seltronik-red via-seltronik-yellow to-seltronik-green">
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
