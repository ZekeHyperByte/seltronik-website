import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaDownload, FaWhatsapp, FaEye, FaCheckCircle, FaBolt, FaSun, FaShieldAlt, FaWifi, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  features: string[];
  specifications: {
    power?: string;
    voltage?: string;
    material?: string;
    dimension?: string;
    weight?: string;
    certification?: string;
  };
  image: string;
  catalogUrl: string;
}

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', name: 'Semua Produk', count: 25 },
    { id: 'pedestrian', name: 'Lampu Penyebrangan', count: 5 },
    { id: 'warning', name: 'Warning Light', count: 6 },
    { id: 'traffic', name: 'Traffic Light', count: 4 },
    { id: 'street', name: 'Lampu Jalan', count: 7 },
    { id: 'controller', name: 'Controller System', count: 3 }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'SP-230D Pedestrian Light',
      category: 'pedestrian',
      description: 'Unit lampu pedestrian dengan green dynamic display, dilengkapi countdown timer dan suara untuk penyebrangan yang lebih aman.',
      features: [
        'LED High Brightness',
        'Countdown Timer Digital',
        'Audio Warning System',
        'Touchless Button',
        'Weather Resistant IP65'
      ],
      specifications: {
        power: '30 Watt',
        voltage: 'AC 220V',
        material: 'Aluminium Die Cast',
        dimension: '300 x 300 x 120 mm',
        weight: '5 kg',
        certification: 'SNI, CE'
      },
      image: '/images/products/sp-230d.jpg',
      catalogUrl: '/catalogs/pedestrian-sp230d.pdf'
    },
    {
      id: 2,
      name: 'Warning Light Solar WL-ST100',
      category: 'warning',
      description: 'Lampu peringatan tenaga surya dengan LED super bright, cocok untuk area konstruksi dan titik rawan kecelakaan.',
      features: [
        'Solar Powered',
        'Automatic Day/Night Sensor',
        '360° Visibility',
        'Flashing Modes',
        'Battery Backup 7 Days'
      ],
      specifications: {
        power: '10 Watt Solar Panel',
        voltage: 'DC 12V',
        material: 'Polycarbonate',
        dimension: '200 x 200 x 150 mm',
        weight: '2.5 kg',
        certification: 'SNI'
      },
      image: '/images/products/wl-st100.jpg',
      catalogUrl: '/catalogs/warning-wl-st100.pdf'
    },
    {
      id: 3,
      name: 'Traffic Light Controller STC-880CPU',
      category: 'controller',
      description: 'CPU Controller untuk traffic light dengan kemampuan programming 8 fase dan monitoring real-time.',
      features: [
        '8 Phase Programming',
        'Real-time Monitoring',
        'Remote Control Ready',
        'Conflict Detection',
        'Emergency Override'
      ],
      specifications: {
        power: '50 Watt',
        voltage: 'AC 220V',
        material: 'Metal Cabinet',
        dimension: '400 x 300 x 150 mm',
        weight: '8 kg',
        certification: 'SNI, ISO 9001'
      },
      image: '/images/products/stc-880cpu.jpg',
      catalogUrl: '/catalogs/controller-stc880.pdf'
    },
    {
      id: 4,
      name: 'LED Street Light SL-48A Series',
      category: 'street',
      description: 'Lampu jalan LED dengan efisiensi tinggi, hemat energi hingga 70% dibanding lampu konvensional.',
      features: [
        'High Efficiency LED',
        'IP66 Waterproof',
        'Die-cast Aluminum',
        '50,000 Hours Lifespan',
        'Multiple Wattage Options'
      ],
      specifications: {
        power: '40W - 150W',
        voltage: 'AC 220-240V',
        material: 'Die-cast Aluminum',
        dimension: '446.5 x 222 x 117 mm',
        weight: '3.34 kg',
        certification: 'SNI, CE, RoHS'
      },
      image: '/images/products/sl-48a.jpg',
      catalogUrl: '/catalogs/street-sl48a.pdf'
    },
    {
      id: 5,
      name: 'Traffic Signal 3-Aspect LED',
      category: 'traffic',
      description: 'Lampu traffic signal 3 aspek dengan LED module berkualitas tinggi dan visibility optimal.',
      features: [
        '300mm LED Module',
        'Ultra Bright LED',
        'Modular Design',
        'Long Lifespan',
        'Low Power Consumption'
      ],
      specifications: {
        power: '15W per aspect',
        voltage: 'AC 220V',
        material: 'Polycarbonate',
        dimension: '1200 x 400 x 300 mm',
        weight: '15 kg',
        certification: 'SNI'
      },
      image: '/images/products/traffic-3aspect.jpg',
      catalogUrl: '/catalogs/traffic-3aspect.pdf'
    },
    {
      id: 6,
      name: 'Solar Warning Light Barricade',
      category: 'warning',
      description: 'Lampu warning untuk barricade dengan solar cell, cocok untuk pembatas jalan dan area konstruksi.',
      features: [
        'Solar Powered',
        'Auto On/Off',
        'Weather Resistant',
        'Easy Installation',
        'Multiple Flash Patterns'
      ],
      specifications: {
        power: '3 Watt Solar',
        voltage: 'DC 6V',
        material: 'ABS Plastic',
        dimension: '180 x 180 x 100 mm',
        weight: '1.5 kg',
        certification: 'SNI'
      },
      image: '/images/products/solar-barricade.jpg',
      catalogUrl: '/catalogs/solar-barricade.pdf'
    }
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
      <section className="bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold font-heading mb-4">Produk Kami</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Solusi lengkap untuk kebutuhan infrastruktur lalu lintas dengan teknologi terkini dan kualitas terjamin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-20 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
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
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50 dark:bg-seltronik-dark">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-seltronik-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                    </div>
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-110 transition-transform duration-500"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-heading text-seltronik-dark dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 bg-seltronik-red text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <FaEye /> Detail
                      </button>
                      <a
                        href={product.catalogUrl}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <FaDownload /> Katalog
                      </a>
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
              <p className="text-2xl text-gray-400">Tidak ada produk yang ditemukan</p>
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
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold font-heading text-seltronik-dark dark:text-white">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 p-6">
                {/* Product Image */}
                <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl"></div>

                {/* Product Details */}
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedProduct.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-3">Fitur Unggulan</h3>
                    <div className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <FaCheckCircle className="text-seltronik-green" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-seltronik-dark dark:text-white mb-3">Spesifikasi Teknis</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <table className="w-full">
                        <tbody>
                          {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                            <tr key={key} className="border-b border-gray-200 dark:border-gray-600 last:border-0">
                              <td className="py-2 text-gray-600 dark:text-gray-300 capitalize">{key.replace('_', ' ')}</td>
                              <td className="py-2 text-gray-800 dark:text-white font-medium text-right">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={`https://wa.me/628112345678?text=Saya tertarik dengan produk ${selectedProduct.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp /> Konsultasi via WhatsApp
                    </a>
                    <a
                      href={selectedProduct.catalogUrl}
                      className="flex-1 bg-seltronik-red text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <FaDownload /> Download Katalog
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-seltronik-red via-seltronik-yellow to-seltronik-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Butuh Konsultasi Produk?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tim ahli kami siap membantu Anda memilih produk yang tepat untuk kebutuhan proyek Anda
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontak"
              className="bg-white text-seltronik-dark px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Hubungi Tim Sales
            </Link>
            <a
              href="/catalogs/seltronik-catalog-2024.pdf"
              className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/50"
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
