import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import RegisterForm from '../../components/auth/RegisterForm'
import { useAuth } from '../../hooks/useAuth'

export default function RegisterPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin, loading } = useAuth()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      // Redirect authenticated users
      if (isAdmin) {
        router.push('/admin/dashboard')
      } else {
        router.push('/produk')
      }
    }
  }, [isAuthenticated, isAdmin, loading, router])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-seltronik-red mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Daftar - Seltronik</title>
        <meta name="description" content="Buat akun Seltronik untuk akses lengkap produk kami" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 laptop:py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8 laptop:mb-4">
              <Link href="/">
                <h1 className="text-3xl laptop:text-xl font-bold text-seltronik-red">Seltronik</h1>
              </Link>
              <p className="mt-2 text-gray-600">Buat akun gratis Anda</p>
              <p className="mt-1 text-sm text-gray-500">
                Daftar sebagai customer untuk akses lengkap ke katalog produk kami
              </p>
            </div>

            {/* Register Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 laptop:p-4">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Informasi Customer</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Lengkapi data di bawah untuk mendaftar sebagai customer
                </p>
              </div>

              <RegisterForm />
            </div>

            {/* Benefits */}
            <div className="mt-8 laptop:mt-4 bg-white rounded-xl p-6 laptop:p-4 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-4">Yang Anda dapatkan:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-seltronik-green text-xl">✓</span>
                  <span className="text-sm text-gray-600">
                    Akses lengkap ke spesifikasi dan gambar produk asli
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-seltronik-green text-xl">✓</span>
                  <span className="text-sm text-gray-600">
                    Download katalog produk dalam format PDF
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-seltronik-green text-xl">✓</span>
                  <span className="text-sm text-gray-600">
                    Kontak langsung dengan tim sales kami
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-seltronik-green text-xl">✓</span>
                  <span className="text-sm text-gray-600">
                    Update produk terbaru dan penawaran khusus
                  </span>
                </li>
              </ul>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Dengan mendaftar, Anda menyetujui{' '}
                <Link href="/terms" className="text-seltronik-red hover:underline">
                  Syarat & Ketentuan
                </Link>{' '}
                dan{' '}
                <Link href="/privacy" className="text-seltronik-red hover:underline">
                  Kebijakan Privasi
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
