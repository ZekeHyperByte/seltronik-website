/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      colors: {
        'seltronik-red': '#6f1520',
        'seltronik-red-hover': '#8a1a28',
        'seltronik-yellow': '#FBC02D',
        'seltronik-green': '#4CAF50',
        'seltronik-dark': '#1F2937',
        'seltronik-gray': '#6B7280',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Responsive font sizes
        'responsive-xs': ['clamp(0.75rem, 2vw, 0.875rem)', { lineHeight: '1.25rem' }],
        'responsive-sm': ['clamp(0.875rem, 2.5vw, 1rem)', { lineHeight: '1.5rem' }],
        'responsive-base': ['clamp(1rem, 3vw, 1.125rem)', { lineHeight: '1.75rem' }],
        'responsive-lg': ['clamp(1.125rem, 3.5vw, 1.25rem)', { lineHeight: '1.75rem' }],
        'responsive-xl': ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '2rem' }],
        'responsive-2xl': ['clamp(1.5rem, 5vw, 2.25rem)', { lineHeight: '2.5rem' }],
        'responsive-3xl': ['clamp(1.875rem, 6vw, 3rem)', { lineHeight: '1.2' }],
        'responsive-4xl': ['clamp(2.25rem, 7vw, 3.75rem)', { lineHeight: '1.1' }],
        'responsive-5xl': ['clamp(3rem, 8vw, 4.5rem)', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        // Responsive spacing
        'responsive-xs': 'clamp(0.5rem, 2vw, 1rem)',
        'responsive-sm': 'clamp(1rem, 3vw, 1.5rem)',
        'responsive-md': 'clamp(1.5rem, 4vw, 2rem)',
        'responsive-lg': 'clamp(2rem, 5vw, 3rem)',
        'responsive-xl': 'clamp(3rem, 6vw, 4rem)',
        'responsive-2xl': 'clamp(4rem, 8vw, 6rem)',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        'screen': '100vh',
        'screen-75': '75vh',
        'screen-50': '50vh',
        'screen-25': '25vh',
      },
      animation: {
        'traffic-red': 'trafficRed 6s infinite',
        'traffic-yellow': 'trafficYellow 6s infinite',
        'traffic-green': 'trafficGreen 6s infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        trafficRed: {
          '0%, 33%': { filter: 'drop-shadow(0 0 10px #6f1520)' },
          '34%, 100%': { filter: 'none' },
        },
        trafficYellow: {
          '0%, 32%': { filter: 'none' },
          '33%, 66%': { filter: 'drop-shadow(0 0 10px #FBC02D)' },
          '67%, 100%': { filter: 'none' },
        },
        trafficGreen: {
          '0%, 65%': { filter: 'none' },
          '66%, 100%': { filter: 'drop-shadow(0 0 10px #4CAF50)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 40px 0 rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    // Custom plugin for responsive utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Container utilities
        '.container-padding': {
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen sm': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
          '@screen lg': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8'),
          },
        },
        '.container-padding-x': {
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen sm': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
          '@screen lg': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8'),
          },
        },
        '.container-padding-y': {
          paddingTop: theme('spacing.12'),
          paddingBottom: theme('spacing.12'),
          '@screen md': {
            paddingTop: theme('spacing.16'),
            paddingBottom: theme('spacing.16'),
          },
          '@screen lg': {
            paddingTop: theme('spacing.20'),
            paddingBottom: theme('spacing.20'),
          },
        },
        
        // Section utilities
        '.section-padding': {
          paddingTop: theme('spacing.12'),
          paddingBottom: theme('spacing.12'),
          '@screen md': {
            paddingTop: theme('spacing.16'),
            paddingBottom: theme('spacing.16'),
          },
          '@screen lg': {
            paddingTop: theme('spacing.20'),
            paddingBottom: theme('spacing.20'),
          },
        },
        
        // Card utilities
        '.card-padding': {
          padding: theme('spacing.4'),
          '@screen md': {
            padding: theme('spacing.6'),
          },
          '@screen lg': {
            padding: theme('spacing.8'),
          },
        },
        
        // Typography utilities
        '.text-responsive': {
          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
          lineHeight: '1.5',
        },
        '.heading-responsive': {
          fontSize: 'clamp(1.5rem, 5vw, 3rem)',
          lineHeight: '1.2',
          fontWeight: theme('fontWeight.bold'),
        },
        
        // Layout utilities
        '.safe-padding-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-padding-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-padding-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-padding-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        
        // Touch target utilities
        '.touch-target': {
          minHeight: '44px',
          minWidth: '44px',
        },
        
        // Scroll utilities
        '.scroll-smooth-ios': {
          '-webkit-overflow-scrolling': 'touch',
          'scroll-behavior': 'smooth',
        },
        
        // Hide scrollbar
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        
        // Backdrop utilities
        '.backdrop-blur-ios': {
          '-webkit-backdrop-filter': 'blur(8px)',
          'backdrop-filter': 'blur(8px)',
        },
      }
      
      addUtilities(newUtilities)
    }
  ],
}
