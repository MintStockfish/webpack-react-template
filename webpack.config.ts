import type { Configuration } from "webpack";
import type { BuildOptions } from "./webpack/types.js";
import path from "path";

import buildWebpack from "./webpack/buildWebpack.js";

interface EnvParams {
    mode?: "development" | "production" | "none";
    port?: string;
    analyzer?: string | boolean;
}

export default (env: EnvParams = {}): Configuration => {
    const paths: BuildOptions["paths"] = {
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: path.resolve(__dirname, "dist"),
        public: path.resolve(__dirname, "src", "public"),
        html: path.resolve(__dirname, "src", "index.html"),
        src: path.resolve(__dirname, "src"),
    };

    const options: BuildOptions = {
        mode: env.mode ?? "development",
        port: env.port ? parseInt(env.port, 10) : 3000,
        analyzer: env.analyzer === true || env.analyzer === "true",
        paths,
    };

    const config: Configuration = buildWebpack(options);

    return config;
};
