import { ValidateArticleError } from '../../consts/consts';
import { Article } from '@/entities/Article';

export const validateArticleData = (article?: DeepPartial<Article>) => {
    if (!article) {
        return [ValidateArticleError.NO_DATA];
    }
    const { title, subtitle, img, blocks } = article;

    const errors: ValidateArticleError[] = [];

    if (!title || !subtitle) {
        errors.push(ValidateArticleError.INCORRECT_DATA);
    }

    if (!blocks || !blocks.length) {
        errors.push(ValidateArticleError.EMPTY_ARTICLE);
    }

    return errors;
};
