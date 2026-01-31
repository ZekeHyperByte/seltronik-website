import { motion } from 'framer-motion'
import { FaLock, FaEye } from 'react-icons/fa'
import Link from 'next/link'
import OptimizedImage from '../OptimizedImage'
import { Product } from '../../types/product'

interface RestrictedProductCardProps {
  product: Product
  index: number
}

export default function RestrictedProductCard({ product, index }: RestrictedProductCardProps) {
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

  // Get a very brief description (first 80 chars)
  const briefDescription = product.description.length > 80 
    ? product.description.substring(0, 80) + '...' 
    : product.description

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Thumbnail Image with Lock Overlay */}
      <div className="relative h-40 overflow-hidden bg-gray-100">
        {product.image && (
          <OptimizedImage
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 filter blur-sm"
          />
        )}

        {/* Lock Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-2 mx-auto w-fit">
              <FaLock className="text-2xl" />
            </div>
            <p className="text-xs font-medium opacity-90">Login untuk melihat detail</p>
          </div>
        </div>

        {/* Category Badge */}
        <div className={`absolute top-3 left-3 ${badge.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          {badge.label}
        </div>
      </div>

      {/* Brief Content - Thumbnail Style */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Brief Description Only */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {briefDescription}
        </p>

        {/* CTA Button */}
        <Link
          href="/auth/register"
          className="flex items-center justify-center gap-2 w-full bg-seltronik-red text-white py-2.5 rounded-lg font-semibold hover:bg-red-800 transition text-sm"
        >
          <FaEye className="text-sm" />
          Lihat Detail Produk
        </Link>

        <p className="text-center text-xs text-gray-500 mt-2">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="text-seltronik-red hover:underline font-medium">
            Masuk
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
