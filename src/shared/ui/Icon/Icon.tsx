import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGElement>>;
    clickable?: boolean;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true;
    onClick?: () => void;
    // onMouseLeave?: () => void;
    // onMouseEnter?: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
    const { className, Svg, width = 26, height = 26, clickable, ...otherProps } = props;

    const Icon = (
        <Svg
            width={width}
            height={height}
            className={classNames(cls.Icon, {}, [clickable ? '' : className])}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={classNames(cls.button, {}, [className])}
                onClick={props.onClick}
                // onMouseEnter={props.onMouseEnter}
                // onMouseLeave={props.onMouseLeave}
                style={{ height, width }}
            >
                {Icon}
            </button>
        );
    }
    return Icon;
});
