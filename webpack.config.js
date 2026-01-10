const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const plugins = [
    new HtmlWebpackPlugin({
        title: "Мой крутой проект",
        template: "./src/index.html",
        favicon: "./src/public/icon.png",
    }),
];

if (process.env.ANALYZE) {
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = (env) => {
    const isAnalyze = env.analyze;

    const plugins = [
        new HtmlWebpackPlugin({
            title: "Мой крутой проект",
            template: "./src/index.html",
            favicon: "./src/public/icon.png",
        }),
    ];

    if (isAnalyze) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return {
        mode: "development",

        entry: "./src/index.js",

        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },

        devtool: "inline-source-map",

        devServer: {
            static: "./dist",
            hot: true,
        },

        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },

        plugins: plugins,

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "images/[name]-[hash][ext][query]",
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "fonts/[name]-[hash][ext][query]",
                    },
                },
                {
                    test: /\.(csv|tsv)$/i,
                    use: ["csv-loader"],
                },
                {
                    test: /\.xml$/i,
                    use: ["xml-loader"],
                },
            ],
        },
    };
};
