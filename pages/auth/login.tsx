import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import LoginForm from '../../components/auth/LoginForm'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
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
        <title>Masuk - Seltronik</title>
        <meta name="description" content="Masuk ke akun Seltronik Anda" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 laptop:py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8 laptop:mb-4">
              <Link href="/">
                <h1 className="text-3xl laptop:text-xl font-bold text-seltronik-red">Seltronik</h1>
              </Link>
              <p className="mt-2 text-gray-600">Masuk ke akun Anda</p>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 laptop:p-5">
              <LoginForm />
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
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
      </Layout>
    </>
  )
}
