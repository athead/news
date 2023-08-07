import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const onToggleModal = useCallback(() => {
        setIsAuthModalOpen((prev) => {
            return !prev;
        });
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button theme={ButtonTheme.OUTLINE_INVERTED} className={cls.links} onClick={onToggleModal}>
                {t('login')}
            </Button>
            <Modal isOpen={isAuthModalOpen} onClose={onToggleModal}>
                asdasdgsdfhsdfhhdfg
            </Modal>
        </div>
    );
};
