import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import AvatarImg from 'shared/assets/test/avatar.jpg';
import { ProfileCard } from './ProfileCard';

const meta: Meta<typeof ProfileCard> = {
    title: 'entites/ProfileCard',
    component: ProfileCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        data: {
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
};

Primary.decorators = [StoreDecorator({})];

export const Dark: Story = {
    args: {
        data: {
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
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const WithError: Story = {
    args: { error: 'true' },
};
WithError.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const Loading: Story = {
    args: { isLoading: true },
};

Primary.decorators = [StoreDecorator({})];
