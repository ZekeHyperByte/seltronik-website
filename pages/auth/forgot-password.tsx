import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { FaArrowLeft, FaEnvelope, FaCheckCircle, FaExclamationCircle, FaSpinner, FaPaperPlane } from 'react-icons/fa'
import Layout from '../../components/Layout'
import { authService } from '../../services/authService'
import useGSAPAnimations from '../../hooks/useGSAP'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [touched, setTouched] = useState(false)
  
  // Apply GSAP animations
  useGSAPAnimations()

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(value)
    setEmailValid(isValid)
    return isValid
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setTouched(true)

    if (!validateEmail(email)) {
      toast.error('Format email tidak valid')
      return
    }

    setLoading(true)

    try {
      await authService.resetPassword(email)
      setSuccess(true)
      toast.success('Link reset password telah dikirim ke email Anda')
    } catch (err: any) {
      const errorMessage = err.message || 'Gagal mengirim link reset password. Silakan coba lagi.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getInputClasses = () => {
    const baseClasses = "w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white"
    
    if (!touched || !email) {
      return `${baseClasses} border-gray-300 dark:border-gray-600`
    }
    
    if (emailValid) {
      return `${baseClasses} border-green-500 dark:border-green-500 focus:ring-green-500`
    } else {
      return `${baseClasses} border-red-500 dark:border-red-500 focus:ring-red-500`
    }
  }

  return (
    <>
      <Head>
        <title>Lupa Password - Seltronik</title>
        <meta name="description" content="Reset password akun Seltronik Anda" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20 laptop:py-10">
          <div className="container mx-auto px-4">
            {/* Back Navigation */}
            <div className="mb-8 laptop:mb-4">
              <Link 
                href="/auth/login" 
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaArrowLeft className="text-sm" />
                <span className="text-sm">Kembali ke Login</span>
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl laptop:text-3xl font-bold font-heading mb-4 laptop:mb-2">
                Lupa Password?
              </h1>
              <p className="text-lg md:text-xl laptop:text-base text-gray-300 max-w-2xl mx-auto">
                Jangan khawatir, kami akan membantu Anda mengatur ulang password
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="gsap-fade-up py-12 md:py-16 laptop:py-8 bg-gray-50 dark:bg-seltronik-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 laptop:p-5">
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheckCircle className="text-4xl text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold font-heading text-seltronik-dark dark:text-white mb-4">
                      Cek Email Anda!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Kami telah mengirimkan link untuk mengatur ulang password ke{' '}
                      <strong className="text-seltronik-dark dark:text-white">{email}</strong>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
                      Silakan cek kotak masuk atau folder spam Anda. Link tersebut akan kadaluarsa dalam 24 jam.
                    </p>
                    
                    <Link
                      href="/auth/login"
                      className="inline-block bg-seltronik-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-seltronik-red-hover transition-all duration-300"
                    >
                      Kembali ke Login
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold font-heading text-seltronik-dark dark:text-white">
                        Reset Password
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                        Masukkan email yang terdaftar dan kami akan mengirimkan link untuk mengatur ulang password Anda.
                      </p>
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg flex items-start gap-3 mb-6">
                        <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaEnvelope />
                          </div>
                          <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={() => setTouched(true)}
                            className={getInputClasses()}
                            placeholder="nama@email.com"
                          />
                          {touched && email && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              {emailValid ? (
                                <FaCheckCircle className="text-green-500" />
                              ) : (
                                <FaExclamationCircle className="text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {touched && email && !emailValid && (
                          <p className="mt-1 text-xs text-red-500">Format email tidak valid</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-seltronik-red text-white py-3 rounded-lg font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane />
                            Kirim Link Reset
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ingat password Anda?{' '}
                        <Link href="/auth/login" className="text-seltronik-red hover:text-seltronik-red-hover font-semibold transition-colors">
                          Masuk di sini
                        </Link>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}