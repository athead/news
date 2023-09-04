import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
// import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { CommentList } from './CommentList';

const meta: Meta<typeof CommentList> = {
    title: 'entities/Comment/CommentList',
    component: CommentList,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        comments: [
            {
                id: '1',
                text: 'hello world',
                user: { id: '1', username: 'Vasya' },
            },
            {
                id: '2',
                text: 'Comment 2',
                user: { id: '1', username: 'Petya' },
            },
        ],
    },
};

// Normal.decorators = [StoreDecorator({})];

export const Dark: Story = {
    args: {
        comments: [
            {
                id: '1',
                text: 'hello world',
                user: { id: '1', username: 'Vasya' },
            },
            {
                id: '2',
                text: 'Comment 2',
                user: { id: '1', username: 'Petya' },
            },
        ],
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading: Story = {
    args: {
        comments: [],
        isLoading: true,
    },
};

// Loading.decorators = [StoreDecorator({})];
