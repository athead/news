import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData, isUserAdmin, userActions } from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { DropdownDirection } from '@/shared/types/ui';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';

interface AvatarDropdownProps {
    className?: string;
    direction?: DropdownDirection;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className, direction = 'bottom left' } = props;
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

    const items = [
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
        // {
        //     content: t('settings'),
        //     href: getRouteSettings(),
        // },
        {
            content: t('logout'),
            onClick: onLogout,
        },
    ];

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction={direction}
            items={items}
            trigger={<Avatar size={40} src={authData.avatar} />}
        />
    );
});
