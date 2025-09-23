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
      // Imágenes (usa asset/resource para no depender de heurística y evitar parseo JS)
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash:8][ext]'
        }
      },
      // Videos / medios pesados
      {
        test: /\.(mp4|mov|avi|webm)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/media/[name].[hash:8][ext]'
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
      // Cambiado a .ico porque favicon.svg no existe en /public y causaba error
      favicon: path.resolve(__dirname, 'public/favicon.ico')
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
