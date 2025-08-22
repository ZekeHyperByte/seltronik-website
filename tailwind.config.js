/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'seltronik-red': '#EF4444',
        'seltronik-yellow': '#FBC02D',
        'seltronik-green': '#4CAF50',
        'seltronik-dark': '#1F2937',
        'seltronik-gray': '#6B7280',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'traffic-red': 'trafficRed 6s infinite',
        'traffic-yellow': 'trafficYellow 6s infinite',
        'traffic-green': 'trafficGreen 6s infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        trafficRed: {
          '0%, 33%': { filter: 'drop-shadow(0 0 10px #EF4444)' },
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
