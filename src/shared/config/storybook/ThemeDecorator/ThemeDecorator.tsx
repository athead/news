import { StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn) => {
    return (
        <div className={`app ${theme}`}>
            <Story />
        </div>
    );
};
