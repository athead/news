// import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';
import { ArticleView } from '../../model/consts/consts';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.TILE ? 9 : 3).fill(0).map((_, index) => {
        return <ArticleListItemSkeleton className={cls.card} key={index} view={view} />;
    });
};

const getSkeleton = (view: ArticleView) => {
    return <ArticleListItemSkeleton className={cls.card} view={view} />;
};

export const ArticleList = memo((props: ArticleListProps) => {
    const { className, articles, isLoading, view = ArticleView.TILE, target, virtualized = true } = props;
    const { t } = useTranslation();

    const ArticleItemComponent = useCallback(
        (index: number) => {
            // if (isLoading) return getSkeletons(view);
            return (
                <ArticleListItem
                    article={articles[index]}
                    view={view}
                    key={articles[index].id}
                    className={cls.card}
                    target={target}
                />
            );
        },
        [articles, target, view],
    );

    if (!isLoading && !articles.length) {
        return (
            <VStack className={classNames(cls.notFound, {}, [className, cls[view]])}>
                <Text size="l" title={t('articles_not_found')} />
            </VStack>
        );
    }

    return virtualized ? (
        <VirtuosoGrid
            data-testid="ArticleList.virtualized"
            // style={{ height: 500 }}
            useWindowScroll
            listClassName={classNames(cls.ArticleList, {}, [className, cls[view]])}
            totalCount={articles.length}
            components={{
                // Item: ArticleListItem,
                ScrollSeekPlaceholder: () => {
                    return getSkeleton(view);
                },
            }}
            itemContent={ArticleItemComponent}
            scrollSeekConfiguration={{
                enter: (velocity) => {
                    return Math.abs(velocity) > 200;
                },
                exit: (velocity) => {
                    return Math.abs(velocity) < 30;
                },
                // change: (_, range) => {
                //     return console.log({ range });
                // },
            }}
        />
    ) : (
        <HStack wrap="wrap" gap="16" data-testid="ArticleList" className={classNames(cls.ArticleList, {}, [])}>
            {isLoading && getSkeletons(view)}
            {articles.length > 0
                ? articles.map((article) => {
                      return (
                          <ArticleListItem
                              target={target}
                              article={article}
                              view={view}
                              key={article.id}
                              className={cls.card}
                          />
                      );
                  })
                : null}
        </HStack>
    );
});
