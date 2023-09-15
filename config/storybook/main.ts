import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        { name: '@storybook/addon-essentials', options: { background: false } },
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        // '@storybook/addon-actions',
        'storybook-addon-mock',
        'storybook-react-i18next',
        'storybook-addon-themes',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    // Поддержка для loki
    // features: {
    //     storyStoreV7: false,
    // },
};
export default config;
