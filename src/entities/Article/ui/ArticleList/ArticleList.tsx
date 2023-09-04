import { classNames } from 'shared/lib/classNames/classNames';
// import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';
import { ArticleView } from '../../model/consts/consts';

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
        // eslint-disable-next-line
        return <ArticleListItemSkeleton className={cls.card} key={index} view={view} />;
    });
};

const getSkeleton = (view: ArticleView) => {
    return <ArticleListItemSkeleton className={cls.card} view={view} />;
};

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className, articles, isLoading, view = ArticleView.TILE, target, virtualized = true,
    } = props;
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
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title={t('articles_not_found')} />
            </div>
        );
    }

    return virtualized ? (
        <VirtuosoGrid
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
                change: (_, range) => {
                    return console.log({ range });
                },
            }}
        />
    ) : (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
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
            {isLoading && getSkeletons(view)}
        </div>
    );
});
