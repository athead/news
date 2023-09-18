import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Text } from '@/shared/ui/Text';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const { t } = useTranslation('');
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
    });
    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames(cls.Notification, {}, [className])}>
                <Skeleton width="40%" borderRadius="10px" height="30px" />
                <Skeleton width="100%" borderRadius="12px" height="60px" />
                <Skeleton width="60%" borderRadius="10px" height="30px" />
                <Skeleton width="100%" borderRadius="12px" height="60px" />
                <Skeleton width="30%" borderRadius="10px" height="30px" />
                <Skeleton width="100%" borderRadius="12px" height="60px" />
            </VStack>
        );
    }
    if (!data?.length) {
        return <Text title={t('no_notification')} />;
    }
    return (
        <VStack gap="16" max className={classNames(cls.Notification, {}, [className])}>
            {data?.map((item) => {
                return <NotificationItem key={item.id} item={item} />;
            })}
        </VStack>
    );
});
