import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    // Svg: React.FC<React.SVGAttributes<SVGElement>>;
    Svg: React.FC<React.SVGProps<SVGElement>>;
    size?: number;
    inverted?: boolean;
    onMouseLeave?: () => void;
    onMouseEnter?: () => void;
    onClick?: () => void;
}
/**
 * Компонент устарел, необходимо использовать redesigned
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
    const { className, size = 50, inverted = false, Svg, ...otherProps } = props;
    const style: CSSProperties = {
        width: size,
        height: size,
    };
    return (
        <Svg
            style={style}
            className={classNames(cls.Icon, { [cls.inverted]: inverted }, [className])}
            {...otherProps}
        />
    );
});
