import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetArticleRatingArg {
    userId: string;
    articleId: string;
}

interface RateArticleArg extends GetArticleRatingArg {
    rate: number;
    feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getArticleRating: build.query<Rating[], GetArticleRatingArg>({
                query: ({ articleId, userId }) => {
                    return {
                        url: '/article-ratings',
                        params: {
                            userId,
                            articleId,
                        },
                    };
                },
            }),
            rateArticle: build.mutation<void, RateArticleArg>({
                query: (arg) => {
                    return {
                        url: '/article-ratings',
                        method: 'POST',
                        body: arg,
                    };
                },
            }),
        };
    },
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
