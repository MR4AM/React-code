const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom','react-router']
  },
  output: {
    path: path.join(__dirname, 'dist/dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist/dll','[name]-manifest.json'),

      name: '[name]_library'
    })
  ]
};