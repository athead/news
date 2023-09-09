import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import BlocksIcon from '@/shared/assets/icons/blocks.svg';
import Tiles from '@/shared/assets/icons/tiles.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/consts/consts';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    { view: ArticleView.TILE, icon: Tiles },
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
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => {
                return (
                    <Button theme={ButtonTheme.CLEAR} key={viewType.view} onClick={onClick(viewType.view)}>
                        <Icon
                            Svg={viewType.icon}
                            className={classNames(cls.icon, { [cls.selected]: viewType.view === view })}
                        />
                    </Button>
                );
            })}
        </div>
    );
});
