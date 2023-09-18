import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleEditorData = (state: StateSchema) => {
    return state?.articleDetailsEditor?.data;
};
