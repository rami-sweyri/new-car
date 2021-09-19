module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    theme: {
      colors: {
        mainBgColor: '#212121',
        mainTextColor: '#212121',
        mainlightTextColor: '#F8F8F8',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
