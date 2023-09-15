import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown as DropdownDepprecated } from '@/shared/ui/deprecated/Popups';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { getUserAuthData, isUserAdmin, userActions } from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { DropdownDirection } from '@/shared/types/ui';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

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
        {
            content: t('settings'),
            href: getRouteSettings(),
        },
        {
            content: t('logout'),
            onClick: onLogout,
        },
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Dropdown
                    className={classNames('', {}, [className])}
                    direction={direction}
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                />
            }
            off={
                <DropdownDepprecated
                    className={classNames('', {}, [className])}
                    direction={direction}
                    items={items}
                    trigger={<AvatarDeprecated fallbackInverted={fallbackInverted} size={30} src={authData.avatar} />}
                />
            }
        />
    );
});
