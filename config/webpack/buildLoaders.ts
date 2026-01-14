import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { BuildLoadersOptions, LoadersResult } from './types.js';
import path from 'path';

export function buildLoaders(options: BuildLoadersOptions): LoadersResult {
    const { isDev, isProd } = options;

    const loaders: LoadersResult = [
        {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('config/babel.config.js'),
                    presets: [
                        ['@babel/preset-env', { targets: 'defaults' }],
                        ['@babel/preset-react', { runtime: 'automatic' }],
                        '@babel/preset-typescript',
                    ],
                    plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
                },
            },
        },
    ];

    if (isDev) {
        loaders.push({
            test: /\.css$/i,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                            namedExport: false,
                            localIdentName: '[path][name]__[local]',
                        },
                    },
                },
            ],
        });
    }

    if (isProd) {
        loaders.push({
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                            namedExport: false,
                            localIdentName: '[hash:base64:8]',
                        },
                    },
                },
            ],
        });
    }

    return loaders;
}
