import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
    title: 'widgets/Navbar',
    component: Navbar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
};

Light.decorators = [
    StoreDecorator({
        user: { authData: undefined },
    }),
];

export const AuthLight: Story = {
    args: {},
};

AuthLight.decorators = [
    StoreDecorator({
        user: { authData: { id: '1', username: 'admin' } },
    }),
];

export const Dark: Story = {
    args: {},
};

Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        user: { authData: undefined },
    }),
];
