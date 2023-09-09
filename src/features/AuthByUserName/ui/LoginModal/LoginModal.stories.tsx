import type { Meta, StoryObj } from '@storybook/react';

import { LoginModal } from './LoginModal';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof LoginModal> = {
    title: 'features/AuthByUsername/LoginModal',
    component: LoginModal,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { isOpen: true },
};

Primary.decorators = [
    StoreDecorator({
        loginForm: { username: '123', password: '123' },
    }),
];
