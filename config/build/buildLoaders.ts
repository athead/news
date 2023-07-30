import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    // Загрузчик babel
    const babelLoader = {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true,
                        },
                    ],
                ],
            },
        },
    };

    // Загрузчик картинок
    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };
    // Загрузчик svg
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };
    // Если не используем TS - нужен babel-loader
    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };
    const sassLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? MiniCssExtractPlugin.loader : 'style-loader',
            // Translates CSS into CommonJS
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: /\.module.?/,
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:4]'
                            : '[hash:base64:6]',
                    },
                },
            },
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };
    return [fileLoader, svgLoader, babelLoader, tsLoader, sassLoader];
}
