import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { authService } from '../../services/authService';
import { userService } from '../../services/userService';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Sign in with Supabase Auth
      const { user } = await authService.signIn({
        email: credentials.email,
        password: credentials.password
      });

      if (!user) {
        throw new Error('Login failed');
      }

      // Check if user is admin
      const profile = await userService.getProfile(user.id);

      if (!profile || profile.role !== 'admin') {
        // Not an admin - sign out and show error
        await authService.signOut();
        setError('Akses ditolak. Anda tidak memiliki izin admin.');
        setIsLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Email atau password salah');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - Seltronik</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-seltronik-dark via-gray-900 to-black flex items-center justify-center p-4 laptop:p-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 laptop:p-5 w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8 laptop:mb-4">
            <div className="w-16 h-16 laptop:w-12 laptop:h-12 bg-seltronik-red rounded-full flex items-center justify-center mx-auto mb-4 laptop:mb-2">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl laptop:text-lg font-bold text-seltronik-dark dark:text-white">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-300">Seltronik Website Management</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              >
                {error}
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Admin
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red focus:ring-2 focus:ring-seltronik-red/20 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="admin@seltronik.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red focus:ring-2 focus:ring-seltronik-red/20 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-seltronik-red text-white py-3 rounded-lg font-semibold hover:bg-seltronik-red-hover transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Masuk...
                </>
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
              <strong>Area Terbatas</strong><br />
              Halaman ini hanya untuk administrator yang berwenang.
            </p>
          </div>

          {/* Back to Website */}
          <div className="mt-4 text-center">
            <a 
              href="/"
              className="text-sm text-gray-500 hover:text-seltronik-red transition-colors"
            >
              ← Kembali ke Website
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;
