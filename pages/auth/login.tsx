import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import Layout from '../../components/Layout'
import LoginForm from '../../components/auth/LoginForm'
import { useAuth } from '../../hooks/useAuth'
import useGSAPAnimations from '../../hooks/useGSAP'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin, loading } = useAuth()
  
  // Apply GSAP animations
  useGSAPAnimations()

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-seltronik-dark to-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-seltronik-red mx-auto"></div>
            <p className="mt-4 text-gray-300">Memuat...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Masuk - Seltronik</title>
        <meta name="description" content="Masuk ke akun Seltronik Anda" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20 laptop:py-10">
          <div className="container mx-auto px-4">
            {/* Back Navigation */}
            <div className="mb-8 laptop:mb-4">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm">Kembali ke Beranda</span>
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl laptop:text-3xl font-bold font-heading mb-4 laptop:mb-2">
                Masuk ke Akun Anda
              </h1>
              <p className="text-lg md:text-xl laptop:text-base text-gray-300 max-w-2xl mx-auto">
                Akses katalog produk lengkap dan spesifikasi teknis
              </p>
            </div>
          </div>
        </section>

        {/* Login Form Section */}
        <section className="gsap-fade-up py-12 md:py-16 laptop:py-8 bg-gray-50 dark:bg-seltronik-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              {/* Login Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 laptop:p-5">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold font-heading text-seltronik-dark dark:text-white">
                    Selamat Datang Kembali
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                    Masukkan email dan password Anda untuk melanjutkan
                  </p>
                </div>

                <LoginForm />
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dengan masuk, Anda menyetujui{' '}
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
        </section>
      </Layout>
    </>
  )
}
