import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToTopButton.module.scss';
import { Icon } from '@/shared/ui/Icon';
import ScrollIcon from '@/shared/assets/icons/arrow-up.svg';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const onClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Icon
            Svg={ScrollIcon}
            onClick={onClick}
            width={40}
            height={40}
            clickable
            className={classNames(cls.ScrollToTopButton, {}, [className])}
        />
    );
});
