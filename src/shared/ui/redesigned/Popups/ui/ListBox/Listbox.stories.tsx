import type { Meta, StoryObj } from '@storybook/react';

import { ListBox } from './ListBox';

const meta: Meta<typeof ListBox> = {
    title: 'shared/ListBox',
    component: ListBox,
    decorators: [
        (Story) => {
            return (
                <div style={{ padding: 100 }}>
                    <Story />
                </div>
            );
        },
    ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TopRight: Story = {
    args: {
        direction: 'top right',
        value: 'title',
        items: [
            { content: '123123123123123', value: '1' },
            { content: '12312421341234123', value: '2' },
            { content: '12341235', value: '3' },
        ],
    },
};

export const TopLeft: Story = {
    args: {
        direction: 'top left',
        value: 'title',
        items: [
            { content: '123123123123123', value: '1' },
            { content: '12312421341234123', value: '2' },
            { content: '12341235', value: '3' },
        ],
    },
};

export const BottomLeft: Story = {
    args: {
        direction: 'bottom left',
        value: 'title',
        items: [
            { content: '123123123123123', value: '1' },
            { content: '12312421341234123', value: '2' },
            { content: '12341235', value: '3' },
        ],
    },
};

export const BottomRight: Story = {
    args: {
        direction: 'bottom right',
        value: 'title',
        items: [
            { content: '123123123123123', value: '1' },
            { content: '12312421341234123', value: '2' },
            { content: '12341235', value: '3' },
        ],
    },
};
