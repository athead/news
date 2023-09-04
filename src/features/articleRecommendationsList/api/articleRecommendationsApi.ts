import { Article } from 'entities/Article';
import { rtkApi } from 'shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getArticleRecmmendationsList: build.query<Article[], number>({
                query: (limit) => {
                    return {
                        url: '/articles',
                        params: {
                            _limit: limit,
                        },
                    };
                },
            }),
        };
    },
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecmmendationsListQuery;
