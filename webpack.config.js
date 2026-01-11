import path from "path";
import { buildWebpack } from "./webpack/buildWebpack.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
    const paths = {
        entry: path.resolve(__dirname, "src", "index.js"),
        output: path.resolve(__dirname, "build"),
        public: path.resolve(__dirname, "src", "public"),
        html: path.resolve(__dirname, "src", "index.html"),
        src: path.resolve(__dirname, "src"),
    };

    const config = buildWebpack({
        mode: env.mode ?? "development",
        port: env.port ?? 8080,
        analyzer: env.analyzer ?? false,
        paths,
    });
    return config;
};
