import type { Meta, StoryObj } from '@storybook/react';

import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof NotificationList> = {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: [
                    {
                        id: '1',
                        title: 'Уведомление 1',
                        description: 'Первое уведомление',
                    },
                    {
                        id: '2',
                        title: 'Уведомление 2',
                        description: 'Второе уведомление',
                        href: 'http://ya.ru',
                    },
                ],
            },
        ],
    },
};

Normal.decorators = [StoreDecorator({})];
