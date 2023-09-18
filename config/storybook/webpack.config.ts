import path from 'path';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { BuildPaths } from '../build/types/config';
import { buildSassLoader } from '../build/loaders/buildSassLoader';
import { buildScopedCssLoader } from '../build/loaders/buildScopedCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        entry: '',
        html: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: '',
    };
    config.resolve!.extensions!.push('.ts', 'tsx');
    config.resolve!.modules!.push(paths.src);
    config.resolve!.alias = {
        ...config.resolve!.alias,
        '@': paths.src,
    };
    // ТАК ДЕЛАТЬ НЕ СТОИТ, НАДО РАЗОБРАТЬСЯ
    const webpackRules = config!.module!.rules as RuleSetRule[];
    // eslint-disable-next-line no-param-reassign
    // @ts-ignore
    config!.module!.rules = webpackRules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config!.module!.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    
    config!.module!.rules.push(buildScopedCssLoader());
    config!.module!.rules.push(buildSassLoader(true));

    config!.plugins!.push(
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify('http://testapi.ru'),
            __PROJECT__: JSON.stringify('storybook'),
        }),
    );
    return config;
};
