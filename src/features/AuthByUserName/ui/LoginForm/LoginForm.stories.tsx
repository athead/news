import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'features/AuthByUsername/LoginForm',
    component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
Primary.decorators = [
    StoreDecorator({
        loginForm: { username: '123', password: '123' },
    }),
];

export const Error: Story = {
    args: {},
};
Error.decorators = [
    StoreDecorator({
        loginForm: { username: '123', password: '123', error: 'ERROR' },
    }),
];

export const Loading: Story = {
    args: {},
};
Loading.decorators = [
    StoreDecorator({
        loginForm: { username: '123', password: '123', isLoading: true },
    }),
];
