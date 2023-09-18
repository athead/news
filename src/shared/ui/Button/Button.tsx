import { ButtonHTMLAttributes, ForwardedRef, ReactNode, forwardRef } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    /**
     * Тема кнопки
     */
    variant?: ButtonVariant;
    size?: ButtonSize;
    square?: boolean;
    fullWidth?: boolean;
    muted?: boolean;
    children?: ReactNode;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    color?: ButtonColor;
}

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
        className,
        children,
        variant = 'outline',
        square = false,
        muted,
        size = 'm',
        fullWidth,
        addonLeft,
        addonRight,
        color = 'normal',
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: muted,
        [cls.fullWidth]: fullWidth,
        // [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    };
    return (
        <button
            type="button"
            disabled={muted}
            ref={ref}
            {...otherProps}
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size], cls[color]])}
        >
            {Boolean(addonLeft) && <div className={cls.addonLeft}>{addonLeft}</div>}
            {children}
            {Boolean(addonRight) && <div className={cls.addonRight}>{addonRight}</div>}
        </button>
    );
});
