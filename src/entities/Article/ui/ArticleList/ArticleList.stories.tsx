import type { Meta, StoryObj } from '@storybook/react';

import { Article } from '../../model/types/article';
import { ArticleList } from './ArticleList';
import { ArticleBlockType, ArticleType, ArticleView } from '../../model/consts/consts';

const article: Article = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    user: { id: '1', username: 'admin' },
    type: [ArticleType.IT],
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

const meta: Meta<typeof ArticleList> = {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingBlock: Story = {
    args: {
        articles: [],
        isLoading: true,
        view: ArticleView.BLOCK,
        virtualized: false,
    },
};

export const LoadingTile: Story = {
    args: {
        articles: [],
        isLoading: true,
        view: ArticleView.TILE,
        virtualized: false,
    },
};

export const ListBlock: Story = {
    args: {
        articles: new Array(9).fill(0).map((item, index) => {
            return {
                ...article,
                id: String(index),
            };
        }),
        isLoading: false,
        view: ArticleView.BLOCK,
        virtualized: false,
    },
};

export const ListTile: Story = {
    args: {
        articles: new Array(9).fill(0).map((item, index) => {
            return {
                ...article,
                id: String(index),
            };
        }),
        isLoading: false,
        view: ArticleView.TILE,
        virtualized: false,
    },
};
