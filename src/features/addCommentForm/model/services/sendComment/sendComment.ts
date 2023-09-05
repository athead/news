import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getUserAuthData } from '@/entities/User';
import i18n from '@/shared/config/i18n/i18n';
import { getArticleDetailsData } from '@/entities/Article';
import { getAddCommentFormText } from '../../selectors/addCommentFormSelectors';
import { addCommentFormActions } from '../../slices/addCommentFormSlice';

export const sendComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
    'addCommentForm/sendComment',
    async (_, thunkApi) => {
        const {
            dispatch, extra, rejectWithValue, getState,
        } = thunkApi;
        const userData = getUserAuthData(getState());
        const text = getAddCommentFormText(getState());
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
            dispatch(addCommentFormActions.setText(''));
            return response.data;
        } catch (err) {
            return rejectWithValue(i18n.t('add_comment_error_cr'));
        }
    },
);
