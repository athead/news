import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
    title: 'widgets/Loader',
    component: Loader,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
