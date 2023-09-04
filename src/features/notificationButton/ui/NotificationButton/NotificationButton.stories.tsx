import type { Meta, StoryObj } from '@storybook/react';

import { NotificationButton } from './NotificationButton';

const meta: Meta<typeof NotificationButton> = {
    title: 'features/NotificationButton',
    component: NotificationButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
