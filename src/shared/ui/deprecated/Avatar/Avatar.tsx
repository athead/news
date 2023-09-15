import { CSSProperties, useMemo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { Skeleton } from '../Skeleton';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { Icon } from '../Icon';
import { AppImage } from '../../redesigned/AppImage';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}
/**
 * Компонент устарел, необходимо использовать redesigned
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const { className, src, size = 100, alt, fallbackInverted } = props;
    const mods: Mods = {};
    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size,
            // centering alt attr
            textAlign: 'center',
            lineHeight: `${size}px` || '100px',
        };
    }, [size]);

    const fallback = <Skeleton width={size} height={size} borderRadius="50%" />;
    const errorFallback = <Icon size={size} Svg={ProfileIcon} inverted={fallbackInverted} />;

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
            alt={alt}
        />
    );
};
