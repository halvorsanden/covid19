const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index',
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
        resolve: { extensions: ['.js', '.jsx'] },
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: 'COVID-19 status',
      appMountId: 'main',
      themeColour: '#212121',
      lang: 'en',
      minify: true,
      hash: true
    })
  ]
}
