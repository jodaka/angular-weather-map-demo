/* eslint-env node */
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const packageName = 'app'
const folderBuild = path.join(__dirname, 'dist')
const folderSrc = path.join(__dirname, 'src')
const entryIndexJs = path.join(folderSrc, 'application/app.js')
const fileJsConcatenated = 'scripts/' + packageName + '.js'

const devServerHost = 'localhost'
const devServerPort = '8822'

module.exports = {
  context: folderSrc,
  devtool: 'inline-source-map',
  devServer: {
    host: devServerHost,
    port: devServerPort,
    contentBase: './src/public',
    stats: 'minimal',
    inline: true,
    hot: true
  },
  entry: [
    'babel-polyfill',
    entryIndexJs
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?presets[]=es2015'
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer]
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(html)$/,
        loader: 'ngtemplate-loader!html-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([folderBuild]),
    new CopyWebpackPlugin([
      {
        from: path.join(folderSrc, '/index.html'),
        to: path.join(folderBuild, '/index.html')
      }
    ]),
    new StyleLintWebpackPlugin({
      configFile: '.stylelintrc',
      failOnError: false,
      files: './styles/**/*.scss'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  output: {
    path: folderBuild,
    filename: fileJsConcatenated
  }
}

