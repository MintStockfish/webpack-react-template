import type {
    Configuration,
    RuleSetRule,
    WebpackPluginInstance,
} from "webpack";

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export interface BuildPaths {
    entry: string;
    output: string;
    public: string;
    html: string;
    src: string;
}

export interface BuildOptions {
    mode: "development" | "production" | "none";
    port: number;
    analyzer: boolean;
    paths: BuildPaths;
}

export interface BuildLoadersOptions {
    mode: BuildOptions["mode"];
    isDev: boolean;
    isProd: boolean;
}

export interface BuildPluginsOptions extends Omit<BuildOptions, "mode"> {
    mode: BuildOptions["mode"];
    isDev: boolean;
    isProd: boolean;
}

export type LoadersResult = RuleSetRule[];
export type PluginsResult = WebpackPluginInstance[];

export interface BuildWebpackOptions extends BuildOptions {
    isDev: boolean;
    isProd: boolean;
}

export type BuildConfigResult = Configuration & {
    devServer?: DevServerConfiguration;
};
