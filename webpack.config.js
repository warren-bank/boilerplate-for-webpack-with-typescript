import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tsloader = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules(?![\/\\](?:buffer|keccak))/,
    loader: 'ts-loader',
    options: {
        projectReferences: true,
        transpileOnly: true,
    },
};

const common = {
    output: {
        path: path.resolve('dist'),
    },
    context: __dirname,
    mode: 'production',
    target: ['web', 'es5'],
    optimization: {
        minimize: false,
    },
};

const token = {
    ...common,
    entry: {
        token: path.resolve('src/token/token.ts'),
    },
    externals: {
        crypto: 'null',
    },
    module: {
        rules: [tsloader],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            buffer: 'buffer/',
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
};

export default [token];
