import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildLoaders({ mode }) {
    const isDev = mode === "development";
    const isProd = mode === "production";

    const loaders = [
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
