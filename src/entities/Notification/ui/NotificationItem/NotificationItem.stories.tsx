import type { Meta, StoryObj } from '@storybook/react';

import { NotificationItem } from './NotificationItem';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof NotificationItem> = {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        item: {
            id: '2',
            title: 'Уведомление 2',
            description: 'Второе уведомление',
            href: 'http://ya.ru',
        },
    },
};

Normal.decorators = [StoreDecorator({})];
