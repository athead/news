import { LinkProps, NavLink } from 'react-router-dom';
import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
    const { to, className, children, variant = 'primary', activeClassName = '', ...otherProps } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                {return classNames(cls.AppLink, { [activeClassName]: isActive }, [className, cls[variant]])}
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
