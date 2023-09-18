import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleEditorSchema } from '../types/articleEditorSchema';
import { Article } from '@/entities/Article';
import { fetchEditArticleById } from '../services/fetchEditArticleById/fetchEditArticleById';

const initialState: ArticleEditorSchema = {
    isLoading: false,
    isEdited: false,
    error: undefined,
    data: undefined,
};

export const articleEditorSlice = createSlice({
    name: 'articleEditor',
    initialState,
    reducers: {
        updateArticle: (state, action: PayloadAction<DeepPartial<Article>>) => {
            state.form = { ...state.form, ...action.payload };
            if(JSON.stringify(state.form) === JSON.stringify(state.data)) {
                state.isEdited = false;
            } else {
                state.isEdited = true;
            }
        },
        cancelEdit: (state) => {
            state.form = state.data;
            state.isEdited = false;
            state.validateErrors = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEditArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchEditArticleById.fulfilled, (state, action: PayloadAction<DeepPartial<Article>>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchEditArticleById.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchArticleData.pending, (state) => {
    //             state.validateErrors = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchArticleData.fulfilled, (state, action: PayloadAction<Article>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //             state.form = action.payload;
    //         })
    //         .addCase(fetchArticleData.rejected, (state, action) => {
    //             state.error = action.payload;
    //             state.isLoading = false;
    //         })
    //         .addCase(updateArticleData.pending, (state) => {
    //             state.validateErrors = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(updateArticleData.fulfilled, (state, action: PayloadAction<Article>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //             state.form = action.payload;
    //             state.validateErrors = undefined;
    //             state.readonly = true;
    //         })
    //         .addCase(updateArticleData.rejected, (state, action) => {
    //             state.validateErrors = action.payload;
    //             state.isLoading = false;
    //         });
    // },
});

export const { actions: articleEditorActions } = articleEditorSlice;
export const { reducer: articleEditorReducer } = articleEditorSlice;
