import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUserName';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import cls from './Navbar.module.scss';
import { Button } from '@/shared/ui/Button';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const authData = useSelector(getUserAuthData);
    const onCloseModal = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </header>
        );
    }
    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button variant="clear" className={cls.links} onClick={onShowModal}>
                {t('login')}
            </Button>
            {/* <Text theme={TextTheme.INVERTED} className={cls.appName} title={t('APPNAME')} /> */}
            {isAuthModalOpen && <LoginModal isOpen={isAuthModalOpen} onClose={onCloseModal} />}
        </header>
    );
});
