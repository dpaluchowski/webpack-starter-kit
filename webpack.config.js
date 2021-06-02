const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminWebpWebpackPlugin= require('imagemin-webp-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: 'web',
    performance: {
        hints: false
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({template: 'index.html', inject: false }),
        new ImageminWebpWebpackPlugin({
            config: [{
                test: /\.(png|jpe?g|gif)$/i,
                type: 'src',
            }],
        }),
        new CopyPlugin({
            patterns: [
                { from: "public", to: "" },
            ],
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/*']
        }),
    ],
    entry: ['./src/index.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: path.resolve(__dirname, 'public/**/*.*'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'icons/',
                        }
                    }
                ]
            },
        ],
    },
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        compress: true,
        port: 9000,
        hot: true,
        open: true,
    },
}