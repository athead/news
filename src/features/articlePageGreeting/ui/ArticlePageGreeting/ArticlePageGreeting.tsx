import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ArticlePageGreetingProps {
    className?: string;
}

export const ArticlePageGreeting = memo((props: ArticlePageGreetingProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const { isArticlePageHasOpened } = useJsonSettings();

    useEffect(() => {
        if (!isArticlePageHasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlePageHasOpened: true }));
        }
    }, [dispatch, isArticlePageHasOpened]);

    const onClose = () => {return setIsOpen(false)};
    return (
        <Modal lazy isOpen={isOpen} onClose={onClose} className={classNames('', {}, [className])}>
            <Text title={t('welcome_message')} />
        </Modal>
    );
});
