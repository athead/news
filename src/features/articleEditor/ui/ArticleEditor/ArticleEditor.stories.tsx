import type { Meta, StoryObj } from '@storybook/react';

import { ArticleEditor } from './ArticleEditor';

const meta: Meta<typeof ArticleEditor> = {
    title: 'features/ArticleEditor',
    component: ArticleEditor,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};