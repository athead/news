import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { Text } from '@/shared/ui/Text';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article');

    const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

    if (isLoading || error || !articles?.length) {
        return null;
    }

    return (
        <VStack data-testid="ArticleRecommendationsList" gap="16" className={classNames('', {}, [className])}>
            <Text size="l" title={t('recommendations')} />
            <ArticleList virtualized={false} articles={articles} target="_blank" />
        </VStack>
    );
});
