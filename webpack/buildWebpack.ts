import { buildLoaders } from "./buildLoaders.js";
import { buildPlugins } from "./buildPlugins.js";
import type { Configuration } from "webpack";
import type { BuildOptions, BuildWebpackOptions } from "./types.js";

export default function buildWebpack(options: BuildOptions): Configuration {
    const { mode, paths, port } = options;

    const isDev = mode === "development";
    const isProd = mode === "production";

    const buildOptions: BuildWebpackOptions = {
        ...options,
        isDev,
        isProd,
    };

    return {
        mode,
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: "[name].[contenthash].js",
            clean: true,
        },
        plugins: buildPlugins(buildOptions),
        module: {
            rules: buildLoaders(buildOptions),
        },
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js"],
            alias: {
                "@": paths.src,
            },
        },
        devServer: isDev
            ? {
                  port: port ?? 8080,
                  open: true,
                  historyApiFallback: true,
                  hot: true,
              }
            : undefined,

        optimization: {
            splitChunks: {
                chunks: "all",
            },
            runtimeChunk: "single",
            moduleIds: "deterministic",
        },
    };
}
