const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, './www'),
    filename: 'bundle.js',
    chunkFilename: 'chunk[id].js'
  },

  devtool: 'source-map',

  devServer: {
    contentBase: './www'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ]
}
