import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';
import AvatarImg from '../../assets/test/avatar.jpg';

const meta: Meta<typeof Avatar> = {
    title: 'shared/Avatar',
    component: Avatar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { size: 150, src: AvatarImg },
};
