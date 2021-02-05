const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require("path");

module.exports = {
  entry: {
    resources: './src/js/vue/resources.js',
    main: './src/js/vue/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('web/js', 'vue')
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/js/vue/index.html',
    }),
    new VueLoaderPlugin(),
  ],
};