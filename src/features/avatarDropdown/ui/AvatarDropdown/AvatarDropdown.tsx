import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { getUserAuthData, isUserAdmin, userActions } from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { DropdownDirection } from '@/shared/types/ui';

interface AvatarDropdownProps {
    className?: string;
    direction?: DropdownDirection;
    fallbackInverted?: boolean;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className, direction = 'bottom left', fallbackInverted = true } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin;

    if (!authData) {
        return null;
    }
    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction={direction}
            items={[
                ...(isAdminPanelAvailable
                    ? [
                        {
                            content: t('admin'),
                            href: getRouteAdminPanel(),
                        },
                    ]
                    : []),
                {
                    content: t('profile'),
                    href: getRouteProfile(authData.id),
                },
                {
                    content: t('logout'),
                    onClick: onLogout,
                },
            ]}
            trigger={<Avatar fallbackInverted={fallbackInverted} size={30} src={authData.avatar} />}
        />
    );
});
