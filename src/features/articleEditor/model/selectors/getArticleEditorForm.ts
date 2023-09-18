import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleEditorForm = (state: StateSchema) => {
    return state?.articleDetailsEditor?.form;
};
