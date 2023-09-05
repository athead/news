import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesList } from './fetchNextArticleList';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesList.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesList, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toHaveBeenCalled();
    });
    test('fetchArticlesList is not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesList, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                hasMore: false,
                isLoading: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
