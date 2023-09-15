import type { Meta, StoryObj } from '@storybook/react';

import { ScrollToTopButton } from './ScrollToTopButton';

const meta: Meta<typeof ScrollToTopButton> = {
    title: 'features/ScrollToTopButton',
    component: ScrollToTopButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};