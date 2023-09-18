import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/Text';
import { getArticleEditorData } from '../../model/selectors/getArticleEditorData';
import { fetchEditArticleById } from '../../model/services/fetchEditArticleById/fetchEditArticleById';
import { Skeleton } from '@/shared/ui/Skeleton';
import { getArticleEditorIsLoading } from '../../model/selectors/getArticleEditorIsLoading';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { articleEditorActions } from '../../model/slices/articleEditorSlice';
import { getArticleEditorForm } from '../../model/selectors/getArticleEditorForm';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getArticleEditorIsEdited } from '../../model/selectors/getArticleEditorIsEdited';
import { Button } from '@/shared/ui/Button';
import { updateArticleData } from '../../model/services/updateArticleData/updateArticleData';

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
    const isArticleEdited = useSelector(getArticleEditorIsEdited);
    const articleDetals = useSelector(getArticleEditorData);
    const articleForm = useSelector(getArticleEditorForm);

    useEffect(() => {
        if (articleId) dispatch(fetchEditArticleById(articleId));
    }, [dispatch, articleId]);

    const onArticleTitleChange = useCallback((value: string) => {
        dispatch(articleEditorActions.updateArticle({title: value}));
    }, []);

    const onArticleSubtitleChange = useCallback((value: string) => {
        dispatch(articleEditorActions.updateArticle({subtitle: value}));
    }, []);

    const onArticleCancelEditing = useCallback(() => {
        dispatch(articleEditorActions.cancelEdit());
    }, []);

    const onArticleSaveEditing = useCallback(() => {
        dispatch(updateArticleData());
    }, []);

    let content;
    if (isLoading) {
        content = <ArticleDetailsSkeleton />;
    } else {
        content = (
            <VStack gap='16'> 
                <Input value={articleForm?.title} onChange={onArticleTitleChange} placeholder='title'/>
                <Input value={articleForm?.subtitle} onChange={onArticleSubtitleChange} placeholder='subtitle'/>
            </VStack>
        );
    }

    return (
        <>
            <Card border="middle" padding="24" max className={className}>
                <HStack justify='between'>
                {isEdit? <Text title={t('editing_article')} />:<Text title={t('creating_article')} />}
                {isArticleEdited && <HStack gap='8'>
                    <Button color='success' onClick={onArticleSaveEditing}>{t('save_btn')}</Button>
                    <Button color='error' onClick={onArticleCancelEditing}>{t('cancel_btn')}</Button>
                </HStack> 
                }
                </HStack>
            </Card>
            <Card border="middle" padding="24" max className={className}>
                {content}
            </Card>
        </>
    );
});
