import type { Meta, StoryObj } from '@storybook/react';

import { LoginModal } from './LoginModal';

const meta: Meta<typeof LoginModal> = {
    title: 'feautures/LoginModal',
    component: LoginModal,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
