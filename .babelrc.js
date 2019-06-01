module.exports = {
  plugins: [
    ['reshadow/babel', {
      files: /\.css$/,
      postcss: true,
    }],
    '@babel/plugin-proposal-class-properties',
    'react-hot-loader/babel',
  ],
  presets: [
    '@babel/preset-react',
    '@babel/env',
  ],
};
