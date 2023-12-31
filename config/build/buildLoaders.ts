import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildSassLoader } from './loaders/buildSassLoader';
import { buildScopedCssLoader } from './loaders/buildScopedCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;
    // Загрузчик babel
    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    // Загрузчик картинок и шрифтов
    const fileLoader = {
        test: /\.(ttf|png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    // Загрузчик svg
    const svgLoader = {
        test: /\.svg$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true
                            }
                        }
                    ]
                }
            }
    }],
    };
   
      
    // Если не используем TS - нужен babel-loader
    // const tsLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };
    const sassLoader = buildSassLoader(isDev);
    const scopedCssLoader = buildScopedCssLoader();
    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        scopedCssLoader,
        // tsLoader,
        sassLoader,
    ];
}
