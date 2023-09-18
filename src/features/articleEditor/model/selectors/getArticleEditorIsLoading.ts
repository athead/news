import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleEditorIsLoading = (state: StateSchema) => {
    return state?.articleDetailsEditor?.isLoading;
};
