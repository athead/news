import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import Star from '@/shared/assets/icons/star.svg';
import { Icon } from '../Icon';

interface StarRatingProps {
    className?: string;
    onSelect?: (startCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, selectedStars = 0, size = 30 } = props;
    const [curStarsCount, setCurSratsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => {
        return () => {
            if (!isSelected) {
                setCurSratsCount(starsCount);
            }
        };
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurSratsCount(0);
        }
    };

    const onClick = (starsCount: number) => {
        return () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setCurSratsCount(starsCount);
                setIsSelected(true);
            }
        };
    };
    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => {
                return (
                    <Icon
                        Svg={Star}
                        key={starNumber}
                        className={classNames(
                            cls.StarIcon,
                            { [cls.hovered]: curStarsCount >= starNumber, [cls.selected]: isSelected },
                            [],
                        )}
                        width={size}
                        height={size}
                        onMouseLeave={onLeave}
                        onMouseEnter={onHover(starNumber)}
                        onClick={onClick(starNumber)}
                        data-testid={`StarRating.${starNumber}`}
                        data-selected={curStarsCount >= starNumber}
                        clickable
                    />
                );
            })}
        </div>
    );
});
