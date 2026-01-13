import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { BuildLoadersOptions, LoadersResult } from "./types.js";

export function buildLoaders(options: BuildLoadersOptions): LoadersResult {
    const { isDev, isProd } = options;

    const loaders: LoadersResult = [
        {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: "asset/resource",
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [["@babel/preset-env", { targets: "defaults" }]],
                },
            },
        },
        {
            test: /\.tsx?$/,
            use: [
                {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
            ],
            exclude: /node_modules/,
        },
    ];

    if (isDev) {
        loaders.push({
            test: /\.css$/i,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            namedExport: false,
                            localIdentName: "[path][name]__[local]",
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
                    loader: "css-loader",
                    options: {
                        modules: {
                            namedExport: false,
                            localIdentName: "[hash:base64:8]",
                        },
                    },
                },
            ],
        });
    }

    return loaders;
}
