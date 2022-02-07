const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  // prefix: 'tw-',
  theme: {
    colors: {
      success: '#00D67D',
      negative: '#CC2E2E',
      pending: '#FFC82C',
      black: '#000000',
      white: '#FFFFFF',
      transparent: 'transparent',
      warning: '#EBA350',

      dark: {
        default: '#000',
        100:'#000'
      },
      blue: {
        default: '#206CE0',
        base: '#121742',
        dark: '#1956b4',
        pale: '#E8F7FF',
        light: '#372A96',
        100: '#407BFF'
      },
      yellow: {
        default: '#FFC82C',
        dark: '#FDD400',
        light: '#FFD55F',
        pale: '#FFFADE',
      },

      orange: {
        default: '#F5A03A',
        light: '#ffd6a5',
      },

      green: {
        default: '#00D67D',
        dark: '#11698E',
        deep: '#3D8962',
        light: 'rgba(26, 213, 152, 0.4)',
        pale: '#1AD598',
        100: '#33B575'
      },

      red: {
        default: '#CC2E2E',
        dark: '#FF4765',
        light: '#FFA3B1',
        pale: '#FFFADE',
      },

      gray: {
        100: '#323643',
        200: '#444854',
        300: '#575A65',
        400: '#F1F1F1',
        500: '#EEEEEE',
        600:'#DEDEDE',
        dark: '#4D575E',
        base: '#7a7a7a',
        light: '#A6AAB4;',
      },

      smoke: {
        dark: '#9DA8B6',
        100: '#C0CCDA',
        200: '#D3DCE6',
        300: '#E0E6ED',
      },

      snow: {
        100: '#E5E9F2',
        200: '#EEF1F5',
        300: '#FAFAFA',
      },
    },
    fontSize: {
      subtext: '13px',
      default: '16px',
      large: '17px',
      medium: '.8rem',
      small: '.65rem',
      'body-2': '15px',
      h1: '48px',
      h2: '40px',
      h3: '32px',
      h4: '20px',
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    extend: {},
  },
  screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      sn: "700px",
      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
