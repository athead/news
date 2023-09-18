import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
    title: 'shared/Text',
    component: Text,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { title: 'Title', text: 'Description' },
};

export const Error: Story = {
    args: { title: 'Error', text: 'Description', variant: 'error' },
};

export const Accent: Story = {
    args: { title: 'Error', text: 'Description', variant: 'accent' },
};

export const OnlyTitle: Story = {
    args: { title: 'Title' },
};

export const OnlyDescription: Story = {
    args: { text: 'Description' },
};

export const SizeS: Story = {
    args: { title: 'Title', text: 'Description', size: 's' },
};

export const SizeM: Story = {
    args: { title: 'Title', text: 'Description', size: 'm' },
};

export const SizeL: Story = {
    args: { title: 'Title', text: 'Description', size: 'l' },
};
