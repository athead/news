import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import BlocksIcon from '@/shared/assets/icons/blocks.svg';
import TilesIcon from '@/shared/assets/icons/tiles.svg';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { HStack } from '@/shared/ui/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    { view: ArticleView.TILE, icon: TilesIcon },
    { view: ArticleView.BLOCK, icon: BlocksIcon },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => {
        return () => {
            onViewClick?.(newView);
        };
    };
    return (
        <Card border="round" className={classNames(cls.ArticleViewSelector, {}, [className])}>
            <HStack gap="8">
                {viewTypes.map((viewType) => {
                    return (
                        <Icon
                            clickable
                            key={viewType.view}
                            onClick={onClick(viewType.view)}
                            Svg={viewType.icon}
                            className={classNames(cls.icon, { [cls.selected]: viewType.view === view })}
                        />
                    );
                })}
            </HStack>
        </Card>
    );
});
