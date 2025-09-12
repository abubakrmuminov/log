/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
          950: '#2d1b1b',
        },
        dark: {
          900: '#1a1a1a',
          800: '#2a1f1f',
          700: '#3a2a2a',
          600: '#4a3535',
          500: '#5a4040',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'warm-glow': 'warmGlow 2s ease-in-out infinite alternate',
        'pulse-warm': 'pulseWarm 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        warmGlow: {
          '0%': { boxShadow: '0 0 5px #cd853f, 0 0 10px #cd853f, 0 0 15px #cd853f' },
          '100%': { boxShadow: '0 0 10px #cd853f, 0 0 20px #cd853f, 0 0 30px #cd853f' },
        },
        pulseWarm: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}