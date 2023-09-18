import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';
import { ListBox } from '@/shared/ui/Popups';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ListBoxItem } from '@/shared/ui/Popups/ui/ListBox/ListBox';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newOrder: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { className, order, sort, onChangeOrder, onChangeSort } = props;
    const { t } = useTranslation('article');

    const orderOptions = useMemo<ListBoxItem<SortOrder>[]>(() => {
        return [
            {
                value: 'asc',
                content: t('asc'),
            },
            {
                value: 'desc',
                content: t('desc'),
            },
        ];
    }, [t]);

    const sortFieldOptions = useMemo<ListBoxItem<ArticleSortField>[]>(() => {
        return [
            {
                value: ArticleSortField.CREATED,
                content: t('created_date'),
            },
            {
                value: ArticleSortField.TITLE,
                content: t('title'),
            },
            {
                value: ArticleSortField.VIEWS,
                content: t('views'),
            },
        ];
    }, [t]);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <VStack gap="8">
                <Text text={t('sorting_label')} />
                <ListBox items={sortFieldOptions} value={sort} onChange={onChangeSort} />
                <ListBox items={orderOptions} value={order} onChange={onChangeOrder} />
            </VStack>
        </div>
    );
});
