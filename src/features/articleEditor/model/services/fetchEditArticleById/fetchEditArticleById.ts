import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import i18n from '@/shared/config/i18n/i18n';
import { Article } from '@/entities/Article';

export const fetchEditArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
    'articleEdit/fetchEditArticleById',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            if (!articleId) {
                throw new Error('');
            }
            const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                params: {
                    _expand: 'user',
                },
            });
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (err) {
            return rejectWithValue(i18n.t('getarticle_error_cr'));
        }
    },
);
