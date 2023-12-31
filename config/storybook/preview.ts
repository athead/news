import { Preview } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenceDecorator } from '../../src/shared/config/storybook/SuspenceDecorator/SuspenceDecorator';
import { Theme } from '../../src/shared/const/theme';
import i18n from './i18next';

const preview: Preview = {
    globals: {
        locale: 'en',
        locales: {
            en: { title: 'English', left: '', right: '🇬🇧' }, // flag needs
            ru: { title: 'Русский', left: '', right: '🇷🇺' },
        },
    },
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },

        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        i18n,

        layout: 'fullscreen',

        themes: {
            default: 'light',
            list: [
                { name: 'light', class: Theme.LIGHT, color: '#ffffff' },
                { name: 'dark', class: Theme.DARK, color: '#000000' },
            ],
        },
    },
    decorators: [StyleDecorator, ThemeDecorator(Theme.LIGHT), RouterDecorator, SuspenceDecorator],
};

export default preview;
