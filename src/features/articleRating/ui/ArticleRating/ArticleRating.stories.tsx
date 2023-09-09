import type { Meta, StoryObj } from '@storybook/react';

import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof ArticleRating> = {
    title: 'features/ArticleRating',
    component: ArticleRating,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: { articleId: '1' },
    parameters: {
        mockData: [
            {
                url: `${__API__}/article-ratings?userId=1&articleId=1`,
                method: 'GET',
                status: 200,
                response: [
                    {
                        rate: 4,
                    },
                ],
            },
        ],
    },
};

Normal.decorators = [StoreDecorator({})];

export const WithoutRating: Story = {
    args: { articleId: '1' },
};

WithoutRating.decorators = [StoreDecorator({})];
