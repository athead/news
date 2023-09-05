import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'shared/Skeleton',
    component: Skeleton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        width: '100%',
        height: 200,
    },
};

export const Circle: Story = {
    args: {
        width: 100,
        height: 100,
        borderRadius: '50%',
    },
};

export const PrimaryDark: Story = {
    args: {
        width: '100%',
        height: 200,
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const CircleDark: Story = {
    args: {
        width: 100,
        height: 100,
        borderRadius: '50%',
    },
};
CircleDark.decorators = [ThemeDecorator(Theme.DARK)];
