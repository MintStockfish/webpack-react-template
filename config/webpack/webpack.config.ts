import type { Configuration } from 'webpack';
import type { BuildOptions } from './types.js';
import path from 'path';

import buildWebpack from './buildWebpack.js';

interface EnvParams {
    mode?: 'development' | 'production' | 'none';
    port?: string;
    analyzer?: string | boolean;
}

export default (env: EnvParams = {}): Configuration => {
    const rootPath = path.resolve(__dirname, '../../');

    const paths: BuildOptions['paths'] = {
        entry: path.resolve(rootPath, 'src', 'index.tsx'),
        output: path.resolve(rootPath, 'dist'),
        public: path.resolve(rootPath, 'src', 'public'),
        html: path.resolve(rootPath, 'src', 'index.html'),
        src: path.resolve(rootPath, 'src'),
        root: rootPath,
    };

    const options: BuildOptions = {
        mode: env.mode ?? 'development',
        port: env.port ? parseInt(env.port, 10) : 3000,
        analyzer: env.analyzer === true || env.analyzer === 'true',
        paths,
    };

    const config: Configuration = buildWebpack(options);

    return config;
};
