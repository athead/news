import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { getArticleDetailsData, getArticleDetailsIsLoading } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { getRouteArticleCreate, getRouteArticleEdit } from '@/shared/const/router';
import { ArticleAdditionalInfo, ArticleAdditionalInfoSkeleton } from '@/widgets/ArticleAdditionalInfo';

export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const navigate = useNavigate();

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article, navigate]);

    const onCreateArticle = useCallback(() => {
        navigate(getRouteArticleCreate());
    }, [navigate]);

    if (isLoading) {
        return (
            <Card padding="24" border="middle" className={cls.card}>
                <ArticleAdditionalInfoSkeleton />
            </Card>
        );
    }

    if (!article) {
        return null;
    }
    return (
        <Card padding="24" border="middle" className={cls.card}>
            <ArticleAdditionalInfo
                onEdit={onEditArticle}
                onCreate={onCreateArticle}
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
            />
        </Card>
    );
});
