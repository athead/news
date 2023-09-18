import { Article } from '@/entities/Article';
import { ValidateArticleError } from '../consts/consts';

export interface ArticleEditorSchema {
    data?: DeepPartial<Article>;
    form?: DeepPartial<Article>;
    isLoading: boolean;
    isEdited: boolean;
    error?: string;
    validateErrors?: ValidateArticleError[];
}
