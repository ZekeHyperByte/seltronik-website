import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa'
import { authService } from '../../services/authService'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  // Validation states
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(value)
    setEmailValid(isValid)
    return isValid
  }

  const validatePassword = (value: string) => {
    const isValid = value.length >= 6
    setPasswordValid(isValid)
    return isValid
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Mark all fields as touched
    setTouched({ email: true, password: true })
    
    // Validate all fields
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)
    
    if (!isEmailValid || !isPasswordValid) {
      toast.error('Mohon periksa kembali data yang Anda masukkan')
      return
    }
    
    setLoading(true)

    try {
      await authService.signIn({ email, password })

      // Redirect based on role will be handled by the page component
      const redirectTo = (router.query.redirectTo as string) || '/produk'
      router.push(redirectTo)
      
      toast.success('Berhasil masuk!')
    } catch (err: any) {
      const errorMessage = err.message || 'Gagal masuk. Periksa email dan password Anda.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getInputClasses = (isValid: boolean, isTouched: boolean, hasValue: boolean) => {
    const baseClasses = "w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-seltronik-red focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white"
    
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg flex items-start gap-3">
          <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Email Field */}
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
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            className={getInputClasses(emailValid, touched.email, email.length > 0)}
            placeholder="nama@email.com"
          />
          {touched.email && email.length > 0 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {emailValid ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaExclamationCircle className="text-red-500" />
              )}
            </div>
          )}
        </div>
        {touched.email && email.length > 0 && !emailValid && (
          <p className="mt-1 text-xs text-red-500">Format email tidak valid</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FaLock />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
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

      {/* Forgot Password Link */}
      <div className="text-right">
        <Link 
          href="/auth/forgot-password" 
          className="text-sm text-seltronik-red hover:text-seltronik-red-hover transition-colors"
        >
          Lupa Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-seltronik-red text-white py-3 rounded-lg font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" />
            Memproses...
          </>
        ) : (
          'Masuk'
        )}
      </button>

      {/* Register Link */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Belum punya akun?{' '}
        <Link href="/auth/register" className="text-seltronik-red hover:text-seltronik-red-hover font-semibold transition-colors">
          Daftar Sekarang
        </Link>
      </div>
    </form>
  )
}