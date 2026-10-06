import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          terracotta: '#d0551d',
          amber: '#F5A623',
          cream: '#FFF3E0',
          chocolate: '#4A2E1B',
        },
        paper: '#FFF3E0',
        ink: '#4A2E1B',
        amber: '#F5A623',
      },
      fontFamily: {
        heading: ['"Cooper Black Web"', '"Cooper Black"', '"Cooper Std Black"', '"Arial Rounded MT Bold"', 'sans-serif'],
        small: ['"Original Surfer"', 'cursive'],
        accent: ['"Pacifico"', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
