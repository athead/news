import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticlesPageFilter } from './ArticlesPageFilter';

const meta: Meta<typeof ArticlesPageFilter> = {
    title: 'pages/ArticlesPageFilter',
    component: ArticlesPageFilter,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};

Normal.decorators = [StoreDecorator({})];

export const Dark: Story = {
    args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
