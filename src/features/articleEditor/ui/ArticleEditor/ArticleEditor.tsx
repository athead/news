import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/Text';
import { getArticleEditorData } from '../../model/selectors/getArticleEditorData';
import { fetchEditArticleById } from '../../model/services/fetchEditArticleById/fetchEditArticleById';
import { Skeleton } from '@/shared/ui/Skeleton';
import { getArticleEditorIsLoading } from '../../model/selectors/getArticleEditorIsLoading';
import { Card } from '@/shared/ui/Card';

interface ArticleEditorProps {
    className?: string;
    isEdit: boolean;
    articleId?: string;
}

const ArticleDetailsSkeleton = () => {
    return (
        <>
            <Skeleton width={200} height={40} borderRadius="16px" />
            <Skeleton width={400} height={30} borderRadius="12px" />
            <Skeleton width="100%" height={300} borderRadius="24px" />
            <Skeleton width={300} height={30} borderRadius="12px" />
            <Skeleton width={200} height={24} borderRadius="12px" />
            <Skeleton width={400} height={24} borderRadius="12px" />
        </>
    );
};

export const ArticleEditor = memo((props: ArticleEditorProps) => {
    const { className, isEdit, articleId } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleEditorIsLoading);
    const articleDetals = useSelector(getArticleEditorData);

    useEffect(() => {
        if (articleId) dispatch(fetchEditArticleById(articleId));
    }, [dispatch, articleId]);

    let content;
    if (isLoading) {
        content = <ArticleDetailsSkeleton />;
    } else if (isEdit) {
        content = (
            <>
                <Text title={t('editing_article')} />
                {articleDetals?.title}
            </>
        );
    } else {
        content = (
            <>
                <Text title={t('creating_article')} />
                {articleDetals?.title}
            </>
        );
    }

    return (
        <>
            <Card border="middle" padding="24" max className={className}>
                {content}
            </Card>
            <Card border="middle" padding="24" max className={className}>
                {content}
            </Card>
        </>
    );
});
