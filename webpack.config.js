const webpack = require('webpack');

module.exports = {
  entry: {
    common: ['./src/common'],
    a: ['./src/a'],
    b: ['./src/b'],
  },
  output: {
    path: './dev-server/build',
    filename: '[name]/[name].min.js',
    libraryTarget: 'umd',
    library: '[name]'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b'],
    }),
  ]
};