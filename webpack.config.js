/* eslint-env node */
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const packageName = 'app';
const folderBuild = path.join(__dirname, 'dist');
const folderSrc = path.join(__dirname, 'src');
const entryIndexJs = path.join(folderSrc, 'application/app.js');
const fileJsConcatenated = `scripts/${packageName}.js`;

const jsonconf = require('./src/config/dev.json');

const devServerHost = 'localhost';
const devServerPort = '8822';

console.log(path.resolve(__dirname, 'src/application'));

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
        'angular',
        'angular-sanitize',
        'angular-ui-router',
        'angular-openlayers-directive',
        entryIndexJs
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'src/application')
                ],
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
                            plugins () {
                                return [autoprefixer];
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
                test: /\.(html)$/,
                loader: 'ngtemplate-loader!html-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([folderBuild]),
        new CopyWebpackPlugin([{
            from: `${__dirname}/src/public`
        }]),
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
        }),
        new webpack.DefinePlugin({
            WEBPACK_JSONCONF: JSON.stringify(jsonconf)
        })
    ],
    output: {
        path: folderBuild,
        filename: fileJsConcatenated
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src/application'),
            path.resolve(__dirname, 'src/styles'),
            'node_modules'
        ]
    }
};

