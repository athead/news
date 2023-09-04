import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Dropdown } from 'shared/ui/Popups';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, userActions } from 'entities/User';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
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
            direction="bottom left"
            items={[
                ...(isAdminPanelAvailable
                    ? [
                        {
                            content: t('admin'),
                            href: RoutePath.admin_panel,
                        },
                    ]
                    : []),
                {
                    content: t('profile'),
                    href: RoutePath.profile + authData.id,
                },
                {
                    content: t('logout'),
                    onClick: onLogout,
                },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
        />
    );
});
