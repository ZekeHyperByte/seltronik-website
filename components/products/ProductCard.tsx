import { motion } from 'framer-motion'
import { FaDownload, FaWhatsapp, FaEye, FaArrowRight } from 'react-icons/fa'
import OptimizedImage from '../OptimizedImage'
import { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
  index: number
  onClick: () => void
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ product, index, onClick, viewMode = 'grid' }: ProductCardProps) {
  const categoryBadges = {
    pedestrian: { label: 'Lampu Penyebrangan', color: 'bg-blue-500' },
    warning: { label: 'Warning Light', color: 'bg-yellow-500' },
    traffic: { label: 'Traffic Light', color: 'bg-red-500' },
    street: { label: 'Lampu Jalan', color: 'bg-green-500' },
  }

  const badge = categoryBadges[product.category as keyof typeof categoryBadges] || {
    label: product.category,
    color: 'bg-gray-500'
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (product.catalog_url) {
      window.open(product.catalog_url, '_blank')
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-700">
            {product.image && (
              <OptimizedImage
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className={`absolute top-3 left-3 ${badge.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
              {badge.label}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.features.slice(0, 3).map((feature, i) => (
                  <span
                    key={i}
                    className="inline-block bg-seltronik-green/10 text-seltronik-green text-xs px-2 py-1 rounded border border-seltronik-green/20"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 3 && (
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded">
                    +{product.features.length - 3} lainnya
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={onClick}
                className="flex items-center gap-2 bg-seltronik-red text-white px-4 py-2 rounded-lg hover:bg-seltronik-red-hover transition font-semibold text-sm"
              >
                <FaEye /> Lihat Detail
              </button>
              {product.catalog_url && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
                >
                  <FaDownload /> Katalog
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        {product.image && (
          <OptimizedImage
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Category Badge */}
        <div className={`absolute top-3 left-3 ${badge.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          {badge.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Fitur Unggulan:</p>
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="inline-block bg-seltronik-green/10 text-seltronik-green text-xs px-2 py-1 rounded border border-seltronik-green/20"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded">
                +{product.features.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onClick}
            className="flex-1 bg-seltronik-red text-white py-2 rounded-lg hover:bg-seltronik-red-hover transition font-semibold text-sm flex items-center justify-center gap-2"
          >
            Lihat Detail <FaArrowRight className="text-xs" />
          </button>

          {product.catalog_url && (
            <button
              onClick={handleDownload}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              title="Download Katalog"
            >
              <FaDownload />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
