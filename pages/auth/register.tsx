import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { FaArrowLeft, FaUserPlus, FaDownload, FaHeadset, FaBell } from 'react-icons/fa'
import Layout from '../../components/Layout'
import RegisterForm from '../../components/auth/RegisterForm'
import { useAuth } from '../../hooks/useAuth'
import useGSAPAnimations from '../../hooks/useGSAP'

export default function RegisterPage() {
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
        <title>Daftar - Seltronik</title>
        <meta name="description" content="Buat akun Seltronik untuk akses lengkap produk kami" />
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
                Daftar sebagai Customer
              </h1>
              <p className="text-lg md:text-xl laptop:text-base text-gray-300 max-w-2xl mx-auto">
                Bergabunglah untuk akses lengkap ke katalog dan spesifikasi produk kami
              </p>
            </div>
          </div>
        </section>

        <div className="bg-gray-50 dark:bg-seltronik-dark">
          <div className="container mx-auto px-4 py-12 md:py-16 laptop:py-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Main Form Section */}
                <div className="lg:col-span-3">
                  <div className="gsap-fade-up bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <RegisterForm />
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="lg:col-span-2">
                  <div className="gsap-fade-up space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 laptop:p-4">
                      <h3 className="font-bold text-seltronik-dark dark:text-white text-lg mb-4">
                        Yang Anda Dapatkan
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-seltronik-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaUserPlus className="text-seltronik-red" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-seltronik-dark dark:text-white text-sm">
                              Akses Lengkap
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Lihat spesifikasi detail dan gambar produk asli
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-seltronik-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaDownload className="text-seltronik-yellow" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-seltronik-dark dark:text-white text-sm">
                              Download Katalog
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Unduh katalog produk dalam format PDF
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-seltronik-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaHeadset className="text-seltronik-green" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-seltronik-dark dark:text-white text-sm">
                              Konsultasi Langsung
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Hubungi tim sales kami untuk penawaran
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaBell className="text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-seltronik-dark dark:text-white text-sm">
                              Update Produk
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Dapatkan info produk terbaru dan promo
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="bg-gradient-to-r from-seltronik-red to-seltronik-red-hover rounded-2xl shadow-lg p-6 laptop:p-4 text-white">
                      <h3 className="font-bold text-lg mb-4">Gratis & Aman</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-seltronik-yellow">✓</span>
                          <span className="text-sm">Pendaftaran Gratis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-seltronik-yellow">✓</span>
                          <span className="text-sm">Akses Instan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-seltronik-yellow">✓</span>
                          <span className="text-sm">Tanpa Kartu Kredit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-seltronik-yellow">✓</span>
                          <span className="text-sm">Data Terlindungi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
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
        </div>
      </Layout>
    </>
  )
}