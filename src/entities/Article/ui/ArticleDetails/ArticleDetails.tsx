import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
// import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderBlock';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppImage } from '@/shared/ui/AppImage';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

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
export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const { t } = useTranslation('article');

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;
    if (isLoading) {
        content = <ArticleDetailsSkeleton />;
    } else if (error) {
        content = <Text align="center" variant="error" title={t('article_error')} />;
    } else {
        content = (
            <>
                <Text size="l" title={article?.title} weight="bold" />
                <Text title={article?.subtitle} />
                <AppImage
                    round="middle"
                    fallback={<Skeleton width="100%" height={420} borderRadius="16px" />}
                    src={article?.img}
                    className={cls.img}
                />
                {article?.blocks?.map(renderArticleBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack max gap="8" className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
