import type { Meta, StoryObj } from '@storybook/react';

import AdminPanelPage from './AdminPanelPage';

const meta: Meta<typeof AdminPanelPage> = {
    title: 'pages/AdminPanelPage',
    component: AdminPanelPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
