import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleEditorIsEdited = (state: StateSchema) => {
    return state?.articleDetailsEditor?.isEdited;
};
