import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Article, ArticleBlockType, ArticleType } from '@/entities/Article';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const article: Article = {
    id: '18',
    title: 'Научная статья - Биология',
    subtitle: 'БиологиЯ',
    img: 'https://img.freepik.com/free-vector/science-word-theme_23-2148540555.jpg?w=2000',
    views: 1022,
    createdAt: '26.02.2022',
    user: { id: '1', username: '123' },
    type: [ArticleType.SCIENCE],
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            text: 'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        },
        {
            id: '2',
            type: ArticleBlockType.IMAGE,
            src: 'https://picsum.photos/920/300?random=6',
            title: 'Рисунок 1 - скриншот сайта',
        },
        {
            id: '3',
            type: ArticleBlockType.TITLE,
            title: 'Тут какой-то заголовок',
        },
        {
            id: '4',
            type: ArticleBlockType.CODE,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
        },
    ],
};
const meta: Meta<typeof ArticleRecommendationsList> = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?_limit=3`,
                method: 'GET',
                status: 200,
                response: [
                    { ...article, id: '1' },
                    { ...article, id: '2' },
                    { ...article, id: '3' },
                ],
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
Normal.decorators = [StoreDecorator({})];
