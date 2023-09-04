import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: { onTabClick: { action: 'onTabClick' } },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        tabs: [
            {
                value: 'tab 1',
                content: 'tab 1',
            },
            {
                value: 'tab 2',
                content: 'tab 2',
            },
            {
                value: 'tab 2',
                content: 'tab 2',
            },
        ],
        value: 'tab 2',
    },
};
