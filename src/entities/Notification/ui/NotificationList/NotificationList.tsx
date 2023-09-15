import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Text } from '@/shared/ui/deprecated/Text';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const { t } = useTranslation('');
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
    });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => {
            return SkeletonRedesigned;
        },
        off: () => {
            return SkeletonDeprecated;
        },
    });

    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames(cls.Notification, {}, [className])}>
                <Skeleton width="100%" borderRadius="8px" height="80px" />
                <Skeleton width="100%" borderRadius="8px" height="80px" />
                <Skeleton width="100%" borderRadius="8px" height="80px" />
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
