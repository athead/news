import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import i18n from 'shared/config/i18n/i18n';
import { Article } from 'entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlesDetailsPage/fetchArticleRecommendations',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: 4,
                },
            });
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (err) {
            return rejectWithValue(i18n.t('getarticles_error_cr'));
        }
    },
);
