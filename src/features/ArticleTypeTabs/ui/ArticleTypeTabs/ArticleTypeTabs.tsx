import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleType } from '@/entities/Article';
import { TabItem, Tabs } from '@/shared/ui/Tabs';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation('article_types');
    const onTabClick = useCallback(
        (tab: TabItem<ArticleType>) => {
            onChangeType(tab.value);
        },
        [onChangeType],
    );
    const typeTabs = useMemo<TabItem<ArticleType>[]>(() => {
        return [
            { value: ArticleType.ALL, content: t('article_all') },
            { value: ArticleType.IT, content: t('article_it') },
            { value: ArticleType.SCIENCE, content: t('article_science') },
            { value: ArticleType.ECONOMICS, content: t('article_economics') },
            { value: ArticleType.POLITICS, content: t('article_politics') },
        ];
    }, [t]);
    return (
        <Tabs
            direction="column"
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
            className={classNames('', {}, [className])}
        />
    );
});
