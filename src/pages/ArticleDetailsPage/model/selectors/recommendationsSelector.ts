import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsRecommendationsIsLoading = (state: StateSchema) => {
    return state.articleDetailsPage?.recommendations?.isLoading;
};

export const getArticleDetailsRecommendationsError = (state: StateSchema) => {
    return state.articleDetailsPage?.recommendations?.error;
};
