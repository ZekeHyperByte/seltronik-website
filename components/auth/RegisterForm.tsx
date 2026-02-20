import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaSpinner,
  FaUser,
  FaPhone,
  FaBuilding,
  FaCommentDots,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa'
import { authService } from '../../services/authService'
import { SignUpData } from '../../types/auth'
import toast from 'react-hot-toast'

export default function RegisterForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    company_name: '',
    purpose_interest: '',
  })

  // Validation states
  const [validations, setValidations] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    full_name: false,
    phone: false,
    company_name: false,
    purpose_interest: false,
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    full_name: false,
    phone: false,
    company_name: false,
    purpose_interest: false,
  })

  const [confirmPassword, setConfirmPassword] = useState('')

  // Validation functions
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const validatePassword = (value: string) => {
    return value.length >= 6
  }

  const validatePhone = (value: string) => {
    // Indonesian phone format: +62 or 08
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/
    return phoneRegex.test(value.replace(/\s/g, ''))
  }

  const validateField = (name: string, value: string) => {
    let isValid = false
    switch (name) {
      case 'email':
        isValid = validateEmail(value)
        break
      case 'password':
        isValid = validatePassword(value)
        break
      case 'full_name':
        isValid = value.length >= 2
        break
      case 'phone':
        isValid = validatePhone(value)
        break
      case 'company_name':
        isValid = value.length >= 2
        break
      case 'purpose_interest':
        isValid = value.length >= 10
        break
    }
    setValidations(prev => ({ ...prev, [name]: isValid }))
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'password') {
      validateField(name, value)
      // Also validate confirm password if it has value
      if (confirmPassword) {
        setValidations(prev => ({ 
          ...prev, 
          confirmPassword: value === confirmPassword 
        }))
      }
    } else {
      validateField(name, value)
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)
    setValidations(prev => ({ 
      ...prev, 
      confirmPassword: value === formData.password 
    }))
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const isStep1Valid = () => {
    return validations.email && validations.password && validations.confirmPassword
  }

  const isStep2Valid = () => {
    return validations.full_name && validations.phone && 
           validations.company_name && validations.purpose_interest
  }

  const handleNext = () => {
    // Mark all step 1 fields as touched
    setTouched(prev => ({
      ...prev,
      email: true,
      password: true,
      confirmPassword: true,
    }))

    if (isStep1Valid()) {
      setCurrentStep(2)
      toast.success('Langkah 1 selesai! Lanjutkan ke langkah 2.')
    } else {
      toast.error('Mohon lengkapi semua field dengan benar')
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Mark all step 2 fields as touched
    setTouched(prev => ({
      ...prev,
      full_name: true,
      phone: true,
      company_name: true,
      purpose_interest: true,
    }))

    if (!isStep2Valid()) {
      toast.error('Mohon lengkapi semua field dengan benar')
      return
    }

    setLoading(true)

    try {
      await authService.signUp(formData)
      
      toast.success('Pendaftaran berhasil! Selamat datang.')
      router.push('/produk')
    } catch (err: any) {
      const errorMessage = err.message || 'Gagal mendaftar. Silakan coba lagi.'
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

  const renderValidationIcon = (isValid: boolean, isTouched: boolean, hasValue: boolean) => {
    if (!isTouched || !hasValue) return null
    
    return (
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        {isValid ? (
          <FaCheckCircle className="text-green-500" />
        ) : (
          <FaExclamationCircle className="text-red-500" />
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 laptop:p-5">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Langkah {currentStep} dari 2
          </span>
          <span className="text-sm font-medium text-seltronik-red">
            {currentStep === 1 ? 'Informasi Akun' : 'Informasi Perusahaan'}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-seltronik-red transition-all duration-500 ease-out"
            style={{ width: currentStep === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg flex items-start gap-3 mb-6">
          <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {currentStep === 1 ? (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold font-heading text-seltronik-dark dark:text-white">
              Informasi Akun
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Masukkan email dan password untuk membuat akun
            </p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaEnvelope />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={getInputClasses(validations.email, touched.email, formData.email.length > 0)}
                placeholder="nama@email.com"
              />
              {renderValidationIcon(validations.email, touched.email, formData.email.length > 0)}
            </div>
            {touched.email && formData.email.length > 0 && !validations.email && (
              <p className="mt-1 text-xs text-red-500">Format email tidak valid</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaLock />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                className={getInputClasses(validations.password, touched.password, formData.password.length > 0)}
                placeholder="Minimal 6 karakter"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {renderValidationIcon(validations.password, touched.password, formData.password.length > 0)}
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
            {touched.password && formData.password.length > 0 && !validations.password && (
              <p className="mt-1 text-xs text-red-500">Password minimal 6 karakter</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Konfirmasi Password <span className="text-red-500">*</span>
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
                onBlur={() => handleBlur('confirmPassword')}
                className={getInputClasses(
                  validations.confirmPassword, 
                  touched.confirmPassword, 
                  confirmPassword.length > 0
                )}
                placeholder="Ulangi password"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {renderValidationIcon(validations.confirmPassword, touched.confirmPassword, confirmPassword.length > 0)}
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
            {touched.confirmPassword && confirmPassword.length > 0 && !validations.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">Password tidak cocok</p>
            )}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-seltronik-red text-white py-3 rounded-lg font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Lanjutkan
            <FaArrowRight />
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="text-seltronik-red hover:text-seltronik-red-hover font-semibold transition-colors">
              Masuk
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold font-heading text-seltronik-dark dark:text-white">
              Informasi Perusahaan
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Lengkapi data perusahaan Anda
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaUser />
              </div>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={handleChange}
                onBlur={() => handleBlur('full_name')}
                className={getInputClasses(validations.full_name, touched.full_name, formData.full_name.length > 0)}
                placeholder="John Doe"
              />
              {renderValidationIcon(validations.full_name, touched.full_name, formData.full_name.length > 0)}
            </div>
            {touched.full_name && formData.full_name.length > 0 && !validations.full_name && (
              <p className="mt-1 text-xs text-red-500">Nama minimal 2 karakter</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaPhone />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur('phone')}
                className={getInputClasses(validations.phone, touched.phone, (formData.phone || '').length > 0)}
                placeholder="+62 812 3456 7890"
              />
              {renderValidationIcon(validations.phone, touched.phone, (formData.phone || '').length > 0)}
            </div>
            {touched.phone && (formData.phone || '').length > 0 && !validations.phone && (
              <p className="mt-1 text-xs text-red-500">Format: +62 atau 08...</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nama Perusahaan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaBuilding />
              </div>
              <input
                id="company_name"
                name="company_name"
                type="text"
                required
                value={formData.company_name}
                onChange={handleChange}
                onBlur={() => handleBlur('company_name')}
                className={getInputClasses(validations.company_name, touched.company_name, (formData.company_name || '').length > 0)}
                placeholder="PT. Contoh Indonesia"
              />
              {renderValidationIcon(validations.company_name, touched.company_name, (formData.company_name || '').length > 0)}
            </div>
            {touched.company_name && (formData.company_name || '').length > 0 && !validations.company_name && (
              <p className="mt-1 text-xs text-red-500">Nama perusahaan minimal 2 karakter</p>
            )}
          </div>

          {/* Purpose */}
          <div>
            <label htmlFor="purpose_interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tujuan / Minat <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-400">
                <FaCommentDots />
              </div>
              <textarea
                id="purpose_interest"
                name="purpose_interest"
                required
                rows={3}
                value={formData.purpose_interest}
                onChange={handleChange}
                onBlur={() => handleBlur('purpose_interest')}
                className={`${getInputClasses(
                  validations.purpose_interest, 
                  touched.purpose_interest, 
                  (formData.purpose_interest || '').length > 0
                )} pl-12 resize-none`}
                placeholder="Contoh: Mencari supplier lampu lalu lintas untuk proyek jalan tol..."
              />
            </div>
            {touched.purpose_interest && (formData.purpose_interest || '').length > 0 && !validations.purpose_interest && (
              <p className="mt-1 text-xs text-red-500">Minimal 10 karakter</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
              Kembali
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-seltronik-red text-white py-3 rounded-lg font-semibold hover:bg-seltronik-red-hover transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Buat Akun
                  <FaArrowRight />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}