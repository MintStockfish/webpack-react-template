import { buildLoaders } from "./buildLoaders.js";
import { buildPlugins } from "./buildPlugins.js";

export function buildWebpack(options) {
    const { mode, paths } = options;

    return {
        mode: mode ?? "development",
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: "[name].[contenthash].js",
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: {
            extensions: [".js"],
            alias: {
                "@": paths.src,
            },
        },
        devServer: {
            port: options.port ?? 8080,
            open: true,
            historyApiFallback: true,
            hot: true,
        },

        optimization: {
            splitChunks: {
                chunks: "all",
            },
            runtimeChunk: "single",
            moduleIds: "deterministic",
        },
    };
}
