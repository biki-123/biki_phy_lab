/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6ff', 100: '#d9eaff', 200: '#bcd9ff', 300: '#8ec1ff',
          400: '#599dff', 500: '#347aff', 600: '#1d5bf0', 700: '#1746d4',
          800: '#193bab', 900: '#1a3786', 950: '#142453',
        },
        accent: {
          50: '#e6fffa', 100: '#ccfff2', 200: '#99ffe5', 300: '#5fffd7',
          400: '#27f5b8', 500: '#0bdb98', 600: '#01b67c', 700: '#019366',
          800: '#067353', 900: '#075e44', 950: '#013328',
        },
        ink: {
          50: '#f6f7f9', 100: '#eceef2', 200: '#d4d8e1', 300: '#aab2c3',
          400: '#7c879e', 500: '#5a667d', 600: '#454f63', 700: '#3a4252',
          800: '#2d3340', 900: '#1d2230', 950: '#10131c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
