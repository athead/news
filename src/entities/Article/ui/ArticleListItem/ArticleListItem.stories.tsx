import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Article } from '../../model/types/article';
import { ArticleListItem } from './ArticleListItem';
import { ArticleBlockType, ArticleType, ArticleView } from '../../model/consts/consts';
import { Theme } from '@/shared/const/theme';

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

const meta: Meta<typeof ArticleListItem> = {
    title: 'entities/Article/ArticleListItem',
    component: ArticleListItem,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Block: Story = {
    args: { view: ArticleView.BLOCK, article },
};

export const BlockDark: Story = {
    args: { view: ArticleView.BLOCK, article },
};
BlockDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Tile: Story = {
    args: { view: ArticleView.TILE, article },
};

export const TileDark: Story = {
    args: { view: ArticleView.TILE, article },
};

TileDark.decorators = [ThemeDecorator(Theme.DARK)];
