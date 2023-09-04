import { Mods, classNames } from 'shared/lib/classNames/classNames';
import {
    MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 150;

export const Modal = (props: ModalProps) => {
    const {
        className, children, isOpen, onClose, lazy,
    } = props;

    const [isOpening, setIsOpening] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const closeTimerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const openTimerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            // Таймердля класса закрытия
            closeTimerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
                setIsOpening(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeHandler();
        },
        [closeHandler],
    );

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            // таймер до присвоение класса открыто
            openTimerRef.current = setTimeout(() => {
                setIsOpening(true);
            }, ANIMATION_DELAY);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            // очистка таймеров
            clearTimeout(closeTimerRef.current);
            clearTimeout(openTimerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpening,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div
                        className={cls.content}
                        onClick={(e: any) => {
                            return onContentClick(e);
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
