import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

import cls from './ArticlesPageFilters.module.scss';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlesPageFilterProps {
    className?: string;
}

export const ArticlesPageFilter = memo((props: ArticlesPageFilterProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const { order, search, sort, type, view, onChangeOrder, onChangeSearch, onChangeSort, onChangeType, onChangeView } =
        useArticleFilters();

    return (
        <div className={classNames(cls.ArticlesPageFilter, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input value={search} onChange={onChangeSearch} placeholder={t('search')} />
            </Card>
            <ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs} />
        </div>
    );
});
