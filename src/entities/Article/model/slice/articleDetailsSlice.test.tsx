import { Article } from '../types/article';
import { articleDetailsReducer } from './articleDetailsSlice';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { ArticleBlockType, ArticleType } from '../consts/consts';

const article: Article = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    type: [ArticleType.IT],
    user: {
        id: '1',
        username: 'admin',
    },
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

describe('articleDetailsSlice.test', () => {
    test('test article details service pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
        };

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.pending)).toEqual({
            isLoading: true,
            error: undefined,
        });
    });

    test('test article details service fullfiled', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
        };

        expect(
            articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.fulfilled(article, '1', '')),
        ).toEqual({
            isLoading: false,
            error: undefined,
            data: article,
        });
    });
});
