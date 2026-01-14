import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type { BuildPluginsOptions, PluginsResult } from './types.js';

export function buildPlugins(options: BuildPluginsOptions): PluginsResult {
    const { mode, paths, analyzer, isDev, isProd } = options;

    const plugins: PluginsResult = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.public, 'icon.png'),
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __IS_PROD__: JSON.stringify(isProd),
            'process.env.NODE_ENV': JSON.stringify(mode),
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(options.paths.root, 'tsconfig.json'),
            },
        }),
    ];

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        );
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
}
