import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AppImage } from './AppImage';
import Img from '../../assets/test/avatar.jpg';

const meta: Meta<typeof AppImage> = {
    title: 'shared/AppImage',
    component: AppImage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { src: Img },
};

Primary.decorators = [ThemeDecorator(Theme.DARK)];
