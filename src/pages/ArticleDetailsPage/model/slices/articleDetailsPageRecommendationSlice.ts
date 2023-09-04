import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { ArticleDetailsPageRecommendationSchema } from '../types/articleDetailsPageRecommendationSchema';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
    // Assume IDs are stored in a field other than `comment.id`
    selectId: (comment) => {
        return comment.id;
    },
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>((state) => {
    return state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState();
});

const articleDetailsPageRecommendationSlice = createSlice({
    name: 'articleDetailsPageRecommendationSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { reducer: articleDetailsPageRecommendationReducer } = articleDetailsPageRecommendationSlice;
