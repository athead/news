import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import AvatarImg from '@/shared/assets/test/avatar.jpg';
import ProfilePage from './ProfilePage';

const meta: Meta<typeof ProfilePage> = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};

Normal.decorators = [
    StoreDecorator({
        profile: {
            form: {
                firstname: 'Иван',
                lastname: 'Иванов',
                age: 221,
                currency: Currency.RUB,
                country: Country.Russia,
                city: 'Moscow',
                username: 'admin',
                avatar: AvatarImg,
            },
        },
    }),
];

export const Dark: Story = {
    args: {},
};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                firstname: 'Иван',
                lastname: 'Иванов',
                age: 221,
                currency: Currency.RUB,
                country: Country.Russia,
                city: 'Moscow',
                username: 'admin',
                avatar: AvatarImg,
            },
        },
    }),
];
