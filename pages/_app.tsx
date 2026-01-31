import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'
import { ErrorProvider } from '../contexts/ErrorContext'
import { AuthProvider } from '../contexts/AuthContext'
import ErrorBoundary from '../components/ErrorBoundary'

// Smooth page transitions without white flash
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
}

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.4
}

// Simple but effective loading overlay
const loadingVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let startTime: number
    let minDisplayTimeout: NodeJS.Timeout

    const handleStart = () => {
      setLoading(true)
      startTime = Date.now()
    }
    
    const handleComplete = () => {
      const elapsed = Date.now() - startTime
      const minDisplayTime = 1600 // Minimum 1.6 seconds to see full traffic light sequence
      
      if (elapsed < minDisplayTime) {
        // Wait for remaining time to complete the animation
        minDisplayTimeout = setTimeout(() => {
          setLoading(false)
        }, minDisplayTime - elapsed)
      } else {
        // Page took long enough, hide immediately
        setLoading(false)
      }
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
      if (minDisplayTimeout) {
        clearTimeout(minDisplayTimeout)
      }
    }
  }, [])

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <ErrorProvider>
            {/* Prevent white flash with background */}
            <div className="min-h-screen bg-gray-50 dark:bg-seltronik-dark">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={router.asPath}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ErrorBoundary>
                    <Component {...pageProps} />
                  </ErrorBoundary>
                </motion.div>
              </AnimatePresence>

        {/* Improved Traffic Light Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={loadingVariants}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-seltronik-dark/95 backdrop-blur-md"
            >
              <div className="flex flex-col items-center space-y-6 laptop:space-y-4">
                {/* Simplified Traffic Light */}
                <div className="bg-gray-900 rounded-2xl p-4 laptop:p-3 shadow-2xl">
                  <div className="flex flex-col space-y-3 laptop:space-y-2">
                    {/* Red Light */}
                    <motion.div
                      className="w-8 h-8 laptop:w-6 laptop:h-6 rounded-full bg-seltronik-red border-2 border-seltronik-red shadow-lg"
                      animate={{
                        opacity: [1, 1, 0.2, 0.2, 0.2],
                        scale: [1, 1, 0.95, 0.95, 0.95],
                        boxShadow: [
                          '0 0 20px rgba(111, 21, 32, 0.8)',
                          '0 0 20px rgba(111, 21, 32, 0.8)',
                          '0 0 0 rgba(111, 21, 32, 0)',
                          '0 0 0 rgba(111, 21, 32, 0)',
                          '0 0 0 rgba(111, 21, 32, 0)'
                        ]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.3, 0.4, 0.7, 1]
                      }}
                    />
                    {/* Yellow Light */}
                    <motion.div
                      className="w-8 h-8 laptop:w-6 laptop:h-6 rounded-full bg-seltronik-yellow border-2 border-yellow-600 shadow-lg"
                      animate={{
                        opacity: [0.2, 0.2, 1, 1, 0.2],
                        scale: [0.95, 0.95, 1, 1, 0.95],
                        boxShadow: [
                          '0 0 0 rgba(245, 158, 11, 0)',
                          '0 0 0 rgba(245, 158, 11, 0)',
                          '0 0 20px rgba(245, 158, 11, 0.8)',
                          '0 0 20px rgba(245, 158, 11, 0.8)',
                          '0 0 0 rgba(245, 158, 11, 0)'
                        ]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.3, 0.4, 0.7, 1]
                      }}
                    />
                    {/* Green Light */}
                    <motion.div
                      className="w-8 h-8 laptop:w-6 laptop:h-6 rounded-full bg-seltronik-green border-2 border-green-700 shadow-lg"
                      animate={{
                        opacity: [0.2, 0.2, 0.2, 1, 1],
                        scale: [0.95, 0.95, 0.95, 1, 1],
                        boxShadow: [
                          '0 0 0 rgba(16, 185, 129, 0)',
                          '0 0 0 rgba(16, 185, 129, 0)',
                          '0 0 0 rgba(16, 185, 129, 0)',
                          '0 0 20px rgba(16, 185, 129, 0.8)',
                          '0 0 20px rgba(16, 185, 129, 0.8)'
                        ]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.3, 0.4, 0.7, 1]
                      }}
                    />
                  </div>
                </div>
                
                {/* Loading Text */}
                <div className="text-center">
                  <motion.p 
                    className="text-white font-bold text-xl laptop:text-lg mb-1"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="text-white">Seltronik</span>
                  </motion.p>
                  <motion.div 
                    className="flex items-center justify-center space-x-1 text-seltronik-yellow"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                  >
                    <span className="w-1 h-1 laptop:w-0.5 laptop:h-0.5 bg-current rounded-full"></span>
                    <span className="w-1 h-1 laptop:w-0.5 laptop:h-0.5 bg-current rounded-full"></span>
                    <span className="w-1 h-1 laptop:w-0.5 laptop:h-0.5 bg-current rounded-full"></span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
            </div>
          </ErrorProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}
