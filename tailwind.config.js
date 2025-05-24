/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // <--- include app directory
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // keep this too
  ],
  theme: {
    extend: {
      fontFamily: {
        milker: ['Milker', 'serif'],
        brillant: ['Brillant', 'serif'],
        kugile: ['Kugile', 'serif'],
      },
      keyframes: {
        'infinite-scroll': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 20s linear infinite',
      },
      colors: {
        primary: 'var(--color-1)',
        secondary: 'var(--color-2)',
        accent: 'var(--color-3)',
        dark: 'var(--color-4)',
        darker: 'var(--color-5)',
        darkest: 'var(--color-6)',
      },
    },
  },
  plugins: [],
};
