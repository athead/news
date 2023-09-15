import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AppLink, AppLinkTheme } from './AppLink';

const meta: Meta<typeof AppLink> = {
    title: 'shared/AppLink',
    component: AppLink,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { children: 'Link', theme: AppLinkTheme.PRIMARY },
};

export const Secondary: Story = {
    args: { children: 'Link', theme: AppLinkTheme.SECONDARY },
};

export const PrimaryDark: Story = {
    args: { children: 'Link', theme: AppLinkTheme.PRIMARY },
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
