import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: React.FC<React.SVGAttributes<SVGElement>>;
    size?: string | number;
    inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
    const {
        className, size = 50, inverted = false, Svg,
    } = props;
    const style: CSSProperties = {
        width: size,
        height: size,
    };
    return <Svg style={style} className={classNames(cls.Icon, { [cls.inverted]: inverted }, [className])} />;
});
