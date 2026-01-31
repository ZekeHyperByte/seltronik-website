import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { authService } from '../../services/authService'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authService.signIn({ email, password })

      // Redirect based on role will be handled by the page component
      const redirectTo = (router.query.redirectTo as string) || '/produk'
      router.push(redirectTo)
    } catch (err: any) {
      setError(err.message || 'Gagal masuk. Periksa email dan password Anda.')
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent"
          placeholder="nama@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent"
            placeholder="••••••••"
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
        {loading ? 'Memproses...' : 'Masuk'}
      </button>

      <div className="text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link href="/auth/register" className="text-seltronik-red hover:underline font-medium">
          Daftar Sekarang
        </Link>
      </div>
    </form>
  )
}
