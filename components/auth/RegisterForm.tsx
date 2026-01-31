import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { authService } from '../../services/authService'
import { SignUpData } from '../../types/auth'

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    company_name: '',
    purpose_interest: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authService.signUp(formData)

      // Redirect to products page after successful registration
      router.push('/produk')
    } catch (err: any) {
      setError(err.message || 'Gagal mendaftar. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          value={formData.full_name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent"
          placeholder="nama@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Nomor Telepon <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent"
          placeholder="+62 812 3456 7890"
        />
      </div>

      <div>
        <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-2">
          Nama Perusahaan <span className="text-red-500">*</span>
        </label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          required
          value={formData.company_name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent"
          placeholder="PT. Contoh Indonesia"
        />
      </div>

      <div>
        <label htmlFor="purpose_interest" className="block text-sm font-medium text-gray-700 mb-2">
          Tujuan / Minat <span className="text-red-500">*</span>
        </label>
        <textarea
          id="purpose_interest"
          name="purpose_interest"
          required
          value={formData.purpose_interest}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent resize-none"
          placeholder="Contoh: Mencari supplier lampu lalu lintas untuk proyek jalan tol..."
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent"
            placeholder="Minimal 6 karakter"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-seltronik-red text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Memproses...' : 'Buat Akun'}
      </button>

      <div className="text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link href="/auth/login" className="text-seltronik-red hover:underline font-medium">
          Masuk
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span>✓</span>
          <span>Akses Instan</span>
        </div>
        <div className="flex items-center gap-1">
          <span>✓</span>
          <span>Gratis Selamanya</span>
        </div>
        <div className="flex items-center gap-1">
          <span>✓</span>
          <span>Tanpa Kartu Kredit</span>
        </div>
      </div>
    </form>
  )
}
