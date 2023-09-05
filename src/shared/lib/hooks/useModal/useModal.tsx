import {
    MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}
export function useModal(props: UseModalProps) {
    const { onClose, isOpen, animationDelay } = props;

    const [isOpening, setIsOpening] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const closeTimerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const openTimerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            // Таймердля класса закрытия
            closeTimerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
                setIsOpening(false);
            }, animationDelay);
        }
    }, [onClose, animationDelay]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        },
        [close],
    );

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            // таймер до присвоение класса открыто
            openTimerRef.current = setTimeout(() => {
                setIsOpening(true);
            }, animationDelay);
        }
    }, [isOpen, animationDelay]);

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

    return {
        isClosing,
        isOpening,
        isMounted,
        close,
    };
}
