const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        app: [
            'react-app-polyfill/stable',
            path.join(__dirname, 'src', 'index.js'),
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.join(__dirname, 'src', 'components'),
            api: path.join(__dirname, 'src', 'api')
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/,
                use:  [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'}
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    devServer: {
        historyApiFallback: true,
    }
}