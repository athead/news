import type { Meta, StoryObj } from '@storybook/react';

import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
    title: 'shared/StarRating',
    component: StarRating,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
