import webpack, { RuleSetRule } from 'webpack';
import { BuildPaths } from '../build/types/config';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        entry: '',
        html: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    config.resolve?.extensions?.push('.ts', 'tsx');
    config.resolve?.modules?.push(paths.src);

    // ТАК ДЕЛАТЬ НЕ СТОИТ, НАДО РАЗОБРАТЬСЯ
    const webpackRules = config!.module!.rules as RuleSetRule[];
    // eslint-disable-next-line no-param-reassign
    config.module!.rules = webpackRules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config.module?.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config.module?.rules?.push(buildCssLoader(true));

    return config;
};