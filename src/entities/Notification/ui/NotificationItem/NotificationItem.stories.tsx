import type { Meta, StoryObj } from '@storybook/react';

import { NotificationItem } from './NotificationItem';

const meta: Meta<typeof NotificationItem> = {
    title: 'entities/NotificationItem',
    component: NotificationItem,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
