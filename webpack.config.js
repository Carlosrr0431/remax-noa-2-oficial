const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|gif|mp4|mov|avi|webm|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[name].[hash:8][ext]'
        }
      }
    ]
  },
  
  resolve: {
    extensions: ['.js', '.jsx']
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.svg')
    })
  ],
  
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
        publicPath: '/'
      }
    ],
    historyApiFallback: true,
    port: 3001,
    hot: true,
    open: true
  },
  
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map'
};
