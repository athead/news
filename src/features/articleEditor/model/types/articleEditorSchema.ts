import { Article } from '@/entities/Article';
import { ValidateArticleError } from '../consts/consts';

export interface ArticleEditorSchema {
    data?: Article;
    form?: Article;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateArticleError[];
}
