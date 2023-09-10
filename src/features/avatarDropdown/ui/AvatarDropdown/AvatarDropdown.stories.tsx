import type { Meta, StoryObj } from '@storybook/react';

import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof AvatarDropdown> = {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: { direction: 'bottom right', fallbackInverted: false },
};

Normal.decorators = [StoreDecorator({ user: { _isInit: true, authData: { id: '1' } } })];
