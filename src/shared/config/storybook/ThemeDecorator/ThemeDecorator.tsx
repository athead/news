import { StoryFn } from '@storybook/react';
import { Theme, ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';

export const ThemeDecorator = (theme: Theme) => {
    return (Story: StoryFn) => {
        return (
            <ThemeProvider initialTheme={theme}>
                <div className={`app ${theme}`}>
                    <Story />
                </div>
            </ThemeProvider>
        );
    };
};
