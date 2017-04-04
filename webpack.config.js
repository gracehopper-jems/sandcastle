const webpack = require('webpack'); 

module.exports = {
  entry: './browser/main.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'API': JSON.stringify(process.env.API), 
        'AUTH': JSON.stringify(process.env.AUTH), 
        'DB': JSON.stringify(process.env.DB)
      }
  })], 
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};