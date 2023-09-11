import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';
import { getArticlesPageError } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesList } from '../../model/services/fetchNextArticleList/fetchNextArticleList';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesList());
    }, [dispatch]);

    const error = useSelector(getArticlesPageError);

    if (error) {
        return (
            <Page className={classNames(cls.ArticlesPage, {}, [className])}>
                <Text title={t('getarticles_error_cr')} />
            </Page>
        );
    }
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                data-testid="ArticlesPage"
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilter />
                <ArticleInfiniteList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
