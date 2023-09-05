import { CSSProperties, useMemo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = (props: AvatarProps) => {
    const {
        className, src, size, alt,
    } = props;
    const mods: Mods = {};
    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size || 100,
            height: size || 100,
            // centering alt attr
            textAlign: 'center',
            lineHeight: `${size}px` || '100px',
        };
    }, [size]);
    return <img src={src} style={styles} className={classNames(cls.Avatar, mods, [className])} alt={alt} />;
};
