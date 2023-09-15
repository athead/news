import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import cls from './PageError.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';

interface PageErrorProps {
    className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();
    const reloadPage = () => {
        window.location.reload();
    };
    return (
        <HStack gap="16" max align="center" justify="center"
className={classNames(cls.PageError, {}, [className])}>
            <Text title={t('page_error_title')} />
            <Button onClick={reloadPage}>{t('button.update_page')}</Button>
        </HStack>
    );
};
