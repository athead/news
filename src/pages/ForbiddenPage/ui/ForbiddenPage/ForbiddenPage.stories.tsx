import type { Meta, StoryObj } from '@storybook/react';

import { ForbiddenPage } from './ForbiddenPage';

const meta: Meta<typeof ForbiddenPage> = {
    title: 'pages/ForbiddenPage',
    component: ForbiddenPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
