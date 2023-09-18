import { Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/Modal';
import cls from './LoginModal.module.scss';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Skeleton } from '@/shared/ui/Skeleton';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

const ModalLoader = () => {
    return <Skeleton width="40%" height="38px" />;
};
export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
    return (
        <Modal lazy className={classNames(cls.LoginModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<ModalLoader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};
