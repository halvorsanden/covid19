const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: './src/index',
  
    resolve: {
      extensions: ['.js', '.jsx']
    },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      },
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
