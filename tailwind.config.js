/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1fe',
          100: '#cce3fc',
          200: '#99c7f9',
          300: '#66abf6',
          400: '#338ff3',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        accent: {
          50: '#e6fbf5',
          100: '#ccf7eb',
          200: '#99efd7',
          300: '#66e7c3',
          400: '#33dfaf',
          500: '#00d7a0',
          600: '#00ac80',
          700: '#008160',
          800: '#005640',
          900: '#002b20',
        },
        dark: {
          50: '#f0f0f5',
          100: '#e0e1eb',
          200: '#c1c3d6',
          300: '#a2a5c2',
          400: '#8387ad',
          500: '#666a99',
          600: '#4f537a',
          700: '#383c5c',
          800: '#21253d',
          900: '#0a0e1f',
          950: '#050810',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
