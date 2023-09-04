import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView, ArticleSortField, ArticleType } from 'entities/Article';

export const getArticlesPageIsLoading = (state: StateSchema) => {
    return state.articlesPage?.isLoading || false;
};

export const getArticlesPageError = (state: StateSchema) => {
    return state.articlesPage?.error;
};

export const getArticlesPageView = (state: StateSchema) => {
    return state.articlesPage?.view || ArticleView.TILE;
};

export const getArticlesPageNum = (state: StateSchema) => {
    return state.articlesPage?.page || 1;
};

export const getArticlesPageLimit = (state: StateSchema) => {
    return state.articlesPage?.limit || 9;
};

export const getArticlesPageHasMore = (state: StateSchema) => {
    return state.articlesPage?.hasMore;
};

export const getArticlesPageInited = (state: StateSchema) => {
    return state.articlesPage?._inited;
};

export const getArticlesPageSearch = (state: StateSchema) => {
    return state.articlesPage?.search ?? '';
};

export const getArticlesPageSort = (state: StateSchema) => {
    return state.articlesPage?.sort ?? ArticleSortField.CREATED;
};

export const getArticlesPageOrder = (state: StateSchema) => {
    return state.articlesPage?.order || 'asc';
};

export const getArticlesPageType = (state: StateSchema) => {
    return state.articlesPage?.type ?? ArticleType.ALL;
};
