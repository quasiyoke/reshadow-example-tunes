const path = require('path');
const merge = require('webpack-merge');
const parts = require('./config/webpackParts');

const PATHS = {
  template: path.resolve(__dirname, 'src/index.html'),
};

module.exports = merge([
  parts.page({
    template: PATHS.template,
    title: 'Reshadow Tunes',
  }),
  parts.devServer(),
]);
