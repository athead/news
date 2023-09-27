import { Article } from '@/entities/Article';
import { ValidateArticleError } from '../consts/consts';

export interface ArticleEditorSchema {
    data?: Article;
    form?: Partial<Article>;
    isLoading: boolean;
    isEdited: boolean;
    error?: string;
    validateErrors?: ValidateArticleError[];
}
