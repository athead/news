import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextTheme } from './Text';

const meta: Meta<typeof Text> = {
    title: 'shared/Text',
    component: Text,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { title: 'Title', text: 'Description' },
};

export const Error: Story = {
    args: { title: 'Error', text: 'Description', theme: TextTheme.ERROR },
};

export const OnlyTitle: Story = {
    args: { title: 'Title' },
};

export const OnlyDescription: Story = {
    args: { text: 'Description' },
};

export const PrimaryDark: Story = {
    args: { title: 'Title', text: 'Description' },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark: Story = {
    args: { title: 'Title' },
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyDescriptionDark: Story = {
    args: { text: 'Description' },
};
OnlyDescriptionDark.decorators = [ThemeDecorator(Theme.DARK)];
