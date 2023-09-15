import { ImgHTMLAttributes, ReactElement, memo, useLayoutEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppImage.module.scss';

export type ImageRound = 'normal' | 'round' | 'middle';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
    round?: ImageRound;
}

export const AppImage = memo((props: AppImageProps) => {
    const { className, src, alt = 'image', fallback, errorFallback, round = 'normal', ...otherProps } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }
    return <img src={src} alt={alt} className={classNames('', {}, [className, cls[round]])} {...otherProps} />;
});
