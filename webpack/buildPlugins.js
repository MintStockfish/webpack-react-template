import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins({ mode, paths, analyzer }) {
    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.public, "icon.png"),
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __IS_PROD__: JSON.stringify(isProd),
            "process.env.NODE_ENV": JSON.stringify(mode),
        }),
    ];

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin());
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
}
