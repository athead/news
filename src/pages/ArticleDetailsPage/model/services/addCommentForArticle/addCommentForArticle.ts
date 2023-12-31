import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getUserAuthData } from '@/entities/User';
import i18n from '@/shared/config/i18n/i18n';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkApi) => {
        const { dispatch, extra, rejectWithValue, getState } = thunkApi;
        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue(i18n.t('no_data_cr'));
        }
        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            });

            if (!response.data) {
                throw new Error();
            }
            dispatch(fetchCommentsByArticleId(article.id));
            return response.data;
        } catch (err) {
            return rejectWithValue(i18n.t('add_comment_error_cr'));
        }
    },
);
