module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-css-variables': {},
    'postcss-svg': {},
    autoprefixer: {
      grid: true
    },
    cssnano: {
      removeQuotes: false
    }
  }
}
