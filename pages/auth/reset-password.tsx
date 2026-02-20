import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { FaArrowLeft, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle, FaSpinner, FaKey } from 'react-icons/fa'
import Layout from '../../components/Layout'
import { authService } from '../../services/authService'
import useGSAPAnimations from '../../hooks/useGSAP'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const router = useRouter()
  const { token } = router.query
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Validation states
  const [passwordValid, setPasswordValid] = useState(false)
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)
  const [touched, setTouched] = useState({ password: false, confirmPassword: false })
  
  // Apply GSAP animations
  useGSAPAnimations()

  useEffect(() => {
    // Check if token exists in URL
    if (router.isReady && !token) {
      toast.error('Link reset password tidak valid')
    }
  }, [router.isReady, token])

  const validatePassword = (value: string) => {
    const isValid = value.length >= 6
    setPasswordValid(isValid)
    return isValid
  }

  const validateConfirmPassword = (value: string) => {
    const isValid = value === password && value.length > 0
    setConfirmPasswordValid(isValid)
    return isValid
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
    // Re-validate confirm password
    if (confirmPassword) {
      setConfirmPasswordValid(value === confirmPassword)
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)
    validateConfirmPassword(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setTouched({ password: true, confirmPassword: true })

    if (!validatePassword(password)) {
      toast.error('Password minimal 6 karakter')
      return
    }

    if (!validateConfirmPassword(confirmPassword)) {
      toast.error('Password tidak cocok')
      return
    }

    if (!token) {
      toast.error('Token tidak valid')
      return
    }

    setLoading(true)

    try {
      await authService.updatePassword(password)
      setSuccess(true)
      toast.success('Password berhasil diubah!')
    } catch (err: any) {
      const errorMessage = err.message || 'Gagal mengubah password. Silakan coba lagi.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getInputClasses = (isValid: boolean, isTouched: boolean, hasValue: boolean) => {
    const baseClasses = "w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white"
    
    if (!isTouched || !hasValue) {
      return `${baseClasses} border-gray-300 dark:border-gray-600`
    }
    
    if (isValid) {
      return `${baseClasses} border-green-500 dark:border-green-500 focus:ring-green-500`
    } else {
      return `${baseClasses} border-red-500 dark:border-red-500 focus:ring-red-500`
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password - Seltronik</title>
        <meta name="description" content="Atur ulang password akun Seltronik Anda" />
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
                Atur Ulang Password
              </h1>
              <p className="text-lg md:text-xl laptop:text-base text-gray-300 max-w-2xl mx-auto">
                Buat password baru untuk akun Anda
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
                      Password Berhasil Diubah!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Password Anda telah berhasil diatur ulang. Silakan login dengan password baru Anda.
                    </p>
                    
                    <Link
                      href="/auth/login"
                      className="inline-block bg-seltronik-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-seltronik-red-hover transition-all duration-300"
                    >
                      Login Sekarang
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-seltronik-red/10 rounded-full flex items-center justify-center">
                          <FaKey className="text-seltronik-red text-xl" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold font-heading text-seltronik-dark dark:text-white">
                            Password Baru
                          </h2>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Masukkan password baru Anda. Pastikan password minimal 6 karakter untuk keamanan yang lebih baik.
                      </p>
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg flex items-start gap-3 mb-6">
                        <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Password */}
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Password Baru
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaLock />
                          </div>
                          <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                            className={getInputClasses(passwordValid, touched.password, password.length > 0)}
                            placeholder="Minimal 6 karakter"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            {touched.password && password.length > 0 && (
                              passwordValid ? (
                                <FaCheckCircle className="text-green-500" />
                              ) : (
                                <FaExclamationCircle className="text-red-500" />
                              )
                            )}
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                              tabIndex={-1}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        {touched.password && password.length > 0 && !passwordValid && (
                          <p className="mt-1 text-xs text-red-500">Password minimal 6 karakter</p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Konfirmasi Password
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaLock />
                          </div>
                          <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                            className={getInputClasses(confirmPasswordValid, touched.confirmPassword, confirmPassword.length > 0)}
                            placeholder="Ulangi password baru"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            {touched.confirmPassword && confirmPassword.length > 0 && (
                              confirmPasswordValid ? (
                                <FaCheckCircle className="text-green-500" />
                              ) : (
                                <FaExclamationCircle className="text-red-500" />
                              )
                            )}
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                              tabIndex={-1}
                            >
                              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        {touched.confirmPassword && confirmPassword.length > 0 && !confirmPasswordValid && (
                          <p className="mt-1 text-xs text-red-500">Password tidak cocok</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={loading || !token}
                        className="w-full bg-seltronik-red text-white py-3 rounded-lg font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Memproses...
                          </>
                        ) : (
                          'Ubah Password'
                        )}
                      </button>
                    </form>
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