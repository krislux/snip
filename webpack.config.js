"use strict";

const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Define settings
module.exports = {
    mode: "development", // "production" | "development" | "none"

    entry: path.resolve(__dirname, "src/assets/js/app.js"),

    output: {
        path: path.resolve(__dirname, "public"),
        filename: "js/app.js"
    },

    module: {
        rules: [{
            test: /\.js$/,
            include: [
                path.resolve(__dirname, "src/assets/js")
            ],
            loader: "babel-loader",
            options: {
                presets: ["es2015"]
            }
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        url: false
                    },
                },
                'sass-loader',
            ]
        }]
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/app.css'
        })
    ]
};
