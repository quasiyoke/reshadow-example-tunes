const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.devServer = () => ({
  devServer: {
    overlay: true,
  },
});

exports.js = () => ({
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        use: [
          '@reshadow/webpack/loader',
          'babel-loader',
        ],
      },
    ],
  },
});

exports.page = ({
  template,
  title,
} = {}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      template,
      title,
    }),
  ],
});
