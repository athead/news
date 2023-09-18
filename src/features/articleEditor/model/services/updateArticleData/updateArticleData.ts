import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';
import { ValidateArticleError } from '../../consts/consts';
import { getArticleEditorForm } from '../../selectors/getArticleEditorForm';
import { validateArticleData } from '../validateArticleData/validateArticleData';

export const updateArticleData = createAsyncThunk<Article, void, ThunkConfig<ValidateArticleError[]>>(
    'article/updateArticleData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const articleFormData = getArticleEditorForm(getState());
        const errors = validateArticleData(articleFormData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.patch<Article>(`/articles/${articleFormData?.id}`, articleFormData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (err) {
            // console.log(err);
            return rejectWithValue([ValidateArticleError.SERVER_ERROR]);
        }
    },
);
