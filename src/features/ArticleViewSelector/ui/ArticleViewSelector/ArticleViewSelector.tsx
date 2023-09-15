import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import BlocksIcon from '@/shared/assets/icons/blocks.svg';
import TilesIcon from '@/shared/assets/icons/tiles.svg';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card border='round' className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}>
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
            }
            off={
                <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
                    {viewTypes.map((viewType) => {
                        return (
                            <ButtonDeprecated
                                theme={ButtonTheme.CLEAR}
                                key={viewType.view}
                                onClick={onClick(viewType.view)}
                            >
                                <IconDeprecated
                                    size={24}
                                    Svg={viewType.icon}
                                    className={classNames(cls.icon, { [cls.selected]: viewType.view === view })}
                                />
                            </ButtonDeprecated>
                        );
                    })}
                </div>
            }
        />
    );
});
