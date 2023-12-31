import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { NotificationSchema } from '../../model/types/NotificationSchema';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';

interface NotificationItemProps {
    className?: string;
    item: NotificationSchema;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;
    const content = (
        <Card className={classNames(cls.Notification, {}, [className])}>
            <Text title={item.title} text={item.description} />
        </Card>
    );

    if (item.href) {
        return (
            <AppLink className={cls.link} target="_blank" to={item.href}>
                {content}
            </AppLink>
        );
    }
    return content;
});
