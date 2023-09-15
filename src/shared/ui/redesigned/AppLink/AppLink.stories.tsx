import type { Meta, StoryObj } from '@storybook/react';

import { AppLink } from './AppLink';

const meta: Meta<typeof AppLink> = {
    title: 'shared/AppLink',
    component: AppLink,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { children: 'Link', variant: 'primary' },
};

export const Red: Story = {
    args: { children: 'Link', variant: 'red' },
};
